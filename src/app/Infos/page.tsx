import Image from "next/image";
import { client } from "@/sanity/client";
import { type Infos } from "@/types/infos";
import { urlFor } from "@/utils/urlFor";
import { PortableText } from "next-sanity";
import Carousel from "../_components/Carousel";

const INFOS_QUERY = `*[
  _type == "Infos"
][0]`;

const options = { next: { revalidate: 30 } };


export default async function Infos() {
    const infos = await client.fetch<Infos>(INFOS_QUERY, {}, options)
    return (
        <div className="relative w-full flex flex-col lg:overflow-hidden lg:h-[95vh] lg:flex-row gap-2">
            <div className="overflow-x-scroll h-[60vh] lg:h-full no-scrollbar lg:w-[50%]">
                <div className="relative flex lg:hidden no-wrap w-fit h-full gap-2">
                    {infos.images?.map((image, index)=> {
                        const imgUrl = urlFor(image)?.height(1600).width(1200).url();
                        if(!imgUrl)
                            return false
                        return(
                            <div key={index} className="relative h-full w-[90vw] xl:w-full xl:h-[95vh] xl:-right-[50%] xl:-translate-x-[50%]">
                                <Image fill alt='Brahic Brahic' src={imgUrl}/>
                            </div>)
                    })}
                </div>
                <div className="hidden lg:block h-full w-full">
                    <Carousel images={infos.images || []} />
                </div>
            </div>
            <div className="h-[32vh] lg:h-full lg:overflow-y-auto no-scrollbar lg:w-[50%]">
                <div className="h-fit prose">
                    {Array.isArray(infos.text) && <PortableText value={infos.text} />}
                </div>
            </div>
        </div>
    );  
}

