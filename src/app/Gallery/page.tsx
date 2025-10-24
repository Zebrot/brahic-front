import { client } from "@/sanity/client";
import { GalleryImage } from "@/types/sanityImage";
import ExpandableGallery from "../_components/ExpandableGallery";
const POSTS_QUERY = `*[
  _type == "Image"
]|order(publishedAt desc)[0...12]`;

const options = { next: { revalidate: 30 } };

export default async function Index() {
  const images = await client.fetch<GalleryImage[]>(POSTS_QUERY, {}, options);

  return (
    <ExpandableGallery images={images}/>
  );
}

