import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ModalDeleteColumns from './ColumnDeleteModal';
import ColumnUpdate from './ColumnUpdate';
import { Draggable } from 'react-beautiful-dnd';
import Tasks from 'components/Tasks';
import TaskModal from 'components/Tasks/TaskModal';
import { CardContent, Typography, Card, Button, Box } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import AddIcon from '@mui/icons-material/Add';
import { Mode, Delete } from '@mui/icons-material';
//import DeleteIcon from '@mui/icons-material/Delete';
import { IColumn } from 'interfaces/IBoard';

export default function ColumnCard({ data, index }: { data: IColumn; index: number }) {
  const { id, title, tasks } = data;
  const { id: boardId } = useParams<string>();
  const [addActive, setAddActive] = useState(false);
  const [deleteColumnActive, setDeleteColumnActive] = useState(false);
  const [changeColumnActive, setChangeColumnActive] = useState(false);
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <Card
            key={id}
            sx={{
              width: 350,
              maxHeight: 'calc(100vh - 300px)',
              minHeight: 180,
              margin: 0.5,
              padding: 0.5,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 0 10px 0 #D2D7E0',
              backgroundColor: '#F2F7FF',
            }}
            {...provided.dragHandleProps}
          >
            <Box sx={{ display: 'flex' }}>
              {!changeColumnActive && (
                <>
                  <Typography
                    variant="h6"
                    sx={{ m: 0.5 }}
                    onClick={() => setChangeColumnActive(true)}
                  >
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
              sx={(theme) => ({
                padding: 0.5,
                width: 330,
                overflow: 'hidden auto',
                minHeight: 8,
                maxHeight: 'calc(100vh - 270px)',
                [theme.breakpoints.down('sm')]: {
                  width: 270,
                },
              })}
            >
              <Tasks tasks={tasks} columnId={id} />
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
        </div>
      )}
    </Draggable>
  );
}
