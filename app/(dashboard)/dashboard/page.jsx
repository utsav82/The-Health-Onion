import { DashboardHeader } from "app/components/header";
import { DashboardShell } from "app/components/shell";
import PostCarousel from "./components/PostCarousel";
import CommunitiesCards from "./components/CommunitiesCards";
import prisma from "app/libs/prismadb";
import { getCurrentUser } from "app/libs/session";
import Quote from "inspirational-quotes";
import { Kreon } from "next/font/google";

const kreon = Kreon({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-kreon",
});
import { Suspense } from "react";
import Loader from "./loading";
export const metadata = {
  title: "Dashboard",
};

export default async function PostsPage() {
  const qoute = Quote.getRandomQuote();
  console.log(qoute);
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
    <div>
      <div className=" flex items-center justify-center lg:justify-between h-64 text-white bg-[linear-gradient(90deg,#9e6370_0%,#bf7b85_52.60%,#fae1dc_84.38%,#feece3_100%)]">
        {qoute && (
          <p
            className={`p-10 ${kreon.className} hidden w-1/2 md:block font-bold text-2xl`}>
            "{qoute}"
          </p>
        )}
        <img
          src="/images/Banner_dash_3.svg"
          alt="banner"
          className="block max-w-xl object-cover"></img>
      </div>

      <DashboardShell>
        <Suspense fallback={<Loader />}>
          <div className=" md:w-[76vw]">
            <DashboardHeader
              heading="Your feed"
              text="See the latest posts from communities"
            />
            <PostCarousel posts={posts} user={user}></PostCarousel>
          </div>
          <div className="">
            <DashboardHeader
              heading="Recommended Communities"
              className="pb-10"
            />
            <CommunitiesCards
              communities={communities.slice(0, 3)}
              user={user}></CommunitiesCards>
          </div>
        </Suspense>
      </DashboardShell>
    </div>
  );
}
