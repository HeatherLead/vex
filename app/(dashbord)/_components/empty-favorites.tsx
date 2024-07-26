import React from "react";
import Image from "next/image";
const EmptyFavorites = () => {
  return (
    <div className=" h-full flex flex-col items-center justify-center">
      <Image src="/emptyFavorites.svg" alt="empty" width={140} height={140} />
      <h2 className=" text-2xl mt-6 font-semibold"> No favorite boards!</h2>
      <p className=" text-muted-foreground text-sm mt-2 ">
        Try favoriting a board
      </p>
    </div>
  );
};

export default EmptyFavorites;
