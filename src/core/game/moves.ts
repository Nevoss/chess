import { BoardPosition, Piece, PiecesPositionDictionary } from "../../types/game";
import { boardFiles, boardRanks } from "./board";
import piecesMoveOptions from "./move-options";
import { isPositionInsidePositionsCollection, makeStringPosition } from "./position";
import { MoveHandlersMap } from "./move-options/handlers";

function isPieceUnderAttack(
  { position, color }: Pick<Piece, "position" | "color">,
  pieces: PiecesPositionDictionary
) {
  if (!position) {
    return false;
  }

  return Object.values(pieces).some(
    (piece) =>
      piece.color !== color &&
      isPositionInsidePositionsCollection(position, calcPieceOptionalMoves(piece, pieces))
  );
}

export function calcPieceOptionalMoves(
  piece: Piece,
  pieces: PiecesPositionDictionary
): BoardPosition[] {
  if (!piece.position) {
    return [];
  }

  const pieceMoveOptions = piecesMoveOptions.get(piece.type),
    moveHandlers = pieceMoveOptions?.handlers?.(piece),
    moveSteps = pieceMoveOptions?.steps(piece),
    moveValidations = pieceMoveOptions?.validations;

  if (!moveHandlers || !moveValidations || !moveSteps) {
    return [];
  }

  const fileIndex = boardFiles.indexOf(piece.position[0]);
  const rankIndex = boardRanks.indexOf(piece.position[1]);

  const moves: BoardPosition[] = [];
  const tempMoveHandlers: MoveHandlersMap = new Map([...moveHandlers]);

  // Run over the steps that the piece can make.
  for (let i = 0; i < pieceMoveOptions.steps(piece); i++) {
    // Run over the possible moves that the piece can make.
    for (const [key, handler] of tempMoveHandlers.entries()) {
      const newPosition = handler([fileIndex, rankIndex], i + 1);
      const pieceInNewPosition = pieces[makeStringPosition(newPosition)];
      const validationResult = { invalid: false, blocking: false };

      // Run over the validations that the piece can make.
      for (const validation of moveValidations.values()) {
        const { invalid, blocking } = validation({
          piece,
          pieceInNewPosition,
          move: {
            handlerKey: key,
            from: piece.position,
            to: newPosition,
          },
        });

        if (blocking) {
          validationResult.blocking = true;
        }

        if (invalid) {
          validationResult.invalid = true;
        }
      }

      if (validationResult.blocking) {
        tempMoveHandlers.delete(key);
      }

      if (validationResult.invalid) {
        continue;
      }

      moves.push(newPosition);
    }

    if (!tempMoveHandlers.size) {
      break;
    }
  }

  // TODO: en passant, castling, and pawn promotion

  return moves;
}
