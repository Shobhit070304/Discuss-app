import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { getPostsBySearch } from '@/lib/query/post'
import React from 'react'

type SearchPageProps = {
    searchParams: Promise<{ term: string }>
}

const SearchPage: React.FC<SearchPageProps> = async ({ searchParams }) => {
    const { term } = await searchParams
    const posts = await getPostsBySearch(term);
    return (
        <div >
            <h1 className='text-blue-600 font-medium italic'>Search results for the {term}</h1>

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

export default SearchPage