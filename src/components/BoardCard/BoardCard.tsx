import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IBoard } from 'interfaces/IBoard';

export default function BoardCard({
  board,
  handleDelete,
  handleUpdate,
}: {
  board: IBoard;
  handleDelete: (id: string) => void;
  handleUpdate: (id: string) => void;
}) {
  const { title, description, id } = board;
  return (
    <Card key={id} sx={{ maxWidth: 275, margin: 1 }}>
      <CardContent>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleUpdate(id)}>
          Изменить
        </Button>
        <Button size="small" onClick={() => handleDelete(id)}>
          Удалить
        </Button>
      </CardActions>
    </Card>
  );
}
