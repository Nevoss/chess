import { BoardFile, BoardRank } from "@/types/board";

export const boardRanks: readonly BoardRank[] = ["1", "2", "3", "4", "5", "6", "7", "8"] as const;
export const boardFiles: readonly BoardFile[] = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;

export { default as createBoardPositionMap } from "./create-board-position-map";
