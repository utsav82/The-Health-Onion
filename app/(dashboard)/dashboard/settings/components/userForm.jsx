"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { buttonVariants } from "app/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "app/components/ui/card"
import { useState,useTransition } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "app/components/ui/input"
import { Label } from "app/components/ui/label"
import toast from "react-hot-toast"
import { cn } from "app/libs/utils"
import { generateComponents } from "@uploadthing/react";
const { UploadButton } = generateComponents();
import { handleUser } from "app/actions/actions"
const userForm = ({ user }) => {
    const [isPending, startTransition] = useTransition();
    const [isimageLoading, setIsimageLoading] = useState(false);
    const [image, setImage] = useState(user.image);
    const onSubmit = async (formData) => {
        try {
            const name = formData.get('name');
            const payload = {
                name: name,
                email: user.email,
                image: image
            }
            startTransition(async () => {
                await handleUser(user.id, payload);
                toast.success("Updated")
            })
        }
        catch (err) {
            toast.error("Error occuered");
        }



    };
    return (
        <form action={onSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Your Name</CardTitle>
                    <CardDescription>
                        Please enter your full name or a display name you are comfortable
                        with.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="name">
                            Name
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            className="w-[300px]"
                            size={32}
                            disabled={isPending}
                            placeholder={user.name}
                            required
                        />
                    </div>
                </CardContent>
                <CardContent>
                    <CardTitle>Email</CardTitle>
                    <div className="grid gap-1 mt-4">
                        <Label className="sr-only" htmlFor="email">
                            email
                        </Label>
                        <Input
                            id="email"
                            className="w-[300px]"
                            size={32}
                            disabled={true}
                            value={user.email}
                        />
                    </div>
                </CardContent>
                <CardContent className="flex gap-3">
                    <img className='rounded-xl h-12' src={image}></img>
                    <UploadButton
                        content={{
                            button({ ready }) {
                                if (ready) return <div>Upload Image</div>;
                                return "Getting ready...";
                            },
                            allowedContent({ ready, fileTypes, isUploading }) {
                                if (!ready) return "Checking what you allow";
                                if (isUploading)
                                    return <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />;
                            },
                        }}
                        appearance={{
                            button: `${cn(
                                buttonVariants({ variant: "outline" })
                            )} whitespace-pre`,
                        }}
                        endpoint="imageUploader"
                        onUploadProgress={() => {
                            setIsimageLoading(true);
                        }}
                        onClientUploadComplete={(res) => {
                            // Do something with the response
                            setIsimageLoading(false);
                            setImage(res[0].url);
                            toast.success("Upload Completed");
                        }}
                        onUploadError={(error) => {
                            // Do something with the error.
                            toast.error(`ERROR! ${error.message}`);
                        }}
                    /></CardContent>
                <CardFooter>
                    <button
                        type="submit"
                        className={cn(buttonVariants())}
                        disabled={isPending}
                    >
                        <span>{isPending ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : "Save"}</span>
                    </button>
                </CardFooter>
            </Card>
        </form>
    )
}

export default userForm
