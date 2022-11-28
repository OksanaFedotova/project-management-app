import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from 'configs/constants';
import {
  IBoard,
  TBoardRequest,
  IColumn,
  TColumnRequest,
  ITaskResponse,
  TTaskRequest,
} from 'interfaces/IBoard';

export const boardAPI = createApi({
  reducerPath: 'boardApi',
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
  tagTypes: ['Boards', 'Columns', 'Tasks'],
  endpoints: (builder) => ({
    getAllBoards: builder.query({
      query: () => 'boards',
      providesTags: ['Boards'],
    }),
    getBoardById: builder.query({
      query: (id) => `boards/${id}`,
      providesTags: ['Boards', 'Columns', 'Tasks'],
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
    getAllTasks: builder.query({
      query: ({ boardId, columnId }) => `boards/${boardId}/columns/${columnId}/tasks`,
      providesTags: ['Tasks'],
    }),
    getTaskById: builder.query({
      query: ({ boardId, columnId, taskId }) =>
        `boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      providesTags: ['Tasks'],
    }),
    createTask: builder.mutation<
      ITaskResponse,
      { boardId: string; columnId: string; body: TTaskRequest }
    >({
      query: ({ boardId, columnId, body }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Tasks'],
    }),
    updateTask: builder.mutation<ITaskResponse, { idTask: string; body: TTaskRequest }>({
      query: ({ idTask, body }) => ({
        url: `boards/${body.boardId}/columns/${body.columnId}/tasks/${idTask}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Tasks'],
    }),
    deleteTask: builder.mutation({
      query: ({ boardId, columnId, idTask }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks/${idTask}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),
  }),
});

export const {
  useGetAllBoardsQuery,
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useGetBoardByIdQuery,
  useUpdateBoardMutation,
  useGetAllColumnsQuery,
  useCreateColumnMutation,
  useDeleteColumnMutation,
  useGetColumnByIdQuery,
  useUpdateColumnMutation,
  useGetAllTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
} = boardAPI;
