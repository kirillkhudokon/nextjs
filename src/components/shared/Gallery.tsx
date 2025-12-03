import { Image, ImageSmall } from "@/types/images";
import GalleryViewer from "./GalleryViewer";

export default async function Gallery({ item, id } : { item: 'post', id: number }){
  const images: Image[] = await (fetch(`http://localhost:3001/images/${item}/${id}`).then(r => r.json()));
  
  const imagesSmall: ImageSmall[] = images.map(img => ({
    id: img.id,
    smallUrl: img.variants.small,
    alt: img.name
  }));

  return (
    <GalleryViewer images={imagesSmall} />
  );
}
