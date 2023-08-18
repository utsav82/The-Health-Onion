import prisma from "app/libs/prismadb";
import { getCurrentUser } from "app/libs/session";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";
import CreatePostForm from "./CreatePostForm"
const page = async ({ params }) => {

  const user = await getCurrentUser();
  const community_name = params.id;
  const subscription = await prisma.subscription.findFirst({
    where: {
      community: {
        name: community_name,
      },
      user: {
        id: user.id,
      },
    },
  })

  const isSubscribed = !!subscription

  if (!isSubscribed) {
     redirect(`/communities/${community_name}`)
  }

  return <CreatePostForm/>;


};

export default page;
