import localFont from 'next/font/local'
import './globals.css'
import Header from './_components/Header'
import Sidebar from './_components/Sidebar'
import MainContent from './_components/MainContent'
import { SidebarProvider } from './context/SidebarContext'

const customFont = localFont({
  src: './fonts/BeVietnam-Regular.ttf',
  weight:'400',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" className={`${customFont.className} no-scrollbar`}>
      <body className=' no-scrollbar'>
        <Header />
        <main className="lg:p-0 px-3 lg:flex lg:w-screen">
          <SidebarProvider>
            <Sidebar /> 
            <MainContent>
              {children}
            </MainContent>
          </SidebarProvider>
        </main>

      </body>
    </html>
  )
}
