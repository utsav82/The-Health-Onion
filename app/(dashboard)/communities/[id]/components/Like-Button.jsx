"use client";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
const LikeButton = ({ number, postId, voted }) => {
  const router = useRouter();
  const [isVoted, setisVoted] = useState(voted);
  const [votes, setVotes] = useState(number);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isMutating = isLoading || isPending;
  const handleClick = async () => {
    try {
      const payload = {
        postId: postId,
      };
      setIsLoading(true);
      if (isVoted) {
        setVotes(votes - 1);
      } else {
        setVotes(votes + 1);
      }
      setisVoted(!isVoted);
      const { data } = await axios.post("/api/post/like", payload);

      setIsLoading(false);
      startTransition(() => router.refresh());

      return data;
    } catch (err) {
      toast.error("There was an error");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setVotes(number);
    setisVoted(voted);
  }, []);
  return (
    <>
      <button
        disabled={isMutating}
        className="flex space-x-2 items-center"
        onClick={handleClick}>
        {isVoted ? (
          <FcLike size={25} className="mr-3"></FcLike>
        ) : (
          <FcLikePlaceholder size={25} className="mr-3"></FcLikePlaceholder>
        )}
        {votes} <span className="hidden md:block">likes</span>
      </button>
    </>
  );
};

export default LikeButton;
