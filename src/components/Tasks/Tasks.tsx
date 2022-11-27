import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDeleteTaskMutation } from 'store/services/taskAPI';
import ModalDelete from 'components/ModalDelete';
import { ITaskResponse } from 'interfaces/IBoard';
import { IconButton, ListItem, ListItemText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TaskModal from './TaskModal';
import { useIntl } from 'react-intl';

export default function Tasks({ tasks }: { tasks: ITaskResponse[] }) {
  const [isModal, setIsModal] = useState(false);
  const [addActive, setAddActive] = useState(false);
  const [currTask, setCurrTask] = useState<ITaskResponse>();

  const [deleteTask] = useDeleteTaskMutation();

  const deleteHandler = async (type: string) => {
    if (currTask) {
      const { boardId, columnId, id } = currTask;
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
          columnId={currTask ? currTask.columnId : ''}
          boardId={currTask ? currTask.boardId : ''}
          isCreate={false}
          task={currTask}
          onClick={() => setAddActive(false)}
        />
      )}
      <div style={{ overflow: 'hidden auto' }}>
        {tasks &&
          tasks.map((item: ITaskResponse) => (
            <ListItem
              key={item.id}
              sx={{
                borderRadius: 2,
                backgroundColor: '#FFFFFF',
                marginBottom: 0.5,
                padding: 1,
                display: 'flex',
                justifyContent: 'space-between',
                cursor: 'grab',
              }}
            >
              <div>
                <Typography variant="subtitle1" sx={{ maxWidth: 200, overflowWrap: 'break-word' }}>
                  {item.title}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ maxWidth: 200, overflowWrap: 'break-word', color: '#777777' }}
                >
                  {item.description}
                </Typography>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <IconButton
                  sx={{ padding: 0.5 }}
                  aria-label="edit"
                  onClick={() => {
                    setAddActive(true);
                    setCurrTask(item);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  sx={{ padding: 0.5 }}
                  aria-label="delete"
                  onClick={() => {
                    setIsModal(true);
                    setCurrTask(item);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </ListItem>
          ))}
      </div>
    </>
  );
}
