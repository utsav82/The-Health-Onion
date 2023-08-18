import React from "react";
import prisma from "app/libs/prismadb";
import Image from "next/image";

import CommunityInfo from "./components/CommunityInfo";

const page = async ({ params, children }) => {
  const community_name = params.id;
  const community = await prisma.community.findFirst({
    where: { name: community_name },
  });
  const user = await prisma.user.findUnique({
    where: { id: community.creatorId },
  });
  return (
    <div className="flex flex-col mt-[-25px]">
      <Image
        src={"/images/Community_banner.png"}
        width="500"
        height="100"
        className="object-cover w-screen max-h-48"></Image>
      <div className="container mt-5 flex flex-col-reverse items-start md:space-x-5 md:flex md:justify-between md:flex-row">
        <div>{children}</div>
        <div className="flex items-center justify-center">
          <CommunityInfo
            community={community}
            user={user}
            community_name={community_name}></CommunityInfo>
        </div>
      </div>
    </div>
  );
};

export default page;
