'use client'

import { ImageSmall } from "@/types/images";

export default function GalleryViewer({ images } : { images: ImageSmall[] }){
  return (
    <div>
      { images.map(image => <div key={image.id}>
        <img src={image.smallUrl} alt={image.alt} />
      </div>) }
    </div>
  );
}
