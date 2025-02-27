"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, StarIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

const poppins = Poppins({
  weight: "600",
  subsets: ["latin"],
});

const OrgSidebar = () => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");
  return (
    <div className=" hidden lg:flex flex-col space-y-6  w-[206px] pl-5 pt-5  ">
      <Link href="">
        <div className=" flex items-center gap-x-2">
          <Image width={80} height={80} src="/logo.svg" alt="logo" />
          <span
            className={cn(" font-semibold text-2xl ml-2", poppins.className)}
          >
            VEX
          </span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              padding: "6px",
              width: "100%",
              height: "40px",
              borderRadius: "8px",
              border: "1px solid #efe7eb",
              justifyContent: "space-between",
              backgroundColor: "white",
            },
          },
        }}
      />
      <div className=" space-y-1 w-full">
        <Button
          variant={favorites ? "ghost" : "secondary"}
          asChild
          size="lg"
          className=" font-normal justify-start px-2 w-full"
        >
          <Link href="/">
            <LayoutDashboard className=" h-4 w-4 mr-2" />
            Team boards
          </Link>
        </Button>
        <Button
          variant={!favorites ? "ghost" : "secondary"}
          asChild
          size="lg"
          className=" font-normal justify-start px-2 w-full"
        >
          <Link
            href={{
              pathname: "/",
              query: { favorites: true },
            }}
          >
            <StarIcon className=" h-4 w-4 mr-2" />
            Favorite boards
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default OrgSidebar;
