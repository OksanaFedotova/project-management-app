import React from 'react';
import { ITaskResponse } from 'interfaces/IBoard';
import { IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Task({
  task,
  setTask,
  setAdd,
  setIsModal,
}: {
  task: ITaskResponse;
  setTask: (task: ITaskResponse) => void;
  setAdd: (bool: boolean) => void;
  setIsModal: (bool: boolean) => void;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <Typography variant="subtitle1" sx={{ maxWidth: 200, overflowWrap: 'break-word' }}>
          {task.title}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ maxWidth: 200, overflowWrap: 'break-word', color: '#777777' }}
        >
          {task.description}
        </Typography>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <IconButton
          sx={{ padding: 0.5 }}
          aria-label="edit"
          onClick={() => {
            setAdd(true);
            setTask(task);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          sx={{ padding: 0.5 }}
          aria-label="delete"
          onClick={() => {
            setIsModal(true);
            setTask(task);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}
