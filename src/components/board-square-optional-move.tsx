import React from "react";

interface BoardSquareOptionalMoveProps {
  onClick: () => void;
  captureMove?: boolean;
  canMove?: boolean;
}

export default function BoardSquareOptionalMove({
  onClick,
  captureMove = false,
  canMove = false,
}: BoardSquareOptionalMoveProps) {
  const onClickHandler = canMove ? onClick : undefined;
  const Component = canMove ? "button" : "div";

  return (
    <Component
      className="flex w-full h-full items-center justify-center absolute z-20"
      onClick={onClickHandler}
    >
      {!captureMove && <span className="bg-slate-500 bg-opacity-20 h-6 w-6 rounded-full" />}
      {captureMove && (
        <span className="border-4 border-slate-500 border-opacity-20 bg-opacity-20 h-16 w-16 rounded-full" />
      )}
    </Component>
  );
}
