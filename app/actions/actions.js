"use server";
import { revalidateTag, revalidatePath } from "next/cache";
import { getCurrentUser } from "app/libs/session";
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
    if (!postId) {
      throw new Error("There is no post");
    }
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
  } catch (err) {
    console.error("Error while deleting", err);
    throw new Error("Unable to delete post");
  }

  redirect(`/communities/${communityName}`);
}

export async function deleteComment(postId, commentId, replies) {
  try {
    if (!commentId) {
      throw new Error("There is no comment");
    }
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
    throw new Error("Unable to delete comment");
  }

  revalidateTag(postId);
}

export async function deleteCommunity(communityName, user) {
  try {
    if (!communityName) {
      throw new Error("Community does not exist");
    }
    const community = await prisma.community.findFirst({
      where: {
        name: communityName,
      },
      include: {
        creator: true,
      },
    });

    if (user.id !== community.creator.id) {
      throw new Error("Unauthorized");
    }
    if (!community) {
      throw new Error("Community does not exist");
    }
    await prisma.subscription.deleteMany({
      where: {
        communityId: community.id,
      },
    });

    await prisma.community.delete({
      where: {
        id: community.id,
      },
    });
  } catch (err) {
    console.error("Error while deleting", err);
    throw new Error("Unable to delete community");
  }

  redirect(`/communities`);
}
