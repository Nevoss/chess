import { getAvailableMoves } from "@/core/moves";
import { createBoardPositionMap } from "@/core/board";
import { BoardPosition } from "@/types/board";
import { OnBoardPiece, PieceId } from "@/types/piece";
import { PiecePositionChange } from "@/types/move";

describe("getOptionalMoves", () => {
  it.each<{
    piece: Partial<OnBoardPiece>;
    availablePositions: BoardPosition[];
  }>([
    // {
    //   position: "d5",
    //   type: "king",
    //   availablePositions: ["c6", "d6", "e6", "c5", "e5", "c4", "d4", "e4"],
    // },
    {
      piece: {
        position: "d5",
        type: "queen",
      },
      // prettier-ignore
      availablePositions: [
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
      piece: {
        position: "d5",
        type: "rook",
      },
      // prettier-ignore
      availablePositions: [
        "d6", "d7", "d8", // top
        "d4", "d3", "d2", "d1", // bottom
        "a5", "b5", "c5", // left
        "e5", "f5", "g5", "h5", // right
      ],
    },
    {
      piece: {
        position: "d5",
        type: "bishop",
      },
      // prettier-ignore
      availablePositions: [
        "a8", "b7", "c6", // top left
        "e4", "f3", "g2", "h1", // bottom right
        "a2", "b3", "c4", // bottom left
        "e6", "f7", "g8", // top right
      ],
    },
    {
      piece: {
        position: "d5",
        type: "knight",
      },
      // prettier-ignore
      availablePositions: [
        "b6", "c7", // top left
        "b4", "c3", // bottom left
        "f6", "e7", // top right
        "f4", "e3", // bottom right
      ],
    },
    {
      piece: {
        position: "c2",
        type: "pawn",
        color: "white",
        hasMoved: false,
      },
      availablePositions: ["c3", "c4"],
    },
    {
      piece: {
        position: "c3",
        type: "pawn",
        color: "white",
        hasMoved: true,
      },
      availablePositions: ["c4"],
    },
    {
      piece: {
        position: "c7",
        type: "pawn",
        color: "black",
        hasMoved: false,
      },
      availablePositions: ["c6", "c5"],
    },
    {
      piece: {
        position: "c6",
        type: "pawn",
        color: "black",
        hasMoved: true,
      },
      availablePositions: ["c5"],
    },
  ])(
    "should return valid moves in clean board for '$piece.type' in '$piece.position'",
    ({
      piece: {
        id = "test" as PieceId,
        position = "a1",
        type = "pawn",
        hasMoved = false,
        color = "white",
      },
      availablePositions,
    }) => {
      const availableMoves = getAvailableMoves(
        position,
        createBoardPositionMap(new Map([[position, { id, type, position, color, hasMoved }]]))
      );

      const changesCollection = availableMoves.map(({ changes }) => changes);

      expect(changesCollection.every((changes) => changes.length === 1)).toBe(true);
      expect(changesCollection.every(([change]) => change.pieceId === id)).toBe(true);
      expect(changesCollection.every(([change]) => change.from === position)).toBe(true);
      expect(changesCollection.map(([change]) => change.to).sort()).toEqual(
        availablePositions.sort()
      );
    }
  );

  it.each<{
    piece: Partial<OnBoardPiece>;
    friendlyPiecesPositions: BoardPosition[];
    availablePositions: BoardPosition[];
  }>([
    {
      piece: {
        position: "a1",
        type: "queen",
      },
      friendlyPiecesPositions: ["a3", "b2", "d1"],
      // prettier-ignore
      availablePositions: [
        "a2", // top
        "b1", "c1", // right
      ],
    },
    {
      piece: {
        position: "a2",
        type: "pawn",
        hasMoved: false,
        color: "white",
      },
      friendlyPiecesPositions: ["a4", "b3"],
      availablePositions: ["a3"],
    },
    {
      piece: {
        position: "a3",
        type: "pawn",
        hasMoved: true,
        color: "white",
      },
      friendlyPiecesPositions: ["a4"],
      availablePositions: [],
    },
  ])(
    "should return valid moves when friendly piece blocking move for '$piece.type' in '$piece.position'",
    ({
      piece: {
        id = "test" as PieceId,
        position = "a1",
        type = "pawn",
        hasMoved = false,
        color = "white",
      },
      friendlyPiecesPositions,
      availablePositions,
    }) => {
      const friendlyPiecesEntries = friendlyPiecesPositions.map<[BoardPosition, OnBoardPiece]>(
        (position, index) => [
          position,
          { id: `pawn-${index}` as PieceId, type: "pawn", position, color, hasMoved: true },
        ]
      );

      const availableMoves = getAvailableMoves(
        position,
        createBoardPositionMap(
          new Map([[position, { id, type, position, color, hasMoved }], ...friendlyPiecesEntries])
        )
      );

      const changesCollection = availableMoves.map(({ changes }) => changes);

      expect(changesCollection.every((changes) => changes.length === 1)).toBe(true);
      expect(changesCollection.map(([change]) => change.to).sort()).toEqual(
        availablePositions.sort()
      );
    }
  );

  it.each<{
    piece: Partial<OnBoardPiece>;
    opponentPiecePositions: BoardPosition[];
    validCapturePositions?: BoardPosition[];
    invalidPositions: BoardPosition[];
  }>([
    {
      piece: {
        position: "e1",
        type: "queen",
      },
      opponentPiecePositions: ["g1", "e2"],
      invalidPositions: ["h1", "e3"],
    },
    {
      piece: {
        position: "e2",
        type: "pawn",
        color: "white",
        hasMoved: false,
      },
      opponentPiecePositions: ["f3", "d3", "e3"],
      validCapturePositions: ["f3", "d3"],
      invalidPositions: ["e3", "e4"],
    },
  ])(
    "should return valid moves when opponent piece blocking move for '$piece.type' in '$piece.position'",
    ({
      piece: {
        id = "test" as PieceId,
        position = "a1",
        type = "pawn",
        hasMoved = false,
        color = "white",
      },
      opponentPiecePositions,
      validCapturePositions = opponentPiecePositions,
      invalidPositions,
    }) => {
      const opponentPiecesEntries = opponentPiecePositions.map<[BoardPosition, OnBoardPiece]>(
        (position, index) => [
          position,
          {
            id: "captured-pawn" as PieceId,
            type: "pawn",
            position,
            color: color === "white" ? "black" : "white",
            hasMoved: true,
          },
        ]
      );

      const availableMoves = getAvailableMoves(
        position,
        createBoardPositionMap(
          new Map([[position, { id, type, position, color, hasMoved }], ...opponentPiecesEntries])
        )
      );

      const changesCollection = availableMoves.map<{
        mainMoveTo: BoardPosition;
        capturePositionChange: PiecePositionChange | undefined;
      }>(({ changes }) => ({
        mainMoveTo: changes[0].to,
        capturePositionChange: changes[1],
      }));

      expect(
        changesCollection.every(({ mainMoveTo }) => !invalidPositions.includes(mainMoveTo))
      ).toBe(true);

      expect(
        changesCollection.every(({ mainMoveTo, capturePositionChange }) => {
          if (!validCapturePositions.includes(mainMoveTo)) {
            return true;
          }

          return (
            capturePositionChange !== undefined &&
            capturePositionChange.pieceId === ("captured-pawn" as PieceId) &&
            capturePositionChange.from === mainMoveTo &&
            capturePositionChange.to === null
          );
        })
      ).toBe(true);
    }
  );
});
