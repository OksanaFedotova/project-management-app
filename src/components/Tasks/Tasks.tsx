import React from 'react';
import { ITask } from 'interfaces/IBoard';
import { ListItem, ListItemText } from '@mui/material';

export default function Tasks({ tasks }: { tasks: ITask[] }) {
  return (
    <>
      {tasks &&
        tasks.map((item: ITask) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
    </>
  );
}
