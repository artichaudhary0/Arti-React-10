import { configureStore } from "@reduxjs/toolkit";
import getReducer from "../feature/ApiSlice";

export const store = configureStore({
  reducer: {
    posts: getReducer,
  },
});
