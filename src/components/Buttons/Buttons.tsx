import React from 'react';
import { Button } from '@mui/material';

const Buttons = ({ text, onSubmit }: { text: string; onSubmit?: () => void }) => {
  return (
    <Button variant="outlined" color="inherit" sx={{ mr: 1 }} onSubmit={onSubmit}>
      {text}
    </Button>
  );
};

export default Buttons;
