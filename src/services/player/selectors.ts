import { RootState } from "../../store";
import { createSelector } from "reselect";
import { selectors as gameSelectors } from "../game";
import { BoardPosition } from "../../types/game";
import { makeStringPosition } from "../../utils/game";

export const selectSelectedPieceId = (state: RootState) => state.player.selectedPieceId;
export const selectColor = (state: RootState) => state.player.color;

export const selectCanSelectPiece = createSelector(
  [selectColor, gameSelectors.selectPieceById],
  (color, piece?) => !!piece?.position?.length && color === piece?.color
);

export const selectSelectedPiece = createSelector(
  [selectSelectedPieceId, gameSelectors.selectPiecesIdDictionary],
  (id, pieces) => (id ? pieces[id] : null) || null
);

export const selectIsPieceSelected = createSelector(
  [selectSelectedPieceId, gameSelectors.selectPieceById],
  (selectedPieceId, piece?) => selectedPieceId === piece?.id
);

export const selectIsOptionalMoveForSelectedPiece = createSelector(
  [
    selectSelectedPieceId,
    gameSelectors.selectPiecesOptionalMovesDictionary,
    (_, position: BoardPosition) => position,
  ],
  (selectedPieceId, optionalMoves, position) =>
    selectedPieceId
      ? optionalMoves[selectedPieceId]
          .map((position) => makeStringPosition(position))
          .includes(makeStringPosition(position))
      : false
);
