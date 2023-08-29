
import Image from "next/image";

import CommunityInfo from "./components/CommunityInfo";

const page = async ({ params, children }) => {
  return (
    <div className="flex flex-col mt-[-25px]">
      <Image
        unoptimized={true}
        src={"/images/Banner_4.jpg"}
        width="500"
        height="100"
        alt="banner"
        className="object-cover w-screen max-h-48 z-10"></Image>
      <div className="container w-screen items-center md:items-start md:mt-5 md:gap-10 flex flex-col-reverse md:flex md:flex-row">
        <div className="md:mt-0 w-screen">{children}</div>
        <div className="md:top-20 md:h-full md:sticky">
          <CommunityInfo params={params} />
        </div>
      </div>
    </div>
  );
};

export default page;
