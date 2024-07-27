"use client";
import React from "react";
import { ReactNode } from "react";
import { ClientSideSuspense } from "@liveblocks/react";
import { RoomProvider } from "@/liveblocks.config";
import { LiveMap, LiveList, LiveObject } from "@liveblocks/client";
import { Layer } from "@/types/Canvas";

interface RoomProps {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
}
const Room = ({ children, roomId, fallback }: RoomProps) => {
  return (
    <RoomProvider
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList([]),
      }}
      id={roomId}
      initialPresence={{
        cursor: null,
        selection: [],
        pencilDraft: null,
        penColor: null,
      }}
    >
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default Room;
