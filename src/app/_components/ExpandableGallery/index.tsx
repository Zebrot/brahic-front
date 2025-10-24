'use client'

import { GalleryImage } from "@/types/sanityImage"
import { useState, useRef } from "react"
import Image from "next/image";
import { urlFor } from "@/utils/urlFor";
import { useSidebar } from "@/app/context/SidebarContext";
import { PortableText } from "next-sanity";

const ROW_HEIGHT = 400;
const col_start_classes = ['col-start-1','col-start-2','col-start-3','col-start-4',]
function getRowAndCol(index : number){
    const row = Math.floor(index / 4);
    const col = index % 4;
    return {row, col}
}

function getVisibleRows(scrollTop : number) {
  const firstVisibleRow = Math.floor((scrollTop + 150)  / ROW_HEIGHT);
  console.log(firstVisibleRow)
  return { firstVisibleRow, lastVisibleRow : firstVisibleRow +1 };
}



export default function ExpandableGallery({images} : {images : GalleryImage[]}){
    const [expandedIndex, setExpandedIndex] = useState(-10)
    const [visibleRows, setVisibleRows] = useState({firstVisibleRow : 0, lastVisibleRow : 0})
    const elementRef = useRef<HTMLDivElement>(null);
    const Sidebar = useSidebar();

    function handleClick(index : number, image : GalleryImage){
        Sidebar.setSidebarContent(
            [`
                ${image.auteur ? `auteur :${image.auteur}` : 'auteur inconnu'} -
                ${image.oeuvre ? `auteur :${image.oeuvre}` : 'sans titre'} -
                ${image.date ? `auteur :${image.date}` : 'date inconnue'} -
                ${image.lieu ? `auteur :${image.lieu}` : ''}`,
                '+', image.description ? <PortableText value={image.description} /> : ''
            ]
            );

        if(!elementRef.current)
            return false
        setVisibleRows(getVisibleRows(elementRef.current.scrollTop))

        if(expandedIndex === index)
            setExpandedIndex(-1); 
        else 
            setExpandedIndex(index);

    }

    return (
        <div className="no-scrollbar grid grid-cols-4 gap-[10px] overflow-y-auto h-screen" ref={elementRef}>
            {images.map((image, index)=> {
                let {row, col} = getRowAndCol(index)
                if(expandedIndex === index && col == 3)
                    col = 2;
                if(expandedIndex === index && row == visibleRows.lastVisibleRow)
                    row--;

                row++;  // Grids are 1-indexed for some ungodly reason
                const colStyle = col_start_classes[col];

                const imgUrl = urlFor(image.src)?.width(2000).height(2000).url()
                if(!imgUrl)
                    return null
                return (
                    <div onClick={()=>handleClick(index,image)} 
                        key={index} 
                        style={{ gridRowStart:  row }} 
                        className={`hover:scale-101 transition duration-200 relative min-h-[350px] ${expandedIndex === index ? 'col-span-2 row-span-2 z-2' : ' '} ${colStyle}`}
                    >
                        <Image
                            src = {imgUrl}
                            fill
                            alt=""
                        />
                    </div>
                )
            })}
        </div>
    )
}