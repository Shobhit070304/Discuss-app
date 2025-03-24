"use server"
import CreatePost from '@/components/posts/PostCreateForm'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { getSlugPosts } from '@/lib/query/post'
import React from 'react'

async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = ((await params).slug)
    const s = slug.replaceAll('%20', ' ')

    const posts = await getSlugPosts(slug);
    if (!posts) return <p>No Posts</p>

    return (
        <div className='flex flex-col gap-5'>
            <div className='w-full flex items-center justify-between mt-4'>
                <h1>{s}</h1>
                <CreatePost slug={slug} />
            </div>
            <div className='flex flex-col gap-2'>
                {posts.map((post) =>
                    <Card className="p-5" key={post.id}>
                        <CardTitle>
                            {post.title}
                        </CardTitle>
                        <CardDescription className="flex justify-between items-center">
                            <p>by {post.user.name}</p>
                            <p>{post._count.comments} comments</p>
                        </CardDescription>
                    </Card>
                )}
            </div>
        </div>

    )
}

export default TopicPage