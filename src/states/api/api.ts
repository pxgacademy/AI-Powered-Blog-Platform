import { User } from "@/types/user.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const myAPIs = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  endpoints: (builder) => ({
    signUpUser: builder.mutation<User, User>({
      query: (body) => ({
        url: "signup",
        method: "POST",
        body,
      }),
    }),

    signInUser: builder.mutation<User, User>({
      query: (body) => ({
        url: "signin",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSignUpUserMutation, useSignInUserMutation } = myAPIs;
