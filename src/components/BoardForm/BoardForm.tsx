import React from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useCreateBoardMutation, useUpdateBoardMutation } from 'store/services/boardAPI';

type FormInputs = {
  title: string;
  description: string;
};

export default function BoardForm({ id, onClick }: { id?: string; onClick: () => void }) {
  const { register, handleSubmit } = useForm<FormInputs>({ mode: 'onSubmit' });
  const [updateBoard] = useUpdateBoardMutation();
  const [createBoard] = useCreateBoardMutation();

  const onSubmit = ({ title, description }: FormInputs) => {
    id
      ? updateBoard({ title, description, id }).catch((e) => console.error(e))
      : createBoard({ title, description }).catch((e) => console.error(e));
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
    <Box
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      sx={{
        width: 350,
        display: 'flex',
        flexDirection: 'column',
        '& .MuiTextField-root': { m: 1 },
      }}
      autoComplete="off"
    >
      <TextField
        {...register('title', { required: 'Введите название' })}
        required
        id="outlined-required"
        label={theme.label}
        defaultValue={theme.title}
      />
      <TextField
        {...register('description', { required: 'Введите описание' })}
        required
        id="outlined-required"
        label={theme.label}
        defaultValue={theme.descripion}
        multiline
      />
      {id && <Button type="submit">{theme.change}</Button>}
      {!id && <Button type="submit">{theme.add}</Button>}
      <Button onClick={onClick}>{theme.close}</Button>
    </Box>
  );
}
