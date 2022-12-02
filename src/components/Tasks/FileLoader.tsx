import { Box, Paper } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useUploadFileMutation } from 'store/services/boardAPI';

export default function FileUploader({ taskId }: { taskId: string }) {
  const intl = useIntl();
  const theme = {
    drag: intl.formatMessage({ id: `${'file_drag'}` }),
    drop: intl.formatMessage({ id: `${'file_safe'}` }),
  };
  const [drag, setDrag] = useState(false);
  const [uploadFile] = useUploadFileMutation();
  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(true);
  };
  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
  };
  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    [...e.dataTransfer.files].forEach((file) => {
      const data = new FormData();
      data.append('taskId', taskId);
      data.append('file', file);
      uploadFile(data);
    });
    setDrag(false);
  };
  return (
    <Box>
      <Paper
        sx={{
          m: 1,
          width: 286,
          height: 128,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        variant="outlined"
        onDragLeave={(e) => dragEndHandler(e)}
        onDragOver={(e) => dragStartHandler(e)}
        onDrop={(e) => onDropHandler(e)}
      >
        {drag ? <div>{theme.drop}</div> : <div>{theme.drag}</div>}
      </Paper>
    </Box>
  );
}
