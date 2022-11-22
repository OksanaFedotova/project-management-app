import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Box, TextField } from '@mui/material';
import { useCreateColumnMutation } from 'store/services/columnsAPI';

export default function ColumnModal({
  id,
  onClick,
}: {
  id: string | undefined;
  onClick: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string }>({ mode: 'onSubmit' });
  const onSubmit = ({ title }: { title: string }) => {
    onClick();
  };
  const [createColumn] = useCreateColumnMutation();
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
