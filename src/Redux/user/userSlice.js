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
      providesTags: ['User'],
    }),
    createUser: builder.mutation({
      query: ({ name, email, password }) => ({
        url: '/users/signup',
        method: 'POST',
        body: {
          name: name,
          email: email,
          password: password,
        },
      }),
      invalidatesTags: ['User'],
    }),
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: '/users/login',
        method: 'POST',
        body: {
          email: email,
          password: password,
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
