'use client'
import { type Project } from "@/types/project"
import { PortableText } from "next-sanity"
import { urlFor } from "@/utils/urlFor"
import Image from "next/image"
import { useSidebar } from "@/app/context/SidebarContext"
import { useEffect, useState } from "react"
import { ReactNode } from "react"

export default function ProjectDisplay({project} : {project : Project}) {
    const [isMobile, setIsMobile] = useState(false);
    const {setSidebarContent} = useSidebar();
    const [toDisplay, setToDisplay] = useState<ReactNode[]>([])

    useEffect(() => {
        setIsMobile(window.innerWidth < 1024);
    }, [setIsMobile]);

    useEffect(()=>{
        if(isMobile){
            setToDisplay ([
                project.type, 
                project.date, 
                project.mandat, 
                project.surface ? `${project.surface}m²` : '', 
                project.budget ? `${project.budget}€` : '', 
                project.statut,
                '+'
                ].filter((element): element is string => element !== '' && element !== undefined))
        }
        else{
            setSidebarContent(([
                project.code, project.name,
                ...(project.coordinates ? ['coordinate', project.coordinates] : []),
                ...(project.locality ? ['locality', project.locality] : []),
                ...(project.date ? ['date', project.date] : []),
                ...(project.statut ? ['mission', project.statut] : []),
                ...(project.client ? ['client', project.client] : []),
                ...(project.surface ? ['surface', `${project.surface}m²`] : []),
                ...(project.mandat ? ['mandat', project.mandat] : []),
                ...(project.equipe ? ['équipe', project.equipe] : []),
                ...(project.description ? 
                    ['+', <PortableText key={'description'} value={project.description} /> ]
                    : []),
            ]))
        }
        
    },[setToDisplay, setSidebarContent, project, isMobile])


    if(isMobile){
        return(
            <div>
                <div className="h-60vh flex gap-5 overflow-x-scroll no-scrollbar">
                    {project.images.map((image, index)=> {
                        const imgUrl = urlFor(image)?.height(1200).width(800).url()
                        if(!imgUrl)
                            return false
                        return (
                            <Image key={index} src={imgUrl} height={1200} width={800}  alt=""/>
                        )
                    })}
                </div>
                <h2>{project.name}</h2>
                <ul className="flex flex-col gap-1 my-2">
                    {toDisplay?.map((el,i)=><li key={i}>{el}</li>)}
                </ul>
                <div className="prose">
                        {Array.isArray(project.description) && <PortableText value={project.description} />}
                </div>
            </div>
        )
    }
    else {
        return(
            <div className="flex h-screen overflow-hidden">
                <div className="relative w-[50%] flex flex-col gap-2 overflow-y-auto no-scrollbar pr-2">
                    {project.images.map((image, index)=> {
                        const imgUrl = urlFor(image)?.height(2000).width(2000).url()
                        if(!imgUrl)
                            return null
                        return(
                            <div key={index} className="relative w-full h-[75vh] flex-none">
                                <Image
                                    className='object-cover' 
                                    src={imgUrl} 
                                    fill 
                                    alt="" 
                                />
                            </div>
                        )
                    })}
                </div>
                <div className="relative w-[50%] flex flex-col gap-2 overflow-y-auto no-scrollbar pr-2">
                    {[...project.images].reverse().map((image, index)=> {
                        const imgUrl = urlFor(image)?.height(2000).width(2000).url()
                        if(!imgUrl)
                            return null
                        return(
                            <div key={index} className="relative w-full h-[90vh] flex-none">
                                <Image
                                    className='object-cover' 
                                    src={imgUrl}
                                    fill 
                                    alt="" 
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}