import React, { useState } from 'react';
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
import { FormattedMessage, useIntl } from 'react-intl';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function SignInForm() {
  const [signin, { isLoading }] = useSigninMutation();
  const [isDisable, setIsDisable] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const intl = useIntl();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISignupRequest>({ mode: 'onChange' });

  const onSubmit = async (data: ISignupRequest) => {
    setIsDisable(true);
    const { login, password } = data;
    try {
      const userSignIn = await signin({ login, password }).unwrap();
      dispatch(setToken(userSignIn));
      localStorage.setItem('token', userSignIn.token);
      const parsedToken = parseToken(userSignIn.token);
      localStorage.setItem('userId', parsedToken.userId);
      navigate('/boards');
      toast.success(intl.formatMessage({ id: `${'auth_user'}` }));
    } catch (e) {
      const err = e as ErrorAuth;
      toast.error(err.data.message);
    }
    reset();
    setIsDisable(false);
  };

  return (
    <Container
      component="main"
      sx={(theme) => ({
        width: 400,
        [theme.breakpoints.down('sm')]: {
          width: 280,
        },
      })}
    >
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
          <FormattedMessage id="enter" />
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="login"
            label={errors.login ? errors.login.message : intl.formatMessage({ id: `${'login'}` })}
            type="text"
            error={!!errors.login}
            autoComplete="off"
            {...register('login', {
              required: {
                value: true,
                message: intl.formatMessage({ id: `${'login_required'}` }),
              },
              minLength: {
                value: 4,
                message: intl.formatMessage({ id: `${'min_length'}` }),
              },
              maxLength: {
                value: 25,
                message: intl.formatMessage({ id: `${'login_max_length'}` }),
              },
              pattern: {
                value: /^[a-zA-Z0-9]+$/i,
                message: intl.formatMessage({ id: `${'login_pattern'}` }),
              },
            })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label={
              errors.password
                ? errors.password.message
                : intl.formatMessage({ id: `${'password'}` })
            }
            type="password"
            error={!!errors.password}
            autoComplete="off"
            {...register('password', {
              required: {
                value: true,
                message: intl.formatMessage({ id: `${'password_required'}` }),
              },
              minLength: {
                value: 6,
                message: intl.formatMessage({ id: `${'pass_min_length'}` }),
              },
              maxLength: {
                value: 20,
                message: intl.formatMessage({ id: `${'max_length'}` }),
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[@$!%*#?&])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
                message: intl.formatMessage({ id: `${'password_pattern'}` }),
              },
            })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isDisable}
          >
            <FormattedMessage id="enter" />
          </Button>
        </Box>
        <Divider
          sx={(theme) => ({
            marginBottom: 1,
            width: 390,
            [theme.breakpoints.down('sm')]: {
              width: 280,
            },
          })}
        >
          <FormattedMessage id="or" />
        </Divider>
        <RouterLink to="/sign-up" className="link">
          <FormattedMessage id="have_no_account" />
        </RouterLink>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            mt: 7,
            pb: 2,
            cursor: 'pointer',
            '&:hover': { color: 'orange' },
          }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIosIcon />
          <FormattedMessage id="back" />
        </Box>
      </Box>
    </Container>
  );
}
