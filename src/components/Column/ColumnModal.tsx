import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';
import { Button, Box, TextField } from '@mui/material';
import { useCreateColumnMutation } from 'store/services/boardAPI';

export default function ColumnModal({
  idBoard,
  onClick,
}: {
  idBoard: string;
  onClick: () => void;
}) {
  const intl = useIntl();
  const theme = {
    label: intl.formatMessage({ id: `${'board_label'}` }),
    title: intl.formatMessage({ id: `${'board_title'}` }),
    change: intl.formatMessage({ id: `${'change'}` }),
    close: intl.formatMessage({ id: `${'close'}` }),
    succes: intl.formatMessage({ id: `${'column_create_notification'}` }),
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string }>({ mode: 'onSubmit' });
  const [createColumn] = useCreateColumnMutation();
  const onSubmit = ({ title }: { title: string }) => {
    const body = { title: title };
    createColumn({ idBoard, body })
      .then(() => toast(theme.succes))
      .catch((e) => console.error(e));
    onClick();
  };
  return (
    <div className="form-wrapper">
      <div className="boards-form">
        <Box
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          sx={(theme) => ({
            width: 350,
            display: 'flex',
            flexDirection: 'column',
            '& .MuiTextField-root': { m: 1 },
            backgroundColor: '#ffffff',
            p: 3,
            borderRadius: 3,
            [theme.breakpoints.down('sm')]: {
              width: 300,
            },
          })}
          autoComplete="off"
        >
          <TextField
            {...register('title', { required: true })}
            id="outlined-required"
            label={theme.label}
            defaultValue={theme.title}
            error={!!errors.title}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              {theme.change}
            </Button>
            <Button variant="outlined" sx={{ mt: 2 }} onClick={onClick}>
              {theme.close}
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
}
