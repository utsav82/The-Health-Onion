"use client";
import { useState } from "react";
import CommentForm from "./CommentForm";
import Reply from "./Reply";
import { formatTimeToNow } from "app/libs/utils";
const Comment = ({ comment, user, key }) => {
  const [replyForm, setReplyForm] = useState(false);
  const [settings, setSettings] = useState(false);

  return (
    <>
      <article className="p-2 text-base relative bg-white rounded-lg dark:bg-gray-900">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
              <img
                className="mr-2 w-6 h-6 rounded-full"
                src={comment.author.image}
                alt="user"
              />
              {comment.author.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time pubdate="true">
                {formatTimeToNow(new Date(comment.createdAt))}
              </time>
            </p>
          </div>
          <button
            onClick={() => setSettings(!settings)}
            id={`dropdownComment${key}`}
            data-dropdown-toggle={`dropdownComment${key}`}
            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
            </svg>
            <span className="sr-only">Comment settings</span>
          </button>
          {settings && (
            <div
              id={`dropdownComment${key}`}
              className="absolute top-0 right-0 mr-16 mt-16 z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
              <ul
                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownMenuIconHorizontalButton">
                <li>
                  <a
                    href="#"
                    className="hidden py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Edit
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Remove
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Report
                  </a>
                </li>
              </ul>
            </div>
          )}
        </footer>
        <p className="text-gray-500 dark:text-gray-400">{comment.text}</p>
        <div className="flex mt-4 space-x-4">
          <button
            onClick={() => setReplyForm(!replyForm)}
            type="button"
            className="flex  text-sm text-gray-500 hover:underline dark:text-gray-400">
            <svg
              aria-hidden="true"
              className="mr-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            Reply
          </button>
          {replyForm && (
            <CommentForm
              postId={comment.postId}
              user={user}
              replyToId={comment.id}></CommentForm>
          )}
        </div>
      </article>
      {comment.replies.map((reply, idx) => (
        <Reply key={idx} reply={reply}></Reply>
      ))}
      <hr />
    </>
  );
};

export default Comment;
