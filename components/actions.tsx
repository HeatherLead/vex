"use client";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import React from "react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import ConfirmModel from "./confirmModel";
import { Button } from "./ui/button";
import { useRenameModel } from "@/store/use-rename-model";

interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffSet?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}
const Actions = ({ children, side, sideOffSet, id, title }: ActionsProps) => {
  const { onOpen } = useRenameModel();
  const { mutate, pending } = useApiMutation(api.board.remove);
  const copyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => {
        toast.success("Linked copied");
      })
      .catch(() => {
        toast.error("failed to copy link");
      });
  };

  const onDelete = () => {
    mutate({ id })
      .then(() => toast.success("Board deleted"))
      .catch(() => toast.error("failed to delete board"));
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => {
          e.stopPropagation();
        }}
        side={side}
        sideOffset={sideOffSet}
        className=" w-60"
      >
        <DropdownMenuItem onClick={copyLink} className=" p-2 cursor-pointer">
          <Link2 className=" h-4 w-4 mr-2" />
          Copy board link
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            onOpen(id, title);
          }}
          className=" p-2 cursor-pointer"
        >
          <Pencil className=" h-4 w-4 mr-2" />
          Rename
        </DropdownMenuItem>
        <ConfirmModel
          header="delete board?"
          description="This will delete board and all if its content"
          disabled={pending}
          onConfirm={onDelete}
        >
          <Button
            variant={"ghost"}
            className=" p-2 cursor-pointer text-sm w-full justify-start font-normal"
          >
            <Trash2 className=" h-4 w-4 mr-2" />
            Delete
          </Button>
        </ConfirmModel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
