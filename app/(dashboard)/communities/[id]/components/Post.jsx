import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "app/components/ui/card";
import prisma from "app/libs/prismadb";

import { Avatar, AvatarFallback, AvatarImage } from "app/components/ui/avatar";
const Post = async ({ posts }) => {
  return (
    <div>
      <section className="max-w-screen-lg mx-auto  md:px-8">
        <ul className="mt-8 md:mt-auto space-y-6">
          {posts.map((item, idx) => (
            <Card key={idx}>
              <CardHeader>
                <Avatar>
                  <AvatarImage src={item.authorImage} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p>{item.authorName}</p>
                <CardTitle> {item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={item.image} alt="" />
              </CardContent>
              <CardFooter>
                <CardDescription>Comments</CardDescription>
                <CardDescription>Likes</CardDescription>
                <CardDescription>Share</CardDescription>
              </CardFooter>
            </Card>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Post;
