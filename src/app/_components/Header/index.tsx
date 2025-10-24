'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    const [wide, setWide] = useState(false);
    useEffect(()=> {
        if(pathname == '/')
            setWide(true)
        else
            setWide(false)
    }, [pathname])
    return (
        <div className="flex justify-between lg:px-0 px-3 lg:h-12 lg:pb-3 h-10 items-center w-screen scale-100 lg:scale-100 sticky top-0 lg:w-screen  lg:pr-2 bg-white z-1">
            <Link href={'/'} className="relative flex gap-1 lg:gap-0">
                <div className='lg:w-[20vw] relative'>
                    <span className={`
                        ${wide ? 'lg:translate-x-[16vw]':'lg:translate-x-1'}
                        lg:absolute transition duration-300 ease-in-out`
                    }>
                        Brahic
                    </span> 
                </div>
                Brahic
            </Link>
            <nav className="flex gap-1 lg:gap-8">
                <Link href={'/Portfolio'}>index</Link>
                <Link className="hidden lg:inline" href={'/Gallery'}>iconographie</Link>
                <Link href={'/Infos'}>infos</Link>
            </nav>
        </div>
    )
}