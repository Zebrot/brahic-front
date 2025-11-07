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
        throw new Error("No BackgroundProvider available");
    }
    return context;
}

export function Background(){
    const background = useBackground();
    if(!background.backgroundImg)
        return false
    return (
        <div className='w-full overflow-hidden h-[94vh]'>
            <Image 
                src={background.backgroundImg} 
                width={1200} 
                height={1200} 
                alt='' 
                style={{objectFit:'contain', width:'100%', height:'auto', maxHeight:'none'}}/>
        </div>
    )
}