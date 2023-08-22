"use client";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { deletePost } from "app/actions/actions"
import { useState, useTransition } from "react";

const DeleteButton = ({ postId, communityName }) => {
    const [isPending, startTransition] = useTransition();
    return (
        <>
            <button className="flex space-x-2 items-center"
                onClick={() => startTransition(async () => {
                    await deletePost(postId, communityName);
                })} >
                <AiFillDelete size={20} className="mr-2"></AiFillDelete>
                <span className="hidden md:block">  {isPending ? "loading" : "Delete"}</span>
            </button>
        </>
    );
};

export default DeleteButton;
