import { OnBoardPiece } from "@/types/piece";

export type BoardRank = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
export type BoardFile = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
export type BoardPosition = `${BoardFile}${BoardRank}`;
export type BoardPositionTuple = [BoardFile, BoardRank];

export type BoardPositionMap = Map<BoardPosition, OnBoardPiece | null>;
