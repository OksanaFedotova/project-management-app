import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Box, TextField, Typography } from '@mui/material';
import { useCreateBoardMutation, useUpdateBoardMutation } from 'store/services/boardAPI';
import FormInputs from 'interfaces/IFormBoards';
import './BoardForm.css';
import { FormattedMessage, useIntl } from 'react-intl';
import { IBoard } from 'interfaces/IBoard';

export default function BoardForm({ id, onClick }: { id?: string; onClick: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ mode: 'onSubmit' });
  const [updateBoard] = useUpdateBoardMutation();
  const [createBoard] = useCreateBoardMutation();

  const onSubmit = ({ title, description }: FormInputs) => {
    id
      ? updateBoard({ title, description, id }).catch((e) => console.error(e))
      : createBoard({ title, description }).catch((e) => console.error(e));
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
            {...register('title', { required: true })}
            id="outlined-required"
            label={theme.label}
            defaultValue={theme.title}
            error={!!errors.title}
          />
          <TextField
            {...register('description', { required: true })}
            id="outlined-required"
            label={theme.label}
            defaultValue={theme.descripion}
            multiline
            error={!!errors.description}
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
  );
}
