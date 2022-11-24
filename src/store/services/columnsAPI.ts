import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from 'configs/constants';
import { IColumn, TColumnRequest } from 'interfaces/IBoard';

export const columnAPI = createApi({
  reducerPath: 'columnApi',
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Columns'],
  endpoints: (builder) => ({
    getAllColumns: builder.query({
      query: (idBoard) => `boards/${idBoard}/columns`,
      providesTags: ['Columns'],
    }),
    getColumnById: builder.query({
      query: ({ boardId, columnId }) => `boards/${boardId}/columns/${columnId}`,
      providesTags: ['Columns'],
    }),
    createColumn: builder.mutation<IColumn, { idBoard: string; body: { title: string } }>({
      query: ({ idBoard, body }) => ({
        url: `boards/${idBoard}/columns`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Columns'],
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
      invalidatesTags: ['Columns'],
    }),
    deleteColumn: builder.mutation({
      query: ({ idBoard, idColumn }) => ({
        url: `boards/${idBoard}/columns/${idColumn}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Columns'],
    }),
  }),
});

export const {
  useGetAllColumnsQuery,
  useCreateColumnMutation,
  useDeleteColumnMutation,
  useGetColumnByIdQuery,
  useUpdateColumnMutation,
} = columnAPI;
