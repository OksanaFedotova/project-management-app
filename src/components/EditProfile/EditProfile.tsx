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
} from 'store/services/boardAPI';
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
  const userId = localStorage.getItem('userId') ? localStorage.getItem('userId') : '';
  const intl = useIntl();
  const { data: user, isLoading: isLoadingName } = useGetUserByIdQuery(userId);
  const auth = useAuth();
  const isAuth = auth.token;
  const [nameState, setName] = useState<string>();
  const [loginState, setLogin] = useState<string>();
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const getUserName = (): Omit<IUser, 'id'> => {
    if (user && isAuth) {
      return {
        name: user.name,
        login: user.login,
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
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ISignupRequest>({ mode: 'onChange' });

  const onSubmit = async (data: ISignupRequest) => {
    if (isEmpty) {
      toast.info(intl.formatMessage({ id: `${'name_required'}` }));
      return;
    }
    if (!data.name) {
      data.name = `${user.name}`;
    }
    try {
      const userUpdate = await updateUser({ id: userId, user: data }).unwrap();
      dispatch(setUpdatedUser(userUpdate));
      toast.success(intl.formatMessage({ id: `${'update_user'}` }));
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
        toast.success(intl.formatMessage({ id: `${'delete_user'}` }));
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
              pt: 18,
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
        sx={(theme) => ({
          marginTop: 0,
          paddingTop: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          [theme.breakpoints.down('sm')]: {
            paddingTop: 5,
          },
        })}
      >
        {(isLoadingUpdate || isLoadingDelete || isLoadingName) && (
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
            <CircularProgress color="inherit" size={60} />
          </Backdrop>
        )}
        <Typography component="h1" variant="h5" textAlign="center">
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
            label={
              errors.name
                ? errors.name.message
                : intl.formatMessage({ id: `${'name_placeholder'}` })
            }
            value={nameState === undefined ? name : nameState.length ? nameState : ''}
            {...register('name', {
              minLength: {
                value: 1,
                message: intl.formatMessage({ id: `${'name_required'}` }),
              },
              maxLength: {
                value: 25,
                message: intl.formatMessage({ id: `${'login_max_length'}` }),
              },
              pattern: {
                value: /^[A-Za-zА-Яа-я]+$/i,
                message: intl.formatMessage({ id: `${'name_pattern'}` }),
              },
            })}
            onChange={(e) => {
              if (e.target.value === '') {
                setIsEmpty(true);
                setError('name', {
                  type: 'required',
                  message: intl.formatMessage({ id: `${'name_required'}` }),
                });
              } else {
                clearErrors('name');
                setIsEmpty(false);
              }
              setName(e.target.value);
            }}
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
            defaultValue={loginState ? loginState : ''}
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
          <Box style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            <Button type="submit" variant="contained" color="success" sx={{ mt: 3 }}>
              <FormattedMessage id="edit" />
            </Button>
            <Button
              onClick={() => setIsModal(true)}
              variant="outlined"
              color="error"
              sx={{ mt: 3 }}
            >
              <FormattedMessage id="delete_profile" />
            </Button>
          </Box>
        </Box>
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
