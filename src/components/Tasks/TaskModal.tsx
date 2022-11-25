import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useCreateTaskMutation, useUpdateTaskMutation } from 'store/services/taskAPI';
import { ITaskResponse, TTaskRequest } from 'interfaces/IBoard';
import { ErrorAuth } from 'interfaces/IUser';
import { Button, Box, TextField } from '@mui/material';

export default function TaskModal({
  columnId,
  boardId,
  onClick,
  isCreate,
  task,
}: {
  columnId: string;
  boardId: string;
  onClick: () => void;
  isCreate: boolean;
  task?: ITaskResponse;
}) {
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const userId = localStorage.getItem('userId') ?? '';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string; description: string }>({ mode: 'onSubmit' });

  const onSubmit = ({ title, description }: Omit<TTaskRequest, 'userId'>) => {
    if (isCreate) {
      createHandler({ title, description });
    } else {
      updateHandler({ title, description });
    }
  };

  const createHandler = async ({ title, description }: Omit<TTaskRequest, 'userId'>) => {
    try {
      await createTask({ columnId, boardId, body: { title, description, userId } });
      toast.success('Task created!');
    } catch (e) {
      const err = e as ErrorAuth;
      toast.error(err.data.message);
    }
    onClick();
  };

  const updateHandler = async ({ title, description }: Omit<TTaskRequest, 'userId'>) => {
    const idTask = task ? task.id : '';
    const body = {
      title,
      description,
      userId: task ? task.userId : '',
      order: task ? task.order : 0,
      boardId,
      columnId,
    };
    try {
      await updateTask({ idTask, body });
      toast.success('Task updated!');
    } catch (e) {
      const err = e as ErrorAuth;
      toast.error(err.data.message);
    }
    onClick();
  };

  const ru = {
    title: 'Название',
    description: 'Описание',
    create: 'Создать',
    edit: 'Изменить',
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
        <Button type="submit">{isCreate ? theme.create : theme.edit}</Button>
        <Button onClick={onClick}>{theme.close}</Button>
      </Box>
    </div>
  );
}
