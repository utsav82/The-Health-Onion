import prisma from "app/libs/prismadb";
import Link from "next/link";
import { getCurrentUser } from "app/libs/session";
import { BsPeople } from "react-icons/bs";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "app/components/ui/tabs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "app/components/ui/card";
import { deleteCommunity } from "app/actions/actions"
const CommunitiesList = async () => {
  try {
    const user = await getCurrentUser();
    const communities = await prisma.community.findMany({
      include: {
        creator: true,
        subscribers: true,
      }
    });
    const subscriptionsWithCommunity = await prisma.subscription.findMany({
      where: {
        userId: user.id,
      },
      include: {
        community: {
          include: {
            creator: true,
            subscribers: true
          }
        }
      }
    },
    );
    const subscribedCommunities = subscriptionsWithCommunity.map(subscription => subscription.community);
    return (
      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-2 max-w-[350px]">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="followed">Followed</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="flex justify-center md:justify-normal gap-5 mt-5 flex-wrap">
            {communities.map((item, idx) => (
              <Link href={`/communities/${item.name}`} key={item.id}>
                <Card className="h-80 w-80 flex flex-col justify-between items-start bg-cover bg-center text-white" style={{ backgroundImage: `url(${item.image})` }}>
                  <CardHeader>
                    <CardDescription className="text-white opacity-100 font-semibold uppercase drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Created By {item.creator.name}</CardDescription>
                    <CardTitle className="font-semibold text-white leading-6 text-4xl mt-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{item.name}</CardTitle>
                  </CardHeader>
                  <CardFooter>
                    <BsPeople size={20} className="mr-2"></BsPeople> Followers{" "}
                    {item.subscribers.length}
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="followed">
        <div className="flex justify-center md:justify-normal gap-5 mt-5 flex-wrap">
          {subscribedCommunities.map((item) => (
            <Link href={`/communities/${item.name}`}  key={item.id}>
              <Card className="h-80 w-80 flex flex-col justify-between items-start bg-cover bg-center text-white shadow" style={{ backgroundImage: `url(${item.image})` }}>
                <CardHeader>
                  <CardDescription className="text-white opacity-100 font-semibold uppercase drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Created By {item.creator.name}</CardDescription>
                  <CardTitle className="font-semibold text-white leading-6 text-3xl mt-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{item.name}</CardTitle>
                </CardHeader>
                <CardFooter>
                  <BsPeople size={20} className="mr-2"></BsPeople> Followers{" "}
                  {item.subscribers.length}
                </CardFooter>
              </Card>
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
