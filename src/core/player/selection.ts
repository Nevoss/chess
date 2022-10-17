import { Piece, PieceColor } from "../../types/game";

/**
 * Check if piece is exists on the board and belongs to the player.
 */
export function canSelectPiece(
  playerColor: PieceColor,
  { color, position }: Pick<Piece, "position" | "color">
): boolean {
  return !!position?.length && playerColor === color;
}
