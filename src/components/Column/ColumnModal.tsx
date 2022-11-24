import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Box, TextField } from '@mui/material';
import { useCreateColumnMutation } from 'store/services/columnsAPI';

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

  const [createColumn] = useCreateColumnMutation();
  const onSubmit = ({ title }: { title: string }) => {
    const body = { title: title };
    createColumn({ idBoard, body }).catch((e) => console.error(e));
    onClick();
  };
  const ru = {
    label: 'Обязательно',
    title: 'Название',
    change: 'Изменить',
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
          id="outlined-required"
          label={theme.label}
          defaultValue={theme.title}
          error={!!errors.title}
        />
        <Button type="submit">{theme.change}</Button>
        <Button onClick={onClick}>{theme.close}</Button>
      </Box>
    </div>
  );
}
