import { BoardPosition, BoardPositionAsString } from "../../types/game";

export const makeStringPosition = ([file, rank]: BoardPosition): BoardPositionAsString => {
  return `${file}${rank}`;
};
