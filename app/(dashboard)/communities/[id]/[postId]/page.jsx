import prisma from "app/libs/prismadb";
import Post from "../components/Post"
import { getCurrentUser } from "app/libs/session";

const PostPage = async ({ params }) => {
  const user = await getCurrentUser();
  const postId = params.postId;
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      votes: true,
      comments: {
        include: {
          author: true, 
        },
      },
    },
  });

  return <div><Post item={post} user={user.id}></Post>Comments</div>;
};

export default PostPage;
