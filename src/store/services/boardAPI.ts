import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBoard, TBoardRequest } from 'interfaces/IBoard';

//const url = `https://back-project-app-production.up.railway.app/`;

export const boardAPI = createApi({
  reducerPath: 'boardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://serene-everglades-05199.herokuapp.com/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Boards'],
  endpoints: (builder) => ({
    getAllBoards: builder.query({
      query: () => 'boards',
      providesTags: ['Boards'],
    }),
    getBoardById: builder.query({
      query: (id) => `boards/${id}`,
      providesTags: ['Boards'],
    }),
    createBoard: builder.mutation<IBoard, TBoardRequest>({
      query: (body) => ({
        url: 'boards',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Boards'],
    }),
    updateBoard: builder.mutation<IBoard, IBoard>({
      query: ({ id, ...body }) => ({
        url: `boards/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Boards'],
    }),
    deleteBoard: builder.mutation({
      query: (id) => ({
        url: `boards/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Boards'],
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
