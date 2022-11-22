import React, { useState } from 'react';
import { useDeleteBoardMutation, useGetAllBoardsQuery } from 'store/services/boardAPI';
import Layout from 'components/Layout';
import BoardCard from '../../components/BoardCard';
import ChangeBoardForm from '../../components/BoardForm';
import { IBoard } from 'interfaces/IBoard';
import './BoardsPage.css';

export default function BoardsPage() {
  const { data } = useGetAllBoardsQuery('');
  const [boardForm, setBoardForm] = useState({ isActive: false, id: '' });
  const [deleteBoard] = useDeleteBoardMutation();
  const handleDelete = (id: string) => {
    deleteBoard(id).catch((e) => console.error(e));
  };

  return (
    <Layout>
      <div className="layout">
        <div className="boards-container">
          {data &&
            data.map((board: IBoard) => (
              <BoardCard
                key={board.id}
                board={board}
                handleDelete={() => handleDelete(board.id)}
                handleUpdate={() => setBoardForm({ isActive: true, id: board.id })}
              />
            ))}
        </div>
        <button onClick={() => setBoardForm({ isActive: true, id: '' })}>Добавить</button>
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
