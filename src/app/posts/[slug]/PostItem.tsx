'use client'

import Gallery from "@/components/shared/Gallery";
import type { Post } from "@/types/posts";
import Link from "next/link";
import React, { useState } from "react";

export default function PostItem({ post, children } : { post: Post, children?: React.ReactNode }){
  const [ showContent, setShowContent ] = useState(false);

  return (
    <div>
      <main>
        <h1>{ post.title }</h1>
        <Link href={`/posts/`}>Back to list</Link>
        <hr/>
        <button onClick={() => setShowContent(p => !p)} type="button">Show content</button>
        <hr/>
        { children }
        <hr/>
        { showContent && <div>
          { post.content }
        </div> }
      </main>
    </div>
  );
}
