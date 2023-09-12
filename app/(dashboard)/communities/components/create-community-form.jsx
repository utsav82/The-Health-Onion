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
import { useEffect, useState, useTransition } from "react";
import axios from "axios";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function Create({ variant }) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [imageNo, setImageNo] = useState(1);
  const [image, setImage] = useState('/images/Community_1.jpg');
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const isMutating = isLoading || isPending;

  const createCommunity = async () => {
    try {
      const payload = {
        name: name,
        description: desc,
        image: image
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
        console.log(err)
        if (err.response?.status === 409) {
          toast.error("Community already exists");
        }

        if (err.response?.status === 422) {
          toast.error(err.response.data);
        }
      } else toast.error("There was an error");
    } finally {
      setName("");
      setDesc("");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setImage(`/images/Community_${imageNo}.jpg`);
  }, [imageNo])
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
      <DialogContent style={{ backgroundImage: `url(${image})` }} className="rounded-md max-w-[300px] sm:max-w-[425px] bg-cover border-2 font-extrabold text-white leading-6">
        <DialogHeader>
          <DialogTitle className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Create Community</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>

            <ul className="flex flex-wrap justify-between gap-5">
              <li>
                <input
                  className="hidden peer"
                  type="radio"
                  name="group"
                  id="inlineRadio1"
                  defaultChecked
                  onClick={() => setImageNo(1)}
                />
                <label
                  className="peer-checked:bg-black h-10 px-4 py-2 rounded-lg"
                  for="inlineRadio1" >1</label
                >
              </li>
              <li>
                <input
                  className="hidden peer"
                  type="radio"
                  name="group"
                  id="inlineRadio2"
                  onClick={() => setImageNo(2)}
                />
                <label
                  className="peer-checked:bg-black h-10 px-4 py-2 rounded-lg"
                  for="inlineRadio2" >2</label
                >
              </li>
              <li>
                <input
                  className="hidden peer"
                  type="radio"
                  name="group"
                  id="inlineRadio3"
                  onClick={() => setImageNo(3)}
                />
                <label
                  className="peer-checked:bg-black h-10 px-4 py-2 rounded-lg"
                  for="inlineRadio3" >3</label
                >
              </li> <li>
                <input

                  className="hidden peer"
                  type="radio"
                  name="group"
                  id="inlineRadio4"
                  onClick={() => setImageNo(4)}
                />
                <label
                  className="peer-checked:bg-black h-10 px-4 py-2 rounded-lg"
                  for="inlineRadio4" >4</label
                ></li>
              <li>
                <input
                  className="hidden peer"
                  type="radio"
                  name="group"
                  id="inlineRadio5"
                  onClick={() => setImageNo(5)}
                />
                <label
                  className="peer-checked:bg-black h-10 px-4 py-2 rounded-lg"
                  for="inlineRadio5" >5</label
                >
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
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
            <Label htmlFor="desc" className="text-right justify-self-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
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
