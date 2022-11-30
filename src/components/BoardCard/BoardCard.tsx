import React, { useState } from 'react';
import { useDeleteBoardMutation } from 'store/services/boardAPI';
import { FormattedMessage, useIntl } from 'react-intl';
import ModalDelete from 'components/ModalDelete';
import {
  CardActions,
  CardContent,
  Typography,
  Button,
  Card,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { IBoard } from 'interfaces/IBoard';
import { toast } from 'react-toastify';
import { ErrorAuth } from 'interfaces/IUser';

export default function BoardCard({
  board,
  handleUpdate,
  onClick,
}: {
  board: IBoard;
  handleUpdate: (id: string) => void;
  onClick: () => void;
}) {
  const [deleteBoard, { isLoading: isLoadingDelete }] = useDeleteBoardMutation();
  const { title, description, id } = board;
  const [isModal, setIsModal] = useState(false);
  const intl = useIntl();

  const handleDelete = (type: string) => {
    if (type === intl.formatMessage({ id: `${'yes'}` })) {
      try {
        deleteBoard(id).catch((e) => console.error(e));
      } catch (e) {
        const err = e as ErrorAuth;
        toast.error(err.data.message);
      }
      setIsModal(false);
    } else {
      setIsModal(false);
    }
  };

  return (
    <>
      {isLoadingDelete && (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
          <CircularProgress color="inherit" size={60} />
        </Backdrop>
      )}
      {isModal && (
        <ModalDelete
          title={intl.formatMessage({ id: `${'delete_confirm'}` })}
          btnSubmit={intl.formatMessage({ id: `${'yes'}` })}
          btnCancel={intl.formatMessage({ id: `${'no'}` })}
          open={true}
          handleClick={handleDelete}
        />
      )}
      <Card
        key={id}
        sx={{
          width: 300,
          margin: 1,
          cursor: 'pointer',
          ':hover': { boxShadow: 5 },
        }}
        onClick={onClick}
      >
        <CardContent>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={(e: React.SyntheticEvent<EventTarget>) => {
              e.stopPropagation();
              handleUpdate(id);
            }}
          >
            <FormattedMessage id="change" />
          </Button>
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setIsModal(true);
            }}
          >
            <FormattedMessage id="yes" />
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
