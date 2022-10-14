import { Piece } from "../../types/game";
import PieceSvg from "./piece-svg";

interface BoardSquarePieceProps {
  piece: Piece;
  onSelect: (piece: Piece) => void;
  canSelect: boolean;
}

export default function BoardSquarePiece({ piece, onSelect, canSelect }: BoardSquarePieceProps) {
  const selectPiece = canSelect ? () => onSelect(piece) : undefined;
  const Component = canSelect ? "button" : "div";

  return (
    <Component
      className="flex w-full h-full items-center justify-center absolute z-10"
      onClick={selectPiece}
    >
      <PieceSvg color={piece.color} type={piece.type} />
    </Component>
  );
}
