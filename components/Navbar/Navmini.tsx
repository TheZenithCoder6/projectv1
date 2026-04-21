"use client"

import React,{useRef,useState} from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import Link from "next/link";
const  Navmini = () =>{
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    const menuRef = useRef<HTMLDivElement | null > (null)
    const itemsRef = useRef<HTMLDivElement | null > (null)

    if (pathname === "/") {
        return null
    }
     

    const toggleMenu =() =>{
        if(!menuRef.current || !itemsRef.current) return;

        const items = 
          itemsRef.current.querySelectorAll<HTMLSpanElement>(".menu-item")

        const t1 = gsap.timeline()

        if(!isOpen){
            t1.to(menuRef.current , {
                width: 280,
                duration: 0.5,
                ease: "expo.out"
            })
             .to(itemsRef.current, {
                opacity: 1,
                width: "auto",
                duration: 0.3,
             }, "<")
             .to(
                items,{
                    scale: 1,
                    opacity: 1,
                    stagger: 0.05,
                    ease: "back.out(1.7)"
                } , "-=0.2"
             );
             
        } else{
             t1.to(items, {
                scale: 0.8,
                opacity: 0,
                stagger: -0.05,
                duration: 0.3,
             })
              t1.to(menuRef.current , {
                width: 120,
                duration: 0.5,
                ease: "expo.inOut"
            })
              .to(itemsRef.current, {
                opacity: 0,
                width: 0,
                duration: 0.2,
             }, "<")
        }
        setIsOpen(!isOpen)
    }

    return(
        <div className="relative w-full bg-slate-100">
            <div
            ref={menuRef}
            className="fixed top-4 md:top-10 left-4 md:left-10 h-[60px] w-[120px] bg-white shadow-lg rounded-full flex items-center px-4 z-50 select-none border border-white/20 overflow-hidden">
                   
                <div className="font-bold mr-4">
                    <Link href="/">HOME</Link>
                </div>
                <div ref={itemsRef} 
                className="flex gap-2 opacity-0 w-0 overflow-hidden ">
                    {["work","About"].map((txt) =>(
                       <Link
                        key={txt}
                        href={`/${txt.toLowerCase()}`}
                        onClick={() => toggleMenu()}>
                              
                            <span 
                            className="menu-item scale-75 opacity-0 px-3 py-1 bg-slate-100 rounded-full text-xs">{txt}
                            </span>
                       </Link>
                    ))}
                </div>

                {/* button */}
                <button
                onClick={toggleMenu}
                className="ml-auto min-w-[32px] h-[32px] bg-black rounded-full flex flex-col items-center justify-center gap-1">
                   <div
                   className={`w-4 h-0.5 bg-white transition-all ${
                   isOpen ? "rotate-45 translate-y-1" : "" 
                   } `} />
                    <div
                   className={`w-4 h-0.5 bg-white transition-all ${
                   isOpen ? "-rotate-45 -translate-y-0.5" : "" } `} />
                </button>

            </div>
        </div>
    )
}

export default Navmini;