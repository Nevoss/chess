import { PieceId, PlayerColor } from "../../types/game";

interface PlayerState {
  color: PlayerColor;
  selectedPieceId: PieceId | null;
}

const state: PlayerState = {
  color: "white",
  selectedPieceId: null,
};

export default state;
