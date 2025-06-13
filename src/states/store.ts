import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { myAPIs, sessionApi } from "./myApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { blogApi } from "./blogApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [myAPIs.reducerPath]: myAPIs.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [sessionApi.reducerPath]: sessionApi.reducer,
  },

  middleware: (middle) =>
    middle().concat(
      myAPIs.middleware,
      blogApi.middleware,
      sessionApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
