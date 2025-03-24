import { prisma } from '@/lib/prismaClient';
import React from 'react'
import CommentCreateForm from "@/components/comments/CommentCreateForm"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import CommentList from '@/components/comments/comments-list';

const PostPage = async ({ params }: { params: Promise<{ slug: string, postId: string }> }) => {
    const { slug, postId } = await params;
    // Fetch and render the post content based on slug and postId
    const postContent = await prisma.post.findFirst({
        where: {
            id: postId,
        }
    })
    return (
        <div>
            <Link href={`/topics/${slug}`} className='flex items-center '>

                <Button variant="link" className='cursor-pointer'><ChevronLeft />Back to {slug}</Button>
            </Link>
            <div className='my-4'>
                <h1 className='text-3xl font-bold mb-2'>{postContent?.title}</h1>
                <p className=' border-2 border-gray-200 rounded-md p-2'>{postContent?.content}</p>
            </div>
            <CommentCreateForm postId={postId} startOpen />
            <CommentList postId={postId} />
        </div>
    )
}

export default PostPage