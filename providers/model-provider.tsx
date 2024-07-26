"use client";
import React, { useEffect, useState } from "react";
import RenameModel from "@/components/modal/RenameModel";
const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <RenameModel />
    </>
  );
};

export default ModelProvider;
