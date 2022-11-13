import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setToken, setUser } from 'store/reducers/AuthSlice';
import { useSigninMutation, useSignupMutation } from 'store/services/authAPI';
import { ErrorAuth, ISignupRequest } from 'interfaces/IUser';
import './LoginForm.css';
import { Container, Box, Typography, TextField, Button, Divider } from '@mui/material';

export default function LoginForm() {
  const [signup] = useSignupMutation();
  const [signin] = useSigninMutation();
  const dispatch = useAppDispatch();
  const { isSignInPage } = useAppSelector((state) => state.auth);
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
      if (!isSignInPage) {
        const userSignUp = await signup(data).unwrap();
        dispatch(setUser(userSignUp));
      }
      const userSignIn = await signin({ login, password }).unwrap();
      dispatch(setToken(userSignIn));
      localStorage.setItem('token', userSignIn.token);
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
              label={errors.name ? errors.name.message : 'Имя'}
              type="text"
              error={!!errors.name}
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
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="login"
            label={errors.login ? errors.login.message : 'Логин'}
            type="text"
            error={!!errors.login}
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
                message: 'Пароль из латинских букв, цифр и спецсимволов',
              },
            })}
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
          <RouterLink to="/sign-up" className="link">
            Ещё нет аккаунта? Зарегистрироваться
          </RouterLink>
        ) : (
          <RouterLink to="/sign-in" className="link">
            Уже есть аккаунт? Войти
          </RouterLink>
        )}
      </Box>
    </Container>
  );
}
