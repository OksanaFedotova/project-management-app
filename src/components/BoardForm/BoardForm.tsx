import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Box, TextField } from '@mui/material';
import { useCreateBoardMutation, useUpdateBoardMutation } from 'store/services/boardAPI';
import FormInputs from 'interfaces/IFormBoards';
import { useIntl } from 'react-intl';

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
    <div className="boards-form">
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        sx={{
          width: 350,
          display: 'flex',
          flexDirection: 'column',
          '& .MuiTextField-root': { m: 1 },
          backgroundColor: '#ffffff',
        }}
        autoComplete="off"
      >
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
        {id && <Button type="submit">{theme.change}</Button>}
        {!id && <Button type="submit">{theme.add}</Button>}
        <Button onClick={onClick}>{theme.close}</Button>
      </Box>
    </div>
  );
}
