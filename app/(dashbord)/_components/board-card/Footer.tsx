import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  isFavorite: boolean;
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  onClick: () => void;
  disabled: boolean;
}
const Footer = ({
  isFavorite,
  title,
  authorLabel,
  createdAtLabel,
  onClick,
  disabled,
}: FooterProps) => {
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    onClick();
  };
  return (
    <div className=" relative bg-white p-3">
      <p className=" text-[13px] truncate max-w-[calc(100%-20px)]"> {title}</p>
      <p className=" opacity-0 group-hover:opacity-100  transition-opacity  text-[11px]  text-muted-foreground truncate ">
        {authorLabel}, {createdAtLabel}
      </p>
      <button
        className={cn(
          " opacity-0 group-hover:opacity-100 transition-opacity absolute top-4  right-4 text-muted-foreground hover:text-blue-600",
          disabled && "cursor-not-allowed opacity-75"
        )}
        disabled={disabled}
        onClick={handleClick}
      >
        <Star
          className={cn(
            " h-5 w-5",
            isFavorite && "fill-blue-600 text-blue-600"
          )}
        />
      </button>
    </div>
  );
};

export default Footer;
