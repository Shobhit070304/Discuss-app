import { fetchCommentByPostId } from '@/lib/query/comment'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import CommentCreateForm from './CommentCreateForm'

type CommentShowProps = {
    postId: string
    commentId: string
}

const CommentShow: React.FC<CommentShowProps> = async ({ postId, commentId }) => {
    const comments = await fetchCommentByPostId(postId);
    const comment = comments.find(comment => comment.id === commentId)
    if (!comment) return null
    const children = comments.filter(comment => comment.parentId === commentId)
    return (
        <div className='m-4 p-4 border'>
            <div className='flex gap-3'>
                <Avatar>
                    <AvatarImage src={comment.user.image || ""} alt="Profile" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='flex-1 space-y-3'>
                    <p className='text-gray-500 text-sm font-medium'>{comment.user.name}</p>
                    <p className='text-gray-800'>{comment.content}</p>
                    <CommentCreateForm postId={postId} parentId={comment.id} />
                </div>
            </div>
            <div>
                {children.map(child => (
                    <CommentShow key={child.id} postId={postId} commentId={child.id} />
                ))}
            </div>
        </div>
    )
}

export default CommentShow