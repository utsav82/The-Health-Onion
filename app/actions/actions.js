"use server";
import { revalidateTag, revalidatePath } from "next/cache";
import prisma from "app/libs/prismadb";
import { redirect } from "next/navigation";
export async function handleComment(comment, postId, user, replyToId) {
  try {
    await prisma.comment.create({
      data: {
        text: comment,
        postId,
        authorId: user.id,
        replyToId,
      },
    });
  } catch (err) {
    console.error("Error while adding comment:", err);
    throw new Error("Unable to add comment");
  }

  revalidateTag(postId);
}

export async function handleUser(userId, user) {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: user,
    });
  } catch (err) {
    console.error("Error while updating user:", err);
    throw new Error("Unable to update user");
  }

  redirect("/dashboard/settings");
}

export async function deletePost(postId, communityName) {
  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
  } catch (err) {
    console.error("Error while deleting", err);
    throw new Error("Unable to deleting post");
  }

  redirect(`/communities/${communityName}`);
}

export async function deleteComment(postId, commentId, replies) {
  try {
    if (replies === null || replies.length === 0) {
      await prisma.comment.delete({
        where: {
          id: commentId,
        },
      });
    } else {
      await prisma.comment.update({
        where: {
          id: commentId,
        },
        data: {
          text: " * this comment was deleted * ",
        },
      });
    }
  } catch (err) {
    console.error("Error while deleting", err);
    throw new Error("Unable to deleting comment");
  }

  revalidateTag(postId);
}
