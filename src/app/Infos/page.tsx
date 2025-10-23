import Image from "next/image";
import { client } from "@/sanity/client";
import { type Infos } from "@/types/infos";
import { urlFor } from "@/utils/urlFor";
import { PortableText } from "next-sanity";

const INFOS_QUERY = `*[
  _type == "Infos"
][0]`;

const options = { next: { revalidate: 30 } };


export default async function Infos() {
    const infos = await client.fetch<Infos>(INFOS_QUERY, {}, options)
    return (
        <div className="relative w-full flex flex-col gap-2">
            <div className="overflow-x-scroll h-[60vh]">
                <div className="relative flex no-wrap relative w-fit h-full gap-2">
                    {infos.images?.map((image, index)=> {
                        const imgUrl = urlFor(image)?.height(800).width(700).url();
                        if(!imgUrl)
                            return false
                        return(
                            <div key={index} className="relative h-full w-[90vw]">
                                <Image fill alt='Brahic Brahic' src={imgUrl} />
                            </div>)
                    })}
                </div>

            </div>
            <div className="overflow-scroll h-[32vh]">
                <div className="h-fit prose">
                    {Array.isArray(infos.text) && <PortableText value={infos.text} />}
                </div>
            </div>
        </div>
    );  
}

