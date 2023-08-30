"use client";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { deleteCommunity } from "app/actions/actions"
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
import { Input } from "app/components/ui/input";
const DeleteButton = ({ communityName, user }) => {
    const [isPending, startTransition] = useTransition();
    const [confirm, setConfirm] = useState("");
    return (
        <Dialog className="bg-white">
            <DialogTrigger asChild>
                <Button variant="ghost" style={{ color: 'black' }} > <AiFillDelete size={20}></AiFillDelete></Button>
            </DialogTrigger>
            <DialogContent className="max-w-[325px]">
                <DialogHeader>
                    <DialogTitle>Delete</DialogTitle>
                    <DialogDescription>
                        Deleting the community will lead to deletion of all its posts and subcriptions , Do you confirm you want to delete the community?
                        Type confirm to delete
                    </DialogDescription>
                </DialogHeader>
                <Input
                   
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="bg-gray-700"
                />
                <Button disabled={!(confirm === "confirm")} className="flex space-x-2 items-center" variant={"destructive"}
                    onClick={() => startTransition(async () => {
                        await deleteCommunity(communityName, user);
                    })}
                >
                    <span>  {isPending ? "Loading" : "Delete"}</span>
                </Button>
            </DialogContent>
        </Dialog>

    );
};

export default DeleteButton;
