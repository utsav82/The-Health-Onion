import { Avatar, AvatarFallback, AvatarImage } from "app/components/ui/avatar";
import SubscribeLeaveToggle from "./SubscribeLeaveToggle";
import Link from "next/link";
import { Button } from "app/components/ui/button";

const CommunityInfo = ({ community, user, memberCount, isSubscribed }) => {
  return (
    <div className="max-w-sm h-fit bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg" src="/images/Basil_leaf.jpg" alt="" />
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
              {memberCount + " member(s)"}
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
              <AvatarImage src={user?.image} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className=" text-black">{user.name}</p>
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
