"use client"
import React, { useActionState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { createPost } from '@/actions/create-post'

type CreatePostFormAction = {
    slug: string
}
const CreatePost: React.FC<CreatePostFormAction> = ({ slug }) => {
    const [formState, create] = useActionState(createPost.bind(null, slug), { errors: {} })
    return (
        <Dialog>
            <DialogTrigger><Button className="cursor-pointer">New Post</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a post</DialogTitle>
                    <DialogDescription>
                        Write a new post. Click save when you are done.
                    </DialogDescription>
                </DialogHeader>
                <form className='flex flex-col gap-2 mt-6' action={create}>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='title'>Title</Label>
                        <Input name='title' id='title' />
                    </div>
                    {formState?.errors.title && <p className='text-red-600'>{formState.errors.title}</p>}
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='content'>Content</Label>
                        <Textarea name='content' id='content' />
                    </div>
                    {formState?.errors.content && <p className='text-red-600'>{formState.errors.content}</p>}
                    {formState?.errors.formError && <p className='text-red-600 bg-red-200 border-2 border-red-500 p-2 rounded-md'>{formState.errors.formError}</p>}
                    <Button className='cursor-pointer mt-6'>Save changes</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreatePost