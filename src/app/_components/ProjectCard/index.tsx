'use client'

import { type Project } from "@/types/project";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/utils/urlFor";
import { useBackground } from "@/app/context/BackgroundContext";
import { useState, useEffect } from "react";

const colors = [
    'hover:text-blue-400',
    'hover:text-green-400',
    'hover:text-red-300',
    'hover:text-yellow-300',
    'hover:text-blue-200',
    'hover:text-blue-800',
    'hover:text-green-700',
    'hover:text-red-100',
    'hover:text-yellow-400',
    'hover:text-blue-200',
    'hover:text-blue-800',
    'hover:text-green-700',
    'hover:text-red-100',
    'hover:text-yellow-400',
    'hover:text-blue-200',]

export default function ProjectCard({project, index} : {project : Project, index:number}) {
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
                        const imgUrl = project.images[0] ? urlFor(project.images[0])?.width(800).height(1200).url() : undefined
                        if(!imgUrl)
                            return false
                        return (
                            <div key={index} className="h-[400px] relative">
                                <Link href={`/project/${project.code}`}>
                                <div className="relative img-wrapper h-[350px] overflow-hidden">
                                    <Image src={imgUrl} unoptimized alt="" width={0} height={0} 
                                    style={{height: '100%', width:'auto', maxWidth:'none', objectFit:'cover', objectPosition:'center'}}/>
                                </div>
                                    <span>{toDisplay[index]}</span>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        )}
    else {
        console.log(index, colors[index])

        if(!project.images)
            return null
        const imgUrl = project.images[0] ? urlFor(project.images[0])?.width(800).height(1200).url() : ''
        return(
            <Link className={`${colors[index]}
            cursor-default flex w-screen group  px-1`} href={`/project/${project.code}`} onMouseOver={()=>background.setBackgroundImg(imgUrl ?? '')}>
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