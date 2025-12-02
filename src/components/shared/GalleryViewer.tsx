'use client'

import { Image } from "@/types/images";

export default function GalleryViewer({ images } : { images: Image[] }){
  return (
    <div>
      { images.map(image => <div key={image.id}>
        <img src={image.variants.small} alt="" />
      </div>) }
    </div>
  );
}
