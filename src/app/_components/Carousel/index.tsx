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
        console.log(carouselIndex, images.length)
        const next = carouselIndex + direction;
        if(next >= images.length)
            setCarouselIndex(0)
        else if (next < 0)
            setCarouselIndex(images.length - 1)
        else
            setCarouselIndex(next)
    }

    return(
        <div className="select-none w-full h-full relative overflow-hidden" >
            <div className={`${images.length <= 1 ? 'hidden' : ''} absolute flex h-full justify-between w-full z-2 text-xl text-white px-2`}>
                <div onClick={()=>handleClick(-1)} className="group h-full w-[40%] flex items-center px-3">
                    <button className="select-none flex justify-center transition duration-400 opacity-0 group-hover:opacity-100">
                        <Image src='/images/chevron_left.png' alt='' width={10} height={10} />
                    </button>
                </div>
                <div onClick={()=>handleClick(1)} className="group h-full w-[40%] flex items-center px-3 justify-end">
                    <button className="select-none flex justify-center transition duration-400 opacity-0 group-hover:opacity-100">
                        <Image src='/images/chevron_right.png' alt='' width={10} height={10} />
                    </button>

                </div>
            </div>
            <div className="h-full">
                {images.map((image, index)=> {
                    const imgUrl = urlFor(image)?.url()
                    if(!imgUrl)
                        return null
                    return(
                        <div key={index} className={`absolute flex w-full h-full flex-none ${index === carouselIndex ? 'z-1' : '-z-1'} ${index === carouselIndex ? ' ' : 'hidden'} `}>
                            <Image
                                src={imgUrl} 
                                width={1200}
                                height={1200}
                                loading={`eager`}
                                style={{minWidth : '100%', height : 'fit-content'}}
                                alt="" 
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}