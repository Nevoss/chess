import { createAction } from "@reduxjs/toolkit";
import { BoardPosition, PieceId } from "../../types/game";

export const movePiece = createAction("game/movePiece", (id: PieceId, position: BoardPosition) => ({
  payload: { id, position },
}));
