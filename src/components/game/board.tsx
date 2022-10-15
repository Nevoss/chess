import { boardFiles, boardRanks } from "../../core/game/board";
import React from "react";
import { BoardPosition } from "../../types/game";
import { useSelector } from "../../store";
import { selectors as gameSelectors } from "../../services/game";
import classNames from "classnames";

const ranksForRender = [...boardRanks].reverse();
const filesForRender = [...boardFiles];

interface BoardProps {
  children: (position: BoardPosition, isLight: boolean) => React.ReactNode;
}

export default function Board(props: BoardProps) {
  const turn = useSelector(gameSelectors.selectTurn);

  return (
    <div>
      <div className="flex items-center justify-center gap-2 mb-4">
        <span> Turn: </span>
        <span
          className={classNames("h-4 w-4 rounded-full", {
            "bg-white border border-gray-500": turn === "white",
            "bg-gray-900": turn === "black",
          })}
        />
      </div>
      {ranksForRender.map((rank, rankIndex) => (
        <div className="flex" key={rank}>
          {filesForRender.map((file, fileIndex) => {
            return (
              <div key={`${file}${rank}`}>
                {props.children([file, rank], (fileIndex + rankIndex) % 2 === 0)}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
