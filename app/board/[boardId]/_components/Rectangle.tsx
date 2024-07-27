"use client";
import { ReactangleLayer } from "@/types/Canvas";
import React from "react";

interface RectangleProps {
  id: string;
  layer: ReactangleLayer;
  onLayerPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}
const Rectangle = ({
  id,
  layer,
  onLayerPointerDown,
  selectionColor,
}: RectangleProps) => {
  const { x, y, height, width, fill } = layer;
  return (
    <rect
      onPointerDown={(e) => {
        onLayerPointerDown(e, id);
      }}
      className=" drop-shadow-md "
      style={{ transform: `translate(${x}px,${y}px)` }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={1}
      fill="#000"
      stroke="transparent"
    />
  );
};

export default Rectangle;
