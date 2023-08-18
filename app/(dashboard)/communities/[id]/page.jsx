import React from "react";
import Post from "./components/Post";

const page = async () => {
  return (
    <div className="flex flex-col">
      <Post></Post>
    </div>
  );
};

export default page;
