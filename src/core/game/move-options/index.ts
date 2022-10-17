import { Piece, PieceType } from "../../../types/game";
import handlers, { MoveHandlersMap } from "./handlers";
import validations, { ValidateMoveFunctionMap } from "./validations";

type PiecesMoveOptions = Map<
  PieceType,
  {
    steps: (piece: Piece) => number;
    handlers: ((piece: Piece) => MoveHandlersMap) | undefined;
    validations: ValidateMoveFunctionMap | undefined;
  }
>;

const piecesMoveOptions: PiecesMoveOptions = new Map([
  [
    "king",
    {
      steps: () => 1,
      handlers: handlers.get("king"),
      validations: validations.get("king"),
    },
  ],
  [
    "queen",
    {
      steps: () => 7,
      handlers: handlers.get("queen"),
      validations: validations.get("queen"),
    },
  ],
  [
    "bishop",
    {
      steps: () => 7,
      handlers: handlers.get("bishop"),
      validations: validations.get("bishop"),
    },
  ],
  [
    "knight",
    {
      steps: () => 1,
      handlers: handlers.get("knight"),
      validations: validations.get("knight"),
    },
  ],
  [
    "rook",
    {
      steps: () => 7,
      handlers: handlers.get("rook"),
      validations: validations.get("rook"),
    },
  ],
  [
    "pawn",
    {
      steps: (piece: Piece) => (piece.hasMoved ? 1 : 2),
      handlers: handlers.get("pawn"),
      validations: validations.get("pawn"),
    },
  ],
]);

export default piecesMoveOptions;
