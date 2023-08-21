
import { DashboardHeader } from "app/components/header"
import { DashboardShell } from "app/components/shell"
import PostList from "app/(dashboard)/communities/[id]/components/PostList.jsx";
import prisma from "app/libs/prismadb";
export const metadata = {
  title: "Dashboard",

}

export default async function PostsPage() {

  const posts = await prisma.post.findMany({
    include: {
      votes: true,
      comments: true,
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Your feed"
        text="See the latest posts from communities"
      />
      <div className="grid gap-10">

        <PostList posts={posts}></PostList>

      </div>
    </DashboardShell>
  )
}
