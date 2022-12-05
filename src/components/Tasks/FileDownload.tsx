import React, { useRef, useState } from 'react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { URL as url } from 'configs/constants';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function FileDownload({ filename, taskId }: { filename: string; taskId: string }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  if (!token) navigate('./');

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
        <>
          <a id="download" download={filename} ref={linkRef} onClick={() => setActiveLink(false)}>
            {filename}
          </a>
        </>
      )}
    </div>
  );
}
