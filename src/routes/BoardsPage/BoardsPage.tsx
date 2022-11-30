import React, { useState } from 'react';
import { useGetAllBoardsQuery } from 'store/services/boardAPI';
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
              onClick={() => setBoardForm({ isActive: true, id: '' })}
            >
              <AddCircleOutlineIcon sx={{ mr: 1 }} />
              <FormattedMessage id="add_board" />
            </Button>
          </Box>
        </div>
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
