"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
interface NewBoardButtonProps {
  orgId: string;
  dissabled?: boolean;
}
const NewBoardButton = ({ orgId, dissabled }: NewBoardButtonProps) => {
  const router = useRouter();
  const { mutate, pending } = useApiMutation(api.board.create);
  const onClick = () => {
    mutate({
      orgId,
      title: "untitled",
    })
      .then((id) => {
        toast.success("board created");
        router.push(`/board/${id}`);
      })
      .catch(() => {
        toast.error("error");
      });
  };
  return (
    <button
      className={cn(
        " col-span-1 aspect-[100/127]  bg-blue-600  rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center p-6  ",
        (dissabled || pending) &&
          "opacity-75 hover:bg-blue-600 cursor-not-allowed"
      )}
      onClick={onClick}
      disabled={dissabled || pending}
    >
      <div />
      <Plus className=" h-12  w-12 text-white  stroke-1 " />
      <p className=" text-sm  text-white font-light">New board</p>
    </button>
  );
};

export default NewBoardButton;
