import { getCurrentUser } from "app/libs/session";
import prisma from "app/libs/prismadb";

export async function POST(req) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { communityId } = body;

    const subscriptionExists = await prisma.subscription.findFirst({
      where: {
        communityId,
        userId: user.id,
      },
    });

    if (subscriptionExists) {
      await prisma.subscription.delete({
        where: { id: subscriptionExists.id },
      });
    } else {
      await prisma.subscription.create({
        data: {
          communityId,
          userId: user.id,
        },
      });
    }

    return new Response(communityId);
  } catch (error) {
    error;
    return new Response(
      "Could not subscribe to subreddit at this time. Please try later",
      { status: 500 }
    );
  }
}
