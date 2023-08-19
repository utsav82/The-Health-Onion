'use client';
import axios from "axios";
import { useState, useTransition } from "react"
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import TextareaAutosize from 'react-textarea-autosize'
import { Button } from "app/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "app/components/ui/card"
import { AxiosError } from "axios"
import { toast } from "react-hot-toast";
import { ReloadIcon } from "@radix-ui/react-icons"
import { generateComponents } from "@uploadthing/react";
const { UploadButton, UploadDropzone, Uploader } =
    generateComponents();
const CreatePostForm = ({ community_name, communityId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isPending, startTransition] = useTransition()
    const isMutating = isLoading || isPending;
    const [isimageLoading, setIsimageLoading] = useState(false);
    const [image, setImage] = useState(null)
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm({
        defaultValues: {
            title: '',
            content: '',
        }
    });
    const onSubmit = async (data) => {
        try {
            var imageurl = null;
            if (image) {
                imageurl = image[0].url;
            }
            const payload = {
                ...data, communityId, imageurl
            }
            setIsLoading(true);

            const { res } = await axios.post('/api/post', payload)

            setIsLoading(false);

            toast.success(
                "Sucessfully posted"
            )


            startTransition(() => router.refresh())
            router.push(`/communities/${community_name}`);
            return data;
        }
        catch (err) {
            if (err instanceof AxiosError) {
                if (err.response?.status === 422) {
                    toast.error("Invalid subreddit name")
                }
            }
            else
            console.log(err)
                toast.error("There was an error")
        }
        finally {

            setIsLoading(false);

        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create post</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} id="myform">
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">

                            <TextareaAutosize id="title"
                                disabled={isLoading}
                                {...register('title', { required: true })}
                                errors={errors}
                                type="text"
                                placeholder="Title"
                                className='w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none'
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">

                            <TextareaAutosize id="content"
                                disabled={isLoading}
                                {...register('content', { required: true })}
                                errors={errors}
                                placeholder="Description"
                                className='w-full min-h-[25vh] appearance-none overflow-hidden bg-transparent text-lg focus:outline-none' />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between flex-col gap-y-3 sm:gap-0 sm:flex-row ">
                <Button variant="outline" onClick={() => router.push(`/communities/${community_name}`)}>Cancel</Button>
                <div className="flex gap-3 space-y-4">
                    <UploadButton
                        endpoint="imageUploader"
                        onUploadProgress={
                            () => {
                                setIsimageLoading(true);
                            }
                        }
                        onClientUploadComplete={(res) => {
                            // Do something with the response
                            setIsimageLoading(false);
                            setImage(res);
                            alert("Upload Completed");
                        }}
                        onUploadError={(error) => {
                            // Do something with the error.
                            alert(`ERROR! ${error.message}`);
                        }}
                    />
                    <Button
                        variant="outline"
                        disabled={isimageLoading}
                    >
                        {isimageLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : "Click on choose file"}
                        {isimageLoading ? "Please wait" : ""}

                    </Button>

                </div>
                <Button type="submit" form="myform" >Post</Button>
            </CardFooter>
        </Card>

    );
}

export default CreatePostForm;
