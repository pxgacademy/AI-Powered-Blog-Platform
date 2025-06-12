import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserType {
  user: { _id: string; name?: string; email: string } | null;
}

const initialState: UserType = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType["user"]>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
