import { Pagination } from "@/types/general";
import type { Post } from "@/types/posts";
import Link from "next/link";
 
export const dynamic = 'force-dynamic'

export default async function Posts(){
  const posts: Pagination<Post> = await (fetch('http://localhost:3001/posts').then(r => r.json()));

  return (
    <>
      <div>
        <main>
          <h1>Catalog</h1>
          <hr/>
          <div>
            { posts.data.map(post => <div key={post.id}>
              <h2>{post.title}</h2>
              <Link href={`/posts/${post.url}`}>Read more</Link>
              <hr/>
            </div> )}
          </div>
        </main>
      </div>
    </>
  );
}
