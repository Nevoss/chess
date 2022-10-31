import { BoardPosition, BoardPositionAsString, OnBoardPiece, Piece } from "../../types/game";

export const makeStringPosition = ([file, rank]: BoardPosition): BoardPositionAsString => {
  return `${file}${rank}`;
};

export function isPositionInsidePositionsCollection(
  position: BoardPosition,
  positions: BoardPosition[]
) {
  return positions.map(makeStringPosition).includes(makeStringPosition(position));
}

export function isPieceOnTheBoard(piece: Piece): piece is OnBoardPiece {
  return piece.position?.length === 2;
}
