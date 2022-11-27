import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import { useDeleteTaskMutation } from 'store/services/taskAPI';
import ModalDelete from 'components/ModalDelete';
import { ITaskResponse } from 'interfaces/IBoard';
import { ListItem } from '@mui/material';
import TaskModal from './TaskModal';
import Task from './Task';

export default function Tasks({ tasks, columnId }: { tasks: ITaskResponse[]; columnId: string }) {
  const [isModal, setIsModal] = useState(false);
  const [addActive, setAddActive] = useState(false);
  const [currTask, setCurrTask] = useState<ITaskResponse>();

  const [deleteTask] = useDeleteTaskMutation();

  const deleteHandler = async (type: string) => {
    if (currTask) {
      const { boardId, columnId, id } = currTask;
      if (type === 'Да') {
        await deleteTask({ boardId, columnId, idTask: id });
        toast.success('Task deleted!');
        setIsModal(false);
      } else {
        setIsModal(false);
      }
    }
  };

  return (
    <>
      {isModal && (
        <ModalDelete
          title="Вы действительно хотите удалить?"
          btnSubmit="Да"
          btnCancel="Нет"
          open={true}
          handleClick={deleteHandler}
        />
      )}
      {addActive && (
        <TaskModal
          columnId={currTask ? currTask.columnId : ''}
          boardId={currTask ? currTask.boardId : ''}
          isCreate={false}
          task={currTask}
          onClick={() => setAddActive(false)}
        />
      )}
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks &&
              [...tasks]
                .sort((a, b) => a.order - b.order)
                .map((item: ITaskResponse, index: number) => (
                  <Draggable draggableId={item.id} index={index} key={item.id}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <ListItem
                          sx={{
                            borderRadius: 2,
                            backgroundColor: '#FFFFFF',
                            marginBottom: 0.5,
                            padding: 1,
                            flexDirection: 'column',
                            alignItems: 'stretch',
                            cursor: 'grab',
                          }}
                          draggable={true}
                        >
                          <Task
                            task={item}
                            setTask={setCurrTask}
                            setAdd={setAddActive}
                            setIsModal={setIsModal}
                          />
                        </ListItem>
                      </div>
                    )}
                  </Draggable>
                ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
}
