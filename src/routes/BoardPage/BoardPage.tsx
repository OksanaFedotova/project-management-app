import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { useGetBoardByIdQuery } from 'store/services/boardAPI';
import { Button } from '@mui/material';
import Layout from 'components/Layout';
import BoardDescription from 'components/BoardDescription/BoardDescription';
import { useIntl } from 'react-intl';

import './BoardPage.css';
import BoardForm from 'components/BoardForm';
import ColumnModal from 'components/Column/ColumnModal';
import ColumnCard from 'components/Column/ColumnCard';
import IColumnCard from 'interfaces/IColumnCard';
import { IColumn } from 'interfaces/IBoard';
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from 'store/services/boardAPI';

export default function BoardPage() {
  const { id } = useParams();
  const boardId = id ? id : '';
  const { data } = useGetBoardByIdQuery(boardId);
  const userId = localStorage.getItem('userId');

  const [updateTask] = useUpdateTaskMutation();

  const [descriptionActive, setDescriptionActive] = useState(false);
  const [changeActive, setChangeActive] = useState(false);
  const [addActive, setAddActive] = useState(false);

  const [columns, setColumns] = useState<IColumn[]>([]);

  useEffect(() => {
    data && setColumns(data.columns);
  }, [data]);

  const intl = useIntl();
  const ru = {
    description: intl.formatMessage({ id: `${'board_description'}` }),
    delete: intl.formatMessage({ id: `${'yes'}` }),
    change: intl.formatMessage({ id: `${'change'}` }),
    addColumn: intl.formatMessage({ id: `${'add_list'}` }),
  };
  const theme = ru;

  function onDragStart() {}
  function onDragUpdate() {}
  async function onDragEnd(result: DropResult) {
    if (data) {
      const { destination, source, draggableId, type } = result;

      if (!destination) return;
      if (destination.droppableId === source.droppableId && destination.index === source.index) {
        return;
      }

      if (type === 'tasks') {
        const startColumn = columns.find((column) => column.id === source.droppableId);
        const finishColumn = columns.find((column) => column.id === destination.droppableId);
        const currTask = startColumn!.tasks.find((task) => task.id === draggableId);

        if (startColumn?.id === finishColumn?.id) {
          const newTasks = Array.from(startColumn!.tasks).sort((a, b) => a.order - b.order);

          const [task] = newTasks.splice(source.index, 1);
          newTasks.splice(destination.index, 0, task);

          const newColumn = {
            ...startColumn,
            tasks: newTasks.map((task, index) => ({
              ...task,
              order: index + 1,
            })),
          };

          const newColumns = Array.from(columns);

          newColumns.splice(
            columns.findIndex((column) => column.id === startColumn!.id),
            1,
            newColumn as IColumn
          );

          setColumns(newColumns);
        } else {
          const newTasksStart = Array.from(startColumn!.tasks).sort((a, b) => a.order - b.order);
          const newTasksEnd = Array.from(finishColumn!.tasks).sort((a, b) => a.order - b.order);

          const [task] = newTasksStart.splice(source.index, 1);
          newTasksEnd.splice(destination.index, 0, task);

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

        currTask &&
          (await updateTask({
            idTask: currTask.id,
            idColumn: startColumn!.id,
            body: {
              title: currTask.title,
              order: destination.index + 1,
              description: currTask.description,
              userId: userId ? userId : '',
              boardId,
              columnId: finishColumn!.id,
            },
          }));
      }
    }
  }

  return (
    <Layout>
      {data && (
        <section
          className="board-container"
          onClick={() => {
            if (descriptionActive) setDescriptionActive(false);
          }}
        >
          <h2>{data.title}</h2>
          <h3>{data.description}</h3>
          <Button onClick={() => setDescriptionActive(true)}>{theme.description}</Button>
          <Button onClick={() => setChangeActive(true)}>{theme.change}</Button>
          <Button>{theme.delete}</Button>
          <Button onClick={() => setAddActive(true)}>{theme.addColumn}</Button>
          {descriptionActive && (
            <BoardDescription title={data.title} description={data.description} />
          )}
          {changeActive && <BoardForm id={boardId} onClick={() => setChangeActive(false)} />}
          {addActive && <ColumnModal idBoard={boardId} onClick={() => setAddActive(false)} />}

          <DragDropContext
            onDragStart={onDragStart}
            onDragUpdate={onDragUpdate}
            onDragEnd={onDragEnd}
          >
            <Droppable droppableId="board" direction="horizontal" type="column">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 20,
                    overflowX: 'auto',
                    alignItems: 'flex-start',
                    marginBottom: 4,
                  }}
                >
                  {columns &&
                    [...columns]
                      .sort((a, b) => a.order - b.order)
                      .map((column: IColumnCard) => <ColumnCard key={column.id} data={column} />)}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </section>
      )}
    </Layout>
  );
}
