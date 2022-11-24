import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from 'configs/constants';
import { TSigninRequest, ISigninResponse, ISignupRequest, IUser } from 'interfaces/IUser';

export const authAPI = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${URL}`,
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
