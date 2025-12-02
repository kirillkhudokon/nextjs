import type { Post } from "@/types/posts";
import PostItem from "./PostItem";
import { notFound } from "next/navigation";
import Gallery from "@/components/shared/Gallery";

export const dynamic = 'force-dynamic'

export default async function Post({ params } : PageProps<'/posts/[slug]'>){
  const { slug } = await params;
  const response = await fetch(`http://localhost:3001/posts/byurl/${slug}`);

  if(response.status != 200){
    return notFound();
  }

  const post: Post = await response.json();

  return (
    <div>
      <main>
        <PostItem post={post}>
          <Gallery item="post" id={post.id} />
        </PostItem>
      </main>
    </div>
  );
}
