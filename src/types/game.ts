export type PlayerColor = "white" | "black";
export type BoardRank = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
export type BoardFile = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
export type BoardPosition = [BoardFile, BoardRank];
export type BoardPositionAsString = `${BoardFile}${BoardRank}`;
export type PieceType = "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
export type PieceId =
  | "white-pawn-1"
  | "white-pawn-2"
  | "white-pawn-3"
  | "white-pawn-4"
  | "white-pawn-5"
  | "white-pawn-6"
  | "white-pawn-7"
  | "white-pawn-8"
  | "white-rook-1"
  | "white-rook-2"
  | "white-knight-1"
  | "white-knight-2"
  | "white-bishop-1"
  | "white-bishop-2"
  | "white-queen"
  | "white-king"
  | "black-pawn-1"
  | "black-pawn-2"
  | "black-pawn-3"
  | "black-pawn-4"
  | "black-pawn-5"
  | "black-pawn-6"
  | "black-pawn-7"
  | "black-pawn-8"
  | "black-rook-1"
  | "black-rook-2"
  | "black-knight-1"
  | "black-knight-2"
  | "black-bishop-1"
  | "black-bishop-2"
  | "black-queen"
  | "black-king";

export interface Piece {
  id: PieceId;
  type: PieceType;
  color: PlayerColor;
  position: BoardPosition | null; // null means the piece is captured
}

export type PiecesPositionDictionary = Partial<{
  [position in BoardPositionAsString]: Piece;
}>;

export type PiecesIdDictionary = {
  [id in PieceId]: Piece;
};

export type PiecesAvailableMovesAsStringDictionary = {
  [id in PieceId]: BoardPositionAsString[];
};
