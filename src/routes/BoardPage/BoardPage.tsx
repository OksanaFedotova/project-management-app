import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  useGetBoardByIdQuery,
  useUpdateColumnMutation,
  useUpdateTaskMutation,
  useDeleteBoardMutation,
} from 'store/services/boardAPI';
import Layout from 'components/Layout';
import BoardDescription from 'components/BoardDescription/BoardDescription';
import BoardForm from 'components/BoardForm';
import ColumnModal from 'components/Column/ColumnModal';
import ColumnCard from 'components/Column/ColumnCard';
import ModalDelete from 'components/ModalDelete';
import IColumnCard from 'interfaces/IColumnCard';
import { IColumn } from 'interfaces/IBoard';
import { ErrorAuth } from 'interfaces/IUser';
import { Backdrop, Button, CircularProgress, FormControlLabel, Switch } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './BoardPage.css';

export default function BoardPage() {
  const { id } = useParams();
  const boardId = id ? id : '';
  const { data, isLoading: isLoadingData } = useGetBoardByIdQuery(boardId);
  const userId = localStorage.getItem('userId') ? localStorage.getItem('userId') : '';

  const [updateTask, { error: errTask }] = useUpdateTaskMutation();
  const [updateColumn, { error: errColumn }] = useUpdateColumnMutation();
  const [deleteBoard, { isLoading: isLoadingDelete, error: errBoard }] = useDeleteBoardMutation();

  const [descriptionActive, setDescriptionActive] = useState<boolean>(false);
  const [changeActive, setChangeActive] = useState<boolean>(false);
  const [addActive, setAddActive] = useState<boolean>(false);

  const navigator = useNavigate();
  const [isModalDelete, setIsModalDelete] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [isDropping, setIsDropping] = useState<boolean>(false);

  const [columns, setColumns] = useState<IColumn[]>([]);

  if (errTask || errColumn || errBoard) {
    let e;
    if (errTask) {
      e = errTask as ErrorAuth;
    } else if (errColumn) {
      e = errColumn as ErrorAuth;
    } else {
      e = errBoard as ErrorAuth;
    }
    toast.error(e.data.message, {
      toastId: 'Board',
    });
  }

  useEffect(() => {
    if (checked && data) {
      const filteredArray = [...data!.columns].map((column: IColumn) => {
        const newColumn = {
          ...column,
          tasks: column.tasks.filter((task) => task.userId === userId),
        };
        return newColumn;
      });
      setColumns(filteredArray);
    } else {
      data && setColumns(data.columns);
    }
  }, [checked, data, userId]);

  const intl = useIntl();
  const ru = {
    description: intl.formatMessage({ id: `${'board_description'}` }),
    delete: intl.formatMessage({ id: `${'yes'}` }),
    change: intl.formatMessage({ id: `${'change'}` }),
    addColumn: intl.formatMessage({ id: `${'add_list'}` }),
    title: intl.formatMessage({ id: `${'delete_confirm'}` }),
    yes: intl.formatMessage({ id: `${'yes'}` }),
    no: intl.formatMessage({ id: `${'no'}` }),
    boardDelete: intl.formatMessage({ id: `${'board_delete_toast'}` }),
    switcher: intl.formatMessage({ id: `${'switcher'}` }),
  };
  const theme = ru;

  const handleChecked = (e: React.SyntheticEvent<Element, Event>) => {
    if (!isDropping) {
      const value = (e.target as HTMLInputElement).checked;
      setChecked(value);
      if (value) {
        const filteredArray = [...columns].map((column: IColumn) => {
          const newColumn = {
            ...column,
            tasks: column.tasks.filter((task) => task.userId === userId),
          };
          return newColumn;
        });
        setColumns(filteredArray);
      } else {
        data && setColumns(data.columns);
      }
    }
  };

  async function onDragEnd(result: DropResult) {
    setIsDropping(true);
    if (data) {
      const { destination, source, draggableId, type } = result;

      if (!destination) return;
      if (destination.droppableId === source.droppableId && destination.index === source.index) {
        setIsDropping(false);
        return;
      }

      if (type === 'tasks') {
        const startColumn = columns.find((column) => column.id === source.droppableId);
        const finishColumn = columns.find((column) => column.id === destination.droppableId);
        const currTask = startColumn!.tasks.find((task) => task.id === draggableId);

        if (startColumn?.id === finishColumn?.id) {
          dropTask(source.index, destination.index, startColumn!);
        } else {
          dropTaskBtwColumns(source.index, destination.index, startColumn!, finishColumn!);
        }

        currTask &&
          (await updateTask({
            idTask: currTask.id,
            idColumn: startColumn!.id,
            body: {
              title: currTask.title,
              order: destination.index + 1,
              description: currTask.description,
              userId: currTask.userId,
              boardId,
              columnId: finishColumn!.id,
            },
          }).then(() => setIsDropping(false)));
      }

      if (type === 'column') {
        const currColumn = columns.find((column) => column.id === draggableId);
        dropColumn(destination.index, source.index);

        currColumn &&
          (await updateColumn({
            idBoard: boardId,
            idColumn: currColumn.id,
            body: {
              title: currColumn.title,
              order: destination.index + 1,
            },
          }).then(() => setIsDropping(false)));
      }
    }
  }

  function dropTask(sourceIdx: number, destinationIdx: number, column: IColumn) {
    const newTasks = Array.from(column.tasks).sort((a, b) => a.order - b.order);

    const [task] = newTasks.splice(sourceIdx, 1);
    newTasks.splice(destinationIdx, 0, task);

    const newColumn = {
      ...column,
      tasks: newTasks.map((task, index) => ({
        ...task,
        order: index + 1,
      })),
    };

    const newColumns = Array.from(columns);

    newColumns.splice(
      columns.findIndex((item) => item.id === column.id),
      1,
      newColumn as IColumn
    );

    setColumns(newColumns);
  }

  function dropTaskBtwColumns(
    sourceIdx: number,
    destinationIdx: number,
    startColumn: IColumn,
    finishColumn: IColumn
  ) {
    const newTasksStart = Array.from(startColumn.tasks).sort((a, b) => a.order - b.order);
    const newTasksEnd = Array.from(finishColumn.tasks).sort((a, b) => a.order - b.order);

    const [task] = newTasksStart.splice(sourceIdx, 1);
    newTasksEnd.splice(destinationIdx, 0, task);

    const newStartColumn = {
      ...startColumn,
      tasks: newTasksStart.map((task, index) => ({
        ...task,
        order: index + 1,
      })),
    };

    const newFinishColumn = {
      ...finishColumn,
      tasks: newTasksEnd.map((task, index) => ({
        ...task,
        order: index + 1,
      })),
    };

    const newListColumn = Array.from(columns);
    newListColumn.splice(
      columns.findIndex((column) => column.id === startColumn!.id),
      1,
      newStartColumn as IColumn
    );

    newListColumn.splice(
      columns.findIndex((column) => column.id === finishColumn!.id),
      1,
      newFinishColumn as IColumn
    );

    setColumns(newListColumn);
  }

  function dropColumn(destinationIdx: number, sourceIdx: number) {
    const sortedColumns = Array.from(columns).sort((a, b) => a.order - b.order);

    const [column] = sortedColumns.splice(sourceIdx, 1);
    sortedColumns.splice(destinationIdx, 0, column);

    const newBoard = {
      ...columns,
      columns: sortedColumns.map((item, index) => ({
        ...item,
        order: index + 1,
      })),
    };

    setColumns(newBoard.columns);
  }

  const handleDelete = async (type: string) => {
    if (type === ru.yes) {
      try {
        await deleteBoard(boardId);
      } catch (e) {
        const err = e as ErrorAuth;
        toast.error(err.data.message);
      }
      setIsModalDelete(false);
      navigator('/boards');
    } else {
      setIsModalDelete(false);
    }
  };

  return (
    <Layout>
      {(isLoadingData || isLoadingDelete) && (
        <Backdrop sx={{ color: '#fff', zIndex: 1500 }} open={true}>
          <CircularProgress color="inherit" size={60} />
        </Backdrop>
      )}
      {isModalDelete && (
        <ModalDelete
          title={theme.title}
          btnSubmit={theme.yes}
          btnCancel={theme.no}
          handleClick={handleDelete}
          open={true}
        />
      )}
      {data && (
        <section
          className="board-container"
          onClick={() => {
            if (descriptionActive) setDescriptionActive(false);
          }}
        >
          <Button
            color="inherit"
            sx={{
              mb: 1,
              fontSize: 12,
              textAlign: 'center',
              '&:hover': { color: 'orange' },
            }}
            onClick={() => navigator('/boards')}
          >
            <ArrowBackIosIcon />
            <FormattedMessage id="back" />
          </Button>
          <h2 className="h2-board">{data.title}</h2>
          <h3 className="h3-board">{data.description}</h3>
          <Button sx={{ mb: 1 }} onClick={() => setDescriptionActive(true)}>
            {theme.description}
          </Button>
          <Button sx={{ mb: 1 }} onClick={() => setChangeActive(true)}>
            {theme.change}
          </Button>
          <Button sx={{ mb: 1 }} onClick={() => setIsModalDelete(true)}>
            {theme.delete}
          </Button>
          <Button variant="contained" sx={{ mb: 1 }} onClick={() => setAddActive(true)}>
            {theme.addColumn}
          </Button>
          {descriptionActive && (
            <BoardDescription title={data.title} description={data.description} open={true} />
          )}
          <div style={{ width: '100%' }}>
            <FormControlLabel
              control={<Switch />}
              checked={checked}
              disabled={isDropping}
              label={ru.switcher}
              sx={{ pb: 2 }}
              onChange={(e) => handleChecked(e)}
            />
          </div>
          {changeActive && (
            <BoardForm
              title={data.title}
              description={data.description}
              id={boardId}
              onClick={() => setChangeActive(false)}
            />
          )}
          {addActive && <ColumnModal idBoard={boardId} onClick={() => setAddActive(false)} />}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="board" direction="horizontal" type="column">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="columns-container"
                >
                  {columns &&
                    [...columns]
                      .sort((a, b) => a.order - b.order)
                      .map((column: IColumnCard, index: number) => (
                        <ColumnCard key={column.id} data={column} index={index} />
                      ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </section>
      )}
      <div className="bg-board" />
    </Layout>
  );
}
