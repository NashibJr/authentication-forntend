import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./usersSlice";

const store = configureStore({
  reducer: {
    user: usersSlice.reducer,
  },
});

export default store;
