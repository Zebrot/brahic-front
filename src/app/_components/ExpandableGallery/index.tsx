'use client'

import { GalleryImage } from "@/types/sanityImage"
import { useState, useRef } from "react"
import Image from "next/image";
import { urlFor } from "@/utils/urlFor";
import { useSidebar } from "@/app/context/SidebarContext";
import { PortableText } from "next-sanity";

const ROW_HEIGHT = 400;
const col_start_classes = ['col-start-1','col-start-2','col-start-3','col-start-4',]
function getRowAndCol(index : number, number_of_rows : number){
    const row = Math.floor(index / number_of_rows);
    const col = index % number_of_rows;
    return {row, col}
}

function getVisibleRows(scrollTop : number) {
  const firstVisibleRow = Math.floor((scrollTop + 150)  / ROW_HEIGHT);
  return { firstVisibleRow, lastVisibleRow : firstVisibleRow +1 };
}



export default function ExpandableGallery({images} : {images : GalleryImage[]}){
    const [expandedIndex, setExpandedIndex] = useState(-10)
    const [visibleRows, setVisibleRows] = useState({firstVisibleRow : 0, lastVisibleRow : 0})
    const elementRef = useRef<HTMLDivElement>(null);
    const Sidebar = useSidebar();

    function handleClick(index : number, image : GalleryImage){
        if(!elementRef.current)
            return false
        
        Sidebar.setSidebarContent(
            [`
                ${image.auteur ? `${image.auteur}` : 'auteur inconnu'} -
                ${image.oeuvre ? `auteur :${image.oeuvre}` : 'sans titre'} -
                ${image.date ? `auteur :${image.date}` : 'date inconnue'} -
                ${image.lieu ? `auteur :${image.lieu}` : ''}`,
                '+', 
                image.description ? <PortableText value={image.description} /> : ''
            ]
        );
        setVisibleRows(getVisibleRows(elementRef.current.scrollTop))

        if(expandedIndex === index)
            setExpandedIndex(-1); 
        else 
            setExpandedIndex(index);

    }

    function handleHover(image? : GalleryImage) {
        if(expandedIndex >= 0)
            return null

        if(!image){
            Sidebar.setSidebarContent([])
            return null
        }
        Sidebar.setSidebarContent(
            [`
                ${image.auteur ? `${image.auteur}` : 'auteur inconnu'} -
                ${image.oeuvre ? `auteur :${image.oeuvre}` : 'sans titre'} -
                ${image.date ? `auteur :${image.date}` : 'date inconnue'} -
                ${image.lieu ? `auteur :${image.lieu}` : ''}`,
                '+', 
                image.description ? <PortableText value={image.description} /> : ''
            ]
        );
    }

    return (
        <div className="no-scrollbar grid grid-cols-3 xl:grid-cols-4 gap-2 overflow-y-auto h-screen" ref={elementRef}>
            {images.map((image, index)=> {
                if(!elementRef.current)
                    return null
                const number_of_rows = elementRef.current.clientWidth >= 1024 ? 4 : 3; // 1024 because it is 80% of 1280
                let {row, col} = getRowAndCol(index, number_of_rows)

                if(expandedIndex === index && col == number_of_rows - 1)
                    col = col - 1;
                if(expandedIndex === index && row > visibleRows.firstVisibleRow)
                    row--;

                row++;  // Grids are 1-indexed for some ungodly reason
                const colStyle = col_start_classes[col];

                const imgUrl = urlFor(image.src)?.width(2000).height(2000).url()
                if(!imgUrl)
                    return null
                return (
                    <div 
                        onClick={()=>handleClick(index, image)} 
                        onMouseOver={()=>handleHover(image)}
                        onMouseOut={()=>handleHover()}
                        key={index} 
                        style={{ gridRowStart:  row }} 
                        className={`${expandedIndex < 0 && 'hover:scale-101 transition duration-200'} relative min-h-[350px] ${expandedIndex === index ? 'col-span-2 row-span-2 z-2' : ' '} ${colStyle}`}
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