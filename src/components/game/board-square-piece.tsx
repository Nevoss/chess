import { Piece } from "../../types/game";
import PieceSvg from "./piece-svg";

interface BoardSquarePieceProps {
  piece: Piece;
  onClick: (piece: Piece) => void;
}

export default function BoardSquarePiece({ piece, onClick }: BoardSquarePieceProps) {
  const onClickHandler = () => onClick(piece);

  return (
    <button
      className="flex w-full h-full items-center justify-center absolute z-10"
      onClick={onClickHandler}
    >
      <PieceSvg color={piece.color} type={piece.type} />
    </button>
  );
}
