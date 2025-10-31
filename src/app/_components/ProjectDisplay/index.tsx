'use client'
import { type Project } from "@/types/project"
import { PortableText } from "next-sanity"
import { urlFor } from "@/utils/urlFor"
import Image from "next/image"
import { useSidebar } from "@/app/context/SidebarContext"
import { useEffect, useState } from "react"
import { ReactNode } from "react"
import Carousel from "../Carousel"

export default function ProjectDisplay({project} : {project : Project}) {
    const [isMobile, setIsMobile] = useState(false);
    const {setSidebarContent} = useSidebar();
    const [toDisplay, setToDisplay] = useState<ReactNode[]>([])
    const [displayText, setDisplayText] = useState<boolean>(false)
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
                    ['+', <PortableText key={project.name} value={project.description} />]
                    : []),
            ]))
        }
        
    },[setToDisplay, displayText, setDisplayText, setSidebarContent, project, isMobile])

    if(isMobile){
        return(
            <div>
                <div className="h-[60vh] flex gap-5 overflow-x-scroll no-scrollbar">
                    {project.images.map((image, index)=> {
                        const imgUrl = urlFor(image)?.height(1200).width(800).url()
                        if(!imgUrl)
                            return false
                        return (
                            <Image key={index} alt="" src={imgUrl} unoptimized width={0} height={0} 
                            style={{height:'100%', width:'auto', maxWidth:'85vw', objectFit:'cover', objectPosition:'center'}} />
                        )
                    })}
                </div>
                <h2>{project.name}</h2>
                <ul className="flex flex-col gap-1 my-2">
                    {toDisplay?.map((el,i)=>(
                        <li key={i}>
                            {el === '+' ? <button className='scale-150' onClick={()=>setDisplayText(!displayText)}>{displayText? '-' : '+'}</button> : el}
                        </li>
                    ))}
                </ul>
                <div aria-hidden={!displayText} className={`prose transition-opacity delay-10 duration-500  
                    ${displayText ? 'opacity-100' : 'fixed opacity-0'}`}>
                        {Array.isArray(project.description) && <PortableText value={project.description} />}
                </div>
            </div>
        )
    }
    else {
        return(
            <div className="flex gap-2 h-[94vh] overflow-hidden pr-2">
                <div className="relative w-[50%]">
                    <Carousel images={project.images} />
                </div>
                <div className="relative w-[50%] h-full">
                    <Carousel images={[...project.images].reverse()} />
                </div>
            </div>
        )
    }
}