import { DashboardHeader } from "app/components/header";
import { DashboardShell } from "app/components/shell";
import Post from "app/(dashboard)/communities/[id]/components/Post.jsx";
import prisma from "app/libs/prismadb";
import { getCurrentUser } from "app/libs/session";
export const metadata = {
  title: "My Posts",
};

export default async function PostsPage() {
  const user = await getCurrentUser();
  const posts = await prisma.post.findMany({
    where: {
      authorId: user.id,
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

  return (
    <div className="mt-5">
      <DashboardHeader heading="Your Posts" text="See posts you made" />
      <div className="grid gap-10 justify-center">
        {posts.length !== 0 ? (
          <div className="w-screen md:w-full">
            <section>
              <ul className="mt-8 flex flex-col items-center justify-center md:mt-auto space-y-6">
                {posts.map((item, idx) => (
                  <Post item={item} key={idx} user={user.id} />
                ))}
              </ul>
            </section>
          </div>
        ) : (
          <div className="text-xl font-bold h-[50vh] flex items-center justify-center">
            Join communities to create posts
          </div>
        )}
      </div>
    </div>
  );
}
