import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SigninRequest, SigninResponse, SignupRequest, User } from 'interfaces/IUser';
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
    signin: builder.mutation<SigninResponse, SigninRequest>({
      query: (body) => ({
        url: 'signin',
        method: 'POST',
        body: body,
      }),
    }),
    signup: builder.mutation<User, SignupRequest>({
      query: (body) => ({
        url: 'signup',
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const { useSigninMutation, useSignupMutation } = authAPI;
