import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from 'configs/constants';
import { ITaskUpdate, TTaskRequest } from 'interfaces/IBoard';

export const taskAPI = createApi({
  reducerPath: 'taskApi',
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
  tagTypes: ['Tasks'],
  endpoints: (builder) => ({
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
      ITaskUpdate,
      { boardId: string; columnId: string; body: TTaskRequest }
    >({
      query: ({ boardId, columnId, body }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Tasks'],
    }),
    updateTask: builder.mutation<ITaskUpdate, { idTask: string; body: TTaskRequest }>({
      query: ({ idTask, body }) => ({
        url: `boards/${body.boardId}/columns/${body.columnId}/tasks/${idTask}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Tasks'],
    }),
    deleteTask: builder.mutation({
      query: ({ idBoard, idColumn, idTask }) => ({
        url: `boards/${idBoard}/colimns/${idColumn}/tasks/${idTask}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
} = taskAPI;
