import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "app/components/ui/card";
import Link from "next/link";
import { getCurrentUser } from "app/libs/session";
import LikeButton from "./Like-Button";
import CommentButton from "./Comment-Button";
import ShareButton from "./Share-Button";

import { Avatar, AvatarFallback, AvatarImage } from "app/components/ui/avatar";
const Post = async ({ posts }) => {
  const user = await getCurrentUser();
  return (
    <div>
      <section>
        <ul className="mt-8 flex flex-col items-center justify-center md:mt-auto space-y-6">
          {posts.map((item, idx) => (
            <Card key={idx} className="w-full md:w-3/4 lg:w-2/3">
              <Link href={`/communities/Anime/${item.id}`}>
                <CardHeader>
                  <div className="flex items-center gap-2 text-gray-500">
                    <p>Posted by</p>
                    <Avatar className="w-5 h-5">
                      <AvatarImage src={item.authorImage} alt="@shadcn" />
                      <AvatarFallback>
                        <AvatarImage src={item.authorImage} alt="@shadcn" />
                      </AvatarFallback>
                    </Avatar>
                    <p>{item.authorName}</p>
                  </div>

                  <CardTitle> {item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <img src={item.image} alt="" />
                </CardContent>
              </Link>
              <CardFooter className="flex gap-6 items-center w-full">
                <CardDescription>
                  <CommentButton number={item?.comments.length}></CommentButton>
                </CardDescription>
                <CardDescription>
                  <LikeButton
                    user={user}
                    postID={item.id}
                    number={item?.votes.length}
                    vote={item.votes}></LikeButton>
                </CardDescription>
                <CardDescription>
                  <ShareButton></ShareButton>
                </CardDescription>
              </CardFooter>
            </Card>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Post;
