"use client";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { deletePost } from "app/actions/actions"
import { useState, useTransition } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "app/components/ui/dialog"
import { Button } from "@/app/components/ui/button";
const DeleteButton = ({ postId, communityName }) => {
    const [isPending, startTransition] = useTransition();
    return (
        <Dialog className="bg-white">
            <DialogTrigger asChild>
                <Button variant="ghost"> <AiFillDelete size={20}></AiFillDelete></Button>
            </DialogTrigger>
            <DialogContent className="max-w-[325px]">
                <DialogHeader>
                    <DialogTitle>Delete</DialogTitle>
                    <DialogDescription>
                        Do you confirm you want to delete the post?
                    </DialogDescription>
                </DialogHeader>
                <Button className="flex space-x-2 items-center"
                    onClick={() => startTransition(async () => {
                        await deletePost(postId, communityName);
                    })}
                >

                    <span>  {isPending ? "Loading" : "Delete"}</span>
                </Button>
            </DialogContent>
        </Dialog>

    );
};

export default DeleteButton;
