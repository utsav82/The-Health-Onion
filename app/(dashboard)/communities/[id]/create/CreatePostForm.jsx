"use client";
import axios from "axios";
import { useState, useTransition } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "app/components/ui/button";
import { buttonVariants } from "app/components/ui/button";
import { cn } from "app/libs/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "app/components/ui/card";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { generateComponents } from "@uploadthing/react";
const { UploadButton } = generateComponents();
const CreatePostForm = ({ community_name, communityId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isMutating = isLoading || isPending;
  const [isimageLoading, setIsimageLoading] = useState(false);
  const [image, setImage] = useState(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      var imageurl = null;
      if (image) {
        imageurl = image[0].url;
      }
      const payload = {
        ...data,
        communityId,
        imageurl,
      };
      setIsLoading(true);

      const { res } = await axios.post("/api/post", payload);

      setIsLoading(false);

      toast.success("Sucessfully posted");

      startTransition(() => router.refresh());
      router.push(`/communities/${community_name}`);
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 422) {
          toast.error("Invalid subreddit name");
        }
      } else console.log(err);
      toast.error("There was an error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} id="myform">
          <div className="flex  flex-col w-full items-start gap-4">
            {image && <img src={image[0].url} alt="post" />}
            <div className="flex flex-col space-y-1.5">
              <TextareaAutosize
                id="title"
                disabled={isMutating}
                {...register("title", { required: true })}
                errors={errors}
                type="text"
                placeholder="Title"
                className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
              />
            </div>
            <div className="flex flex-col w-full  space-y-1.5">
              <TextareaAutosize
                id="content"
                disabled={isMutating}
                {...register("content", { required: true })}
                errors={errors}
                placeholder="Description"
                className="min-w-full min-h-[25vh] appearance-none overflow-hidden bg-transparent text-lg focus:outline-none"
              />
            </div>
            {/* <Button
              disabled={name.length === 0 || desc.length == 0 || isMutating}
              onClick={() => createCommunity()}>
              {isMutating ? (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Create"
              )}
              {isMutating ? "Please wait" : ""}
            </Button> */}
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
                  buttonVariants({ variant: "default" })
                )} whitespace-pre`,
              }}
              endpoint="imageUploader"
              onUploadProgress={() => {
                setIsimageLoading(true);
              }}
              onClientUploadComplete={(res) => {
                // Do something with the response
                setIsimageLoading(false);
                setImage(res);
                toast.success("Upload Completed");
              }}
              onUploadError={(error) => {
                // Do something with the error.
                toast.error(`ERROR! ${error.message}`);
              }}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between gap-y-3 sm:gap-0 sm:flex-row ">
        <Button
          variant="destructive"
          onClick={() => router.push(`/communities/${community_name}`)}>
          Cancel
        </Button>
        <div className="flex gap-3 space-y-4"></div>
        <Button
          type="submit"
          form="myform"
          size="lg"
          disabled={isMutating || isimageLoading}>
          {isMutating ? <ReloadIcon className=" h-4 w-4 animate-spin" /> : "Post"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreatePostForm;
