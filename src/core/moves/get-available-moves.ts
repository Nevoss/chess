import { BoardPosition, BoardPositionMap } from "@/types/board";
import { Move } from "@/types/move";
import {
  MoveHandler,
  toBottom,
  toLeft,
  toRight,
  toTop,
  toTopLeft,
  toTopRight,
  toBottomLeft,
  toBottomRight,
  knightToTopLeft,
  knightToBottomLeft,
  knightToTopRight,
  knightToBottomRight,
  knightToLeftTop,
  knightToLeftBottom,
  knightToRightTop,
  knightToRightBottom,
} from "./handlers";
import {
  MoveTransformer,
  friendlyPieceTransformer,
  opponentPieceTransformer,
  pawnColorDirectionTransformer,
  pawnDiagonalMoveTransformer,
  pawnFirstMoveTransformer,
  pawnStraightMoveTransformer,
  pipeTransformers,
} from "@/core/moves/tansformers";
import { PieceType } from "@/types/piece";
import getBoardPositionIndexes from "@/core/position";
import { GameState } from "@/types/game";

const piecesMoveOptions: Record<
  PieceType,
  { maxSteps: number; handlers: MoveHandler[]; transformers: MoveTransformer[] }
> = {
  king: {
    maxSteps: 2, // When castling, the king can move 2 steps.
    handlers: [
      toTop,
      toBottom,
      toRight,
      toLeft,
      toTopLeft,
      toTopRight,
      toBottomLeft,
      toBottomRight,
    ],
    transformers: [friendlyPieceTransformer, opponentPieceTransformer],
  },
  queen: {
    maxSteps: 7,
    handlers: [
      toTop,
      toBottom,
      toRight,
      toLeft,
      toTopLeft,
      toTopRight,
      toBottomLeft,
      toBottomRight,
    ],
    transformers: [friendlyPieceTransformer, opponentPieceTransformer],
  },
  bishop: {
    maxSteps: 7,
    handlers: [toTopLeft, toTopRight, toBottomLeft, toBottomRight],
    transformers: [friendlyPieceTransformer, opponentPieceTransformer],
  },
  knight: {
    maxSteps: 1,
    handlers: [
      knightToTopLeft,
      knightToBottomLeft,
      knightToTopRight,
      knightToBottomRight,
      knightToLeftTop,
      knightToLeftBottom,
      knightToRightTop,
      knightToRightBottom,
    ],
    transformers: [friendlyPieceTransformer, opponentPieceTransformer],
  },
  rook: {
    maxSteps: 7,
    handlers: [toTop, toBottom, toRight, toLeft],
    transformers: [friendlyPieceTransformer, opponentPieceTransformer],
  },
  pawn: {
    maxSteps: 2, // When the pawn has not moved, it can move 2 steps.
    handlers: [toTop, toBottom, toTopLeft, toTopRight, toBottomLeft, toBottomRight],
    transformers: [
      pawnColorDirectionTransformer,
      pawnFirstMoveTransformer,
      pawnStraightMoveTransformer,
      pawnDiagonalMoveTransformer,
    ],
  },
};

// Board State
// pieces
// canCastle: { white: { kingSide: boolean, queenSide: boolean }, black: { kingSide: boolean, queenSide: boolean } }
// enPassantPosition: BoardPosition | null
// halfMoveClock: number
// fullMoveNumber: number
// turn: "white" | "black"
// history: Move[]

export default function getAvailableMoves(position: BoardPosition, gameState: GameState): Move[] {
  const piece = board.get(position);

  if (!piece) {
    return [];
  }

  const { maxSteps, handlers, transformers } = piecesMoveOptions[piece.type];
  const [fileIndex, rankIndex] = getBoardPositionIndexes(position);

  const moves: Move[] = [];
  let currentHandlers = new Set<MoveHandler>([...handlers]);

  // Run over the steps that the piece can make.
  for (let i = 0; i < maxSteps; i++) {
    // Run over the possible moves that the piece can make.
    for (const handler of currentHandlers) {
      const to = handler([fileIndex, rankIndex], i + 1);

      if (!to) {
        currentHandlers.delete(handler);

        continue;
      }

      const { invalid, blocking, ...move } = pipeTransformers(transformers)(
        {
          invalid: false,
          blocking: false,
          changes: [{ pieceId: piece.id, from: position, to }],
        },
        piece,
        board
      );

      if (blocking) {
        currentHandlers.delete(handler);
      }

      if (invalid) {
        continue;
      }

      moves.push(move);
    }

    if (currentHandlers.size === 0) {
      break;
    }
  }

  return moves;
}
