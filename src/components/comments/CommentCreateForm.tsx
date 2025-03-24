"use client"
import React, { useActionState, useState } from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import createComment from '@/actions/create-comment'
import { Loader2 } from 'lucide-react'

type CommentCreateFormProps = {
    postId: string
    parentId?: string
    startOpen?: boolean
}
function CommentCreateForm({ postId, parentId, startOpen }): CommentCreateFormProps {
    const [open, setOpen] = useState(startOpen)

    const [formState, create, isPending] = useActionState(createComment.bind(null, { postId, parentId }), { errors: {} });

    return (
        <div className=''>
            <Button variant="secondary" className='mb-4 cursor-pointer' onClick={() => { setOpen(!open) }}>Reply</Button>
            {open && (
                <form action={create}>
                    <Textarea name='content' placeholder='write a comment...' ></Textarea>
                    {
                        formState.errors.content && <p className='text-red-600'>{formState.errors.content}</p>
                    }
                    {
                        formState.errors.formErrors && <p className='text-red-600 bg-red-200'>{formState.errors.formErrors}</p>
                    }
                    <Button disabled={isPending} variant="secondary" type='submit' className='cursor-pointer mt-4'>{
                        isPending ? (
                            <>
                                <Loader2 />
                                Please wait
                            </>
                        ) : (
                            "Save"
                        )
                    }</Button>
                </form>
            )}
        </div>
    )
}

export default CommentCreateForm
