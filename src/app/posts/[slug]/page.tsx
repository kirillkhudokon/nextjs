import type { Post } from "@/types/posts";
import PostItem from "./PostItem";
import Gallery from "@/components/shared/Gallery";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic'

export default async function Post({ params } : PageProps<'/posts/[slug]'>){
  const { slug } = await params;
  
  const post = db.select().from(posts).where(eq(posts.url, slug)).get()
  
  if (!post) {
    notFound()
  }

  return (
    <div>
      <main>
        <PostItem post={post} />
      </main>
    </div>
  );
}
