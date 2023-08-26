import { DashboardHeader } from "app/components/header";
import { DashboardShell } from "app/components/shell";
import PostCarousel from "./components/PostCarousel";
import CommunitiesCards from "./components/CommunitiesCards";
import prisma from "app/libs/prismadb";
import { getCurrentUser } from "app/libs/session";
export const metadata = {
  title: "Dashboard",
};

export default async function PostsPage() {
  const user = await getCurrentUser();
  const posts = await prisma.post.findMany({
    include: {
      votes: true,
      comments: true,
      author: true,
      community: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const communities = await prisma.community.findMany();

  return (
    <DashboardShell>
      <div className="md:p-10 md:w-[80vw]">
        <DashboardHeader
          heading="Your feed"
          text="See the latest posts from communities"
        />
        <PostCarousel posts={posts} user={user}></PostCarousel>
      </div>
      <div className="md:p-10">
        <DashboardHeader heading="Recommended Communities" className="pb-10" />
        <CommunitiesCards
          communities={communities.slice(0, 3)}
          user={user}></CommunitiesCards>
      </div>
    </DashboardShell>
  );
}
