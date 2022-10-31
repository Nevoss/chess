import { BoardPosition } from "@/types/board";

export type PieceColor = "white" | "black";
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

interface BasePiece {
  id: PieceId;
  type: PieceType;
  color: PieceColor;
  hasMoved: boolean;
}

export interface OnBoardPiece extends BasePiece {
  position: BoardPosition;
}

export interface CapturedPiece extends BasePiece {
  position: null;
}

export type Piece = OnBoardPiece | CapturedPiece;
