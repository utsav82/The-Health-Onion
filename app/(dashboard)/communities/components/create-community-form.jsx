"use client";
import { Button, buttonVariants } from "app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "app/components/ui/dialog";
import { Input } from "app/components/ui/input";
import { Label } from "app/components/ui/label";
import { Icons } from "app/components/icons";
import { cn } from "app/libs/utils";
import { useState, useTransition } from "react";
import axios from "axios";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";
import ImageSelector from "./image-selector";

export default function Create({ variant }) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const isMutating = isLoading || isPending;

  const createCommunity = async () => {
    try {
      const payload = {
        name: name,
        description: desc,
      };

      setIsLoading(true);

      const { data } = await axios.post("/api/community", payload);

      setIsLoading(false);

      toast.success("Sucessfully created");
      setOpen(false);

      startTransition(() => router.refresh());

      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          toast.error("Community already exists");
        }

        if (err.response?.status === 422) {
          toast.error("Invalid subreddit name");
        }
      } else toast.error("There was an error");
    } finally {
      setName("");
      setDesc("");
      setIsLoading(false);
    }
  };
 
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          // onClick={onClick}
          className={cn(buttonVariants({ variant }))}>
          <Icons.add className="mr-2 h-4 w-4" />
          Create
        </button>
      </DialogTrigger>
      <DialogContent className="rounded-md max-w-[300px] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Community</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <ImageSelector></ImageSelector>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3 bg-gray-700"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4 ">
            <Label htmlFor="desc" className="text-right justify-self-center">
              Description
            </Label>
            <Input
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="col-span-3 bg-gray-700"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={name.length === 0 || desc.length == 0 || isMutating}
            onClick={() => createCommunity()}>
            {isMutating ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Create"
            )}
            {isMutating ? "Please wait" : ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
