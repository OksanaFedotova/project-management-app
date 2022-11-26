import React from 'react';
import { Button } from '@mui/material';

const Buttons = ({ children, onSubmit }: { children: React.ReactNode; onSubmit?: () => void }) => {
  return (
    <Button variant="outlined" color="inherit" sx={{ mr: 1 }} onSubmit={onSubmit}>
      {children}
    </Button>
  );
};

export default Buttons;
