import CommunityInfo from "./components/CommunityInfo";
import { Eczar } from "next/font/google";
const eczar = Eczar({
  weight: "600",
  style: "normal",
  subsets: ["devanagari"],
});
import { notFound } from "next/navigation";
import { Suspense } from "react";
import LoadingInfoCard from "./components/LoadingInfoCard";
const page = async ({ params, children }) => {

  const community = await prisma.community.findFirst({
    where: {
      name: params.id,
    }
  });
  const isCommunity = !!community;
  if (!isCommunity) return notFound();

  return (
    <div className="flex flex-col">
      <div
        style={{
          backgroundImage: 'url("/images/Banner_4.jpg")',
        }}
        className="h-48 w-full z-1 bg-cover bg-center flex items-center justify-center">
        <h1
          style={{ fontStyle: "italic", letterSpacing: "0.1em" }}
          className={`text-black text-center text-7xl tracking-wider  font-semibold italic ${eczar.className}`}>
          {params.id}
        </h1>
      </div>
      <div className="container w-screen items-center md:items-start md:mt-5 md:gap-10 flex flex-col-reverse md:flex md:flex-row">
        <div className="md:mt-0 w-screen">{children}</div>

        <div className="md:top-20 md:h-full md:sticky">
          <Suspense fallback={<LoadingInfoCard />}>
            <CommunityInfo params={params} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default page;
