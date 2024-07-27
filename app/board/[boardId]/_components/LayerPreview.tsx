"use client";
import { useStorage } from "@/liveblocks.config";
import { LayerType } from "@/types/Canvas";
import React, { memo } from "react";
import Rectangle from "./Rectangle";

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
