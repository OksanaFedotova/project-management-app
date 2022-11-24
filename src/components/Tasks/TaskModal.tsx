import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Box, TextField } from '@mui/material';
import { useCreateColumnMutation } from 'store/services/columnsAPI';
import { TTaskRequest } from 'interfaces/IBoard';
import { useCreateTaskMutation } from 'store/services/taskAPI';

export default function TaskModal({
  columnId,
  boardId,
  onClick,
}: {
  columnId: string;
  boardId: string;
  onClick: () => void;
}) {
  const [createTask] = useCreateTaskMutation();
  const userId = localStorage.getItem('userId') ?? '';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string; description: string }>({ mode: 'onSubmit' });

  const onSubmit = ({ title, description }: Omit<TTaskRequest, 'userId'>) => {
    createTask({ columnId, boardId, body: { title, description, userId } });
    onClick();
  };

  const ru = {
    title: 'Название',
    description: 'Описание',
    create: 'Создать',
    close: 'Закрыть',
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
          label={errors.title ? errors.title.message : theme.title}
          error={!!errors.title}
        />
        <TextField
          {...register('description', { required: true })}
          label={errors.description ? errors.description.message : theme.description}
          error={!!errors.description}
        />
        <Button type="submit">{theme.create}</Button>
        <Button onClick={onClick}>{theme.close}</Button>
      </Box>
    </div>
  );
}
