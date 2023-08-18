import React from "react";
import prisma from "app/libs/prismadb";
import Image from "next/image";
import { getCurrentUser } from "app/libs/session";
import CommunityInfo from "./components/CommunityInfo";

const page = async ({ params, children }) => {
  const suser = await getCurrentUser();
  const community_name = params.id;
  const community = await prisma.community.findFirst({
    where: { name: community_name },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  });

  const user = await prisma.user.findUnique({
    where: { id: community.creatorId },
  });

  const subscription = await prisma.subscription.findFirst({
    where: {
      community: {
        name: community_name,
      },
      user: {
        id: suser.id,
      },
    },
  })

  const isSubscribed = !!subscription


  if (!community) return notFound()

  const memberCount = await prisma.subscription.count({
    where: {
      community: {
        name: community_name,
      },
    },
  })


  return (
    <div className="flex flex-col mt-[-25px]">
      <Image
        unoptimized={true}
        src={"/images/Community_banner.png"}
        width="500"
        height="100"
        alt="banner"
        className="object-cover w-screen max-h-48"></Image>
      <div className="container mt-5 flex flex-col-reverse items-start md:space-x-5 md:flex md:justify-between md:flex-row">
        <div>{children}</div>
        <div className="flex items-center justify-center">
          <CommunityInfo
            community={community}
            user={user}
            memberCount={memberCount}
            isSubscribed={isSubscribed}
          ></CommunityInfo>
        </div>
      </div>
    </div>
  );
};

export default page;
