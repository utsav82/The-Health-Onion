import prisma from "app/libs/prismadb";
import PostList from "./components/PostList";
import { Suspense } from "react";
const page = async ({ params }) => {

  const community = await prisma.community.findFirst({
    where: {
      name: params.id,
    }
  });


  return (
    <Suspense fallback={<div className="text-xl text-black font-bold h-[75vh] flex items-center justify-center">Create posts and <br className="sm:hidden"></br>   share with community</div>}>
      <PostList community={community} />
    </Suspense>
  );

};


export default page;
