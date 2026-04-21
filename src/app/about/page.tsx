import Home from "@/components/Home/Home"
// import {MacbookScroll} from "@/components/ui/macbook-scroll"
import {ContainerScroll} from "@/components/ui/container-scroll-animation"
import Image from "next/image";

export default function about(){
  return(
    <div className="w-full min-h-screen bg-white relative z-20 ">
        <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-black">
               Nanopixel showcased <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Art in India building...
              </span>
            </h1>
          </>
        }                        
      >
        <Image
          src={`https://www.aakritiartgallery.com/uploads/2024/09/21/bd5b297accc83691fb74ea5ed2dcc6ef.jpg`} 
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  )
}