import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetAllTasksQuery } from 'store/services/taskAPI';
import Tasks from 'components/Tasks';
import TaskModal from 'components/Tasks/TaskModal';
import IColumnCard from 'interfaces/IColumnCard';
import { CardContent, Typography, Card, Button } from '@mui/material';

export default function ColumnCard({ data }: { data: IColumnCard }) {
  const { id, title } = data;
  const { id: boardId } = useParams<string>();
  const { data: tasksArray } = useGetAllTasksQuery({ boardId, columnId: id });
  const [addActive, setAddActive] = useState(false);
  return (
    <>
      <Card key={id} sx={{ maxWidth: 275, margin: 1 }}>
        <CardContent>
          <Typography variant="h5">{title}</Typography>
          <Tasks tasks={tasksArray} />
        </CardContent>
      </Card>
      <Button onClick={() => setAddActive(true)}>Создать задачу</Button>
      {addActive && (
        <TaskModal columnId={id} boardId={boardId as string} onClick={() => setAddActive(false)} />
      )}
    </>
  );
}
