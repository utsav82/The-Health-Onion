"use client"
import { FaShare } from "react-icons/fa";
const ShareButton = () => {
  return (
    <>
      <button className="flex space-x-2 items-center">
      <FaShare size={20} className="mr-2"></FaShare>
         {"  "}Share
      </button>
    </>
  );
};

export default ShareButton;
