import { LoginInput, User, UserRegisterInput } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const myAPIs = createApi({
  reducerPath: "myApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  endpoints: (builder) => ({
    signUpUser: builder.mutation<User, UserRegisterInput>({
      query: (body) => ({
        url: "user/signup",
        method: "POST",
        body,
      }),
    }),

    signInUser: builder.mutation<User, LoginInput>({
      query: (body) => ({
        url: "user/signin",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const sessionApi = createApi({
  reducerPath: "sessionApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/auth", credentials: "include" }),
  endpoints: (builder) => ({
    getSessionUser: builder.query<{ user: User | null }, void>({
      query: () => "/session-user",
    }),
  }),
});

export const { useSignUpUserMutation, useSignInUserMutation } = myAPIs;
export const { useGetSessionUserQuery } = sessionApi;
