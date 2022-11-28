import ModalDelete from 'components/ModalDelete';
import React from 'react';
import { useIntl } from 'react-intl';
import { useDeleteColumnMutation } from 'store/services/boardAPI';

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
  };
  const handleDelete = (type: string) => {
    if (type === theme.yes) {
      deleteColumn({ idBoard, idColumn }).catch((e) => console.error(e));
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
