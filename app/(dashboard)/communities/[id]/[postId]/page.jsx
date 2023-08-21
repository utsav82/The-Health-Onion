import prisma from "app/libs/prismadb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "app/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "app/components/ui/avatar";
import CommentsList from "./components/CommentsList";
import LikeButton from "../components/Like-Button";
import CommentButton from "../components/Comment-Button";
import ShareButton from "../components/Share-Button";
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
  const voted = post.votes.some((vote) => vote.userId === user.id);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 text-gray-500">
          <p>Posted by</p>
          <Avatar className="w-5 h-5">
            <AvatarImage src={post.authorImage} alt="@shadcn" />
            <AvatarFallback>
              <AvatarImage src={post.authorImage} alt="@shadcn" />
            </AvatarFallback>
          </Avatar>
          <p>{post.authorName}</p>
        </div>

        <CardTitle> {post.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <img src={post.image} alt="" />
      </CardContent>

      <CardFooter className="flex flex-col">
        <div className="flex gap-6 items-center w-full">
          <CardDescription>
            <CommentButton number={post?.comments.length}></CommentButton>
          </CardDescription>
          <CardDescription>
            <LikeButton
              voted={voted}
              postId={post.id}
              number={post?.votes.length}></LikeButton>
          </CardDescription>
          <CardDescription>
            <ShareButton></ShareButton>
          </CardDescription>
        </div>
        <CommentsList user={user} postId={postId}></CommentsList>
      </CardFooter>
    </Card>
  );
};

export default PostPage;
