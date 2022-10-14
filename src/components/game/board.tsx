import { boardFiles, boardRanks } from "../../utils/game";
import React from "react";
import { BoardPosition } from "../../types/game";

const ranksForRender = [...boardRanks].reverse();
const filesForRender = [...boardFiles];

interface BoardProps {
  children: (position: BoardPosition, isLight: boolean) => React.ReactNode;
}

export default function Board(props: BoardProps) {
  return (
    <div>
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
