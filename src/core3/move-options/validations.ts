import {
  BoardPosition,
  OnBoardPiece,
  PiecesPositionDictionary,
  PieceType,
} from "../../../types/game";
import { MoveHandlerKey } from "./handlers";
import { isPieceUnderAttack } from "../moves";
import { makeStringPosition } from "../position";
import { boardFiles } from "../board";

type ValidateMoveFunction = (context: {
  piece: OnBoardPiece;
  pieces: PiecesPositionDictionary;
  pieceInNewPosition?: OnBoardPiece | null;
  move: {
    handlerKey: MoveHandlerKey;
    from: BoardPosition;
    to: BoardPosition;
  };
}) => { invalid: boolean; blocking: boolean };

export type ValidateMoveFunctionMap = Map<string, ValidateMoveFunction>;

export const EXPOSE_KING_TO_ATTACK_VALIDATION_KEY = "exposeKingToAttack";

const invalidAndBlocking = { invalid: true, blocking: true };
const invalidAndNotBlocking = { invalid: true, blocking: false };
const validAndBlocking = { invalid: false, blocking: true };
const validAndNotBlocking = { invalid: false, blocking: false };

/**
 * This one is not in the defaults map to be sure it is the last
 * validation. (it is the heaviest calculation)
 */
const exposeKingToAttack: [string, ValidateMoveFunction] = [
  EXPOSE_KING_TO_ATTACK_VALIDATION_KEY,
  ({ piece, move: { to }, pieces }) => {
    const pieceAfterMove = { ...piece, position: to };
    const piecesAfterMove: PiecesPositionDictionary = {
      ...pieces,
      [makeStringPosition(to)]: pieceAfterMove,
    };

    delete piecesAfterMove[makeStringPosition(piece.position)];

    const king =
      pieceAfterMove.type !== "king"
        ? Object.values(pieces).find((p) => p.color === pieceAfterMove.color && p.type === "king")
        : pieceAfterMove;

    if (!king) {
      throw new Error("The king is not exist in the board, something went wrong.");
    }

    return isPieceUnderAttack(pieceAfterMove, piecesAfterMove, {
      exposeOpponentKingToAttack: true,
    })
      ? invalidAndNotBlocking
      : validAndNotBlocking;
  },
];

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
  [
    "king",
    new Map([
      ...defaults,
      [
        "castling",
        ({ move: { to }, pieces, piece }) => {
          if (piece.hasMoved) {
            return validAndNotBlocking;
          }

          const canCastle = [
            { color: "white", rook: ["a", "1"], kingTo: ["g", "1"] },
            { color: "white", rook: ["h", "1"], kingTo: ["c", "1"] },
            { color: "black", rook: ["a", "8"], kingTo: ["c", "8"] },
            { color: "black", rook: ["h", "8"], kingTo: ["g", "8"] },
          ]
            .filter(({ color }) => piece.color === color)
            .filter(({ kingTo }) => kingTo[0] === to[0] && kingTo[1] === to[1])
            .filter(({ rook }) => {
              const rookPiece = pieces[makeStringPosition(rook)];

              return rookPiece && rookPiece.type === "rook" && !rookPiece.hasMoved;
            })
            .some(({ rook }) => {
              console.log(rook);
              const rookFileIndex = boardFiles.indexOf(rook[0]);
              const kingFileIndex = boardFiles.indexOf(piece.position[0]);

              for (
                let i = Math.min(rookFileIndex, kingFileIndex) + 1;
                i < Math.max(rookFileIndex, kingFileIndex);
                i++
              ) {
                const position = [boardFiles[i], piece.position[1]] as BoardPosition;

                if (pieces[makeStringPosition(position)]) {
                  return false;
                }
              }

              return true;
            });

          return canCastle ? validAndNotBlocking : invalidAndBlocking;
        },
      ],
      exposeKingToAttack,
    ]),
  ],
  ["queen", new Map([...defaults, exposeKingToAttack])],
  ["bishop", new Map([...defaults, exposeKingToAttack])],
  ["knight", new Map([...defaults, exposeKingToAttack])],
  ["rook", new Map([...defaults, exposeKingToAttack])],
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
      exposeKingToAttack,
    ]),
  ],
]);

export default piecesMovesValidation;
