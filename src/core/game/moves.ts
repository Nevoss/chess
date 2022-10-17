import {
  BoardPosition,
  Piece,
  PiecesPositionDictionary,
  PieceType,
  PieceColor,
} from "../../types/game";
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

type DirectionKey =
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
  [key in DirectionKey]: MoveCalculationFunction;
};

type ValidateMoveFunction = (context: {
  piece: Piece;
  direction: DirectionKey;
  moveTo: BoardPosition;
  pieceInNewPosition?: Piece | null;
}) => boolean;

type PiecesMoveOptions = {
  [key in PieceType]: {
    steps: number | ((piece: Piece) => number);
    movesFns: MoveCalculationFunction[] | ((piece: Piece) => MoveCalculationFunction[]);
    validateMoveFns?: ValidateMoveFunction[];
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

const piecesMoveOptions: PiecesMoveOptions = {
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
    steps: (piece: Piece) => (piece.hasMoved ? 1 : 2),
    movesFns: (piece: Piece) =>
      piece.color === "white"
        ? [movesCalculation.toTop, movesCalculation.toTopLeft, movesCalculation.toTopRight]
        : [
            movesCalculation.toBottom,
            movesCalculation.toBottomLeft,
            movesCalculation.toBottomRight,
          ],
    validateMoveFns: [
      // Pawn cannot capture piece in front of it.
      ({ direction, pieceInNewPosition }) => {
        return !["toTop", "toBottom"].includes(direction) || !pieceInNewPosition;
      },
      // Pawn can move diagonally only if there is a piece to capture.
      ({ direction, pieceInNewPosition, piece }) => {
        return (
          !["toTopLeft", "toTopRight", "toBottomLeft", "toBottomRight"].includes(direction) ||
          (!!pieceInNewPosition && pieceInNewPosition.color !== piece.color)
        );
      },
    ],
  },
  king: {
    steps: 1,
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
};

function isPositionUnderAttack(
  color: PieceColor,
  position: BoardPosition,
  pieces: PiecesPositionDictionary
) {
  return Object.values(pieces).some(
    (piece) =>
      piece.color !== color &&
      isPositionInsidePositionsCollection(position, calcPieceOptionalMoves(piece, pieces))
  );
}

export function calcPieceOptionalMoves(
  piece: Piece,
  pieces: PiecesPositionDictionary
): BoardPosition[] {
  if (!piece.position) {
    return [];
  }

  const [file, rank] = piece.position;
  const pieceMoveOptions = piecesMoveOptions[piece.type];

  const fileIndex = boardFiles.indexOf(file);
  const rankIndex = boardRanks.indexOf(rank);

  const steps =
    typeof pieceMoveOptions.steps === "function"
      ? pieceMoveOptions.steps(piece)
      : pieceMoveOptions.steps;

  let optionalMoves = (
    typeof pieceMoveOptions.movesFns === "function"
      ? pieceMoveOptions.movesFns(piece)
      : pieceMoveOptions.movesFns
  ).map((moveFn) => ({ moveFn, shouldRemove: false }));

  const validateMoveFns: ValidateMoveFunction[] = [
    ({ moveTo }) => !!moveTo[0] && !!moveTo[1], // Check for valid position
    ({ pieceInNewPosition }) => !pieceInNewPosition || pieceInNewPosition.color !== piece.color, // Check for friendly piece
    ...(pieceMoveOptions.validateMoveFns || []),
  ];

  const moves: BoardPosition[] = [];

  for (let i = 0; i < steps; i++) {
    for (let j = 0; j < optionalMoves.length; j++) {
      const moveFn = optionalMoves[j].moveFn;
      const moveTo = moveFn([fileIndex, rankIndex], i + 1);
      const direction = moveFn.name as DirectionKey;
      const pieceInNewPosition = pieces[makeStringPosition(moveTo)];
      const isValidMove = validateMoveFns.every((fn) =>
        fn({ direction, moveTo, piece, pieceInNewPosition })
      );

      if (!isValidMove || pieceInNewPosition) {
        optionalMoves[j].shouldRemove = true;

        if (!isValidMove) {
          continue;
        }
      }

      moves.push(moveTo);
    }

    optionalMoves = optionalMoves.filter((move) => !move.shouldRemove);

    if (optionalMoves.length === 0) {
      break;
    }
  }

  // TODO: en passant, castling, and pawn promotion

  return moves;
}
