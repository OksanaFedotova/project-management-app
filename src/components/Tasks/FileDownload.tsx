import React from 'react';
import { useDownloadFileQuery } from 'store/services/boardAPI';
import { IconButton } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
export default function FileDownload({
  files,
  taskId,
}: {
  files: { filename: string }[];
  taskId: string;
}) {
  const filename = files[0].filename;
  const { data } = useDownloadFileQuery({ taskId: taskId, filename: filename });
  return (
    <IconButton onClick={() => console.log(data)}>
      <FileDownloadIcon />
    </IconButton>
  );
}
