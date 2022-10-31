import { createBoardPositionMap } from "@/core/board";

describe("createGameBoardMap", () => {
  it("should create valid game board map", () => {
    const gameBoardMap = createBoardPositionMap(
      new Map([
        [
          "d5",
          {
            id: "white-queen",
            color: "white",
            type: "queen",
            position: "d5",
            hasMoved: true,
          },
        ],
        [
          "e4",
          {
            id: "black-queen",
            color: "black",
            type: "queen",
            position: "e4",
            hasMoved: true,
          },
        ],
      ])
    );

    expect(gameBoardMap.get("d5")?.id).toEqual("white-queen");
    expect(gameBoardMap.get("e4")?.id).toEqual("black-queen");
    expect(gameBoardMap.get("b1")).toEqual(null);
    expect(gameBoardMap.get("h7")).toEqual(null);
  });
});
