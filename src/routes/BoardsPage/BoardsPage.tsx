import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import { useGetAllBoardsQuery, useGetBoardByIdQuery } from 'store/services/boardAPI';
import Layout from 'components/Layout';
import BoardCard from '../../components/BoardCard';
import BoardForm from '../../components/BoardForm';
import { IBoard } from 'interfaces/IBoard';
import { ErrorAuth } from 'interfaces/IUser';
import { Backdrop, Box, Button, CircularProgress } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './BoardsPage.css';

export default function BoardsPage() {
  const { data, isLoading: isLoadingData, error } = useGetAllBoardsQuery('');
  const navigator = useNavigate();
  const [boardForm, setBoardForm] = useState({ isActive: false, id: '' });
  const [isAdd, setIsAdd] = useState(false);
  const { data: board, error: err } = useGetBoardByIdQuery(boardForm.id, { skip: !boardForm.id });

  if (error || err) {
    let e;
    if (error) {
      e = error as ErrorAuth;
    } else {
      e = err as ErrorAuth;
    }
    toast.error(e.data.message, {
      toastId: 'Board',
    });
  }

  return (
    <Layout>
      <div>
        {isLoadingData && (
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
            <CircularProgress color="inherit" size={60} />
          </Backdrop>
        )}
        <div className="boards-container">
          {data &&
            data.map((board: IBoard) => (
              <BoardCard
                key={board.id}
                board={board}
                handleUpdate={() => setBoardForm({ isActive: true, id: board.id })}
                onClick={() => navigator(`${board.id}`)}
              />
            ))}
          <Box textAlign="center">
            <Button
              variant="contained"
              sx={(theme) => ({
                pr: 8,
                pl: 8,
                pt: 7,
                pb: 7,
                ml: 1,
                mt: 1,
                mb: 1,
                width: 300,
                [theme.breakpoints.down('sm')]: {
                  width: 275,
                },
              })}
              onClick={() => {
                setBoardForm({ isActive: true, id: '' });
                setIsAdd(true);
              }}
            >
              <AddCircleOutlineIcon sx={{ mr: 1 }} />
              <FormattedMessage id="add_board" />
            </Button>
          </Box>
        </div>
      </div>
      {boardForm.isActive && board && (
        <BoardForm
          id={boardForm.id}
          title={board ? board.title : ''}
          description={board ? board.description : ''}
          onClick={() => {
            setBoardForm({ isActive: false, id: '' });
          }}
        />
      )}
      {boardForm.isActive && isAdd && (
        <BoardForm
          id={boardForm.id}
          onClick={() => {
            setBoardForm({ isActive: false, id: '' });
            setIsAdd(false);
          }}
        />
      )}
    </Layout>
  );
}
