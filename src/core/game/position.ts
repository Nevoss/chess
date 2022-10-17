import { BoardPosition, BoardPositionAsString } from "../../types/game";

export const makeStringPosition = ([file, rank]: BoardPosition): BoardPositionAsString => {
  return `${file}${rank}`;
};

export function isPositionInsidePositionsCollection(
  position: BoardPosition,
  positions: BoardPosition[]
) {
  return positions.map(makeStringPosition).includes(makeStringPosition(position));
}
