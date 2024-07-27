import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { cn, colorToCss, getContrastingText } from "@/lib/utils";
import { NoteLayer } from "@/types/Canvas";
import { useMutation } from "@/liveblocks.config";

const kalam = Kalam({
  weight: "400",
  subsets: ["latin"],
});

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.15;
  const fontSizeBaseOnHight = height * scaleFactor;
  const fontSizeBaseOnWidth = width * scaleFactor;

  return Math.min(fontSizeBaseOnHight, fontSizeBaseOnWidth, maxFontSize);
};

interface NoteProps {
  id: string;
  layer: NoteLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Note = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: NoteProps) => {
  const { x, y, width, height, fill, value } = layer;

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");

    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };
  return (
    <foreignObject
      x={x}
      y={y}
      height={height}
      width={width}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
        backgroundColor: fill ? colorToCss(fill) : "#fff",
      }}
      className=" shadow-md drop-shadow-xl"
    >
      <ContentEditable
        className={cn(
          " h-full w-f flex justify-center items-center text-center outline-none",
          kalam.className
        )}
        style={{
          fontSize: calculateFontSize(width, height),
          color: fill ? getContrastingText(fill) : "#000",
        }}
        onChange={(e) => {
          handleContentChange(e);
        }}
        html={value || "Note"}
      />
    </foreignObject>
  );
};
