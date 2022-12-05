import React from 'react';
import { Button } from '@mui/material';

const Buttons = ({ children, onSubmit }: { children: React.ReactNode; onSubmit?: () => void }) => {
  return (
    <Button
      variant="outlined"
      color="inherit"
      sx={(theme) => ({
        mr: 1,
        [theme.breakpoints.down('sm')]: {
          p: 1,
          mr: 1,
        },
      })}
      onSubmit={onSubmit}
    >
      {children}
    </Button>
  );
};

export default Buttons;
