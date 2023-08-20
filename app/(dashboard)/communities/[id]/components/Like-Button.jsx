"use client";
import React from "react";

import { FcLike, FcLikePlaceholder } from "react-icons/fc";
const LikeButton = async ({ number, postId, vote, user }) => {
  const handleClick = () => {};
  return (
    <div>
      <button className="flex space-x-2 items-center" onClick={handleClick}>
        {vote.indexOf(user.id) !== -1 ? (
          <FcLike size={25}></FcLike>
        ) : (
          <FcLikePlaceholder size={25}></FcLikePlaceholder>
        )}
        <p>{number} likes</p>
      </button>
    </div>
  );
};

export default LikeButton;
