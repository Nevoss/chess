import { BoardPosition, InvalidBoardPosition } from "@/types/board";
import { boardFiles, boardRanks } from "@/core/board";

type RawDirectionHandler = (
  [fileIndex, rankIndex]: [number, number],
  delta: number
) => InvalidBoardPosition;

export type DirectionHandler = (
  [fileIndex, rankIndex]: [number, number],
  delta: number
) => BoardPosition | null;

const wrapRawHandler = (rawHandler: RawDirectionHandler): DirectionHandler => {
  return ([fileIndex, rankIndex], delta) => {
    const [file, rank] = rawHandler([fileIndex, rankIndex], delta);

    if (!file || !rank) {
      return null;
    }

    return [file, rank];
  };
};

export const toTop = wrapRawHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex], boardRanks[rankIndex + delta]];
});

export const toBottom = wrapRawHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex], boardRanks[rankIndex - delta]];
});

export const toLeft = wrapRawHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex - delta], boardRanks[rankIndex]];
});

export const toRight = wrapRawHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex + delta], boardRanks[rankIndex]];
});

export const toTopLeft = wrapRawHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex - delta], boardRanks[rankIndex + delta]];
});

export const toTopRight = wrapRawHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex + delta], boardRanks[rankIndex + delta]];
});

export const toBottomLeft = wrapRawHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex - delta], boardRanks[rankIndex - delta]];
});

export const toBottomRight = wrapRawHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex + delta], boardRanks[rankIndex - delta]];
});

export const knightToTopLeft = wrapRawHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex - delta], boardRanks[rankIndex + delta * 2]];
});

export const knightToLeftTop = wrapRawHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex - delta * 2], boardRanks[rankIndex + delta]];
});

export const knightToBottomLeft = wrapRawHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex - delta], boardRanks[rankIndex - delta * 2]];
});

export const knightToLeftBottom = wrapRawHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex - delta * 2], boardRanks[rankIndex - delta]];
});

export const knightToTopRight = wrapRawHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex + delta], boardRanks[rankIndex + delta * 2]];
});

export const knightToRightTop = wrapRawHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex + delta * 2], boardRanks[rankIndex + delta]];
});

export const knightToBottomRight = wrapRawHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex + delta], boardRanks[rankIndex - delta * 2]];
});

export const knightToRightBottom = wrapRawHandler(([fileIndex, rankIndex], delta) => {
  return [boardFiles[fileIndex + delta * 2], boardRanks[rankIndex - delta]];
});
