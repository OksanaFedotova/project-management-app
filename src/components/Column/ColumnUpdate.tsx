import React, { useState } from 'react';
import { useUpdateColumnMutation } from 'store/services/boardAPI';
import { Button, Input } from '@mui/material';
import { Done } from '@mui/icons-material';
import { Id, toast } from 'react-toastify';
import { useIntl } from 'react-intl';
import { IColumn } from 'interfaces/IBoard';
import { ErrorAuth } from 'interfaces/IUser';

export default function ColumnUpdate({
  columnData,
  onClick,
}: {
  columnData: IColumn;
  onClick: () => void;
}) {
  const intl = useIntl();
  const theme = {
    success: intl.formatMessage({ id: `${'column_update_notification'}` }),
    maxLength: intl.formatMessage({ id: `${'login_max_length'}` }),
  };
  const { boardId, id, order, title } = columnData;
  const [updateColumn, { isError, error }] = useUpdateColumnMutation();
  const [inputValue, setValue] = useState('');
  const [isCorrect, setIsCorrect] = useState(true);
  const borderBottom = isCorrect ? 'none' : 'solid 1px red';
  const toastId = React.useRef<Id>('');

  if (isError) {
    const e = error as ErrorAuth;
    toast.error(e.data.message, {
      toastId: 'Board',
    });
  }

  const handleUpdateColumn = async (
    e:
      | React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (
      (e as React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>).code === 'Enter' ||
      e.type === 'click'
    ) {
      if (inputValue.length >= 25) {
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.info(theme.maxLength, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        setIsCorrect(false);
      } else {
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
        } catch (e) {
          const err = e as ErrorAuth;
          toast.error(err.data.message);
        }
        onClick();
        setIsCorrect(true);
      }
    }
  };
  return (
    <>
      <Input
        style={{ borderBottom: `${borderBottom}` }}
        defaultValue={title}
        onKeyDown={(e) => handleUpdateColumn(e)}
        onChange={(e) => setValue((e.target as HTMLInputElement).value)}
      />
      <Button sx={{ mb: 1.5 }} startIcon={<Done />} onClick={(e) => handleUpdateColumn(e)} />
    </>
  );
}
