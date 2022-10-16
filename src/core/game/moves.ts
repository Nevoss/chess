import { BoardPosition, Piece, PiecesPositionDictionary, PieceType } from "../../types/game";
import { makeStringPosition } from "./position";
import { boardFiles, boardRanks } from "./board";

/**
 * Check if position exists in positions collection.
 */
export function isPositionInsidePositionsCollection(
  position: BoardPosition,
  positions: BoardPosition[]
) {
  return positions.map(makeStringPosition).includes(makeStringPosition(position));
}

type MoveCalculationFunction = (
  [fileIndex, rankIndex]: [number, number],
  delta: number
) => BoardPosition;

type MoveCalculationKeys =
  | "toTop"
  | "toBottom"
  | "toLeft"
  | "toRight"
  | "toTopLeft"
  | "toTopRight"
  | "toBottomLeft"
  | "toBottomRight"
  | "knightToTopLeft"
  | "knightToTopRight"
  | "knightToBottomLeft"
  | "knightToBottomRight"
  | "knightToLeftTop"
  | "knightToLeftBottom"
  | "knightToRightTop"
  | "knightToRightBottom";

type MoveCalculation = {
  [key in MoveCalculationKeys]: MoveCalculationFunction;
};

type PieceMovesOptions = {
  [key in PieceType]: {
    steps: number;
    movesFns: MoveCalculationFunction[];
  };
};

const movesCalculation: MoveCalculation = {
  toTop: ([fileIndex, rankIndex], delta) => {
    return [boardFiles[fileIndex], boardRanks[rankIndex + delta]];
  },
  toBottom: ([fileIndex, rankIndex], delta) => {
    return [boardFiles[fileIndex], boardRanks[rankIndex - delta]];
  },
  toLeft: ([fileIndex, rankIndex], delta) => {
    return [boardFiles[fileIndex - delta], boardRanks[rankIndex]];
  },
  toRight: ([fileIndex, rankIndex], delta) => {
    return [boardFiles[fileIndex + delta], boardRanks[rankIndex]];
  },
  toTopLeft: ([fileIndex, rankIndex], delta) => {
    return [boardFiles[fileIndex - delta], boardRanks[rankIndex + delta]];
  },
  toTopRight: ([fileIndex, rankIndex], delta) => {
    return [boardFiles[fileIndex + delta], boardRanks[rankIndex + delta]];
  },
  toBottomLeft: ([fileIndex, rankIndex], delta) => {
    return [boardFiles[fileIndex - delta], boardRanks[rankIndex - delta]];
  },
  toBottomRight: ([fileIndex, rankIndex], delta) => {
    return [boardFiles[fileIndex + delta], boardRanks[rankIndex - delta]];
  },
  knightToTopLeft: ([fileIndex, rankIndex], delta) => {
    return [boardFiles[fileIndex - delta], boardRanks[rankIndex + delta * 2]];
  },
  knightToLeftTop: ([fileIndex, rankIndex], delta) => {
    return [boardFiles[fileIndex - delta * 2], boardRanks[rankIndex + delta]];
  },
  knightToBottomLeft: ([fileIndex, rankIndex], delta) => {
    return [boardFiles[fileIndex - delta], boardRanks[rankIndex - delta * 2]];
  },
  knightToLeftBottom: ([fileIndex, rankIndex], delta) => {
    return [boardFiles[fileIndex - delta * 2], boardRanks[rankIndex - delta]];
  },
  knightToTopRight: ([fileIndex, rankIndex], delta) => {
    return [boardFiles[fileIndex + delta], boardRanks[rankIndex + delta * 2]];
  },
  knightToRightTop: ([fileIndex, rankIndex], delta) => {
    return [boardFiles[fileIndex + delta * 2], boardRanks[rankIndex + delta]];
  },
  knightToBottomRight: ([fileIndex, rankIndex], delta) => {
    return [boardFiles[fileIndex + delta], boardRanks[rankIndex - delta * 2]];
  },
  knightToRightBottom: ([fileIndex, rankIndex], delta) => {
    return [boardFiles[fileIndex + delta * 2], boardRanks[rankIndex - delta]];
  },
};

