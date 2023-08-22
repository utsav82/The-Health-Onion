"use client"
import { FaShare } from "react-icons/fa";
import toast from "react-hot-toast"
const ShareButton = () => {
  function copy() {

    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied")
  }
  return (
    <>
      <button onClick={copy}
        className="flex space-x-2 items-center">
        <FaShare size={20} className="mr-2"></FaShare>
        {"  "}Share
      </button>
    </>
  );
};

export default ShareButton;
