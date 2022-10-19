import { OnBoardPiece, PieceType } from "../../../types/game";
import handlers, { MoveHandlersMap } from "./handlers";
import validations, { ValidateMoveFunctionMap } from "./validations";

type PiecesMoveOptions = Map<
  PieceType,
  {
    maxSteps: (piece: OnBoardPiece) => number;
    handlers: ((piece: OnBoardPiece) => MoveHandlersMap) | undefined;
    validations: ValidateMoveFunctionMap | undefined;
  }
>;

const piecesMoveOptions: PiecesMoveOptions = new Map([
  [
    "king",
    {
      maxSteps: () => 1,
      handlers: handlers.get("king"),
      validations: validations.get("king"),
    },
  ],
  [
    "queen",
    {
      maxSteps: () => 7,
      handlers: handlers.get("queen"),
      validations: validations.get("queen"),
    },
  ],
  [
    "bishop",
    {
      maxSteps: () => 7,
      handlers: handlers.get("bishop"),
      validations: validations.get("bishop"),
    },
  ],
  [
    "knight",
    {
      maxSteps: () => 1,
      handlers: handlers.get("knight"),
      validations: validations.get("knight"),
    },
  ],
  [
    "rook",
    {
      maxSteps: () => 7,
      handlers: handlers.get("rook"),
      validations: validations.get("rook"),
    },
  ],
  [
    "pawn",
    {
      maxSteps: (piece: OnBoardPiece) => (piece.hasMoved ? 1 : 2),
      handlers: handlers.get("pawn"),
      validations: validations.get("pawn"),
    },
  ],
]);

export default piecesMoveOptions;
