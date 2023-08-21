"use client";
import React from "react";
import { BsFillChatRightFill } from "react-icons/bs";

const CommentButton = ({ number }) => {
  return (
    <>
      <button className="flex space-x-2 items-center">
        <BsFillChatRightFill size={20} className="mr-2"></BsFillChatRightFill>
        {number} <span className="hidden md:block">comments</span>
      </button>
    </>
  );
};

export default CommentButton;
