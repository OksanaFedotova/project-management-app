import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const ModalDelete = ({
  title,
  btnSubmit,
  btnCancel,
  handleClick,
  open,
}: {
  title: string;
  btnSubmit: string;
  btnCancel: string;
  handleClick: () => void;
  open: boolean;
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div>
      <Button variant="outlined" onClick={handleClick}>
        Открыть модальное окно
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClick}
        fullWidth={true}
        maxWidth="xs"
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          sx={{ fontWeight: 'bold', textAlign: 'center', pt: 5 }}
        >
          {title}
        </DialogTitle>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center', pb: 3 }}>
          <Button onClick={handleClick} variant="contained" color="error">
            {btnSubmit}
          </Button>
          <Button onClick={handleClick} variant="outlined">
            {btnCancel}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalDelete;
