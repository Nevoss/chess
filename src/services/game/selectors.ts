import { RootState } from "../../store";
import { createSelector } from "reselect";
import { makeStringPosition } from "../../core/game/position";
import { calcStraightMoves } from "../../core/game/moves";
import {
  BoardPosition,
  PiecesIdDictionary,
  PieceId,
  PiecesPositionDictionary,
  PiecesAvailableMovesDictionary,
} from "../../types/game";

export const selectPieces = (state: RootState) => state.game.pieces;
export const selectTurn = (state: RootState) => state.game.turn;

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

export const selectPiecesOptionalMovesDictionary = createSelector(
  [selectPiecesPositionDictionary],
  (pieces) => {
    return Object.values(pieces).reduce<Partial<PiecesAvailableMovesDictionary>>((acc, piece) => {
      if (["queen", "rook"].includes(piece.type)) {
        acc[piece.id] = calcStraightMoves(piece, pieces);
      } else {
        acc[piece.id] = [];
      }

      return acc;
    }, {}) as PiecesAvailableMovesDictionary;
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

export const selectPieceOptionalMovesById = createSelector(
  [selectPiecesOptionalMovesDictionary, (_, id: PieceId) => id],
  (pieces, id) => pieces[id] || []
);
