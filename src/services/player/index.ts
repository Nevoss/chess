import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as customActions from "./actions";
import state from "./state";
import { PieceColor, PieceId } from "../../types/game";

const slice = createSlice({
  name: "player",
  initialState: state,
  reducers: {
    setSelectedPieceId: (state, action: PayloadAction<PieceId>) => {
      state.selectedPieceId = action.payload;
    },
    removeSelection: (state) => {
      state.selectedPieceId = null;
    },
    changeColor: (state, action: PayloadAction<PieceColor>) => {
      state.color = action.payload;
    },
  },
});

export * as selectors from "./selectors";
export * as middlewares from "./middlewares";
export const reducer = slice.reducer;
export const actions = { ...slice.actions, ...customActions };
