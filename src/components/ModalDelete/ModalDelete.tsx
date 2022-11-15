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
}: {
  title: string;
  btnSubmit: string;
  btnCancel: string;
}) => {
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
        <DialogTitle
          id="responsive-dialog-title"
          sx={{ fontWeight: 'bold', textAlign: 'center', pt: 5 }}
        >
          {title}
        </DialogTitle>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center', pb: 3 }}>
          <Button onClick={handleClose} variant="contained" color="error">
            {btnSubmit}
          </Button>
          <Button onClick={handleClose} variant="outlined">
            {btnCancel}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalDelete;
