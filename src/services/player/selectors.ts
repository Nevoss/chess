import { RootState } from "../../store";
import { createSelector } from "reselect";
import { selectors as gameSelectors } from "../game";

export const selectSelectedPieceId = (state: RootState) => state.player.selectedPieceId;
export const selectColor = (state: RootState) => state.player.color;

export const selectSelectedPiece = createSelector(
  [selectSelectedPieceId, gameSelectors.selectPiecesIdDictionary],
  (id, pieces) => (id ? pieces[id] : null) || null
);
