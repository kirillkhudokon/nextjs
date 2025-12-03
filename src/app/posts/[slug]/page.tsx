import type { Post } from "@/types/posts";
import PostItem from "./PostItem";
import Gallery from "@/components/shared/Gallery";
import { letsFetchWithNoFoundCatch } from "@/shared/http";

export const dynamic = 'force-dynamic'

export default async function Post({ params } : PageProps<'/posts/[slug]'>){
  const { slug } = await params;
  const post = await letsFetchWithNoFoundCatch<Post>(`/posts/byurl/${slug}`);;

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
