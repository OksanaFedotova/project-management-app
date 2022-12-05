import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Box, TextField, Backdrop, CircularProgress } from '@mui/material';
import { useCreateColumnMutation } from 'store/services/boardAPI';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { ErrorAuth } from 'interfaces/IUser';

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
    close: intl.formatMessage({ id: `${'close'}` }),
    succes: intl.formatMessage({ id: `${'column_create_notification'}` }),
    add: intl.formatMessage({ id: `${'add'}` }),
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string }>({ mode: 'onChange' });

  const [createColumn, { isLoading, isError, error }] = useCreateColumnMutation();
  const [isDisable, setIsDisable] = useState(false);

  if (isError) {
    const e = error as ErrorAuth;
    toast.error(e.data.message, {
      toastId: 'Board',
    });
  }

  const onSubmit = async ({ title }: { title: string }) => {
    setIsDisable(true);
    const body = { title: title };
    await createColumn({ idBoard, body });
    onClick();
    setIsDisable(false);
  };

  return (
    <>
      {isLoading && (
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
              {...register('title', {
                required: {
                  value: true,
                  message: intl.formatMessage({ id: `${'title_required'}` }),
                },
                minLength: {
                  value: 1,
                  message: intl.formatMessage({ id: `${'task_min_length'}` }),
                },
                maxLength: {
                  value: 25,
                  message: intl.formatMessage({ id: `${'login_max_length'}` }),
                },
                pattern: {
                  value: /(?=.*\S)/,
                  message: intl.formatMessage({ id: `${'text_pattern'}` }),
                },
              })}
              id="outlined-required"
              label={errors.title ? errors.title.message : theme.title}
              error={!!errors.title}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <Button type="submit" variant="contained" sx={{ mt: 2 }} disabled={isDisable}>
                {theme.add}
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
