import classNames from "classnames";
import { firstBoardFile, firstBoardRank } from "../../core/game/board";
import BoardSquareLabel from "./board-square-label";
import { useDispatch, useSelector } from "../../store";
import { selectors as gameSelectors } from "../../services/game";
import { selectors as playerSelectors, actions as playerActions } from "../../services/player";
import type { BoardPosition, Piece } from "../../types/game";
import BoardSquarePiece from "./board-square-piece";
import BoardSquareOptionalMove from "./board-square-optional-move";
import { isPositionInsidePositionsCollection } from "../../core/game/moves";
import { canSelectPiece } from "../../core/player/selection";

interface BoardSquareProps {
  isLight: boolean;
  position: BoardPosition;
}

export default function BoardSquare({ isLight, position: [file, rank] }: BoardSquareProps) {
  const dispatch = useDispatch();

  const piece = useSelector((state) => gameSelectors.selectPieceByPosition(state, [file, rank])),
    selectedPiece = useSelector(playerSelectors.selectSelectedPiece),
    playerColor = useSelector(playerSelectors.selectColor),
    turn = useSelector(gameSelectors.selectTurn),
    selectedPieceOptionalMoves = useSelector((state) =>
      selectedPiece ? gameSelectors.selectPieceOptionalMovesById(state, selectedPiece.id) : []
    );

  const isSelectedPiece = !!piece && !!selectedPiece && piece.id === selectedPiece.id,
    isPieceSelectable = !!piece && canSelectPiece(playerColor, piece),
    isSelectedPieceMovable = turn === playerColor,
    isSquareIsAnOptionalMove = isPositionInsidePositionsCollection(
      [file, rank],
      selectedPieceOptionalMoves
    );

  const toggleSelection = (piece: Piece) => dispatch(playerActions.togglePieceSelection(piece.id)),
    moveSelectedPiece = () => dispatch(playerActions.moveSelectedPiece([file, rank]));

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
        <BoardSquareOptionalMove
          onClick={moveSelectedPiece}
          captureMove={!!piece}
          canMove={isSelectedPieceMovable}
        />
      )}
      {piece && (
        <BoardSquarePiece piece={piece} onClick={toggleSelection} canSelect={isPieceSelectable} />
      )}
    </div>
  );
}
