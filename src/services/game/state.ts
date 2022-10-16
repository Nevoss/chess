import { Piece, PlayerColor } from "../../types/game";

interface GameState {
  turn: PlayerColor;
  pieces: Piece[];
}

const state: GameState = {
  turn: "white",
  pieces: [
    { id: "white-pawn-1", type: "pawn", color: "white", position: ["A", "2"], hasMoved: false },
    { id: "white-pawn-2", type: "pawn", color: "white", position: ["B", "2"], hasMoved: false },
    { id: "white-pawn-3", type: "pawn", color: "white", position: ["C", "2"], hasMoved: false },
    { id: "white-pawn-4", type: "pawn", color: "white", position: ["D", "2"], hasMoved: false },
    { id: "white-pawn-5", type: "pawn", color: "white", position: ["E", "2"], hasMoved: false },
    { id: "white-pawn-6", type: "pawn", color: "white", position: ["F", "2"], hasMoved: false },
    { id: "white-pawn-7", type: "pawn", color: "white", position: ["G", "6"], hasMoved: true },
    { id: "white-pawn-8", type: "pawn", color: "white", position: ["H", "2"], hasMoved: false },
    { id: "white-rook-1", type: "rook", color: "white", position: ["A", "3"], hasMoved: false },
    { id: "white-rook-2", type: "rook", color: "white", position: ["H", "3"], hasMoved: false },
    { id: "white-knight-1", type: "knight", color: "white", position: ["C", "3"], hasMoved: false },
    { id: "white-knight-2", type: "knight", color: "white", position: ["F", "3"], hasMoved: false },
    { id: "white-bishop-1", type: "bishop", color: "white", position: ["E", "3"], hasMoved: false },
    { id: "white-bishop-2", type: "bishop", color: "white", position: ["D", "3"], hasMoved: false },
    { id: "white-queen", type: "queen", color: "white", position: ["D", "4"], hasMoved: false },
    { id: "white-king", type: "king", color: "white", position: ["E", "1"], hasMoved: false },

    { id: "black-pawn-1", type: "pawn", color: "black", position: ["A", "7"], hasMoved: false },
    { id: "black-pawn-2", type: "pawn", color: "black", position: ["B", "7"], hasMoved: false },
    { id: "black-pawn-3", type: "pawn", color: "black", position: ["C", "7"], hasMoved: false },
    { id: "black-pawn-4", type: "pawn", color: "black", position: null, hasMoved: false },
    { id: "black-pawn-5", type: "pawn", color: "black", position: ["E", "7"], hasMoved: false },
    { id: "black-pawn-6", type: "pawn", color: "black", position: ["F", "7"], hasMoved: false },
    { id: "black-pawn-7", type: "pawn", color: "black", position: ["G", "7"], hasMoved: false },
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
