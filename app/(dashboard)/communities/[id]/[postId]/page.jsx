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
import DeleteButton from "../components/Delete-Button";
import ShareButton from "../components/Share-Button";
import { getCurrentUser } from "app/libs/session";
import { formatTimeToNow } from "app/libs/utils";
const PostPage = async ({ params }) => {
  const user = await getCurrentUser();
  const postId = params.postId;

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      votes: true,
      author: true,
      comments: {
        include: {
          author: true,
        },
      },
    },
  });

  const voted = post.votes.some((vote) => vote.userId === user.id);

  return (
    <Card className="md:container md:w-full" id="post">
      <CardHeader>
        <div className="flex items-center gap-2 text-gray-500">
          <p>Posted by</p>
          <Avatar className="w-5 h-5">
            <AvatarImage src={post.author.image} alt="@shadcn" />
            <AvatarFallback>
              <AvatarImage src={post.author.image} alt="@shadcn" />
            </AvatarFallback>
          </Avatar>
          <p>{post.author.name}</p>
          <p> {formatTimeToNow(new Date(post.createdAt))}</p>

        </div>

        <CardTitle> {post.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center">
        {post.image && <img src={post.image} alt="post" className='mb-5' />}
        <p>{post.content}</p>
      </CardContent>

      <CardFooter className="flex flex-col w-full">
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
          <CardDescription>
            {(post.authorId === user.id) && <DeleteButton postId={postId} communityName={params.id}></DeleteButton>}
          </CardDescription>
        </div>
        <div className="w-full" id="comment">
          <CommentsList user={user} postId={postId}></CommentsList>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostPage;
