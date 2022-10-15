import { createAction } from "@reduxjs/toolkit";
import { BoardPosition, PieceId } from "../../types/game";

export const togglePieceSelection = createAction("player/togglePieceSelection", (id: PieceId) => ({
  payload: id,
}));
export const moveSelectedPiece = createAction(
  "player/moveSelectedPiece",
  (position: BoardPosition) => ({
    payload: position,
  })
);
