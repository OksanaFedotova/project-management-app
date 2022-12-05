import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Box, TextField, Typography, Backdrop, CircularProgress } from '@mui/material';
import { useCreateBoardMutation, useUpdateBoardMutation } from 'store/services/boardAPI';
import FormInputs from 'interfaces/IFormBoards';
import './BoardForm.css';
import { FormattedMessage, useIntl } from 'react-intl';
import { ErrorAuth } from 'interfaces/IUser';
import { toast } from 'react-toastify';

export default function BoardForm({
  id,
  onClick,
  title,
  description,
}: {
  description?: string;
  id?: string;
  onClick: () => void;
  title?: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ mode: 'onChange' });

  const [updateBoard, { isLoading: isLoadingUpdate, isError, error }] = useUpdateBoardMutation();
  const [createBoard, { isLoading: isLoadingUCreate, isError: isErr, error: err }] =
    useCreateBoardMutation();

  if (isError || isErr) {
    let e;
    if (err) {
      e = err as ErrorAuth;
    } else {
      e = error as ErrorAuth;
    }
    toast.error(e.data.message, {
      toastId: 'Board',
    });
  }

  const onSubmit = async ({ title, description }: FormInputs) => {
    try {
      if (id) {
        await updateBoard({ title, description, id });
      } else {
        await createBoard({ title, description });
      }
    } catch (e) {
      const err = e as ErrorAuth;
      toast.error(err.data.message);
    }
    onClick();
  };
  const intl = useIntl();
  const ru = {
    label: intl.formatMessage({ id: `${'board_label'}` }),
    title: intl.formatMessage({ id: `${'board_title'}` }),
    descripion: intl.formatMessage({ id: `${'board_description'}` }),
    change: intl.formatMessage({ id: `${'change'}` }),
    add: intl.formatMessage({ id: `${'add'}` }),
    close: intl.formatMessage({ id: `${'close'}` }),
  };
  const theme = ru;

  return (
    <>
      {(isLoadingUpdate || isLoadingUCreate) && (
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
            <Typography align="center" sx={{ pt: 1, pb: 2, textTransform: 'uppercase' }}>
              <FormattedMessage id="board" />
            </Typography>
            <TextField
              id="outlined-required"
              label={errors.title ? errors.title.message : theme.title}
              multiline
              error={!!errors.title}
              defaultValue={title}
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
            />
            <TextField
              id="outlined-required"
              label={errors.description ? errors.description.message : theme.descripion}
              multiline
              error={!!errors.description}
              defaultValue={description}
              {...register('description', {
                required: {
                  value: true,
                  message: intl.formatMessage({ id: `${'title_required'}` }),
                },
                minLength: {
                  value: 1,
                  message: intl.formatMessage({ id: `${'task_min_length'}` }),
                },
                maxLength: {
                  value: 100,
                  message: intl.formatMessage({ id: `${'description_max_length'}` }),
                },
                pattern: {
                  value: /(?=.*\S)/,
                  message: intl.formatMessage({ id: `${'text_pattern'}` }),
                },
              })}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              {id && (
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                  {theme.change}
                </Button>
              )}
              {!id && (
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                  {theme.add}
                </Button>
              )}
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
