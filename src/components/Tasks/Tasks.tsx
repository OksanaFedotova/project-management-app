import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';
import { useDeleteTaskMutation } from 'store/services/boardAPI';
import ModalDelete from 'components/ModalDelete';
import TaskModal from './TaskModal';
import Task from './Task';
import { ITask } from 'interfaces/IBoard';
import { ListItem } from '@mui/material';

export default function Tasks({ tasks, columnId }: { tasks: ITask[]; columnId: string }) {
  const { id } = useParams();
  const boardId = id ? id : '';
  const [isModal, setIsModal] = useState(false);
  const [addActive, setAddActive] = useState(false);
  const [currTask, setCurrTask] = useState<ITask>();

  const [deleteTask] = useDeleteTaskMutation();

  const deleteHandler = async (type: string) => {
    if (currTask) {
      const { id } = currTask;
      if (type === intl.formatMessage({ id: `${'yes'}` })) {
        await deleteTask({ boardId, columnId, idTask: id });
        toast.success('Task deleted!');
        setIsModal(false);
      } else {
        setIsModal(false);
      }
    }
  };
  const intl = useIntl();

  return (
    <>
      {isModal && (
        <ModalDelete
          title={intl.formatMessage({ id: `${'delete_confirm'}` })}
          btnSubmit={intl.formatMessage({ id: `${'yes'}` })}
          btnCancel={intl.formatMessage({ id: `${'no'}` })}
          open={true}
          handleClick={deleteHandler}
        />
      )}
      {addActive && (
        <TaskModal
          columnId={columnId}
          boardId={boardId}
          isCreate={false}
          task={currTask}
          onClick={() => setAddActive(false)}
        />
      )}
      <Droppable droppableId={columnId} type="tasks" direction="vertical">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} style={{ minHeight: '70px' }}>
            {tasks &&
              [...tasks]
                .sort((a, b) => a.order - b.order)
                .map((item: ITask, index: number) => (
                  <Draggable draggableId={item.id} index={index} key={item.id}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <ListItem
                          sx={{
                            borderRadius: 2,
                            backgroundColor: snapshot.isDragging ? '#d1e6fa' : '#FFFFFF',
                            transition: 'background-color .3 s ease',
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
