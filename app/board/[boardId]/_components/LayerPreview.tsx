"use client";
import { useStorage } from "@/liveblocks.config";
import { LayerType } from "@/types/Canvas";
import React, { memo } from "react";
import Rectangle from "./Rectangle";
import Ellipse from "./Ellipse";
import { Text } from "./Text";
import { Note } from "./Note";
import Path from "./Path";
import { colorToCss } from "@/lib/utils";

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
}
const LayerPreview = memo(
  ({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));

    if (!layer) {
      return null;
    }

    switch (layer.type) {
      case LayerType.Path:
        return (
          <Path
            key={id}
            points={layer.points}
            onPointerDown={(e) => {
              onLayerPointerDown(e, id);
            }}
            stroke={selectionColor}
            fill={layer.fill ? colorToCss(layer.fill) : "#000"}
            x={layer.x}
            y={layer.y}
          />
        );
      case LayerType.Note:
        return (
          <Note
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Text:
        return (
          <Text
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Ellipse:
        return (
          <Ellipse
            id={id}
            layer={layer}
            onLayerPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Rectangle:
        return (
          <Rectangle
            id={id}
            layer={layer}
            onLayerPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );

      default:
        return null;
    }
  }
);

export default LayerPreview;
LayerPreview.displayName = "LayerPreview";
