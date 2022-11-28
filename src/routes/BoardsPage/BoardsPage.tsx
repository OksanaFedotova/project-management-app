import React, { useState } from 'react';
import { useDeleteBoardMutation, useGetAllBoardsQuery } from 'store/services/boardAPI';
import Layout from 'components/Layout';
import BoardCard from '../../components/BoardCard';
import ChangeBoardForm from '../../components/BoardForm';
import { IBoard } from 'interfaces/IBoard';
import './BoardsPage.css';
import { useNavigate } from 'react-router-dom';
import { Backdrop, Box, Button, CircularProgress } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { FormattedMessage } from 'react-intl';

export default function BoardsPage() {
  const { data, isLoading: isLoadingData } = useGetAllBoardsQuery('');
  const navigator = useNavigate();
  const [boardForm, setBoardForm] = useState({ isActive: false, id: '' });
  const [deleteBoard, { isLoading: isLoadingDelete }] = useDeleteBoardMutation();
  const handleDelete = (id: string) => {
    deleteBoard(id).catch((e) => console.error(e));
  };

  return (
    <Layout>
      <div className="layout">
        {(isLoadingDelete || isLoadingData) && (
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
                handleDelete={() => handleDelete(board.id)}
                handleUpdate={() => setBoardForm({ isActive: true, id: board.id })}
                onClick={() => navigator(`${board.id}`)}
              />
            ))}
        </div>
        <Box textAlign="center">
          <Button
            variant="contained"
            sx={{ p: 5, mb: 5 }}
            onClick={() => setBoardForm({ isActive: true, id: '' })}
          >
            <AddCircleOutlineIcon sx={{ mr: 1 }} />
            <FormattedMessage id="add_board" />
          </Button>
        </Box>
      </div>
      {boardForm.isActive && (
        <ChangeBoardForm
          id={boardForm.id}
          onClick={() => setBoardForm({ isActive: false, id: '' })}
        />
      )}
    </Layout>
  );
}
