import React from 'react';
import { CardContent, Typography, Card } from '@mui/material';
import { FormattedMessage } from 'react-intl';

export default function BoardDescription({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  console.log(title, description);
  return (
    <Card sx={{ maxWidth: 275, margin: 1 }}>
      <Typography variant="h2">
        <FormattedMessage id="board" />
      </Typography>
      <CardContent>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
