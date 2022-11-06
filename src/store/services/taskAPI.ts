import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITaskUpdate, TTaskRequest } from 'interfaces/IBoard';

export const taskAPI = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://serene-everglades-05199.herokuapp.com/' }),
  endpoints: (builder) => ({
    getAllTasks: builder.query({
      query: ({ boardId, columnId }) => `boards/${boardId}/columns/${columnId}/tasks`,
    }),
    getTaskById: builder.query({
      query: ({ boardId, columnId, taskId }) =>
        `boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
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
    }),
    updateTask: builder.mutation<ITaskUpdate, { idTask: string; body: TTaskRequest }>({
      query: ({ idTask, body }) => ({
        url: `boards/${body.boardId}/columns/${body.columnId}/tasks/${idTask}`,
        method: 'PUT',
        body: body,
      }),
    }),
    deleteTask: builder.mutation({
      query: ({ idBoard, idColumn, idTask }) => ({
        url: `boards/${idBoard}/colimns/${idColumn}/tasks/${idTask}`,
        method: 'DELETE',
      }),
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
