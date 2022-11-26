import React from 'react';
import { CardContent, Typography, Card } from '@mui/material';
import IColumnCard from 'interfaces/IColumnCard';

export default function ColumnCard({ data }: { data: IColumnCard }) {
  const { id, title } = data;
  return (
    <Card key={id} sx={{ maxWidth: 275, margin: 1 }}>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        {/* {tasks.map((task, index) => (
          <Typography key={`${id}${index}`} sx={{ mb: 1.5 }} color="text">
            {task}
          </Typography>
        ))} */}
      </CardContent>
    </Card>
  );
}
