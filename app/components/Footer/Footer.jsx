import React from "react";

const Footer = () => {
  return (
    <div className="background_1 absolute inset-x-0  md:relative">
      <div className="flex flex-row gap-10 p-10 items-center justify-around bg-white rounded-t-3xl">
        <div className="w-60 h-56 bg-[gray] rounded-xl"></div>
        <div className="hidden md:block w-60 h-56 bg-[gray] rounded-xl"></div>
        <div className="hidden md:block w-60 h-56 bg-[gray] rounded-xl"></div>
        <div className="hidden md:block w-60 h-56 bg-[gray] rounded-xl"></div>
      </div>
    </div>
  );
};

export default Footer;
