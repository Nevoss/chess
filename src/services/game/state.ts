import { GameMode, Piece, PieceColor } from "../../types/game";

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
    { id: "white-pawn-1", type: "pawn", color: "white", position: ["A", "2"], hasMoved: false },
    { id: "white-pawn-2", type: "pawn", color: "white", position: ["B", "2"], hasMoved: false },
    { id: "white-pawn-3", type: "pawn", color: "white", position: ["C", "2"], hasMoved: false },
    { id: "white-pawn-4", type: "pawn", color: "white", position: ["D", "2"], hasMoved: false },
    { id: "white-pawn-5", type: "pawn", color: "white", position: ["E", "2"], hasMoved: false },
    { id: "white-pawn-6", type: "pawn", color: "white", position: ["F", "2"], hasMoved: false },
    { id: "white-pawn-7", type: "pawn", color: "white", position: ["G", "2"], hasMoved: false },
    { id: "white-pawn-8", type: "pawn", color: "white", position: ["H", "2"], hasMoved: false },
    { id: "white-rook-1", type: "rook", color: "white", position: ["A", "1"], hasMoved: false },
    { id: "white-rook-2", type: "rook", color: "white", position: ["H", "1"], hasMoved: false },
    { id: "white-knight-1", type: "knight", color: "white", position: ["B", "1"], hasMoved: false },
    { id: "white-knight-2", type: "knight", color: "white", position: ["G", "1"], hasMoved: false },
    { id: "white-bishop-1", type: "bishop", color: "white", position: ["C", "1"], hasMoved: false },
    { id: "white-bishop-2", type: "bishop", color: "white", position: ["F", "1"], hasMoved: false },
    { id: "white-queen", type: "queen", color: "white", position: ["D", "1"], hasMoved: false },
    { id: "white-king", type: "king", color: "white", position: ["E", "1"], hasMoved: false },

    // Black pieces
    { id: "black-pawn-1", type: "pawn", color: "black", position: ["A", "7"], hasMoved: false },
    { id: "black-pawn-2", type: "pawn", color: "black", position: ["B", "7"], hasMoved: false },
    { id: "black-pawn-3", type: "pawn", color: "black", position: ["C", "7"], hasMoved: false },
    { id: "black-pawn-4", type: "pawn", color: "black", position: ["D", "7"], hasMoved: false },
    { id: "black-pawn-5", type: "pawn", color: "black", position: ["E", "7"], hasMoved: false },
    { id: "black-pawn-6", type: "pawn", color: "black", position: ["F", "7"], hasMoved: false },
    { id: "black-pawn-7", type: "pawn", color: "black", position: ["G", "7"], hasMoved: true },
    { id: "black-pawn-8", type: "pawn", color: "black", position: ["H", "7"], hasMoved: false },
    { id: "black-rook-1", type: "rook", color: "black", position: ["A", "8"], hasMoved: false },
    { id: "black-rook-2", type: "rook", color: "black", position: ["H", "8"], hasMoved: false },
    { id: "black-knight-1", type: "knight", color: "black", position: ["B", "8"], hasMoved: false },
    { id: "black-knight-2", type: "knight", color: "black", position: ["G", "8"], hasMoved: false },
    { id: "black-bishop-1", type: "bishop", color: "black", position: ["C", "8"], hasMoved: false },
    { id: "black-bishop-2", type: "bishop", color: "black", position: ["F", "8"], hasMoved: false },
    { id: "black-queen", type: "queen", color: "black", position: ["D", "8"], hasMoved: false },
    { id: "black-king", type: "king", color: "black", position: ["E", "8"], hasMoved: false },
  ],
};

export default state;
