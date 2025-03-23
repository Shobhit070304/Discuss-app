import React from 'react'
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
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '../ui/context-menu'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { createTopic } from '@/actions/create-topic'

function CreateTopic() {
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
                <form className='flex flex-col gap-2 mt-6' action={createTopic}>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='name'>Name</Label>
                        <Input name='topic' id='name' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='description'>Description</Label>
                        <Textarea name='description' id='description' />
                    </div>
                    <Button className='cursor-pointer mt-6'>Save changes</Button>
                </form>
            </DialogContent>
        </Dialog>



    )
}

export default CreateTopic