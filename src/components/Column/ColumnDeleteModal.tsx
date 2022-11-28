import ModalDelete from 'components/ModalDelete';
import React from 'react';
import { useIntl } from 'react-intl';
import { useDeleteColumnMutation } from 'store/services/columnsAPI';
import { Backdrop, CircularProgress } from '@mui/material';

export default function ModalDeleteColumns({
  idBoard,
  idColumn,
  onClick,
}: {
  idBoard: string;
  idColumn: string;
  onClick: () => void;
}) {
  const [deleteColumn, { isLoading: isLoadingDeleteColumn }] = useDeleteColumnMutation();
  const intl = useIntl();
  const theme = {
    title: intl.formatMessage({ id: `${'delete_confirm'}` }),
    yes: intl.formatMessage({ id: `${'yes'}` }),
    no: intl.formatMessage({ id: `${'no'}` }),
  };
  const handleDelete = async (type: string) => {
    if (type === theme.yes) {
      await deleteColumn({ idBoard, idColumn }).catch((e) => console.error(e));
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
