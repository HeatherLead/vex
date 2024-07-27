"use client";
import { colorToCss } from "@/lib/utils";
import { Color } from "@/types/Canvas";
import React from "react";
interface ColorPickerProps {
  onChange: (color: Color) => void;
}
const ColorPicker = ({ onChange }: ColorPickerProps) => {
  return (
    <div className="flex flex-wrap gap-2 items-center  max-w-[164px] pr-2 mr-2 border-r border-neutral-200 ">
      <ColorButton color={{ r: 202, g: 68, b: 101 }} onClick={onChange} />
      <ColorButton color={{ r: 243, g: 165, b: 37 }} onClick={onChange} />
      <ColorButton color={{ r: 53, g: 212, b: 98 }} onClick={onChange} />
      <ColorButton color={{ r: 128, g: 187, b: 229 }} onClick={onChange} />
      <ColorButton color={{ r: 241, g: 87, b: 112 }} onClick={onChange} />
      <ColorButton color={{ r: 153, g: 51, b: 255 }} onClick={onChange} />
      <ColorButton color={{ r: 196, g: 114, b: 67 }} onClick={onChange} />
      <ColorButton color={{ r: 229, g: 111, b: 140 }} onClick={onChange} />
    </div>
  );
};

export default ColorPicker;

interface ColorButtonProps {
  onClick: (color: Color) => void;
  color: Color;
}

const ColorButton = ({ onClick, color }: ColorButtonProps) => {
  return (
    <button
      onClick={() => onClick(color)}
      className="w-8  h-8 items-center flex justify-center hover:opacity-75 transition-opacity"
    >
      <div
        style={{ backgroundColor: colorToCss(color) }}
        className="  h-8 w-8 rounded-sm border border-neutral-300 "
      ></div>
    </button>
  );
};
