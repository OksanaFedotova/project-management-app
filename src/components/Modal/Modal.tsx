import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({ title, btnYes, btnNo }: { title: string; btnYes: string; btnNo: string }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Открыть модальное окно
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="xs"
        aria-labelledby="responsive-dialog-title"
      >
        <Button
          disableRipple={true}
          sx={{
            justifyContent: 'flex-end',
            ':hover': { background: 'none' },
          }}
        >
          <CloseIcon
            sx={{
              color: 'grey',
              cursor: 'pointer',
              ':hover': { border: 1, borderRadius: '50%' },
            }}
            onClick={handleClose}
          />
        </Button>

        <DialogTitle id="responsive-dialog-title" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          {title}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoComplete="off"
            autoFocus
            margin="dense"
            id="name"
            label="Название"
            type="text"
            variant="outlined"
            fullWidth={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            {btnYes}
          </Button>
          <Button onClick={handleClose}>{btnNo}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
