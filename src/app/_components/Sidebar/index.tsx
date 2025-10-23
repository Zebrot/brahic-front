'use client'
import { usePathname } from "next/navigation"
import { useSidebar } from "@/app/context/SidebarContext";
import { useEffect } from "react";
import { PortableText } from "next-sanity";
export default function Sidebar() {
    const pathname = usePathname();
    const { sidebarContent, setSidebarContent } = useSidebar();
    useEffect(()=> {
        setSidebarContent(['']);
        window.scrollTo(0, 0)
    },[pathname])
    return (
        <div className={`hidden ${pathname == '/Index' ? 'hidden' : 'lg:block'} w-[20%] sticky top-12 h-[94vh] px-1`}>
            <div className="grid grid-cols-[1fr_2fr] gap-3 max-h-full overflow-scroll no-scrollbar">
                {sidebarContent.map((el,index)=>{
                    if(sidebarContent[index - 1] === '+'){
                        return (
                            <div key={index} className="prose">
                                {Array.isArray(el) && <PortableText value={el} />}
                            </div>
                        )}
                    return <div className="h-fit span-cols-1" key={index}>{el}</div>
                })}
            </div>
        </div>
    )
}