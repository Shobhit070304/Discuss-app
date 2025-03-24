import CreateTopic from "@/components/topics/CreateTopic";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { getAllPosts } from "@/lib/query/post";

export default async function Home() {
  const posts = await getAllPosts();

  if (!posts) return <p>No Posts</p>

  return (
    <div className="flex gap-5 flex-col">
      <div className="flex items-center justify-between mt-8">
        <h1 className="text-3xl font-bold">Home Page</h1>
        <CreateTopic />
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
    </div >
  );
}
