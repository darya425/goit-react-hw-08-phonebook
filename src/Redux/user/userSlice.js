import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ['User'],
  endpoints: builder => ({
    fetchCurrentUser: builder.query({
      query: () => `/users/current`,
      invalidatesTags: ['User'],
    }),
    createUser: builder.mutation({
      query: ({ user }) => ({
        url: '/users/signup',
        method: 'POST',
        body: {
          name: user.name,
          email: user.email,
          password: user.password,
        },
      }),
      invalidatesTags: ['User'],
    }),
    loginUser: builder.mutation({
      query: ({ user }) => ({
        url: '/users/login',
        method: 'POST',
        body: {
          email: user.email,
          password: user.password,
        },
      }),
      invalidatesTags: ['User'],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useFetchCurrentUserQuery,
  useCreateUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = userApi;
