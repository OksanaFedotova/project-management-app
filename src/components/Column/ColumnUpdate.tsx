import React, { useState } from 'react';
import { useUpdateColumnMutation } from 'store/services/columnsAPI';
import { Button, Input } from '@mui/material';
import { Done } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';

export default function ColumnUpdate({
  columnData,
  onClick,
}: {
  columnData: IColumn;
  onClick: () => void;
}) {
  const intl = useIntl();
  const theme = {
    succes: intl.formatMessage({ id: `${'column_update_notification'}` }),
  };
  const { boardId, id, order, title } = columnData;
  const [updateColumn] = useUpdateColumnMutation();
  const [inputValue, setValue] = useState('');
  const handleUpdateColumn = async (
    e:
      | React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (
      (e as React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>).code === 'Enter' ||
      e.type === 'click'
    ) {
      const req = {
        idBoard: boardId as string,
        idColumn: id,
        body: {
          order: order,
          title: inputValue,
        },
      };
      try {
        await updateColumn(req);
        toast(theme.succes);
      } catch (e) {
        console.error(e);
      }
      onClick();
    }
  };
  return (
    <>
      <Input
        defaultValue={title}
        onKeyDown={(e) => handleUpdateColumn(e)}
        onChange={(e) => setValue((e.target as HTMLInputElement).value)}
      />
      <Button sx={{ mb: 1.5 }} startIcon={<Done />} onClick={(e) => handleUpdateColumn(e)} />
    </>
  );
}
