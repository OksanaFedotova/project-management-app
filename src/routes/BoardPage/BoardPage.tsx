import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetBoardByIdQuery } from 'store/services/boardAPI';
import { Button, fabClasses } from '@mui/material';
import Layout from 'components/Layout';
import BoardDescription from 'components/BoardDescription/BoardDescription';
import { useIntl } from 'react-intl';

import './BoardPage.css';
import BoardForm from 'components/BoardForm';
import ColumnModal from 'components/Column/ColumnModal';

export default function BoardPage() {
  const { id } = useParams();
  const { data } = useGetBoardByIdQuery(id);
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
  console.log(data);
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
          {changeActive && <BoardForm id={id} onClick={() => setChangeActive(false)} />}
          {addActive && <ColumnModal id={id} onClick={() => setAddActive(false)} />}
        </section>
      )}
    </Layout>
  );
}
