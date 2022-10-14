import { createAction } from "@reduxjs/toolkit";
import { PieceId } from "../../types/game";

export const selectPiece = createAction("player/selectPiece", (id: PieceId) => ({ payload: id }));
export const setSelectedPieceId = createAction("player/setSelectedPieceId", (id: PieceId) => ({
  payload: id,
}));
