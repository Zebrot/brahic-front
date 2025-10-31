'use client'
import { createContext, useContext, useState, Dispatch, SetStateAction } from 'react'
import Image from 'next/image';

const BackgroundContext = createContext<{backgroundImg: string, setBackgroundImg: Dispatch<SetStateAction<string>>} | null>(null)

export function BackgroundProvider({children} : {children : React.ReactNode}){
    const [backgroundImg, setBackgroundImg] = useState('');
    return (
        <BackgroundContext value={{backgroundImg, setBackgroundImg}}>
            {children}
        </BackgroundContext>
    )
}

export function useBackground(){
    const context = useContext(BackgroundContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
}

export function Background(){
    const background = useBackground();
    if(!background.backgroundImg)
        return false
    return (
        <Image src={background.backgroundImg} width={0} height={0} unoptimized alt='' style={{objectFit:'cover', width:'100%', height:'auto', maxHeight:'100%'}}/>
    )
}