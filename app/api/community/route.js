import { getCurrentUser } from "app/libs/session";
import prisma from "app/libs/prismadb";

export async function POST(req) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name } = body;

    if (name.length < 3 || name.length > 21) {
      return new Response("Invalid name", { status: 422 });
    }

    const communityExists = await prisma.community.findFirst({
      where: {
        name,
      },
    });

    if (communityExists) {
      return new Response("Community already exists", { status: 409 });
    }

    const community = await prisma.community.create({
      data: {
        name,
        creatorId: user.id,
      },
    });

    // creator also has to be subscribed
    await prisma.subscription.create({
      data: {
        userId: user.id,
        communityId: community.id,
      },
    });

    return new Response(community.name);
  } catch (error) {
    console.log(error);
    return new Response("Could not create community", { status: 500 });
  }
}
