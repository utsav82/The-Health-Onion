import { Avatar, AvatarFallback, AvatarImage } from "app/components/ui/avatar";
import Link from "next/link";
import { Button } from "app/components/ui/button";

const CommunityInfo = ({ community, user, community_name }) => {
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
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className=" text-black">{user.name}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <Button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Follow
          </Button>
          <Button asChild>
            <Link
              href={`/communities/${community_name}/create`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Create Post
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunityInfo;
