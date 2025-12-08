import type { Post } from "@/types/posts";
import Link from "next/link";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc } from "drizzle-orm";
 
export const dynamic = 'force-dynamic'

export default async function Posts(){
  const allPosts = db.select().from(posts).orderBy(desc(posts.createdAt)).all()

  return (
    <>
      <div>
        <main>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h1>Catalog</h1>
            <Link 
              href="/posts/create"
              style={{
                padding: '8px 16px',
                backgroundColor: '#0070f3',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            >
              + Create Post
            </Link>
          </div>
          <hr/>
          <div>
            { allPosts.map(post => <div key={post.id}>
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
