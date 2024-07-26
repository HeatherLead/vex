import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Toolbar = () => {
  return (
    <div className=" absolute top-1/2 -translate-y-1/2 left-2 flex  flex-col gap-y-4 ">
      <div className=" bg-white rounded-md p-1.5 flex flex-col items-center shadow-md gap-y-1">
        <div>Pencil</div>
        <div>Pencil</div>
        <div>Pencil</div>
      </div>
      <div className=" bg-white rounded-md p-1.5 flex flex-col items-center shadow-md  ">
        <div>Pencil</div>
        <div>Pencil</div>
      </div>
    </div>
  );
};

export default Toolbar;

Toolbar.Skeleton = function ToolbarSkeleton() {
  return (
    <div className=" absolute top-1/2 -translate-y-1/2 left-2 flex  flex-col gap-y-4  bg-white rounded-md p-1.5 h-[360px] w-[52px] items-center shadow-md  " />
  );
};
