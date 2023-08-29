
import { DashboardHeader } from "app/components/header"
import { DashboardShell } from "app/components/shell"
import PostList from "app/(dashboard)/communities/[id]/components/PostList.jsx";
import prisma from "app/libs/prismadb";
import { getCurrentUser } from "app/libs/session";
export const metadata = {
  title: "My Posts",

}

export default async function PostsPage() {
  const user = await getCurrentUser();
  const posts = await prisma.post.findMany({
    where: {
      authorId: user.id
    },
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

  console.log(posts)
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Your Posts"
        text="See posts you made"
      />
      <div className="grid gap-10">

        {posts.length !== 0 ? <PostList posts={posts}></PostList> : <div className="text-xl font-bold h-[50vh] flex items-center justify-center">Join communities to create posts</div>}

      </div>
    </DashboardShell>
  )
}
