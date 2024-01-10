'use client'
import { handleComment } from 'app/actions/actions'
import { useRef, useTransition, useEffect } from 'react'
import { toast } from "react-hot-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "app/components/ui/button"
const CommentForm = ({ postId, user, replyToId }) => {

    const formRef = useRef();
    let [isPending, startTransition] = useTransition();

    const onSubmit = async (formData) => {
        const comment = formData.get('comment')
        formRef.current.reset()


        startTransition(async () => {
            await handleComment(comment, postId, user, replyToId);
            toast.success("Commented");
        });
    }




    return (
        <form className="mb-6" action={onSubmit} ref={formRef} >
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label htmlFor="comment" className="sr-only">
                    Your comment
                </label>
                <textarea
                    id="comment"
                    name="comment"
                    rows="3"
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a comment..."
                    required></textarea>
            </div>
            <Button type="submit" disabled={isPending}>{isPending ? <ReloadIcon className="h-4 w-4 animate-spin" /> : "Comment"}</Button>
        </form>
    )
}

export default CommentForm

