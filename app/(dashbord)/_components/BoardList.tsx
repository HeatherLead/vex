"use client";

import { useQuery } from "convex/react";
import React from "react";
import EmptySearch from "./empty-search";
import EmptyFavorites from "./empty-favorites";
import Empty from "./empty";
import BoardCard from "./board-card/BoardCard";
import NewBoardButton from "./board-card/NewBoardButton";
import { api } from "@/convex/_generated/api";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}
const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = useQuery(api.boards.get, { orgId, ...query });

  if (data === undefined) {
    return (
      <div>
        <h2 className=" text-3xl ">
          {query.favorites ? "Favorites boards" : "Team boards"}
        </h2>
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  gap-5 mt-8  pb-10 ">
          <NewBoardButton orgId={orgId} dissabled />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }

  if (!data.length && query.search) {
    return <EmptySearch />;
  }
  if (!data.length && query.favorites) {
    return <EmptyFavorites />;
  }
  if (!data.length) {
    return <Empty />;
  }

  return (
    <div>
      <h2 className=" text-3xl ">
        {query.favorites ? "Favorites boards" : "Team boards"}
      </h2>
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  gap-5 mt-8  pb-10 ">
        <NewBoardButton orgId={orgId} />
        {data.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            imageUrl={board.imageUrl}
            authorId={board.authorId}
            authorName={board.authorName}
            createdAt={board._creationTime}
            orgId={board.orgId}
            isFavorite={board.isFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardList;
