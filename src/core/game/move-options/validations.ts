import { BoardPosition, Piece, PieceType } from "../../../types/game";
import { MoveHandlerKey } from "./handlers";

type ValidateMoveFunction = (context: {
  piece: Piece;
  pieceInNewPosition?: Piece | null;
  move: {
    handlerKey: MoveHandlerKey;
    from: BoardPosition;
    to: BoardPosition;
  };
}) => { invalid: boolean; blocking: boolean };

export type ValidateMoveFunctionMap = Map<string, ValidateMoveFunction>;

const invalidAndBlocking = { invalid: true, blocking: true };
const invalidAndNotBlocking = { invalid: true, blocking: false };
const validAndBlocking = { invalid: false, blocking: true };
const validAndNotBlocking = { invalid: false, blocking: false };

const defaults: ValidateMoveFunctionMap = new Map([
  ["inBoard", ({ move: { to } }) => (!to[0] || !to[1] ? invalidAndBlocking : validAndNotBlocking)],
  [
    "friendlyPiece",
    ({ pieceInNewPosition, piece }) =>
      pieceInNewPosition && pieceInNewPosition.color === piece.color
        ? invalidAndBlocking
        : validAndNotBlocking,
  ],
  [
    "opponentPiece",
    ({ pieceInNewPosition, piece }) =>
      pieceInNewPosition && pieceInNewPosition.color !== piece.color
        ? validAndBlocking
        : validAndNotBlocking,
  ],
]);

const piecesMovesValidation: Map<PieceType, ValidateMoveFunctionMap> = new Map([
  ["king", defaults],
  ["queen", defaults],
  ["bishop", defaults],
  ["knight", defaults],
  ["rook", defaults],
  [
    "pawn",
    new Map([
      ...defaults,
      [
        "opponentPiece",
        ({ move: { handlerKey }, pieceInNewPosition, piece }) => {
          // Pawn cannot capture piece in front of it.
          return ["toTop", "toBottom"].includes(handlerKey) &&
            pieceInNewPosition &&
            pieceInNewPosition.color !== piece.color
            ? invalidAndBlocking
            : validAndNotBlocking;
        },
      ],
      [
        "pawnDiagonallyMove",
        ({ move: { handlerKey }, pieceInNewPosition, piece }) => {
          // Pawn can move diagonally only if there is a piece to capture.
          if (!["toTopLeft", "toTopRight", "toBottomLeft", "toBottomRight"].includes(handlerKey)) {
            return validAndNotBlocking;
          }

          return !pieceInNewPosition || pieceInNewPosition.color === piece.color
            ? invalidAndBlocking
            : validAndBlocking;
        },
      ],
    ]),
  ],
]);

export default piecesMovesValidation;
