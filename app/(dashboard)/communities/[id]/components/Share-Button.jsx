import React from "react";
import { FaShare } from "react-icons/fa";
const ShareButton = () => {
  return (
    <div>
      <button className="flex space-x-2 items-center">
        <FaShare size={25}></FaShare>
        <p>Share</p>
      </button>
    </div>
  );
};

export default ShareButton;
