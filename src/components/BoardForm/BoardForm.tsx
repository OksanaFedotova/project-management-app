import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Box, TextField, Typography } from '@mui/material';
import { useCreateBoardMutation, useUpdateBoardMutation } from 'store/services/boardAPI';
import FormInputs from 'interfaces/IFormBoards';
import './BoardForm.css';

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
  const ru = {
    label: 'Обязательно',
    title: 'Название',
    descripion: 'Описание',
    change: 'Изменить',
    add: 'Добавить',
    close: 'Закрыть',
  };
  const theme = ru;

  return (
    <div className="form-wrapper">
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
            p: 3,
            borderRadius: 3,
          }}
          autoComplete="off"
        >
          <Typography align="center" sx={{ pt: 1, pb: 2, textTransform: 'uppercase' }}>
            Создать доску
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
