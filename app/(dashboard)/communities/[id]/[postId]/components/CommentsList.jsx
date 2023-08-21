import React from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import prisma from "app/libs/prismadb";
const Comments = async ({ user, postId }) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId: postId,
      replyToId: null,
    },
    include: {
      author: true,
      replies: {
        include: {
          author: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 w-full">
      <div className="mx-auto  w-full">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Comments (<></>{comments.length})
          </h2>
        </div>
        <CommentForm user={user} postId={postId} replyToId={null}></CommentForm>
        {comments.map((comment, idx) => (
          <Comment comment={comment} key={idx} user={user} />
        ))}
      </div>
    </section>
  );
};

export default Comments;
