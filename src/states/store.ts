import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { myAPIs } from "./myApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [myAPIs.reducerPath]: myAPIs.reducer,
  },

  middleware: (middle) => middle().concat(myAPIs.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
