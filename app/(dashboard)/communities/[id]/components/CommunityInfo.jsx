import { Avatar, AvatarFallback, AvatarImage } from "app/components/ui/avatar";
import { notFound } from "next/navigation";
import prisma from "app/libs/prismadb";
import { getCurrentUser } from "app/libs/session";
import SubscribeLeaveToggle from "./SubscribeLeaveToggle";
import Link from "next/link";
import { Button } from "app/components/ui/button";
import DeleteButton from "./Community-Delete-Button";
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
    <div className="community-container relative w-screen md:w-[350px] max-w-md h-fit bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

      <div className="community-header p-5">
        <img className="rounded-t-lg w-screen object-cover md:w-[350px] h-52" src={community.image} alt="Community image" />
        <div className="community-info">
          <h5 className="mb-2 mt-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {community.name}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {community.description}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {community.subscribers.length} member(s)
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
        <div className="community-creator flex items-center space-x-1">
          <Avatar>
            <AvatarImage src={community.creator?.image} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-center text-black">{community.creator?.name}</p>
          {user.id === community.creator.id && <DeleteButton communityName={community_name} user={user} className="self-end"></DeleteButton>}
        </div>
      </div>
      <div className="community-actions p-5 -mt-5 flex justify-between">
        <div className="subscribe-leave-toggle">
          <SubscribeLeaveToggle
            isSubscribed={isSubscribed}
            communityId={community.id}
            communityName={community.name}
          />
        </div>
        {isSubscribed && (
          <div className="create-post-button">
            <Button asChild variant={"secondary"}>
              <Link href={`/communities/${community.name}/create`}>Create Post</Link>
            </Button>
          </div>
        )}
      </div>
    </div>

  );
};

export default CommunityInfo;
