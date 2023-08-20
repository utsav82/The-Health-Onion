"use client"
import React from "react";
import { BsFillChatRightFill } from "react-icons/bs";

const CommentButton = ({ number }) => {
  return (
    <div>
      <button className="flex space-x-2 items-center">
        <BsFillChatRightFill size={20}></BsFillChatRightFill>
        <p>{number} comments</p>
      </button>
    </div>
  );
};

export default CommentButton;
