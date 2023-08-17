import prisma from "app/libs/prismadb"
import { getCurrentUser } from "app/libs/session"
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
} from "app/components/ui/card"

const CommunitiesList = async () => {
  try {


    const user = await getCurrentUser();
    const communities = await prisma.community.findMany();
    const subscribed = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        subscriptions: {
          include: { community: true },
        },
      },
    });
    const subscribedCommunities = subscribed.subscriptions.map(subscription => subscription.community)
    return (

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-2 max-w-[350px]">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="followed">Followed</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="flex gap-5 flex-wrap">
            {communities.map((item) => (
              <Card className='w-[350px]' key={item.id}>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>)
            )}
          </div>
        </TabsContent>
        <TabsContent value="followed" className="flex gap-5 flex-wrap">
          {subscribedCommunities.map((item) => (
            <Card className='w-[350px]' key={item.id}>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>)
          )}
        </TabsContent>
      </Tabs>


    );
  }
  catch (err) {
    console.error("An error occurred:", err);
    return <div className="text-black container">Error loading communities.</div>;
  }
};

export default CommunitiesList;
