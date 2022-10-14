import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import state from "./state";
import * as customActions from "./actions";
import { BoardPosition, PieceId } from "../../types/game";

const slice = createSlice({
  name: "game",
  initialState: state,
  reducers: {
    updatePiecePosition(
      state,
      { payload: { id, position } }: PayloadAction<{ id: PieceId; position: BoardPosition }>
    ) {
      const index = state.pieces.findIndex((piece) => piece.id === id);

      state.pieces[index].position = position;
    },
    removePiecePosition(state, { payload: id }: PayloadAction<PieceId>) {
      const index = state.pieces.findIndex((piece) => piece.id === id);

      state.pieces[index].position = null;
    },
  },
});

export * as selectors from "./selectors";
export * as middlewares from "./middlewares";
export const reducer = slice.reducer;
export const actions = { ...slice.actions, ...customActions };
