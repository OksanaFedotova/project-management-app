import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Box, TextField, Backdrop, CircularProgress } from '@mui/material';
import { useCreateColumnMutation } from 'store/services/columnsAPI';
import { useIntl } from 'react-intl';

export default function ColumnModal({
  idBoard,
  onClick,
}: {
  idBoard: string;
  onClick: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string }>({ mode: 'onSubmit' });

  const [createColumn, { isLoading: isLoadingNewColumn }] = useCreateColumnMutation();
  const onSubmit = async ({ title }: { title: string }) => {
    const body = { title: title };
    await createColumn({ idBoard, body }).catch((e) => console.error(e));
    onClick();
  };
  const intl = useIntl();
  const ru = {
    label: intl.formatMessage({ id: `${'board_label'}` }),
    title: intl.formatMessage({ id: `${'board_title'}` }),
    change: intl.formatMessage({ id: `${'add'}` }),
    close: intl.formatMessage({ id: `${'close'}` }),
  };
  const theme = ru;
  return (
    <>
      {isLoadingNewColumn && (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
          <CircularProgress color="inherit" size={60} />
        </Backdrop>
      )}
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
    </>
  );
}