const piecesMovesOptions: PieceMovesOptions = {
  queen: {
    steps: 7,
    movesFns: [
      movesCalculation.toTop,
      movesCalculation.toBottom,
      movesCalculation.toLeft,
      movesCalculation.toRight,
      movesCalculation.toTopLeft,
      movesCalculation.toTopRight,
      movesCalculation.toBottomLeft,
      movesCalculation.toBottomRight,
    ],
  },
  rook: {
    steps: 7,
    movesFns: [
      movesCalculation.toTop,
      movesCalculation.toBottom,
      movesCalculation.toLeft,
      movesCalculation.toRight,
    ],
  },
  bishop: {
    steps: 7,
    movesFns: [
      movesCalculation.toTopLeft,
      movesCalculation.toTopRight,
      movesCalculation.toBottomLeft,
      movesCalculation.toBottomRight,
    ],
  },
  knight: {
    steps: 1,
    movesFns: [
      movesCalculation.knightToTopLeft,
      movesCalculation.knightToLeftTop,
      movesCalculation.knightToBottomLeft,
      movesCalculation.knightToLeftBottom,
      movesCalculation.knightToTopRight,
      movesCalculation.knightToRightTop,
      movesCalculation.knightToBottomRight,
      movesCalculation.knightToRightBottom,
    ],
  },
  pawn: {
    steps: 1,
    movesFns: [],
  },
  king: {
    steps: 1,
    movesFns: [],
  },
  // pawn: {
  //   steps: (piece: Piece) => (piece.hasMoved ? 1 : 2),
  //   movesFns: (piece: Piece) =>
  //     piece.color === "white"
  //       ? [movesCalculation.toTop, movesCalculation.toTopLeft, movesCalculation.toTopRight]
  //       : [
  //           movesCalculation.toBottom,
  //           movesCalculation.toBottomLeft,
  //           movesCalculation.toBottomRight,
  //         ],
  //   validateMove: ({
  //     piece,
  //     move,
  //     pieces,
  //   }: {
  //     piece: Piece;
  //     move: BoardPosition;
  //     pieces: PiecesPositionDictionary;
  //   }) => {
  //     // return !pieces[makeStringPosition(position)];
  //   },
  // },
  // king: {
  //   // steps: (piece: Piece, pieces: Piece[]) => (piece.hasMoved ? 1 : 2),
  // },
};

export function calcPieceOptionalMoves(
  piece: Piece,
  pieces: PiecesPositionDictionary
): BoardPosition[] {
  if (!piece.position) {
    return [];
  }

  const [file, rank] = piece.position;

  let optionalMoves = piecesMovesOptions[piece.type].movesFns.map((moveFn) => ({
    moveFn,
    shouldRemove: false,
  }));

  const fileIndex = boardFiles.indexOf(file);
  const rankIndex = boardRanks.indexOf(rank);

  const moves: BoardPosition[] = [];

  for (let i = 0; i < piecesMovesOptions[piece.type].steps; i++) {
    for (let j = 0; j < optionalMoves.length; j++) {
      const move = optionalMoves[j].moveFn([fileIndex, rankIndex], i + 1),
        isValidMove = move[0] && move[1];

      if (!isValidMove) {
        optionalMoves[j].shouldRemove = true;

        continue;
      }

      const pieceAtPosition = pieces[makeStringPosition(move)];

      if (pieceAtPosition) {
        optionalMoves[j].shouldRemove = true;

        if (pieceAtPosition.color === piece.color) {
          continue;
        }
      }

      moves.push(move);
    }

    optionalMoves = optionalMoves.filter((move) => !move.shouldRemove);

    if (optionalMoves.length === 0) {
      break;
    }
  }

  return moves;
}
