import ModalDelete from 'components/ModalDelete';
import React from 'react';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';
import { useDeleteColumnMutation } from 'store/services/boardAPI';
import { Backdrop, CircularProgress } from '@mui/material';
import { ErrorAuth } from 'interfaces/IUser';

export default function ModalDeleteColumns({
  idBoard,
  idColumn,
  onClick,
}: {
  idBoard: string;
  idColumn: string;
  onClick: () => void;
}) {
  const [deleteColumn, { isLoading: isLoadingDeleteColumn, error }] = useDeleteColumnMutation();
  const intl = useIntl();
  const theme = {
    title: intl.formatMessage({ id: `${'delete_confirm'}` }),
    yes: intl.formatMessage({ id: `${'yes'}` }),
    no: intl.formatMessage({ id: `${'no'}` }),
    succes: intl.formatMessage({ id: `${'column_delete_notification'}` }),
  };

  if (error) {
    const e = error as ErrorAuth;
    toast.error(e.data.message, {
      toastId: 'Board',
    });
  }

  const handleDelete = async (type: string) => {
    if (type === theme.yes) {
      await deleteColumn({ idBoard, idColumn });
    }
    onClick();
  };

  return (
    <>
      <ModalDelete
        title={theme.title}
        btnSubmit={theme.yes}
        btnCancel={theme.no}
        handleClick={handleDelete}
        open={true}
      />
      {isLoadingDeleteColumn && (
        <Backdrop sx={{ color: '#fff', zIndex: 1500 }} open={true}>
          <CircularProgress color="inherit" size={60} />
        </Backdrop>
      )}
    </>
  );
}
