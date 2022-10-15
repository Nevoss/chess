import { createSlice } from "@reduxjs/toolkit";
import * as customActions from "./actions";
import state from "./state";

const slice = createSlice({
  name: "player",
  initialState: state,
  reducers: {
    setSelectedPieceId: (state, action) => {
      state.selectedPieceId = action.payload;
    },
    removeSelection: (state) => {
      state.selectedPieceId = null;
    },
  },
});

export * as selectors from "./selectors";
export * as middlewares from "./middlewares";
export const reducer = slice.reducer;
export const actions = { ...slice.actions, ...customActions };
