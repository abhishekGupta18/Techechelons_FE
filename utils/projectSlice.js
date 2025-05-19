import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "projects",
  initialState: null,
  reducers: {
    addProjects: (state, action) => action.payload,
  },
});

export const { addProjects } = projectSlice.actions;

export default projectSlice.reducer;
