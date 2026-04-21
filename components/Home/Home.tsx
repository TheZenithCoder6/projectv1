"use client"
import Wicon from "../Cards/Wicon"
import Navbar from "@/components/Navbar/Navbar";
import HomeImage from "./HomeImage"
import Homepost from "./Homepost";
import { Skiper51 } from "@/components/ui/skiper52"
import Photo from "@/components/page/Photo"
export default function Home() {
  return (
    <div>
      <Wicon/>
        <Navbar/>
        <div className="top-0">
          <HomeImage/>
        </div>
      <div className="relative z-20 bg-white h-auto w-full flex items-center justify-center shadow-2xl flex flex-col">
          <div className="pt-6 flex flex-col items-center min-h-[10vh]">
        <p className="text-center font-[200] tracking-tighter leading-none uppercase italic 
         text-[12vw] md:text-[10vw] lg:text-[8vw] text-black">
         Artworks In India 
         </p>
</div>
          <div className=" md:mt-8"> <Homepost/></div>
          <div >
            <p className="flex item-center justify-center w-full font-seminbold italic text-4xl md:text-5xl">Our Premium Arts</p>
              <div className="md:mt-6"><Skiper51 /></div>
          </div>
          <div className="gap-0 ">
            <div>
              <p className="flex item-center justify-center w-full font-seminbold italic  text-4xl md:text-6xl">PhotoGraphy</p>
              <Photo/></div>
          </div>
    </div>
    </div>
  )
}