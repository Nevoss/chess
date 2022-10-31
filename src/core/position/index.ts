import { BoardPosition, BoardPositionTuple } from "@/types/board";
import { boardFiles, boardRanks } from "@/core/board";

export function toBoardPosition(tuple: BoardPositionTuple): BoardPosition {
  return tuple.join("") as BoardPosition;
}

export function toBoardPositionTuple(position: BoardPosition): BoardPositionTuple {
  return position.split("") as BoardPositionTuple;
}

export default function getBoardPositionIndexes(position: BoardPosition): [number, number] {
  const [file, rank] = toBoardPositionTuple(position);

  return [boardFiles.indexOf(file), boardRanks.indexOf(rank)];
}

export function getPositionDelta(from: BoardPosition, to: BoardPosition): [number, number] {
  const [fromFileIndex, fromRankIndex] = getBoardPositionIndexes(from);
  const [toFileIndex, toRankIndex] = getBoardPositionIndexes(to);

  return [toFileIndex - fromFileIndex, toRankIndex - fromRankIndex];
}
