import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserData: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { getUserData } = usersSlice.actions;

export default usersSlice;
