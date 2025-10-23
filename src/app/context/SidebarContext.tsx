'use client'
import { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from 'react'

const SidebarContext = createContext<{sidebarContent: ReactNode[], setSidebarContent: Dispatch<SetStateAction<ReactNode[]>>} | null>(null)

export function SidebarProvider({children} : {children : React.ReactNode}){
    const [sidebarContent, setSidebarContent] = useState<ReactNode[]>(['']);
    return (
        <SidebarContext value={{sidebarContent, setSidebarContent}}>
            {children}
        </SidebarContext>
    )
}

export function useSidebar(){
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
}