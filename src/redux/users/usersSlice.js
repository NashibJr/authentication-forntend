import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getLoggedInUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { getLoggedInUser } = usersSlice.actions;

export default usersSlice;
