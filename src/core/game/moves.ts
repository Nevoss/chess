import { BoardPosition, OnBoardPiece, PiecesPositionDictionary } from "../../types/game";
import { boardFiles, boardRanks } from "./board";
import piecesMoveOptions from "./move-options";
import { isPositionInsidePositionsCollection, makeStringPosition } from "./position";
import { MoveHandlersMap } from "./move-options/handlers";
import {
  EXPOSE_KING_TO_ATTACK_VALIDATION_KEY,
  ValidateMoveFunctionMap,
} from "./move-options/validations";

export function isPieceUnderAttack(
  piece: OnBoardPiece,
  pieces: PiecesPositionDictionary,
  { exposeOpponentKingToAttack = false } = {}
) {
  if (!piece.position) {
    return false;
  }

  return Object.values(pieces)
    .filter(({ color }) => piece.color !== color)
    .some((piece) =>
      isPositionInsidePositionsCollection(
        piece.position,
        calcPieceOptionalMoves(piece, pieces, { exposeKingToAttack: exposeOpponentKingToAttack })
      )
    );
}

export function calcPieceOptionalMoves(
  piece: OnBoardPiece,
  pieces: PiecesPositionDictionary,
  { exposeKingToAttack = false } = {}
): BoardPosition[] {
  const pieceMoveOptions = piecesMoveOptions.get(piece.type),
    moveHandlers = pieceMoveOptions?.handlers?.(piece),
    moveMaxSteps = pieceMoveOptions?.maxSteps(piece),
    moveValidations = pieceMoveOptions?.validations;

  if (!moveHandlers || !moveValidations || !moveMaxSteps) {
    return [];
  }

  const fileIndex = boardFiles.indexOf(piece.position[0]);
  const rankIndex = boardRanks.indexOf(piece.position[1]);

  const moves: BoardPosition[] = [];
  const tempValidations: ValidateMoveFunctionMap = new Map([...moveValidations]);
  const tempMoveHandlers: MoveHandlersMap = new Map([...moveHandlers]);

  if (exposeKingToAttack) {
    tempValidations.delete(EXPOSE_KING_TO_ATTACK_VALIDATION_KEY);
  }

  // Run over the steps that the piece can make.
  for (let i = 0; i < moveMaxSteps; i++) {
    // Run over the possible moves that the piece can make.
    for (const [key, handler] of tempMoveHandlers.entries()) {
      const newPosition = handler([fileIndex, rankIndex], i + 1);
      const pieceInNewPosition = pieces[makeStringPosition(newPosition)];
      const validationResult = { invalid: false, blocking: false };

      // Run over the validations that the piece can make.
      for (const validation of tempValidations.values()) {
        const { invalid, blocking } = validation({
          piece,
          pieces,
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

        if (validationResult.invalid && validationResult.blocking) {
          break;
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
