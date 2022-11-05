import React from 'react';
import { AppBar, Toolbar, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Buttons from '../Buttons/Buttons';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
  },
});

const Header = () => {
  const [alignment, setAlignment] = React.useState('ru');

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment);
  };
  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <HomeOutlinedIcon />
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1, pl: 1 }} component="div">
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
          <Buttons text="Вход" />
          <Buttons text="Регистрация" />
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
