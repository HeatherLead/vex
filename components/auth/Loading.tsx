import React from "react";
import Image from "next/image";
import logo from "@/public/logo.svg";
const Loading = () => {
  return (
    <div className=" w-full h-full m-0 p-0 flex justify-center items-center flex-col gap-y-4">
      <Image
        src={logo}
        alt="logo"
        width={120}
        className=" animate-pulse duration-700"
      />
    </div>
  );
};

export default Loading;
