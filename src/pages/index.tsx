import type { NextPage } from "next";
import Board from "../components/game/board";
import BoardSquare from "../components/game/board-square";

const Home: NextPage = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Board>{(position, isLight) => <BoardSquare position={position} isLight={isLight} />}</Board>
    </div>
  );
};

export default Home;
