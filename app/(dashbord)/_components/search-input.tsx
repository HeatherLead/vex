"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import qs from "query-string";
import { Search } from "lucide-react";
import { useDebounceValue, useDebounceCallback } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const debounceValue = useDebounceValue(value, 500);
  const handlechange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: {
          search: debounceValue[0],
        },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );
    router.push(url);
  }, [debounceValue, router]);
  return (
    <div className=" w-full relative flex items-center gap-x-4">
      <Search className=" absolute top-1/2 -translate-y-1/2 left-3 text-muted-foreground h-6 w-6 " />
      <Input
        placeholder="Search boards"
        className=" w-full max-w-[516px] pl-12"
        onChange={handlechange}
        value={value}
      />
    </div>
  );
};

export default SearchInput;
