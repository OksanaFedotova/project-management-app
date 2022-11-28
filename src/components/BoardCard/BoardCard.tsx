import React from 'react';
import { CardActions, CardContent, Typography, Button, Card } from '@mui/material';
import { IBoard } from 'interfaces/IBoard';
import { FormattedMessage } from 'react-intl';

export default function BoardCard({
  board,
  handleDelete,
  handleUpdate,
  onClick,
}: {
  board: IBoard;
  handleDelete: (id: string) => void;
  handleUpdate: (id: string) => void;
  onClick: () => void;
}) {
  const { title, description, id } = board;
  return (
    <Card
      key={id}
      sx={{
        maxWidth: 275,
        margin: 1,
        cursor: 'pointer',
        ':hover': { boxShadow: 5 },
      }}
      onClick={onClick}
    >
      <CardContent>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={(e: React.SyntheticEvent<EventTarget>) => {
            e.stopPropagation();
            handleUpdate(id);
          }}
        >
          <FormattedMessage id="change" />
        </Button>
        <Button
          size="small"
          onClick={(e: React.SyntheticEvent<EventTarget>) => {
            e.stopPropagation();
            handleDelete(id);
          }}
        >
          <FormattedMessage id="yes" />
        </Button>
      </CardActions>
    </Card>
  );
}
