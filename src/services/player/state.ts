import { PieceId, PieceColor } from "../../types/game";

interface PlayerState {
  color: PieceColor;
  selectedPieceId: PieceId | null;
}

const state: PlayerState = {
  color: "white",
  selectedPieceId: null,
};

export default state;
