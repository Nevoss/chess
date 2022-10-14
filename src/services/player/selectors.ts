import { RootState } from "../../store";
import { createSelector } from "reselect";
import { selectors as gameSelectors } from "../game";
import { BoardPosition } from "../../types/game";
import { makeStringPosition } from "../../utils/game";

export const selectSelectedPieceId = (state: RootState) => state.player.selectedPieceId;
export const selectColor = (state: RootState) => state.player.color;

export const selectCanSelectPiece = createSelector(
  [selectColor, gameSelectors.selectPieceById],
  (color, piece?) => color === piece?.color
);

export const selectIsPieceSelected = createSelector(
  [selectSelectedPieceId, gameSelectors.selectPieceById],
  (selectedPieceId, piece?) => selectedPieceId === piece?.id
);

export const selectIsOptionalMoveForSelectedPiece = createSelector(
  [
    selectSelectedPieceId,
    gameSelectors.selectPiecesOptionalMovesAsString,
    (_, position: BoardPosition) => position,
  ],
  (selectedPieceId, optionalMoves, position) =>
    selectedPieceId ? optionalMoves[selectedPieceId].includes(makeStringPosition(position)) : false
);
