import { createAction } from "@reduxjs/toolkit";
import { BoardPosition, PieceId } from "../../types/game";

export const selectPiece = createAction("player/selectPiece", (id: PieceId) => ({ payload: id }));
export const moveSelectedPiece = createAction(
  "player/moveSelectedPiece",
  (position: BoardPosition) => ({
    payload: position,
  })
);
