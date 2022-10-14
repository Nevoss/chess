import { createSlice } from "@reduxjs/toolkit";
import state from "./state";

const slice = createSlice({
  name: "game",
  initialState: state,
  reducers: {},
});

export * as selectors from "./selectors";
export const reducer = slice.reducer;
