import {
  BoardFile,
  BoardPosition,
  BoardPositionAsString,
  BoardRank,
  Piece,
  PiecesPositionDictionary,
} from "../types/game";

export const boardRanks: BoardRank[] = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const boardFiles: BoardFile[] = ["A", "B", "C", "D", "E", "F", "G", "H"];
export const firstBoardRank = boardRanks[0];
export const firstBoardFile = boardFiles[0];

export const makeStringPosition = ([file, rank]: BoardPosition): BoardPositionAsString => {
  return `${file}${rank}`;
};

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
