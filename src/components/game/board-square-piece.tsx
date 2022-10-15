import { Piece } from "../../types/game";
import PieceSvg from "./piece-svg";

interface BoardSquarePieceProps {
  piece: Piece;
  onClick: (piece: Piece) => void;
  canSelect: boolean;
}

export default function BoardSquarePiece({ piece, onClick, canSelect }: BoardSquarePieceProps) {
  const onClickHandler = canSelect ? () => onClick(piece) : undefined;
  const Component = canSelect ? "button" : "div";

  return (
    <Component
      className="flex w-full h-full items-center justify-center absolute z-10"
      onClick={onClickHandler}
    >
      <PieceSvg color={piece.color} type={piece.type} />
    </Component>
  );
}
