import { configureStore } from "@reduxjs/toolkit";

import projectReducer from "./projectSlice";

export const appStore = configureStore({
  reducer: {
    projects: projectReducer,
  },
});
