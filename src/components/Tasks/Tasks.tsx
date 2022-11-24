import { ListItem, ListItemText } from '@mui/material';
import { ITask, IColumn } from 'interfaces/IBoard';
import React from 'react';

export default function Tasks({ tasks }: { tasks: ITask[] }) {
  //   const tasksData = props;
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

{
}
