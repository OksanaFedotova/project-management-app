import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import { useGetBoardByIdQuery } from 'store/services/boardAPI';
import { Button } from '@mui/material';
import Layout from 'components/Layout';
import BoardDescription from 'components/BoardDescription/BoardDescription';
import { useIntl } from 'react-intl';

import './BoardPage.css';
import BoardForm from 'components/BoardForm';
import ColumnModal from 'components/Column/ColumnModal';
import ColumnCard from 'components/Column/ColumnCard';
import IColumnCard from 'interfaces/IColumnCard';
import { useGetAllColumnsQuery } from 'store/services/columnsAPI';

export default function BoardPage() {
  const { id } = useParams();
  const boardId = id ? id : '';
  const { data } = useGetBoardByIdQuery(boardId);
  const columns = useGetAllColumnsQuery(boardId).data;
  const [descriptionActive, setDescriptionActive] = useState(false);
  const [changeActive, setChangeActive] = useState(false);
  const [addActive, setAddActive] = useState(false);
  const intl = useIntl();
  const ru = {
    description: intl.formatMessage({ id: `${'board_description'}` }),
    delete: intl.formatMessage({ id: `${'yes'}` }),
    change: intl.formatMessage({ id: `${'change'}` }),
    addColumn: intl.formatMessage({ id: `${'add_list'}` }),
  };
  const theme = ru;

  function onDragStart() {}
  function onDragUpdate() {}
  function onDragEnd() {}

  return (
    <Layout>
      {data && (
        <section
          className="board-container"
          onClick={() => {
            if (descriptionActive) setDescriptionActive(false);
          }}
        >
          <h2>{data.title}</h2>
          <h3>{data.description}</h3>
          <Button onClick={() => setDescriptionActive(true)}>{theme.description}</Button>
          <Button onClick={() => setChangeActive(true)}>{theme.change}</Button>
          <Button>{theme.delete}</Button>
          <Button onClick={() => setAddActive(true)}>{theme.addColumn}</Button>
          {descriptionActive && (
            <BoardDescription title={data.title} description={data.description} />
          )}
          {changeActive && <BoardForm id={boardId} onClick={() => setChangeActive(false)} />}
          {addActive && <ColumnModal idBoard={boardId} onClick={() => setAddActive(false)} />}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 20,
              overflowX: 'auto',
              alignItems: 'flex-start',
              marginBottom: 4,
            }}
          >
            <DragDropContext
              onDragStart={onDragStart}
              onDragUpdate={onDragUpdate}
              onDragEnd={onDragEnd}
            >
              {columns &&
                columns.map((column: IColumnCard) => <ColumnCard key={column.id} data={column} />)}
            </DragDropContext>
          </div>
        </section>
      )}
    </Layout>
  );
}
