import React from 'react';
import { useForm } from 'react-hook-form';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { useUpdateUserMutation } from 'store/services/userAPI';
import { ErrorAuth, ISignupRequest } from 'interfaces/IUser';
import { setUpdatedUser } from 'store/reducers/AuthSlice';
import { useAppDispatch } from 'hooks/redux';
import { toast } from 'react-toastify';

export default function EditProfile() {
  const [update, { isLoading }] = useUpdateUserMutation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISignupRequest>({ mode: 'onChange' });

  const onSubmit = async (data: ISignupRequest) => {
    const userId = localStorage.getItem('userId');
    try {
      const userUpdate = await update({ id: userId, user: data }).unwrap();
      dispatch(setUpdatedUser(userUpdate));
      localStorage.setItem('userId', userUpdate.id);
      toast.success('Your profile updated');
    } catch (e) {
      console.log(e);
      const err = e as ErrorAuth;
      toast.error(err.data.message);
    }
    reset();
  };

  const deleteProfile = () => {};

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 0,
          paddingTop: 16,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {isLoading ? (
          <h2 style={{ color: '#000000' }}>Тут будет анимация загрузки с оверлеем</h2>
        ) : (
          <>
            <Typography component="h1" variant="h5">
              Редактирование профиля
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label={errors.name ? errors.name.message : 'Имя'}
                type="text"
                error={!!errors.name}
                autoComplete="on"
                {...register('name', {
                  required: {
                    value: true,
                    message: 'Имя обязательно',
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: 'Имя должно состоять из латинских букв',
                  },
                })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="login"
                label={errors.login ? errors.login.message : 'Логин'}
                type="text"
                error={!!errors.login}
                autoComplete="on"
                {...register('login', {
                  required: {
                    value: true,
                    message: 'Логин обязателен',
                  },
                  minLength: {
                    value: 4,
                    message: 'Минимум 4 символа',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Максимум 20 символов',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9]+$/i,
                    message: 'Логин из латинских букв или цифр',
                  },
                })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label={errors.password ? errors.password.message : 'Пароль'}
                type="password"
                error={!!errors.password}
                autoComplete="on"
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Пароль обязателен',
                  },
                  minLength: {
                    value: 6,
                    message: 'Минимум 6 символов',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Максимум 20 символов',
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/i,
                    message: 'Пароль из латинских букв и цифр',
                  },
                })}
              />
              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{ mt: 3, mb: 2, mr: 4, ml: 2 }}
              >
                Редактировать
              </Button>
              <Button
                onClick={deleteProfile}
                variant="outlined"
                color="error"
                sx={{ mt: 3, mb: 2, mr: 2 }}
              >
                Удалить профиль
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}
