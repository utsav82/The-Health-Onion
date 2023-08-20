import React from "react";
import { getCurrentUser } from "app/libs/session";
import Post from "./Post"
const PostList = async ({ posts }) => {
  const user = await getCurrentUser();
  return (
    <div>
      <section>
        <ul className="mt-8 flex flex-col items-center justify-center md:mt-auto space-y-6">
          {posts.map((item, idx) => (
            <Post item={item} key={idx} user={user.id}/>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default PostList;
