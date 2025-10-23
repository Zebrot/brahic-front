'use client'

import { type Project } from "@/types/project";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/utils/urlFor";
import { useBackground } from "@/app/context/BackgroundContext";
import { useState, useEffect } from "react";

export default function ProjectCard({project} : {project : Project}) {
    const background = useBackground()
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 1024);
    }, []);

    const toDisplay = [project.name, project.type, project.date, project.locality, project.coordinates, project.mandat, project.surface ]
        .filter((element) => element != '' && element !=undefined);

    if(isMobile){
        return (
            <div className="overflow-x-scroll  no-scrollbar" >
                <div className="h-fit w-fit flex gap-2">
                    {project.images.map((image, index)=> {
                        const imgUrl = urlFor(image)?.width(280).height(350).url()
                        if(!imgUrl)
                            return false
                        return (
                            <div key={index} className="w-[280px] h-[400px] relative">
                                <Link href={`/project/${project.code}`}>
                                    <Image src={imgUrl} alt={''} width={280} height={350}/>
                                    <span>{toDisplay[index]}</span>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        )}
    else {
        const imgUrl = urlFor(project.images[0])?.width(800).height(1200).url()
        return(
            <Link className='flex w-screen hover:bg-black/30 hover:text-white px-1' href={`/project/${project.code}`} onMouseOver={()=>background.setBackgroundImg(imgUrl ?? '')}>
                <div className="w-[20%]">{project.code}</div>
                <div className="flex w-[40%]">
                    <div className="w-[50%]">{project.name}</div>
                    <div className="w-[50%]">{project.type}</div>
                </div>
                <div className="flex w-[40%] justify-between">
                    <div>{project.coordinates} + {project.locality}</div>
                    <div className="text-right">{project.date}</div>
                </div>
            </Link>
        )
    }

}