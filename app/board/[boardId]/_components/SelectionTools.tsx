"use client";
import { useSelectionBounds } from "@/hooks/use-selection-bound";
import { useMutation, useSelf } from "@/liveblocks.config";
import { camara, Color } from "@/types/Canvas";
import React, { memo } from "react";
import ColorPicker from "./ColorPicker";
import { useDeleteLayers } from "@/hooks/use-delete";
import { Button } from "@/components/ui/button";
import Hint from "@/components/hint";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";
interface SelectionToolsProps {
  camara: camara;
  setLastUseColor: (color: Color) => void;
}
const SelectionTools = memo(
  ({ camara, setLastUseColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);

    const moveToBack = useMutation(
      ({ storage }) => {
        const liveLayersId = storage.get("layerIds");
        const indices: number[] = [];

        const arr = liveLayersId.toImmutable();

        for (let i = 0; i < arr.length; i++) {
          if (selection.includes(arr[i])) {
            indices.push(i);
          }
        }

        for (let i = 0; i < indices.length; i++) {
          liveLayersId.move(indices[i], i);
        }
      },
      [selection]
    );
    const moveToFront = useMutation(
      ({ storage }) => {
        const liveLayersId = storage.get("layerIds");
        const indices: number[] = [];

        const arr = liveLayersId.toImmutable();

        for (let i = 0; i < arr.length; i++) {
          if (selection.includes(arr[i])) {
            indices.push(i);
          }
        }

        for (let i = indices.length - 1; i >= 0; i--) {
          liveLayersId.move(
            indices[i],
            arr.length - 1 - (indices.length - 1 - i)
          );
        }
      },
      [selection]
    );

    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get("layers");
        setLastUseColor(fill);

        selection.forEach((id) => {
          liveLayers.get(id)?.set("fill", fill);
        });
      },
      [selection, setLastUseColor]
    );

    const deleteLayer = useDeleteLayers();

    const selectionBounds = useSelectionBounds();
    if (!selectionBounds) {
      return null;
    }
    const x = selectionBounds.width / 2 + selectionBounds.x + camara.x;
    const y = selectionBounds.y + camara.y;

    return (
      <div
        className=" absolute p-3  rounded-xl bg-white  shadow-sm  border flex select-none"
        style={{
          transform: `translate(
          calc(${x}px - 50%),
          calc(${y - 16}px - 100%)
          )`,
        }}
      >
        <ColorPicker onChange={setFill} />
        <div className=" flex flex-col gap-y-0.5">
          <Hint label="Bring to front">
            <Button onClick={moveToFront} variant={"board"}>
              <BringToFront />
            </Button>
          </Hint>
          <Hint label="Send to Back">
            <Button onClick={moveToBack} variant={"board"}>
              <SendToBack />
            </Button>
          </Hint>
        </div>
        <div className=" flex items-center pl-2 ml-2 border-l border-neutral-200">
          <Hint label="Delete">
            <Button variant={"board"} size={"icon"} onClick={deleteLayer}>
              <Trash2 />
            </Button>
          </Hint>
        </div>
      </div>
    );
  }
);

export default SelectionTools;
SelectionTools.displayName === "SelectionTools";
