
import PostList from "./components/PostList";
import prisma from "app/libs/prismadb";
import { notFound } from "next/navigation";
const page = async ({ params }) => {

  const communityWithPosts = await getData(params);
  const isCommunity = !!communityWithPosts;
  if (!isCommunity) return notFound();
  return (
   
      <PostList posts={communityWithPosts.posts} />
  
  );

};
async function getData(params) {
  try {
    const communityWithPosts = await prisma.community.findFirst({
      where: {
        name: params.id,
      },
      include: {
        posts: {
          include: {
            votes: true,
            comments: true,
            author: true,
            community: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return communityWithPosts;
  } catch (error) {
    console.error(error);
    return null;
  }
}
export default page;
