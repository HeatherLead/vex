"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";
import { error } from "console";
import { useRouter } from "next/navigation";

const Empty = () => {
  const router = useRouter();
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);
  const onClick = () => {
    if (!organization) {
      return;
    }
    mutate({
      orgId: organization.id,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("board created");
        router.push(`/board/${id}`);
      })
      .catch((error) => {
        toast.error("failed to create board");
      });
  };
  return (
    <div className=" h-full flex flex-col items-center justify-center">
      <Image src="/note.svg" alt="empty" width={110} height={110} />
      <h2 className=" text-2xl mt-6 font-semibold">Create your first board!</h2>
      <p className=" text-muted-foreground text-sm mt-2 ">
        Start by creating a board for your organization
      </p>
      <div className=" mt-6">
        <Button disabled={pending} onClick={onClick} size={"lg"}>
          Create board
        </Button>
      </div>
    </div>
  );
};

export default Empty;
