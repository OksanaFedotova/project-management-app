import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useGetUserByIdQuery } from 'store/services/userAPI';
import { ITask } from 'interfaces/IBoard';
import { IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import FileLoader from './FileLoader';
import FileDownload from './FileDownload';

export default function Task({
  task,
  setTask,
  setAdd,
  setIsModal,
}: {
  task: ITask;
  setTask: (task: ITask) => void;
  setAdd: (bool: boolean) => void;
  setIsModal: (bool: boolean) => void;
}) {
  const { data } = useGetUserByIdQuery(task.userId);
  const name = data ? data.name : '';
  const intl = useIntl();
  const [addFile, setAddFile] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
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
          <Typography variant="subtitle2" sx={{ maxWidth: 200, overflowWrap: 'break-word' }}>
            {intl.formatMessage({ id: `${'owner'}` })}: {name}
          </Typography>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <IconButton
            onClick={() => {
              setAddFile(!addFile);
            }}
          >
            {addFile && <CloseIcon />}
            {!addFile && <AttachFileIcon />}
          </IconButton>
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
      {addFile && <FileLoader taskId={task.id} />}
      {task.files.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          {task.files.map(({ filename }) => (
            <FileDownload key={`${task.id}${filename}`} filename={filename} taskId={task.id} />
          ))}
        </div>
      )}
    </div>
  );
}
