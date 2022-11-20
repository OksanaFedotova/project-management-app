import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'hooks/redux';
import { setToken, setUser } from 'store/reducers/AuthSlice';
import { useSigninMutation, useSignupMutation } from 'store/services/authAPI';
import { ErrorAuth, ISignupRequest } from 'interfaces/IUser';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import parseToken from 'helpers/parseToken';

export default function SignUpForm() {
  const [signup] = useSignupMutation();
  const [signin] = useSigninMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISignupRequest>({ mode: 'onChange' });

  const onSubmit = async (data: ISignupRequest) => {
    setIsLoading(true);
    const { login, password } = data;
    try {
      const userSignUp = await signup(data).unwrap();
      dispatch(setUser(userSignUp));
      const userSignIn = await signin({ login, password }).unwrap();
      dispatch(setToken(userSignIn));
      localStorage.setItem('token', userSignIn.token);
      const parsedToken = parseToken(userSignIn.token);
      localStorage.setItem('userId', parsedToken.id);
      navigate('/boards');
      toast.success('You are authorized');
    } catch (e) {
      const err = e as ErrorAuth;
      toast.error(err.data.message);
    }
    reset();
    setIsLoading(false);
  };

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
        {isLoading && (
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
            <CircularProgress color="inherit" size={60} />
          </Backdrop>
        )}
        <Typography component="h1" variant="h5">
          Регистрация
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
            autoComplete="off"
            {...register('name', {
              required: {
                value: true,
                message: 'Имя обязательно',
              },
              maxLength: {
                value: 25,
                message: 'Максимум 25 символов',
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
            autoComplete="off"
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
                value: 25,
                message: 'Максимум 25 символов',
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
            autoComplete="off"
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Зарегистрироваться
          </Button>
        </Box>
        <Divider
          sx={{
            marginBottom: 1,
            width: 390,
          }}
        >
          или
        </Divider>
        <RouterLink to="/sign-in" className="link">
          Уже есть аккаунт? Войти
        </RouterLink>
      </Box>
    </Container>
  );
}
