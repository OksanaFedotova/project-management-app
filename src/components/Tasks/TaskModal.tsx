import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useCreateTaskMutation, useUpdateTaskMutation } from 'store/services/boardAPI';
import { ITask, TTaskRequest } from 'interfaces/IBoard';
import { ErrorAuth } from 'interfaces/IUser';
import { Button, Box, TextField, Backdrop } from '@mui/material';
import { useIntl } from 'react-intl';

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
  task?: ITask;
}) {
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const userId = localStorage.getItem('userId') ?? '';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string; description: string }>({ mode: 'onChange' });

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
      await updateTask({ idTask, idColumn: columnId, body });
      toast.success('Task updated!');
    } catch (e) {
      const err = e as ErrorAuth;
      toast.error(err.data.message);
    }
    onClick();
  };
  const intl = useIntl();
  const ru = {
    title: intl.formatMessage({ id: `${'board_title'}` }),
    description: intl.formatMessage({ id: `${'board_description'}` }),
    create: intl.formatMessage({ id: `${'create'}` }),
    edit: 'Изменить',
    close: intl.formatMessage({ id: `${'close'}` }),
  };
  const theme = ru;
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        sx={{
          width: 350,
          display: 'flex',
          flexDirection: 'column',
          '& .MuiTextField-root': { m: 1 },
          backgroundColor: '#ffffff',
          borderRadius: 2,
          padding: 2,
        }}
        autoComplete="off"
      >
        <TextField
          label={errors.title ? errors.title.message : theme.title}
          error={!!errors.title}
          {...register('title', {
            required: {
              value: true,
              message: 'Название обязательно',
            },
            maxLength: {
              value: 50,
              message: 'Максимум 50 символов',
            },
          })}
        />
        <TextField
          label={errors.description ? errors.description.message : theme.description}
          error={!!errors.description}
          {...register('description', {
            required: {
              value: true,
              message: 'Описание обязательно',
            },
            maxLength: {
              value: 100,
              message: 'Максимум 100 символов',
            },
          })}
        />
        <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: 3 }}>
          <Button type="submit" variant="contained">
            {isCreate ? theme.create : theme.edit}
          </Button>
          <Button variant="outlined" onClick={onClick}>
            {theme.close}
          </Button>
        </div>
      </Box>
    </Backdrop>
  );
}
