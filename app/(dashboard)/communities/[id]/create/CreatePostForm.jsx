'use client';
import axios from "axios";
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import { Label } from "app/components/ui/label.jsx";
import { Input } from "app/components/ui/input.jsx";
import { Textarea } from "app/components/ui/textarea"
import { Button } from "app/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "app/components/ui/card"
import { toast } from "react-hot-toast";
import { ReloadIcon } from "@radix-ui/react-icons"
const CreatePostForm = () => {
    const [isLoading, setIsLoading] = useState(false);
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
            image: ''
        }
    });
    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <Card className="mt-5 sm:mt-auto">
            <CardHeader>
                <CardTitle>Create post</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} id="myform">
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title"
                                disabled={isLoading}
                                {...register('title', { required: true })}
                                errors={errors}
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="content">Description</Label>
                            <Textarea id="content"
                                disabled={isLoading}
                                {...register('content', { required: true })}
                                errors={errors} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="image">Image</Label>
                            <Input id="image"
                                disabled={isLoading}
                                {...register('image')}
                                errors={errors}
                                type="url" />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button type="submit" form="myform" >Post</Button>
            </CardFooter>
        </Card>

    );
}

export default CreatePostForm;
