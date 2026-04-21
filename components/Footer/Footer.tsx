"use client"

import React,{useEffect,useState,useRef} from "react";
import Lenis from "lenis";
import { Twitter,Instagram,Linkedin,ArrowDown} from "lucide-react";
export default function Footer(){
 const footerRef = useRef<HTMLElement>(null)
 const [footerHeight, setFooterHeight] = useState(0)


 useEffect(() =>{
  const lenis = new Lenis();
  function raf(time: number){
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
    requestAnimationFrame(raf);
const updateHeight = () => {
  if(footerRef.current){
    setFooterHeight(footerRef.current.offsetHeight)
  }
}

updateHeight();
window.addEventListener("resize",updateHeight)

return() => {
  lenis.destroy();
  window.removeEventListener("resize",updateHeight)
};

 },[])
  return(
    <div className="font-sans antialiased">
             <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Oi&family=Raleway:wght@400;700&display=swap");
        .font-oi { font-family: "Oi", serif; }
        .font-raleway { font-family: "Raleway", sans-serif; }
        
        @keyframes scrolldown {
          0% { background-position: 0 -60px; }
          75% { background-position: 0 0; }
          100% { background-position: 0 60px; }
        }

        
        .scroll-line-anim::after {
          content: ""; width: 100%; height: 100%; display: block;
          background: linear-gradient(to bottom, #f5f5eb 50%, transparent 50%);
          background-position: 0 -60px; background-size: 100% 200%;
          animation: scrolldown 2.2s cubic-bezier(0.76, 0, 0.3, 1) infinite;
        }
      `}</style>
{/* main part */}
      <main 
      className="relative z-20 min-h-42 bg-black flex flex-col items-center justify-center px-6"
        style={{ marginBottom: `${footerHeight}px` }}>
        <div className="max-w-4xl text-center font-raleway">
           
        </div>
        <div className="absolute bottom-6 flex flex-col items-center gap-3">
          <p className="text-white tracking-wide animate-bounce">Thank you</p> 
          <ArrowDown className="w-5 h-5 text-white animate-bounce"/>
           <div className="scroll-line-anim w-[1px] h-12 relative text-white"></div>
        </div>
      </main>
      {/* footer code  */}
      <footer
      ref={footerRef}
      className="fixed bottom-0 left-0 w-full top-32 bg-black text-white z-10 font-raleway">
        <div className="p-8 md:p-20">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32">
            {/* left part */}
             <div className="space-y-8">
              <h2 className="text-3xl font-bold">Creative Agency.</h2>
              <p className="text-zinc-400 text-lg">We craft </p>
               
              {/* social icon  */}
              <div className="gap-5 flex">
                  {[
                  { icon: <Twitter size={20} />, label: "Twitter" },
                  { icon: <Instagram size={20} />, label: "Instagram" },
                  { icon: <Linkedin size={20} />, label: "LinkedIn" },
                    ].map((item,idx)=>(
                      <a
                      key={idx}
                      href="#"
                      className="p-3 border border-zinc-800 roundedx-full ">{item.icon}
                      </a>
                    ))}
              </div>
             </div>
            
            {/* right part */}
            <div className="grid grid-cols-2 gap-8 md:gap-0 md:text-right mt-4">
              <div className="flex flex-col gap-4">
                <h4 className="text-zinc-600  font-bold uppercase text-xs tracking-[2px]">Explore</h4>
                <a href="#" className="hover:text-zinc-400 transition-colors">Our Arts</a>
                <a href="#" className="hover:text-zinc-400 transition-colors">About</a>
                <a href="/contact" className="hover:text-zinc-400 transition-colors">Contact</a>
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="text-zinc-600  font-bold uppercase text-xs tracking-[2px]">Office</h4>
                <p className="hover:text-zinc-400 transition-colors">Delhi,UP</p>
                <p className="hover:text-zinc-400 transition-colors">India</p>
                </div>
            </div>
           </div>

           <div className="mt-12 md:mt-24 border-t border-zinc-900 pt-8 overflow-hidden">
            <h1 className="font-sans mb-8 font-seminbold  text-[5vw] leading-none text-white select-none opacity-90 translate-y-4">
              Nanopixel
            </h1>
           </div>
        </div>
      </footer>
    </div>
  )
}