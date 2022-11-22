import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from 'hooks/redux';
import { useAuth } from 'hooks/useAuth';
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

export default function EditProfile() {
  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const userId = localStorage.getItem('userId');
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
    if (type === 'Да') {
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
          title="Вы действительно хотите удалить?"
          btnSubmit="Да"
          btnCancel="Нет"
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
          paddingTop: 2,
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
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[@$!%*#?&])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
                message: 'Cодержит заглавные и прописные буквы, цифры и спецсимволы',
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
            onClick={() => setIsModal(true)}
            variant="outlined"
            color="error"
            sx={{ mt: 3, mb: 2, mr: 2 }}
          >
            Удалить профиль
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
