import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setToken, setUser } from 'store/reducers/AuthSlice';
import { useSigninMutation, useSignupMutation } from 'store/services/authAPI';
import { ISignupRequest } from 'interfaces/IUser';
import './LoginForm.css';
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Link,
} from '@mui/material';

export default function LoginForm() {
  const [signup] = useSignupMutation();
  const [signin] = useSigninMutation();

  const dispatch = useAppDispatch();
  const { isSignInPage } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISignupRequest>({ mode: 'onChange' });

  const onSubmit = async (data: ISignupRequest) => {
    const { login, password } = data;
    try {
      if (!isSignInPage) {
        const userSignUp = await signup(data).unwrap();
        dispatch(setUser(userSignUp));
      }
      const userSignIn = await signin({ login, password }).unwrap();
      dispatch(setToken(userSignIn));
      localStorage.setItem('token', userSignIn.token);
    } catch (err) {
      console.log(err);
    }
    reset();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 0,
          paddingTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {isSignInPage ? (
          <Typography component="h1" variant="h5">
            Вход
          </Typography>
        ) : (
          <Typography component="h1" variant="h5">
            Регистрация
          </Typography>
        )}
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
          {!isSignInPage && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label={errors.name ? 'Имя обязательно' : 'Имя'}
              type="text"
              error={!!errors.name}
              {...register('name', { required: true })}
            />
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="login"
            label={errors.login ? 'Логин обязателен' : 'Логин'}
            type="text"
            error={!!errors.login}
            {...register('login', { required: true })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label={errors.password ? 'Пароль обязателен' : 'Пароль'}
            type="password"
            error={!!errors.password}
            {...register('password', { required: true })}
          />
          {isSignInPage ? (
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Войти
            </Button>
          ) : (
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Зарегистрироваться
            </Button>
          )}
        </Box>
        <Divider
          sx={{
            marginBottom: 1,
            width: 390,
          }}
        >
          или
        </Divider>
        {isSignInPage ? (
          <Link color="inherit" underline="hover">
            <RouterLink to="/sign-up" className="link">
              Ещё нет аккаунта? Зарегистрироваться
            </RouterLink>
          </Link>
        ) : (
          <Link color="inherit" underline="hover">
            <RouterLink to="/sign-in" className="link">
              Уже есть аккаунт? Войти
            </RouterLink>
          </Link>
        )}
      </Box>
    </Container>
  );
}
