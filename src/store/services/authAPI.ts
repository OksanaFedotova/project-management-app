import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TSigninRequest, ISigninResponse, ISignupRequest, IUser } from 'interfaces/IUser';
import { RootState } from '../store';

export const authAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://serene-everglades-05199.herokuapp.com/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signin: builder.mutation<ISigninResponse, TSigninRequest>({
      query: (body) => ({
        url: 'signin',
        method: 'POST',
        body: body,
      }),
    }),
    signup: builder.mutation<IUser, ISignupRequest>({
      query: (body) => ({
        url: 'signup',
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const { useSigninMutation, useSignupMutation } = authAPI;
