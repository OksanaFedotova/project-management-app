import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDeleteTaskMutation, useUpdateTaskMutation } from 'store/services/taskAPI';
import ModalDelete from 'components/ModalDelete';
import { ITaskResponse } from 'interfaces/IBoard';
import { IconButton, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TaskModal from './TaskModal';

export default function Tasks({ tasks }: { tasks: ITaskResponse[] }) {
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
      {tasks &&
        tasks.map((item: ITaskResponse) => (
          <ListItem key={item.id} sx={{ border: 'solid 1px', marginBottom: 1 }}>
            <ListItemText primary={item.title} />
            <IconButton
              aria-label="edit"
              onClick={() => {
                setAddActive(true);
                setCurrTask(item);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => {
                setIsModal(true);
                setCurrTask(item);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
    </>
  );
}
