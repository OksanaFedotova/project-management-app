import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetAllTasksQuery } from 'store/services/taskAPI';
import Tasks from 'components/Tasks';
import TaskModal from 'components/Tasks/TaskModal';
import IColumnCard from 'interfaces/IColumnCard';
import { CardContent, Typography, Card, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function ColumnCard({ data }: { data: IColumnCard }) {
  const { id, title } = data;
  const { id: boardId } = useParams<string>();
  const { data: tasksArray } = useGetAllTasksQuery({ boardId, columnId: id });
  const [addActive, setAddActive] = useState(false);
  return (
    <>
      <Card
        key={id}
        sx={{
          maxWidth: 350,
          minWidth: 350,
          margin: 0.5,
          padding: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 0 10px 0 #D2D7E0',
          backgroundColor: '#F2F7FF',
        }}
      >
        <Typography variant="h5" sx={{ m: 1 }}>
          {title}
        </Typography>
        <CardContent
          sx={{
            padding: 1.5,
            width: 330,
            overflow: 'hidden auto',
            minHeight: 8,
            maxHeight: 'calc(100vh - 270px)',
          }}
        >
          <Tasks tasks={tasksArray} />
        </CardContent>
        <Button sx={{ mb: 1.5 }} startIcon={<AddIcon />} onClick={() => setAddActive(true)}>
          Создать задачу
        </Button>
      </Card>
      {addActive && (
        <TaskModal
          columnId={id}
          boardId={boardId as string}
          isCreate={true}
          onClick={() => setAddActive(false)}
        />
      )}
    </>
  );
}
