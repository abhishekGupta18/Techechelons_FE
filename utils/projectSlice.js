import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "projects",
  initialState: null,
  reducers: {
    addProjects: (state, action) => action.payload,
  },
});

export const { addProjects } = feedSlice.actions;

export default projectSlice.reducer;
