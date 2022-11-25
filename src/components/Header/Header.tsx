import React, { useState } from 'react';
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
import type { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { setCurrentLocale } from 'store/reducers/LanguageSlice';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
  },
});
const Header = ({ isSticky }: { isSticky: boolean }) => {
  const lang = useSelector((state: RootState) => state.translate.currentLocale);
  const dispatch = useAppDispatch();
  const [alignment, setAlignment] = useState(lang);
  localStorage.setItem('Language', lang);

  const handleChange = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLButtonElement;
    setAlignment(target.value);
    dispatch(setCurrentLocale(target.value));
    localStorage.setItem('Language', target.value);
  };

  const navigator = useNavigate();
  const auth = useAuth();
  const isAuth = auth.token;
  const logout = () => {
    dispatch(removeUser);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigator('/welcome');
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
            <FormattedMessage id="main_page_name" />
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
                <Buttons>
                  <FormattedMessage id="to_main" />
                </Buttons>
              </NavLink>
              <NavLink to="/edit-profile" style={{ color: `inherit`, textDecoration: `none` }}>
                <Buttons>
                  <FormattedMessage id="to_edit_page" />
                </Buttons>
              </NavLink>
              <Button variant="outlined" color="inherit" sx={{ mr: 1 }} onClick={logout}>
                <FormattedMessage id="sign_out" />
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/sign-in" style={{ color: `inherit`, textDecoration: `none` }}>
                <Buttons>
                  <FormattedMessage id="sign_in" />
                </Buttons>
              </NavLink>
              <NavLink to="/sign-up" style={{ color: `inherit`, textDecoration: `none` }}>
                <Buttons>
                  <FormattedMessage id="sign_up" />
                </Buttons>
              </NavLink>
            </>
          )}
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
