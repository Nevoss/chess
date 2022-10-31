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
import { MoveTransformer, pipeTransformers } from "@/core/moves/tansformers";
import { PieceType } from "@/types/piece";
import getBoardPositionIndexes from "@/core/position";

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
    transformers: [],
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
    transformers: [],
  },
  bishop: {
    maxSteps: 7,
    handlers: [toTopLeft, toTopRight, toBottomLeft, toBottomRight],
    transformers: [],
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
    transformers: [],
  },
  rook: {
    maxSteps: 7,
    handlers: [toTop, toBottom, toRight, toLeft],
    transformers: [],
  },
  pawn: {
    maxSteps: 2, // When the pawn has not moved, it can move 2 steps.
    handlers: [toTop, toBottom, toTopLeft, toTopRight, toBottomLeft, toBottomRight],
    transformers: [],
  },
};

export default function getOptionalMoves(position: BoardPosition, board: BoardPositionMap): Move[] {
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
