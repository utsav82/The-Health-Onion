import { getCurrentUser } from "app/libs/session";
import prisma from "app/libs/prismadb";

export async function POST(req) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { title, content, communityId, imageurl } = body;

    if (title.length < 3 || title.length > 100) {
      return new Response("Invalid title", { status: 422 });
    }

    // verify user is subscribed to passed subreddit id
    const subscription = await prisma.subscription.findFirst({
      where: {
        communityId,
        userId: user.id,
      },
    });

    if (!subscription) {
      return new Response("Subscribe to post", { status: 403 });
    }

    await prisma.post.create({
      data: {
        title,
        content,
        authorId: user.id,
        authorName: user.name,
        authorImage: user.image || "https://github.com/shadcn.png",
        communityId,
        image: imageurl,
      },
    });

    return new Response("OK");
  } catch (error) {
    return new Response(
      "Could not post to community at this time. Please try later",
      { status: 500 }
    );
  }
}
