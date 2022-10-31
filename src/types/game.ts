import { Piece } from "@/types/piece";

export type GameMode = "single-player";

export type GameState = {
  pieces: Piece[];
  canCastle: {
    white: {
      kingSide: boolean;
      queenSide: boolean;
    };
    black: {
      kingSide: boolean;
      queenSide: boolean;
    };
  };
};
