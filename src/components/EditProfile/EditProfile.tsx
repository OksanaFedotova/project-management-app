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

  const getUserName = (): Omit<IUser, '_id'> => {
    if (data && isAuth) {
      console.log(data);
      return {
        name: data.name,
        login: data.login,
      };
    }
    return {
      name: 'Name',
      login: 'Login',
    };
  };

  const { name, login } = getUserName();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISignupRequest>({ mode: 'onChange' });

  const onSubmit = async (data: ISignupRequest) => {
    try {
      const userUpdate = await updateUser({ _id: userId, user: data }).unwrap();
      dispatch(setUpdatedUser(userUpdate));
      toast.success('Your profile updated');
    } catch (e) {
      const err = e as ErrorAuth;
      toast.error(err.data.message);
    }
    reset();
  };

  const deleteProfile = async (type: string) => {
    if (type === intl.formatMessage({ id: `${'yes'}` })) {
      try {
        await deleteUser({ _id: userId });
        dispatch(removeUser);
        toast.success('User is deleted!');
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
    <Container component="main" maxWidth="xs">
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
        <Typography component="h3" variant="h6" paddingTop={15}>
          <span>Имя: {data && name}</span>
        </Typography>
        <Typography component="h3" variant="h6">
          <span> Логин: {data && login}</span>
        </Typography>
      </div>

      <Divider
        sx={{
          marginBottom: 1,
          width: 390,
        }}
      />
      <Box
        sx={{
          marginTop: 0,
          paddingTop: 20,
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
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label={
              errors.name
                ? errors.name.message
                : intl.formatMessage({ id: `${'name_placeholder'}` })
            }
            type="text"
            error={!!errors.name}
            autoComplete="on"
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
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="login"
            label={errors.login ? errors.login.message : intl.formatMessage({ id: `${'login'}` })}
            type="text"
            error={!!errors.login}
            autoComplete="on"
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
            autoComplete="on"
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
    </Container>
  );
}
