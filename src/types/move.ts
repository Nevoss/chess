import { BoardPosition } from "@/types/board";
import { PieceId } from "@/types/piece";

export interface PiecePositionChange {
  pieceId: PieceId;
  from: BoardPosition;
  to: BoardPosition | null;
}

export interface PieceMainPositionChange extends Omit<PiecePositionChange, "to"> {
  to: BoardPosition;
}

export type MovePositionChanges = [PieceMainPositionChange, ...PiecePositionChange[]];

export interface Move {
  changes: MovePositionChanges;
}
