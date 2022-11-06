import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBoard, TBoardRequest } from 'interfaces/IBoard';

export const boardAPI = createApi({
  reducerPath: 'boardApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://serene-everglades-05199.herokuapp.com/' }),
  endpoints: (builder) => ({
    getAllBoards: builder.query({
      query: () => 'boards',
    }),
    getBoardById: builder.query({
      query: (id) => `boards/${id}`,
    }),
    createBoard: builder.mutation<IBoard, TBoardRequest>({
      query: (body) => ({
        url: 'boards',
        method: 'POST',
        body: body,
      }),
    }),
    updateBoard: builder.mutation<IBoard, IBoard>({
      query: ({ id, ...body }) => ({
        url: `boards/${id}`,
        method: 'PUT',
        body: body,
      }),
    }),
    deleteBoard: builder.mutation({
      query: (id) => ({
        url: `boards/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllBoardsQuery,
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useGetBoardByIdQuery,
  useUpdateBoardMutation,
} = boardAPI;
