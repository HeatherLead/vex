"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Hint from "@/components/hint";
import { useRenameModel } from "@/store/use-rename-model";
import Actions from "@/components/actions";
import { Menu } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "600",
});

interface InfoProps {
  boardId: string;
}

const TabSeperator = () => {
  return <div className=" text-neutral-300  px-1.5">|</div>;
};

const Info = ({ boardId }: InfoProps) => {
  const { onOpen } = useRenameModel();
  const data = useQuery(api.board.get, { id: boardId as Id<"boards"> });

  if (!data) {
    return <InfoSkeleton />;
  }
  return (
    <div className="  absolute top-2  left-2 bg-white  rounded-md  h-12 flex items-center shadow-md px-1.5">
      <Hint side="bottom" sideOffset={10} label="go to boards">
        <Button variant={"board"} asChild className=" px-2 ">
          <Link href="/">
            <Image src="/logo.svg" alt="logo" height="40" width="40" />
            <span
              className={cn(
                " font-semibold text-xl  ml-2  text-black",
                poppins.className
              )}
            >
              Board
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeperator />
      <Hint side="bottom" sideOffset={10} label="Edit title">
        <Button
          variant={"board"}
          className=" text-base  font-normal px-2"
          onClick={() => onOpen(data._id, data.title)}
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeperator />
      <Actions id={data._id} title={data.title} side="bottom" sideOffSet={10}>
        <div>
          <Hint label="main menu" side="bottom" sideOffset={10}>
            <Button size={"icon"} variant={"board"}>
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

export default Info;

export const InfoSkeleton = () => {
  return (
    <div className="  absolute top-2  left-2 bg-white w-[300px]  rounded-md  h-12 flex items-center shadow-md px-1.5" />
  );
};
