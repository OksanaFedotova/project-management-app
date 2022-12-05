import React, { useRef, useState } from 'react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { URL as url } from 'configs/constants';
import { toast } from 'react-toastify';

export default function FileDownload({ filename, taskId }: { filename: string; taskId: string }) {
  const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
  const [activeLink, setActiveLink] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const onClick = async () => {
    try {
      const response = await fetch(`${url}file/${taskId}/${filename}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/octet-stream',
        },
      });
      setActiveLink(true);
      const blob = await response.blob();
      const linkUrl = URL.createObjectURL(blob);
      linkRef.current!.href = linkUrl;
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  };

  return (
    <div style={{ margin: 5, cursor: 'pointer' }}>
      {!activeLink && <FileDownloadIcon onClick={onClick} />}
      {activeLink && (
        <a id="download" download="file" ref={linkRef} onClick={() => setActiveLink(false)}>
          {filename}
        </a>
      )}
    </div>
  );
}
