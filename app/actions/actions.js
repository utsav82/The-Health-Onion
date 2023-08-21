"use server";
import { revalidatePath } from "next/cache";
import prisma from "app/libs/prismadb";
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

  revalidatePath(postId);
}
