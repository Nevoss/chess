import { BoardPosition, BoardPositionMap } from "@/types/board";
import { OnBoardPiece } from "@/types/piece";
import { boardFiles, boardRanks } from "@/core/board/index";
import { toBoardPosition } from "@/core/position";

export default function createGameBoardMap(
  pieces: Map<BoardPosition, OnBoardPiece>
): BoardPositionMap {
  const boardMap: BoardPositionMap = new Map();

  for (const rank of boardRanks) {
    for (const file of boardFiles) {
      const position = toBoardPosition([file, rank]);

      boardMap.set(position, pieces.get(position) ?? null);
    }
  }

  return boardMap;
}
