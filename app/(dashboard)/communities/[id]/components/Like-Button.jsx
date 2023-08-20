"use client";
import React, { useState } from "react";

import { FcLike, FcLikePlaceholder } from "react-icons/fc";
const LikeButton = async ({ number, postId, voted }) => {
  const [isVoted, setisVoted] = useState(voted);
  const handleClick = () => { };
  return (
    <div>
      <button className="flex space-x-2 items-center" onClick={handleClick}>
        {isVoted ? (
          <FcLike size={25}></FcLike>
        ) : (
          <FcLikePlaceholder size={25} className="mr-2"></FcLikePlaceholder>
        )}

      {number} likes
      </button>
    </div>
  );
};

export default LikeButton;
