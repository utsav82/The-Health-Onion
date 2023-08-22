
import Image from "next/image";

import CommunityInfo from "./components/CommunityInfo";

const page = async ({ params, children }) => {
  return (
    <div className="flex flex-col mt-[-25px]">
      <Image
        unoptimized={true}
        src={"/images/Community_banner.png"}
        width="500"
        height="100"
        alt="banner"
        className="object-cover w-screen max-h-48"></Image>
      <div className="container w-screen items-center md:items-start mt-5 md:gap-10 flex flex-col-reverse md:flex md:flex-row">
        <div className="mt-5 md:mt-0 w-full">{children}</div>
        <div className="md:top-20 md:h-full md:sticky">
          <CommunityInfo params={params} />
        </div>
      </div>
    </div>
  );
};

export default page;
