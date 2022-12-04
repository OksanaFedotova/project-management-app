import React from 'react';
import { Typography, Dialog, DialogTitle } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import CloseIcon from '@mui/icons-material/Close';
import CardMedia from '@mui/material/CardMedia';
import modalDescriptionImg from '../../assets/description-img.jpg';

export default function BoardDescription({
  title,
  description,
  open,
}: {
  title: string;
  description: string;
  open: boolean;
}) {
  return (
    <Dialog open={open} fullWidth={true} maxWidth="xs" aria-labelledby="responsive-dialog-title">
      <CloseIcon
        sx={{
          position: 'absolute',
          right: '10px',
          top: '10px',
          '&:hover': { cursor: 'pointer', bgcolor: 'lightgray', borderRadius: '25px' },
        }}
      />
      <DialogTitle
        id="responsive-dialog-title"
        sx={{ fontWeight: 'bold', textAlign: 'center', pt: 5 }}
      >
        <FormattedMessage id="board" />
      </DialogTitle>
      <Typography variant="h5" sx={{ textAlign: 'center' }} color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography sx={{ mb: 1.5, textAlign: 'center' }} color="text.secondary">
        {description}
      </Typography>
      <CardMedia
        component="img"
        sx={{ width: '100px', height: '101px', display: 'inline-block', m: '0 auto', mb: 3 }}
        image={modalDescriptionImg}
        alt="Board Description"
      />
    </Dialog>
  );
}
