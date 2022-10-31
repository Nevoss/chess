import { BoardFile, BoardPosition, BoardRank } from "@/types/board";
import { boardFiles, boardRanks } from "@/core/board";
import { toBoardPosition } from "@/core/position";

type InvalidMoveHandler = (
  [fileIndex, rankIndex]: [number, number],
  delta: number
) => [BoardFile | undefined, BoardRank | undefined];

export type MoveHandler = (
  [fileIndex, rankIndex]: [number, number],
  delta: number
) => BoardPosition | null;

const toMoveHandler = (invalidMoveHandler: InvalidMoveHandler): MoveHandler => {
  return ([fileIndex, rankIndex], delta) => {
    const [file, rank] = invalidMoveHandler([fileIndex, rankIndex], delta);

    if (!file || !rank) {
      return null;
    }

    return toBoardPosition([file, rank]);
  };
};

export const toTop = toMoveHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex], boardRanks[rankIndex + delta]];
});

export const toBottom = toMoveHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex], boardRanks[rankIndex - delta]];
});

export const toLeft = toMoveHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex - delta], boardRanks[rankIndex]];
});

export const toRight = toMoveHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex + delta], boardRanks[rankIndex]];
});

export const toTopLeft = toMoveHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex - delta], boardRanks[rankIndex + delta]];
});

export const toTopRight = toMoveHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex + delta], boardRanks[rankIndex + delta]];
});

export const toBottomLeft = toMoveHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex - delta], boardRanks[rankIndex - delta]];
});

export const toBottomRight = toMoveHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex + delta], boardRanks[rankIndex - delta]];
});

export const knightToTopLeft = toMoveHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex - delta], boardRanks[rankIndex + delta * 2]];
});

export const knightToLeftTop = toMoveHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex - delta * 2], boardRanks[rankIndex + delta]];
});

export const knightToBottomLeft = toMoveHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex - delta], boardRanks[rankIndex - delta * 2]];
});

export const knightToLeftBottom = toMoveHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex - delta * 2], boardRanks[rankIndex - delta]];
});

export const knightToTopRight = toMoveHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex + delta], boardRanks[rankIndex + delta * 2]];
});

export const knightToRightTop = toMoveHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex + delta * 2], boardRanks[rankIndex + delta]];
});

export const knightToBottomRight = toMoveHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex + delta], boardRanks[rankIndex - delta * 2]];
});

export const knightToRightBottom = toMoveHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex + delta * 2], boardRanks[rankIndex - delta]];
});
