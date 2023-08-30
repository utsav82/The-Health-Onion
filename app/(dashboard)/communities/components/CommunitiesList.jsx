import prisma from "app/libs/prismadb";
import Link from "next/link";
import { getCurrentUser } from "app/libs/session";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "app/components/ui/tabs";
import { BsPeople } from "react-icons/bs";
import { Roboto_Condensed } from "next/font/google";

const roboto_condensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: "700",
});

function CommunityCard({ community }) {
  return (
    <div
      style={
        community.image
          ? { backgroundImage: `url(${community.image})` }
          : { backgroundColor: "black" }
      }
      className={`shadow-xl  p-5 rounded-lg h-[18.75rem] w-[20rem] flex flex-col justify-between items-start bg-cover bg-center`}>
      <div>
        <p className={` text-[white] opacity-100 font-black uppercase text-xs`}>
          Created By {community.creator.name}
        </p>
        <h1
          order={3}
          className={`font-black text-[white] leading-[1.2] text-[2.5rem]  mt-4 ${roboto_condensed.className}`}>
          {community.name}
        </h1>
      </div>

      <div className="grid grid-flow-col grid-cols-2 gap-5 font-extrabold text-white ">
        <div>
          <BsPeople size={20} className="mr-2"></BsPeople> Followers{" "}
          {community.subscribers.length}
        </div>
      </div>
    </div>
  );
}

const CommunitiesList = async () => {
  try {
    const user = await getCurrentUser();
    const communities = await prisma.community.findMany({
      include: {
        creator: true,
        subscribers: true,
      },
    });
    const subscriptionsWithCommunity = await prisma.subscription.findMany({
      where: {
        userId: user.id,
      },
      include: {
        community: {
          include: {
            creator: true,
            subscribers: true,
          },
        },
      },
    });
    const subscribedCommunities = subscriptionsWithCommunity.map(
      (subscription) => subscription.community
    );
    return (
      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-2 max-w-[350px]">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="followed">Followed</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="md:grid flex flex-col md:grid-cols-4  items-center justify-center gap-5 mt-5">
            {communities.map((item, idx) => (
              <Link href={`/communities/${item.name}`} key={item.id}>
                <CommunityCard community={item}></CommunityCard>
              </Link>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="followed">
          <div className="flex justify-center md:justify-normal gap-5 mt-5 flex-wrap">
            {subscribedCommunities.map((item) => (
              <Link href={`/communities/${item.name}`} key={item.id}>
                <CommunityCard community={item}></CommunityCard>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    );
  } catch (err) {
    console.error("An error occurred:", err);
    return (
      <div className="text-black container">Error loading communities.</div>
    );
  }
};

export default CommunitiesList;
