"use client"
import { Button, buttonVariants } from "app/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "app/components/ui/dialog"
import { Input } from "app/components/ui/input"
import { Label } from "app/components/ui/label"
import { Icons } from "app/components/icons"
import { cn } from "app/libs/utils"
import { useState } from "react"
import axios from "axios";
import { AxiosError } from "axios"
import { toast } from "react-hot-toast";

export default function Create({ variant }) {

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);



  const createCommunity = async () => {
    setIsLoading(true);
    const payload = {
      name: name,
      description: desc
    }
    try {
      const { data } = await axios.post('/api/community', payload)

      toast.success(
        "Sucessfully created"
      )
      setOpen(false);
      return data;
    }
    catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          toast.error("Community already exists")
        }

        if (err.response?.status === 422) {
          toast.error("Invalid subreddit name")
        }
      }
      else
        toast.error("There was an error")
    }
    finally {
      setName("");
      setIsLoading(false);
    }

  }


  return (

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          // onClick={onClick}
          className={cn(
            buttonVariants({ variant }),
          )} >
          <Icons.add className="mr-2 h-4 w-4" />
          Create
        </button>
      </DialogTrigger>
      <DialogContent className="rounded-md max-w-[300px] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Community</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3 bg-gray-700" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4 ">
            <Label htmlFor="desc" className="text-right justify-self-center">
              Description
            </Label>
            <Input id="desc" value={desc} onChange={(e) => setDesc(e.target.value)} className="col-span-3 bg-gray-700" />
          </div>
        </div>
        <DialogFooter>
          <Button
            isloading={isLoading.toString()}
            disabled={name.length === 0 || desc.length == 0}
            onClick={() => createCommunity()}
          >
            Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}
