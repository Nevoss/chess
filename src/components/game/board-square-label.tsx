import classNames from "classnames";
import React from "react";

interface BoardSquareProps {
  position: "top" | "bottom";
  children: React.ReactNode;
}

export default function BoardSquareLabel({ position, children }: BoardSquareProps) {
  return (
    <span
      className={classNames("absolute p-1 text-sm pointer-events-none", {
        "top-0 left-0": position === "top",
        "bottom-0 right-0": position === "bottom",
      })}
    >
      {children}
    </span>
  );
}
