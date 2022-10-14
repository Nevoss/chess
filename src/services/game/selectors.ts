import { RootState } from "../../store";
import { createSelector } from "reselect";
import {
  BoardPosition,
  PiecesIdDictionary,
  PieceId,
  PiecesPositionDictionary,
  PiecesAvailableMovesAsStringDictionary,
} from "../../types/game";
import { calcStraightMoves, makeStringPosition } from "../../utils/game";

export const selectPieces = (state: RootState) => state.game.pieces;

export const selectPiecesPositionDictionary = createSelector([selectPieces], (pieces) => {
  return pieces.reduce<PiecesPositionDictionary>((acc, piece) => {
    if (piece.position) {
      acc[makeStringPosition(piece.position)] = piece;
    }

    return acc;
  }, {});
});

export const selectPiecesIdDictionary = createSelector([selectPieces], (pieces) => {
  return pieces.reduce<Partial<PiecesIdDictionary>>((acc, piece) => {
    acc[piece.id] = piece;

    return acc;
  }, {}) as PiecesIdDictionary;
});

export const selectPiecesOptionalMovesAsString = createSelector(
  [selectPiecesPositionDictionary],
  (pieces) => {
    return Object.values(pieces).reduce<Partial<PiecesAvailableMovesAsStringDictionary>>(
      (acc, piece) => {
        if (["queen", "rook"].includes(piece.type)) {
          acc[piece.id] = calcStraightMoves(piece, pieces).map((position) =>
            makeStringPosition(position)
          );
        } else {
          acc[piece.id] = [];
        }

        return acc;
      },
      {}
    ) as PiecesAvailableMovesAsStringDictionary;
  }
);

export const selectPieceById = createSelector(
  [selectPiecesIdDictionary, (_, id: PieceId) => id],
  (pieces, id) => pieces[id]
);

export const selectPieceByPosition = createSelector(
  [selectPiecesPositionDictionary, (_, position: BoardPosition) => position],
  (pieces, position) => pieces[makeStringPosition(position)] || null
);
