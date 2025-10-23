import { client } from "@/sanity/client";
import Image from "next/image";
import { type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const POSTS_QUERY = `*[
  _type == "Image"
]|order(publishedAt desc)[0...12]`;

const options = { next: { revalidate: 30 } };

export default async function Index() {
  const images = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <div className="flex flex-col gap-2">
        {images.map((image, index)=> {
          const imgUrl = image.image
            ? urlFor(image.image)?.width(550).height(310).url()
            : null;
          if(!imgUrl)
            return false;
          <Image
            src={imgUrl}
            alt={image.title}
            className="aspect-video rounded-xl"
            width="550"
            height="310"
          />
        })}
    </div>   
  );
}

