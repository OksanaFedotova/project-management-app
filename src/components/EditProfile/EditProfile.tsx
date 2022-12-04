import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useAuth } from 'hooks/useAuth';
import { useAppDispatch } from 'hooks/redux';
import { removeUser, setUpdatedUser } from 'store/reducers/AuthSlice';
import ModalDelete from 'components/ModalDelete';
import { ErrorAuth, ISignupRequest, IUser } from 'interfaces/IUser';
import {
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from 'store/services/userAPI';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Backdrop,
  CircularProgress,
  Divider,
} from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function EditProfile() {
  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const userId = localStorage.getItem('userId');
  const intl = useIntl();
  const { data, isLoading: isLoadingName } = useGetUserByIdQuery(userId);
  const auth = useAuth();
  const isAuth = auth.token;
  const [nameState, setName] = useState<string>();
  const [loginState, setLogin] = useState<string>();

  const getUserName = (): Omit<IUser, 'id'> => {
    if (data && isAuth) {
      return {
        name: data.name,
        login: data.login,
      };
    }
    return {
      name: '',
      login: '',
    };
  };

  const { name, login } = getUserName();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupRequest>({ mode: 'onSubmit' });

  const onSubmit = async (data: ISignupRequest) => {
    try {
      const userUpdate = await updateUser({ id: userId, user: data }).unwrap();
      dispatch(setUpdatedUser(userUpdate));
      toast.success('Your profile updated');
      setName(data.name);
      setLogin(data.login);
    } catch (e) {
      const err = e as ErrorAuth;
      toast.error(err.data.message);
    }
  };

  const deleteProfile = async (type: string) => {
    if (type === intl.formatMessage({ id: `${'yes'}` })) {
      try {
        await deleteUser({ id: userId });
        dispatch(removeUser);
        toast.success('User deleted!');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/welcome');
      } catch (e) {
        const err = e as ErrorAuth;
        toast.error(err.data.message);
      }
      setIsModal(false);
    } else {
      setIsModal(false);
    }
  };

  return (
    <Container
      component="main"
      sx={(theme) => ({
        width: 500,
        [theme.breakpoints.down('sm')]: {
          width: 300,
        },
      })}
    >
      {isModal && (
        <ModalDelete
          title={intl.formatMessage({ id: `${'delete_confirm'}` })}
          btnSubmit={intl.formatMessage({ id: `${'yes'}` })}
          btnCancel={intl.formatMessage({ id: `${'no'}` })}
          open={true}
          handleClick={deleteProfile}
        />
      )}
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Typography
          component="h3"
          variant="h6"
          sx={(theme) => ({
            pt: 15,
            [theme.breakpoints.down('sm')]: {
              pt: 20,
            },
          })}
        >
          <span>
            <FormattedMessage id="name_placeholder" />: {nameState ? nameState : name}
          </span>
        </Typography>
        <Typography component="h3" variant="h6">
          <span>
            {' '}
            <FormattedMessage id="login" />: {loginState ? loginState : login}
          </span>
        </Typography>
      </div>

      <Divider
        sx={(theme) => ({
          marginBottom: 1,
          width: 450,
          [theme.breakpoints.down('sm')]: {
            width: 280,
          },
        })}
      />
      <Box
        sx={{
          marginTop: 0,
          paddingTop: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {(isLoadingUpdate || isLoadingDelete || isLoadingName) && (
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
            <CircularProgress color="inherit" size={60} />
          </Backdrop>
        )}
        <Typography component="h1" variant="h5">
          <FormattedMessage id="edit_profile" />
        </Typography>
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            type="text"
            error={!!errors.name}
            value={nameState ? nameState : name}
            {...register('name', {
              required: {
                value: true,
                message: intl.formatMessage({ id: `${'name_required'}` }),
              },
              maxLength: {
                value: 25,
                message: intl.formatMessage({ id: `${'login_max_length'}` }),
              },
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: intl.formatMessage({ id: `${'name_pattern'}` }),
              },
            })}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="login"
            label={errors.login ? errors.login.message : intl.formatMessage({ id: `${'login'}` })}
            type="text"
            inputProps={{
              autoComplete: 'off',
            }}
            error={!!errors.login}
            defaultValue={loginState ? loginState : login}
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
            inputProps={{
              autoComplete: 'new-password',
            }}
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
          <Box textAlign="center">
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2, mr: 3, ml: 2 }}
            >
              <FormattedMessage id="edit" />
            </Button>
            <Button
              onClick={() => setIsModal(true)}
              variant="outlined"
              color="error"
              sx={{ mt: 3, mb: 2, mr: 2 }}
            >
              <FormattedMessage id="delete_profile" />
            </Button>
          </Box>
        </Box>
        <ArrowBackIosIcon
          sx={{ cursor: 'pointer', mt: 1, mb: 3, '&:hover': { color: 'green' } }}
          onClick={() => navigate('/welcome')}
        />
      </Box>
    </Container>
  );
}
