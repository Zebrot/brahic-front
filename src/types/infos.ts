import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { PortableTextBlock } from "next-sanity"

export interface Infos {
    text? : PortableTextBlock[],
    images? : SanityImageSource[]
}