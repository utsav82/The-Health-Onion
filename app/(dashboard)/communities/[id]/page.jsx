import React from "react";
import PostList from "./components/PostList";
import prisma from "app/libs/prismadb";
const page = async ({ params }) => {
  const community = await prisma.community.findUnique({
    where: {
      name: params.id,
    },
  });

  if (!community) {
    throw new Error("Community not found");
  }

  const posts = await prisma.post.findMany({
    where: {
      communityId: community.id,
    },
    include: {
      votes: true,
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col">
      <PostList posts={posts}></PostList>
    </div>
  );
};

export default page;
