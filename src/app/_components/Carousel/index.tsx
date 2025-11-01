'use client'
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { urlFor } from "@/utils/urlFor"
import Image from "next/image"
import { useState } from "react"

interface CarouselProps  {
    images : SanityImageSource[]
}


export default function Carousel({images} : CarouselProps){
    const [carouselIndex, setCarouselIndex] = useState(0)

    function handleClick(direction : number){
        const next = carouselIndex + direction;
        if(next >= images.length)
            setCarouselIndex(0)
        else if (next < 0)
            setCarouselIndex(images.length)
        else
            setCarouselIndex(next)
    }

    return(
        <div className="select-none w-full h-full relative overflow-hidden" >
            <div className={`${images.length <= 1 ? 'hidden' : ''} absolute flex h-full justify-between w-full z-2 text-xl text-white px-2`}>
                <div onClick={()=>handleClick(-1)} className="group h-full w-[40%] flex items-center">
                    <button className="select-none flex justify-center items-center rounded-full  px-3 pb-3 pt-2 bg-black/20 flex items-center transition duration-400 opacity-0 group-hover:opacity-100">
                        ←
                    </button>
                </div>
                <div onClick={()=>handleClick(1)} className="group h-full w-[40%] flex items-center justify-end">
                    <button className="select-none flex justify-center items-center rounded-full px-3 pb-3 pt-2 bg-black/20 flex items-center transition duration-400 opacity-0 group-hover:opacity-100">
                        →
                    </button>

                </div>
            </div>
            <div className="h-full">
                {images.map((image, index)=> {
                    const imgUrl = urlFor(image)?.height(2000).width(2000).url()
                    if(!imgUrl)
                        return null
                    return(
                        <div key={index} className={`absolute flex  w-full h-full flex-none ${index === carouselIndex ? 'z-1' : '-z-1'}`}>
                            <Image
                                src={imgUrl} 
                                width={0}
                                height={0} 
                                loading="eager"
                                style={{objectFit:'cover', width:'100%', height:'auto'}}
                                alt="" 
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}