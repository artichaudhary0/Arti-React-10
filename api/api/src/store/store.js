import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../feature/ApiSlice";

export const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});
