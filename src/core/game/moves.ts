import { BoardPosition, Piece, PiecesPositionDictionary } from "../../types/game";
import { makeStringPosition } from "./position";
import { boardRanks } from "./board";

/**
 * Check if position exists in positions collection.
 */
export function isPositionInsidePositionsCollection(
  position: BoardPosition,
  positions: BoardPosition[]
) {
  return positions.map(makeStringPosition).includes(makeStringPosition(position));
}

const calcRankStraightMoves = (piece: Piece, pieces: PiecesPositionDictionary): BoardPosition[] => {
  if (!piece.position) {
    return [];
  }

  const [file, rank] = piece.position;
  const pieceRankIndex = boardRanks.indexOf(rank);

  const beforePiece = boardRanks.slice(0, pieceRankIndex).reverse();
  const afterPiece = boardRanks.slice(pieceRankIndex + 1);

  return [beforePiece, afterPiece].flatMap<BoardPosition>((ranks) => {
    let blocked = false;
    return ranks.reduce<BoardPosition[]>((acc, rank) => {
      if (blocked) {
        return acc;
      }

      const pieceAtPosition = pieces[makeStringPosition([file, rank])];

      if (pieceAtPosition) {
        blocked = true;

        if (pieceAtPosition.color === piece.color) {
          return acc;
        }
      }

      acc.push([file, rank]);

      return acc;
    }, []);
  });
};

export const calcStraightMoves = (
  piece: Piece,
  pieces: PiecesPositionDictionary
): BoardPosition[] => {
  return calcRankStraightMoves(piece, pieces);
};
