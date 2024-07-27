"use client";
import { colorToCss } from "@/lib/utils";
import { EllipseLayer, ReactangleLayer } from "@/types/Canvas";
import React from "react";

interface EllipseProps {
  id: string;
  layer: EllipseLayer;
  onLayerPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}
const Ellipse = ({
  id,
  layer,
  onLayerPointerDown,
  selectionColor,
}: EllipseProps) => {
  const { x, y, height, width, fill } = layer;
  return (
    <ellipse
      onPointerDown={(e) => {
        onLayerPointerDown(e, id);
      }}
      className=" drop-shadow-md  "
      style={{ transform: `translate(${x}px,${y}px)` }}
      cx={width / 2}
      cy={height / 2}
      rx={width / 2}
      ry={height / 2}
      strokeWidth={1}
      fill={fill ? colorToCss(fill) : "64C2DB"}
      stroke={selectionColor || "transparent"}
    />
  );
};

export default Ellipse;
