import ModalDelete from 'components/ModalDelete';
import React from 'react';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';
import { useDeleteColumnMutation } from 'store/services/columnsAPI';

export default function ModalDeleteColumns({
  idBoard,
  idColumn,
  onClick,
}: {
  idBoard: string;
  idColumn: string;
  onClick: () => void;
}) {
  const [deleteColumn] = useDeleteColumnMutation();
  const intl = useIntl();
  const theme = {
    title: intl.formatMessage({ id: `${'delete_confirm'}` }),
    yes: intl.formatMessage({ id: `${'yes'}` }),
    no: intl.formatMessage({ id: `${'no'}` }),
    succes: intl.formatMessage({ id: `${'column_delete_notification'}` }),
  };
  const handleDelete = (type: string) => {
    if (type === theme.yes) {
      deleteColumn({ idBoard, idColumn })
        .then(() => toast(theme.succes))
        .catch((e) => console.error(e));
    }
    onClick();
  };
  return (
    <ModalDelete
      title={theme.title}
      btnSubmit={theme.yes}
      btnCancel={theme.no}
      handleClick={handleDelete}
      open={true}
    />
  );
}
