import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
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
import { useGetAllColumnsQuery } from 'store/services/columnsAPI';
import { IColumn, ITask } from 'interfaces/IBoard';
import { useUpdateTaskMutation } from 'store/services/taskAPI';

export default function BoardPage() {
  const { id } = useParams();
  const boardId = id ? id : '';
  const { data } = useGetBoardByIdQuery(boardId);

  const [updateTask] = useUpdateTaskMutation();

  const [descriptionActive, setDescriptionActive] = useState(false);
  const [changeActive, setChangeActive] = useState(false);
  const [addActive, setAddActive] = useState(false);

  const [columns, setColumns] = useState<IColumnCard[]>();
  const [tasks, setTasks] = useState<IColumnCard>();
  const [finishColumnId, setFinishColumnId] = useState<string>();

  useEffect(() => {
    if (data) {
      setColumns(data.columns);
    }
  }, []);

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
      const columns = data.columns;
      const { destination, source, draggableId } = result;
      setFinishColumnId(destination?.droppableId);

      if (!destination) return;
      if (destination.droppableId === source.droppableId && destination.index === source.index) {
        return;
      }
      const startColumn = columns.find((column: IColumnCard) => column.id === source.droppableId);
      const finishColumn = columns.find(
        (column: IColumnCard) => column.id === destination.droppableId
      );
      const newTaskIds: ITask[] = Array.from(startColumn.tasks);
      const currTask = newTaskIds.find((task) => task.id === draggableId);
      newTaskIds.splice(source.index, 1);
      currTask && newTaskIds.splice(destination.index, 0, currTask);
      const newColumn = {
        id: finishColumn.id,
        order: finishColumn.order,
        title: finishColumn.title,
        tasks: newTaskIds,
      };
      setTasks(newColumn);
      const filteredColumns = columns.filter((column: IColumnCard) => column.id !== newColumn.id);
      setColumns([...filteredColumns, newColumn]);
      if (currTask) {
        const newData = {
          idTask: draggableId,
          body: {
            title: currTask.title,
            order: ++destination.index,
            description: currTask.description,
            userId: currTask.userId,
            boardId,
            columnId: destination.droppableId,
          },
        };
        return await updateTask(newData);
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 20,
              overflowX: 'auto',
              alignItems: 'flex-start',
              marginBottom: 4,
            }}
          >
            <DragDropContext
              onDragStart={onDragStart}
              onDragUpdate={onDragUpdate}
              onDragEnd={onDragEnd}
            >
              {columns &&
                [...columns]
                  .sort((a, b) => a.order - b.order)
                  .map((column: IColumnCard) => (
                    <ColumnCard
                      key={column.id}
                      data={column.id === finishColumnId ? (tasks ? tasks : column) : column}
                    />
                  ))}
            </DragDropContext>
          </div>
        </section>
      )}
    </Layout>
  );
}
