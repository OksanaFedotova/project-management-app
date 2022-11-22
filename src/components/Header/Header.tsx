import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from 'hooks/useAuth';
import { useAppDispatch } from 'hooks/redux';
import { removeUser } from 'store/reducers/AuthSlice';
import {
  AppBar,
  Toolbar,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Button,
} from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Buttons from '../Buttons';
import './Header.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
  },
});

const Header = ({ isSticky }: { isSticky: boolean }) => {
  const [alignment, setAlignment] = React.useState('ru');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment);
  };

  const navigator = useNavigate();

  const auth = useAuth();
  const isAuth = auth.token;

  const logout = () => {
    dispatch(removeUser);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/welcome');
    toast.success('You are logged out!');
  };

  return (
    <header className={isSticky ? 'appbar-sticky' : 'appbar'}>
      <AppBar className={isSticky ? 'appbar-sticky' : 'appbar'}>
        <Toolbar className="toolbar">
          <HomeOutlinedIcon className="welcome-page-link" onClick={() => navigator('..')} />
          <Typography
            variant="h6"
            color="inherit"
            sx={{ flexGrow: 1, pl: 1 }}
            component="div"
            className="welcome-page-link"
            onClick={() => navigator('..')}
          >
            Главная
          </Typography>
          <ThemeProvider theme={theme}>
            <ToggleButtonGroup
              color="primary"
              size="small"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              sx={{ mr: 2 }}
            >
              <ToggleButton value="ru">RU</ToggleButton>
              <ToggleButton value="en">EN</ToggleButton>
            </ToggleButtonGroup>
          </ThemeProvider>
          {isAuth ? (
            <>
              <NavLink to="/welcome" style={{ color: `inherit`, textDecoration: `none` }}>
                <Buttons text="На главную" />
              </NavLink>
              <NavLink to="/edit-profile" style={{ color: `inherit`, textDecoration: `none` }}>
                <Buttons text="Редактировать профиль" />
              </NavLink>
              <Button variant="outlined" color="inherit" sx={{ mr: 1 }} onClick={logout}>
                Выйти
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/sign-in" style={{ color: `inherit`, textDecoration: `none` }}>
                <Buttons text="Вход" />
              </NavLink>
              <NavLink to="/sign-up" style={{ color: `inherit`, textDecoration: `none` }}>
                <Buttons text="Регистрация" />
              </NavLink>
            </>
          )}
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
