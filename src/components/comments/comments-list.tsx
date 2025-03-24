import { fetchCommentByPostId } from '@/lib/query/comment'
import React from 'react'
import CommentShow from './comment-show';

type CommentListProps = {
    postId: string,
}

const CommentList: React.FC<CommentListProps> = async ({ postId }) => {
    // Fetch comments from API
    const comments = await fetchCommentByPostId(postId);

    const topLevelComments = comments.filter(comment => comment.parentId === null);

    return (
        <div className='mt-4'>
            <h1 className='text-3xl font-semibold'>Comments</h1>
            {topLevelComments.map(comment =>
                <CommentShow key={comment.id} postId={postId} commentId={comment.id} />
            )}
        </div>
    )
}

export default CommentList