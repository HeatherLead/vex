import { getSvgPathFromStroke } from "@/lib/utils";
import { Color, Point } from "@/types/Canvas";
import getStroke from "perfect-freehand";
import React from "react";
interface PathProps {
  x: number;
  y: number;
  points: number[][];
  fill: string;
  onPointerDown?: (e: React.PointerEvent) => void;
  stroke?: string;
}

const Path = ({ x, y, fill, stroke, points, onPointerDown }: PathProps) => {
  return (
    <path
      d={getSvgPathFromStroke(
        getStroke(points, {
          size: 16,
          thinning: 0.5,
          smoothing: 0.5,
          streamline: 0.5,
        })
      )}
      onPointerDown={onPointerDown}
      className=" drop-shadow-md"
      style={{ transform: `translate(${x}px,${y}px)` }}
      x={0}
      y={0}
      fill={fill}
      stroke={stroke}
      strokeWidth={1}
    />
  );
};

export default Path;
