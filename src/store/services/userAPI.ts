import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser, TUpdateUser } from 'interfaces/IUser';

export const userAPI = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://back-project-app-production.up.railway.app/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => 'users',
    }),
    getUserById: builder.query({
      query: (id) => `users/${id}`,
    }),
    updateUser: builder.mutation<IUser, TUpdateUser>({
      query: (body) => ({
        url: `users/${body._id}`,
        method: 'PUT',
        body: body.user,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id._id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} = userAPI;
