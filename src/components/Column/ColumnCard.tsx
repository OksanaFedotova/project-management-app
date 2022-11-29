import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetAllTasksQuery } from 'store/services/taskAPI';
import ModalDeleteColumns from './ColumnDeleteModal';
import ColumnUpdate from './ColumnUpdate';
import Tasks from 'components/Tasks';
import TaskModal from 'components/Tasks/TaskModal';
import { CardContent, Typography, Card, Button, Box } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import AddIcon from '@mui/icons-material/Add';
import { Mode, Delete } from '@mui/icons-material';

export default function ColumnCard({ data }: { data: IColumn }) {
  const { id, title } = data;
  const { id: boardId } = useParams<string>();
  const { data: tasksArray } = useGetAllTasksQuery({ boardId, columnId: id });
  const [addActive, setAddActive] = useState(false);
  const [deleteColumnActive, setDeleteColumnActive] = useState(false);
  const [changeColumnActive, setChangeColumnActive] = useState(false);
  return (
    <>
      <Card
        key={id}
        sx={{
          maxWidth: 350,
          minWidth: 350,
          maxHeight: 'calc(100vh - 300px)',
          margin: 0.5,
          padding: 0.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 0 10px 0 #D2D7E0',
          backgroundColor: '#F2F7FF',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          {!changeColumnActive && (
            <>
              <Typography variant="h6" sx={{ m: 0.5 }} onClick={() => setChangeColumnActive(true)}>
                {title}
              </Typography>
              <Mode
                color="primary"
                sx={{ m: 0.5, cursor: 'pointer' }}
                onClick={() => setChangeColumnActive(true)}
              />
            </>
          )}
          {changeColumnActive && (
            <ColumnUpdate
              columnData={{ ...data, boardId: boardId as string }}
              onClick={() => setChangeColumnActive(false)}
            />
          )}
          <Delete
            color="primary"
            sx={{ m: 0.5, cursor: 'pointer' }}
            onClick={() => setDeleteColumnActive(true)}
          />
        </Box>
        {deleteColumnActive && (
          <ModalDeleteColumns
            idBoard={boardId as string}
            idColumn={id}
            onClick={() => setDeleteColumnActive(false)}
          />
        )}
        <CardContent
          sx={{
            padding: 0.5,
            width: 330,
            overflow: 'hidden auto',
            minHeight: 8,
            maxHeight: 'calc(100vh - 270px)',
          }}
        >
          <Tasks tasks={tasksArray} />
        </CardContent>
        <Button sx={{ mb: 1.5 }} startIcon={<AddIcon />} onClick={() => setAddActive(true)}>
          <FormattedMessage id="create_task" />
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
