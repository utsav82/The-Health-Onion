import React from "react";
import { BsPeople } from "react-icons/bs";
import { Roboto_Condensed } from "next/font/google";
const roboto_condensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: "700",
});
import Link from "next/link";
function CommunityCard({ community }) {
  return (
    <div
      style={
        community.image
          ? { backgroundImage: `url(${community.image})` }
          : { backgroundColor: "black" }
      }
      className={`shadow-xl  p-5 rounded-lg h-[18.75rem] w-[20rem] flex flex-col justify-between items-start bg-cover bg-center`}>
      <div>
        <p className={` text-[white] opacity-100 font-black uppercase text-xs`}>
          Created By {community.creator.name}
        </p>
        <h1
          order={3}
          className={`font-black text-[white] leading-[1.2] text-[2.5rem]  mt-4 ${roboto_condensed.className}`}>
          {community.name}
        </h1>
      </div>

      <div className="grid grid-flow-col grid-cols-2 gap-5 font-extrabold text-white ">
        <div>
          <BsPeople size={20} className="mr-2"></BsPeople> Followers{" "}
          {community.subscribers.length}
        </div>
      </div>
    </div>
  );
}

const CommunitiesCards = ({ communities }) => {
  return (
    <div className="hidden md:flex md:flex-row gap-10">
      {communities.map((item, idx) => (
         <Link href={`/communities/${item.name}`} key={item.id}>
        <CommunityCard community={item}></CommunityCard>
        </Link>
      ))}
    </div>
  );
};

export default CommunitiesCards;
