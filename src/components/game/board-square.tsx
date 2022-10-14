import classNames from "classnames";
import { firstBoardFile, firstBoardRank } from "../../utils/game";
import BoardSquareLabel from "./board-square-label";
import { useDispatch, useSelector } from "../../store";
import { selectors as gameSelectors } from "../../services/game";
import { selectors as playerSelectors, actions as playerActions } from "../../services/player";
import type { BoardPosition, Piece } from "../../types/game";
import BoardSquarePiece from "./board-square-piece";
import BoardSquareOptionalMove from "./board-square-optional-move";

interface BoardSquareProps {
  isLight: boolean;
  position: BoardPosition;
}

export default function BoardSquare({ isLight, position: [file, rank] }: BoardSquareProps) {
  const dispatch = useDispatch();

  const piece = useSelector((state) => gameSelectors.selectPieceByPosition(state, [file, rank])),
    canSelectPiece = useSelector((state) =>
      piece ? playerSelectors.selectCanSelectPiece(state, piece.id) : false
    ),
    isSelectedPiece = useSelector((state) =>
      piece ? playerSelectors.selectIsPieceSelected(state, piece.id) : false
    ),
    isSquareIsAnOptionalMove = useSelector((state) =>
      playerSelectors.selectIsOptionalMoveForSelectedPiece(state, [file, rank])
    );

  const selectPiece = (piece: Piece) => dispatch(playerActions.selectPiece(piece.id));
  const moveSelectedPiece = () => dispatch(playerActions.moveSelectedPiece([file, rank]));

  return (
    <div
      className={classNames(
        "flex justify-center items-center w-20 h-20 relative relative",
        {
          "text-blue-300": isLight,
          "text-blue-50": !isLight,
        },
        isLight
          ? {
              "bg-blue-50": !isSelectedPiece,
              "bg-blue-100": isSelectedPiece,
            }
          : {
              "bg-blue-300": !isSelectedPiece,
              "bg-blue-400": isSelectedPiece,
            }
      )}
    >
      {file === firstBoardFile && <BoardSquareLabel position="top">{rank}</BoardSquareLabel>}
      {rank === firstBoardRank && <BoardSquareLabel position="bottom">{file}</BoardSquareLabel>}
      {isSquareIsAnOptionalMove && (
        <BoardSquareOptionalMove onClick={moveSelectedPiece} captureMove={!!piece} />
      )}
      {piece && (
        <BoardSquarePiece piece={piece} onSelect={selectPiece} canSelect={canSelectPiece} />
      )}
    </div>
  );
}
