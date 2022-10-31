import { boardFiles, boardRanks } from "../board";
import { BoardPosition, OnBoardPiece, PieceType } from "../../../types/game";

export type MoveHandlerKey =
  | "toTop"
  | "toBottom"
  | "toLeft"
  | "toRight"
  | "toTopLeft"
  | "toTopRight"
  | "toBottomLeft"
  | "toBottomRight"
  | "knightToTopLeft"
  | "knightToTopRight"
  | "knightToBottomLeft"
  | "knightToBottomRight"
  | "knightToLeftTop"
  | "knightToLeftBottom"
  | "knightToRightTop"
  | "knightToRightBottom";

type MoveHandler = ([fileIndex, rankIndex]: [number, number], delta: number) => BoardPosition;
export type MoveHandlersMap = Map<MoveHandlerKey, MoveHandler>;

const moveHandlersMap: MoveHandlersMap = new Map([
  [
    "toTop",
    ([fileIndex, rankIndex], delta) => {
      return [boardFiles[fileIndex], boardRanks[rankIndex + delta]];
    },
  ],
  [
    "toBottom",
    ([fileIndex, rankIndex], delta) => {
      return [boardFiles[fileIndex], boardRanks[rankIndex - delta]];
    },
  ],
  [
    "toLeft",
    ([fileIndex, rankIndex], delta) => {
      return [boardFiles[fileIndex - delta], boardRanks[rankIndex]];
    },
  ],
  [
    "toRight",
    ([fileIndex, rankIndex], delta) => {
      return [boardFiles[fileIndex + delta], boardRanks[rankIndex]];
    },
  ],
  [
    "toTopLeft",
    ([fileIndex, rankIndex], delta) => {
      return [boardFiles[fileIndex - delta], boardRanks[rankIndex + delta]];
    },
  ],
  [
    "toTopRight",
    ([fileIndex, rankIndex], delta) => {
      return [boardFiles[fileIndex + delta], boardRanks[rankIndex + delta]];
    },
  ],
  [
    "toBottomLeft",
    ([fileIndex, rankIndex], delta) => {
      return [boardFiles[fileIndex - delta], boardRanks[rankIndex - delta]];
    },
  ],
  [
    "toBottomRight",
    ([fileIndex, rankIndex], delta) => {
      return [boardFiles[fileIndex + delta], boardRanks[rankIndex - delta]];
    },
  ],
  [
    "knightToTopLeft",
    ([fileIndex, rankIndex], delta) => {
      return [boardFiles[fileIndex - delta], boardRanks[rankIndex + delta * 2]];
    },
  ],
  [
    "knightToLeftTop",
    ([fileIndex, rankIndex], delta) => {
      return [boardFiles[fileIndex - delta * 2], boardRanks[rankIndex + delta]];
    },
  ],
  [
    "knightToBottomLeft",
    ([fileIndex, rankIndex], delta) => {
      return [boardFiles[fileIndex - delta], boardRanks[rankIndex - delta * 2]];
    },
  ],
  [
    "knightToLeftBottom",
    ([fileIndex, rankIndex], delta) => {
      return [boardFiles[fileIndex - delta * 2], boardRanks[rankIndex - delta]];
    },
  ],
  [
    "knightToTopRight",
    ([fileIndex, rankIndex], delta) => {
      return [boardFiles[fileIndex + delta], boardRanks[rankIndex + delta * 2]];
    },
  ],
  [
    "knightToRightTop",
    ([fileIndex, rankIndex], delta) => {
      return [boardFiles[fileIndex + delta * 2], boardRanks[rankIndex + delta]];
    },
  ],
  [
    "knightToBottomRight",
    ([fileIndex, rankIndex], delta) => {
      return [boardFiles[fileIndex + delta], boardRanks[rankIndex - delta * 2]];
    },
  ],
  [
    "knightToRightBottom",
    ([fileIndex, rankIndex], delta) => {
      return [boardFiles[fileIndex + delta * 2], boardRanks[rankIndex - delta]];
    },
  ],
]);

function only(keys: MoveHandlerKey[]): MoveHandlersMap {
  return new Map([...moveHandlersMap].filter(([key]) => keys.includes(key)));
}

const piecesMovesHandlers: Map<PieceType, (piece: OnBoardPiece) => MoveHandlersMap> = new Map([
  [
    "king",
    () =>
      only([
        "toTop",
        "toBottom",
        "toLeft",
        "toRight",
        "toTopLeft",
        "toTopRight",
        "toBottomLeft",
        "toBottomRight",
      ]),
  ],
  [
    "queen",
    () =>
      only([
        "toTop",
        "toBottom",
        "toLeft",
        "toRight",
        "toTopLeft",
        "toTopRight",
        "toBottomLeft",
        "toBottomRight",
      ]),
  ],
  ["bishop", () => only(["toTopLeft", "toTopRight", "toBottomLeft", "toBottomRight"])],
  ["rook", () => only(["toTop", "toBottom", "toLeft", "toRight"])],
  [
    "knight",
    () =>
      only([
        "knightToTopLeft",
        "knightToTopRight",
        "knightToBottomLeft",
        "knightToBottomRight",
        "knightToLeftTop",
        "knightToLeftBottom",
        "knightToRightTop",
        "knightToRightBottom",
      ]),
  ],
  [
    "pawn",
    (piece: OnBoardPiece) =>
      piece.color === "white"
        ? only(["toTop", "toTopLeft", "toTopRight"])
        : only(["toBottom", "toBottomLeft", "toBottomRight"]),
  ],
]);

export default piecesMovesHandlers;
