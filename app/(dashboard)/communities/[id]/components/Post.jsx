import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "app/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "app/components/ui/avatar";
import LikeButton from "./Like-Button";
import CommentButton from "./Comment-Button";
import ShareButton from "./Share-Button";
import Link from "next/link";
import Image from 'next/image';
const Post = ({ item, user }) => {
    const voted = item.votes.some(vote => vote.userId === user);

    return (
        <Card className="md:container w-full">
            <Link href={`/communities/${item.community.name}/${item.id}#post`}>
                <CardHeader>
                    <div className="flex items-center gap-2 text-gray-500">
                        <p>Posted by</p>
                        <Avatar className="w-5 h-5">
                            <AvatarImage src={item.author.image} alt="@shadcn" />
                            <AvatarFallback>
                                <AvatarImage src={item.author.name} alt="@shadcn" />
                            </AvatarFallback>
                        </Avatar>
                        <p>{item.author.name}</p>
                    </div>

                    <CardTitle> {item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                    <img src={item.image} alt="post" />
                </CardContent>
            </Link>
            <CardFooter className="flex gap-6 items-center w-full">
                <CardDescription><Link href={`/communities/${item.community.name}/${item.id}/#comment`}>
                    <CommentButton number={item?.comments.length}></CommentButton>
                </Link>
                </CardDescription>
                <CardDescription>
                    <LikeButton
                        voted={voted}
                        postId={item.id}
                        number={item?.votes.length}
                    ></LikeButton>
                </CardDescription>
                <CardDescription>
                    <ShareButton></ShareButton>
                </CardDescription>

            </CardFooter>
        </Card>

    )
}

export default Post
