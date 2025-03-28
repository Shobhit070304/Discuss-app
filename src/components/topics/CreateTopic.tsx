"use client"
import React, { useActionState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { createTopic } from '@/actions/create-topic'

// TODO: Add error handling and validation for form fields.

function CreateTopic() {
    const [formState, create] = useActionState(createTopic, { errors: {} })
    return (
        <Dialog>
            <DialogTrigger><Button className="cursor-pointer">New Topic</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a Topic</DialogTitle>
                    <DialogDescription>
                        Write a new topic to start discussion. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form className='flex flex-col gap-2 mt-6' action={create}>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='name'>Name</Label>
                        <Input name='topic' id='name' />
                    </div>
                    {formState?.errors.topic && <p className='text-red-600'>{formState.errors.topic}</p>}
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='description'>Description</Label>
                        <Textarea name='description' id='description' />
                    </div>
                    {formState?.errors.description && <p className='text-red-600'>{formState.errors.description}</p>}
                    {formState?.errors.formError && <p className='text-red-600 bg-red-200 border-2 border-red-500 p-2 rounded-md'>{formState.errors.formError}</p>}
                    <Button className='cursor-pointer mt-6'>Save changes</Button>
                </form>
            </DialogContent>
        </Dialog>



    )
}

export default CreateTopic