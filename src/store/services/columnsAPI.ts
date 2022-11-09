import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IColumn, TColumnRequest } from 'interfaces/IBoard';

export const columnAPI = createApi({
  reducerPath: 'columnApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://serene-everglades-05199.herokuapp.com/' }),
  endpoints: (builder) => ({
    getAllColumns: builder.query({
      query: (idBoard) => `boards/${idBoard}/columns`,
    }),
    getColumnById: builder.query({
      query: ({ boardId, columnId }) => `boards/${boardId}/columns/${columnId}`,
    }),
    createColumn: builder.mutation<IColumn, { idBoard: string; body: { title: string } }>({
      query: ({ idBoard, body }) => ({
        url: `boards/${idBoard}/columns`,
        method: 'POST',
        body: body,
      }),
    }),
    updateColumn: builder.mutation<
      IColumn,
      { idBoard: string; idColumn: string; body: TColumnRequest }
    >({
      query: ({ idBoard, idColumn, body }) => ({
        url: `boards/${idBoard}/columns/${idColumn}`,
        method: 'PUT',
        body: body,
      }),
    }),
    deleteBoard: builder.mutation({
      query: ({ idBoard, idColumn }) => ({
        url: `boards/${idBoard}/colimns/${idColumn}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllColumnsQuery,
  useCreateColumnMutation,
  useDeleteBoardMutation,
  useGetColumnByIdQuery,
  useUpdateColumnMutation,
} = columnAPI;
