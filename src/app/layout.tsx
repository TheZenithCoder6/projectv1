import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Navmini from "@/components/Navbar/Navmini"
import Arrow from "@/components/Cards/Arrow"
import { Providers } from "@/components/Providers";
import ChatBot from '@/components/chatBot';


export default function RootLayout({children}:{children: React.ReactNode}) {
  return(
    <html lang="en">
     <body>
      
     
         {<Navmini/>}
         <Providers>
          {children}</Providers>
          <ChatBot />
         <Arrow/>
         <Footer/>
         
      
     </body>
    </html>
  )
}