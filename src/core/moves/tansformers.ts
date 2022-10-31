import { Move } from "@/types/move";
import { BoardPositionMap } from "@/types/board";
import { OnBoardPiece } from "@/types/piece";
import { getPositionDelta } from "@/core/position";

interface TransformersMove extends Move {
  invalid: boolean;
  blocking: boolean;
}

export type MoveTransformer = (
  move: TransformersMove,
  piece: OnBoardPiece,
  board: BoardPositionMap
) => TransformersMove;

export function pipeTransformers(transformers: MoveTransformer[]) {
  return (move: TransformersMove, piece: OnBoardPiece, board: BoardPositionMap) => {
    let result = move;

    for (const transformer of transformers) {
      result = transformer(result, piece, board);

      if (result.blocking && result.invalid) {
        break;
      }
    }

    return result;
  };
}

export const friendlyPieceTransformer: MoveTransformer = (move, piece, board) => {
  const [{ to }] = move.changes;
  const pieceAtTo = board.get(to);

  if (pieceAtTo && pieceAtTo.color === piece.color) {
    return { ...move, invalid: true, blocking: true };
  }

  return move;
};

export const opponentPieceTransformer: MoveTransformer = (move, piece, board) => {
  const [{ to }] = move.changes;
  const targetPiece = board.get(to);

  if (targetPiece && targetPiece.color !== piece.color) {
    return {
      ...move,
      changes: [...move.changes, { pieceId: targetPiece.id, from: targetPiece.position, to: null }],
      blocking: true,
    };
  }

  return move;
};

export const pawnColorDirectionTransformer: MoveTransformer = (move, piece) => {
  const [{ from, to }] = move.changes;
  const [, rankDelta] = getPositionDelta(from, to);

  if ((piece.color === "white" && rankDelta <= 0) || (piece.color === "black" && rankDelta >= 0)) {
    return { ...move, invalid: true, blocking: true };
  }

  return move;
};

export const pawnFirstMoveTransformer: MoveTransformer = (move, piece) => {
  const [{ from, to }] = move.changes;
  const [, rankDelta] = getPositionDelta(from, to);

  if (piece.hasMoved && Math.abs(rankDelta) === 2) {
    return { ...move, invalid: true, blocking: true };
  }

  return move;
};

export const pawnStraightMoveTransformer: MoveTransformer = (move, piece, board) => {
  const [{ from, to }] = move.changes;
  const [fileDelta, rankDelta] = getPositionDelta(from, to);

  // Check if straight move
  if (!(fileDelta === 0 && rankDelta !== 0)) {
    return move;
  }

  const pieceAtTo = board.get(to);

  // Any piece at straight move target is invalid
  if (pieceAtTo) {
    return { ...move, invalid: true, blocking: true };
  }

  return move;
};

export const pawnDiagonalMoveTransformer: MoveTransformer = (move, piece, board) => {
  const [{ from, to }] = move.changes;
  const [fileDelta, rankDelta] = getPositionDelta(from, to);

  // Check if diagonal move.
  if (Math.abs(fileDelta) !== Math.abs(rankDelta)) {
    return move;
  }

  const targetPiece = board.get(to);

  // If no piece at diagonal move target, or piece is friendly, it is invalid.
  if (!targetPiece || targetPiece.color === piece.color) {
    return { ...move, invalid: true, blocking: true };
  }

  return {
    ...move,
    changes: [...move.changes, { pieceId: targetPiece.id, from: targetPiece.position, to: null }],
    blocking: true,
  };
};
