import { BoardPosition, Piece, PiecesPositionDictionary } from "../../types/game";
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
  | "toBottomRight";

type MoveCalculation = {
  [key in MoveCalculationKeys]: MoveCalculationFunction;
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
};

export function calcQueenMoves(piece: Piece, pieces: PiecesPositionDictionary): BoardPosition[] {
  if (!piece.position) {
    return [];
  }

  const [file, rank] = piece.position;

  let optionalMoves = [
    movesCalculation.toTop,
    movesCalculation.toBottom,
    movesCalculation.toLeft,
    movesCalculation.toRight,
    movesCalculation.toTopLeft,
    movesCalculation.toTopRight,
    movesCalculation.toBottomLeft,
    movesCalculation.toBottomRight,
  ];

  const fileIndex = boardFiles.indexOf(file);
  const rankIndex = boardRanks.indexOf(rank);

  const moves: BoardPosition[] = [];

  for (let i = 0; i < boardRanks.length; i++) {
    for (const moveFn of optionalMoves) {
      const move = moveFn([fileIndex, rankIndex], i + 1);

      const isValidMove = move[0] && move[1];

      if (!isValidMove) {
        continue;
      }

      // const pieceAtPosition = pieces[makeStringPosition(move)];
      //
      // if (pieceAtPosition) {
      //   optionalMoves = optionalMoves.splice(optionalMoves.indexOf(moveFn), 1);
      //
      //   if (pieceAtPosition.color === piece.color) {
      //     continue;
      //   }
      // }

      moves.push(move);
    }
  }

  return moves;
}
