import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'hooks/redux';
import { setToken } from 'store/reducers/AuthSlice';
import { useSigninMutation } from 'store/services/authAPI';
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
import './SignInForm.css';

export default function SignInForm() {
  const [signin, { isLoading }] = useSigninMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISignupRequest>({ mode: 'onChange' });

  const onSubmit = async (data: ISignupRequest) => {
    const { login, password } = data;
    try {
      const userSignIn = await signin({ login, password }).unwrap();
      dispatch(setToken(userSignIn));
      localStorage.setItem('token', userSignIn.token);
      const parsedToken = parseToken(userSignIn.token);
      localStorage.setItem('userId', parsedToken.userId);
      navigate('/boards');
      toast.success('You are authorized');
    } catch (e) {
      const err = e as ErrorAuth;
      toast.error(err.data.message);
    }
    reset();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 0,
          paddingTop: 20,
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
          Вход
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
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
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[@$!%*#?&])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
                message: 'Cодержит заглавные и прописные буквы, цифры и спецсимволы',
              },
            })}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Войти
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
        <RouterLink to="/sign-up" className="link">
          Ещё нет аккаунта? Зарегистрироваться
        </RouterLink>
      </Box>
    </Container>
  );
}
