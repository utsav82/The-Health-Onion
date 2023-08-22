import { Avatar, AvatarFallback, AvatarImage } from "app/components/ui/avatar";
import { notFound } from "next/navigation";
import prisma from "app/libs/prismadb";
import { getCurrentUser } from "app/libs/session";
import SubscribeLeaveToggle from "./SubscribeLeaveToggle";
import Link from "next/link";
import { Button } from "app/components/ui/button";

const CommunityInfo = async ({ params }) => {
  const user = await getCurrentUser();
  const community_name = params.id;
  const community = await prisma.community.findFirst({
    where: { name: community_name },
    include: {
      creator: true,
      subscribers: true,
      posts: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  });

  if (!community) return notFound();
  const isSubscribed = community.subscribers.some(item => item.userId === user.id);

  return (
    <div className=" w-screen md:w-full max-w-md h-fit bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg hidden md:block" src="/images/Basil_leaf.jpg" alt="" />
      <div className="p-5">
        <div className="flex justify-between">
          <div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {community.name}
            </h5>

            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {community.description}
            </p>

            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {community.subscribers.length + " member(s)"}
            </p>

            <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
              Updated At:{" "}
              {new Date(community.updatedAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <Avatar>
              <AvatarImage src={community.creator?.image} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className=" text-black">{community.creator?.name}</p>
          </div>
        </div>
        <div className="flex justify-between flex-col space-y-3 lg:space-y-0 lg:flex-row">
          <SubscribeLeaveToggle
            isSubscribed={isSubscribed}
            communityId={community.id}
            communityName={community.name}
          />
          {isSubscribed && (
            <Button asChild className="font-bold bg-secondary">
              <Link href={`/communities/${community.name}/create`}>Create Post</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityInfo;
