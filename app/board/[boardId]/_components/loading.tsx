import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "lucide-react";
import { InfoSkeleton } from "./Info";
import { ParticipantsSkeleton } from "./Participants";
import { ToolbarSkeleton } from "./Toolbar";

const Loading = () => {
  return (
    <main className=" h-full w-full  relative  bg-neutral-100  flex items-center justify-center touch-none ">
      <Loader className="  w-6 h-6  text-muted-foreground  animate-spin" />
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
    </main>
  );
};

export default Loading;
