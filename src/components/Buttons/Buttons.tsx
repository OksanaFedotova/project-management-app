import React from 'react';
import { Button } from '@mui/material';

const Buttons = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button variant="outlined" color="inherit" sx={{ mr: 1 }}>
      {children}
    </Button>
  );
};

export default Buttons;
