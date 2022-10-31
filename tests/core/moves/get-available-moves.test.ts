import { getAvailableMoves } from "@/core/moves/get-optional-moves";
import { createBoardPositionMap } from "@/core/board";
import { BoardPosition } from "@/types/board";
import { PieceId, PieceType } from "@/types/piece";

describe("getOptionalMoves", () => {
  it.each<{
    position: BoardPosition;
    type: PieceType;
    id: PieceId;
    optionalPositions: BoardPosition[];
  }>([
    {
      position: "d5",
      type: "queen",
      id: "white-queen",
      // prettier-ignore
      optionalPositions: [
        "d6", "d7", "d8", // top
        "d4", "d3", "d2", "d1", // bottom
        "a5", "b5", "c5", // left
        "e5", "f5", "g5", "h5", // right
        "a8", "b7", "c6", // top left
        "e4", "f3", "g2", "h1", // bottom right
        "a2", "b3", "c4", // bottom left
        "e6", "f7", "g8", // top right
      ],
    },
    {
      position: "d5",
      type: "rook",
      id: "white-rook-1",
      // prettier-ignore
      optionalPositions: [
        "d6", "d7", "d8", // top
        "d4", "d3", "d2", "d1", // bottom
        "a5", "b5", "c5", // left
        "e5", "f5", "g5", "h5", // right
      ],
    },
    {
      position: "d5",
      type: "bishop",
      id: "white-bishop-1",
      // prettier-ignore
      optionalPositions: [
        "a8", "b7", "c6", // top left
        "e4", "f3", "g2", "h1", // bottom right
        "a2", "b3", "c4", // bottom left
        "e6", "f7", "g8", // top right
      ],
    },
    {
      position: "d5",
      type: "knight",
      id: "white-knight-1",
      // prettier-ignore
      optionalPositions: [
        "b6", "c7", // top left
        "b4", "c3", // bottom left
        "f6", "e7", // top right
        "f4", "e3", // bottom right
      ],
    },
  ])(
    "should return valid pieces move in clean board",
    ({ position, type, id, optionalPositions }) => {
      const optionalMoves = getOptionalMoves(
        position,
        createBoardPositionMap(
          new Map([
            [
              position,
              {
                id,
                type,
                position,
                color: "white",
                hasMoved: true,
              },
            ],
          ])
        )
      );

      const changesCollection = optionalMoves.map(({ changes }) => changes);

      expect(changesCollection.every((changes) => changes.length === 1)).toBe(true);
      expect(changesCollection.every(([change]) => change.pieceId === id)).toBe(true);
      expect(changesCollection.map(([change]) => change.to).sort()).toEqual(
        optionalPositions.sort()
      );
    }
  );
});
