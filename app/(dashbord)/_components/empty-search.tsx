import React from "react";
import Image from "next/image";
const EmptySearch = () => {
  return (
    <div className=" h-full flex flex-col items-center justify-center">
      <Image src="/emptySearch.svg" alt="empty" width={140} height={140} />
      <h2 className=" text-2xl mt-6 font-semibold"> No results found!</h2>
      <p className=" text-muted-foreground text-sm mt-2 ">
        Try searching for something else
      </p>
    </div>
  );
};

export default EmptySearch;
