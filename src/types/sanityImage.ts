import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { PortableTextBlock } from "next-sanity"

export interface GalleryImage {
  _id: string
  _type: 'Image'
  src: SanityImageSource
  infos?: string
  description?: PortableTextBlock[] // Portable Text blocks
}
