import React from "react";
import Post from "./components/Post";
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
      <Post posts={posts}></Post>
    </div>
  );
};

export default page;
