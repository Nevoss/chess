import { GameMode, Piece, PieceColor, PieceMove } from "../../types/game";

interface GameState {
  mode: GameMode;
  turn: PieceColor;
  pieces: Piece[];
}

const state: GameState = {
  mode: "single-player",
  turn: "white",
  pieces: [
    // White pieces
    { id: "white-pawn-1", type: "pawn", color: "white", position: ["a", "2"], hasMoved: false },
    { id: "white-pawn-2", type: "pawn", color: "white", position: ["b", "2"], hasMoved: false },
    { id: "white-pawn-3", type: "pawn", color: "white", position: ["c", "2"], hasMoved: false },
    { id: "white-pawn-4", type: "pawn", color: "white", position: ["d", "2"], hasMoved: false },
    { id: "white-pawn-5", type: "pawn", color: "white", position: ["e", "2"], hasMoved: false },
    { id: "white-pawn-6", type: "pawn", color: "white", position: ["f", "2"], hasMoved: false },
    { id: "white-pawn-7", type: "pawn", color: "white", position: ["g", "2"], hasMoved: false },
    { id: "white-pawn-8", type: "pawn", color: "white", position: ["h", "2"], hasMoved: false },
    { id: "white-rook-1", type: "rook", color: "white", position: ["a", "1"], hasMoved: false },
    { id: "white-rook-2", type: "rook", color: "white", position: ["h", "1"], hasMoved: false },
    { id: "white-knight-1", type: "knight", color: "white", position: ["b", "1"], hasMoved: false },
    { id: "white-knight-2", type: "knight", color: "white", position: ["g", "1"], hasMoved: false },
    { id: "white-bishop-1", type: "bishop", color: "white", position: ["c", "1"], hasMoved: false },
    { id: "white-bishop-2", type: "bishop", color: "white", position: ["f", "1"], hasMoved: false },
    { id: "white-queen", type: "queen", color: "white", position: ["d", "1"], hasMoved: false },
    { id: "white-king", type: "king", color: "white", position: ["e", "1"], hasMoved: false },

    // Black pieces
    { id: "black-pawn-1", type: "pawn", color: "black", position: ["a", "7"], hasMoved: false },
    { id: "black-pawn-2", type: "pawn", color: "black", position: ["b", "7"], hasMoved: false },
    { id: "black-pawn-3", type: "pawn", color: "black", position: ["c", "7"], hasMoved: false },
    { id: "black-pawn-4", type: "pawn", color: "black", position: ["d", "7"], hasMoved: false },
    { id: "black-pawn-5", type: "pawn", color: "black", position: ["e", "7"], hasMoved: false },
    { id: "black-pawn-6", type: "pawn", color: "black", position: ["f", "7"], hasMoved: false },
    { id: "black-pawn-7", type: "pawn", color: "black", position: ["g", "7"], hasMoved: true },
    { id: "black-pawn-8", type: "pawn", color: "black", position: ["h", "7"], hasMoved: false },
    { id: "black-rook-1", type: "rook", color: "black", position: ["a", "8"], hasMoved: false },
    { id: "black-rook-2", type: "rook", color: "black", position: ["h", "8"], hasMoved: false },
    { id: "black-knight-1", type: "knight", color: "black", position: ["b", "8"], hasMoved: false },
    { id: "black-knight-2", type: "knight", color: "black", position: ["g", "8"], hasMoved: false },
    { id: "black-bishop-1", type: "bishop", color: "black", position: ["c", "8"], hasMoved: false },
    { id: "black-bishop-2", type: "bishop", color: "black", position: ["f", "8"], hasMoved: false },
    { id: "black-queen", type: "queen", color: "black", position: ["d", "8"], hasMoved: false },
    { id: "black-king", type: "king", color: "black", position: ["e", "8"], hasMoved: false },
  ],
};

export default state;
