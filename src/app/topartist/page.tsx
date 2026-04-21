"use client"
import { AnimatedTooltip} from "@/components/ui/animated-tooltip" 
import Link from "next/link";

export default function Artist(){

  const people = [
  {
    id: 1,
    name: "Arsh Gupta",
    designation: "Frontend Developer",
    image: "https://www.aakritiartgallery.com/uploads/2023/02/09/a9a68a467ac20a402adb51a3a22cc6ac.jpeg",
  },
  {
    id: 2,
    name: "Rahul Sharma",
    designation: "UI Designer",
    image: "https://www.aakritiartgallery.com/uploads/2023/02/09/a9a68a467ac20a402adb51a3a22cc6ac.jpeg",
  },
  {
    id: 3,
    name: "Aman Verma",
    designation: "3D Artist",
    image: "https://www.aakritiartgallery.com/uploads/2023/02/09/a9a68a467ac20a402adb51a3a22cc6ac.jpeg",
  },
   {
    id: 4,
    name: "Arsh Gupta",
    designation: "Frontend Developer",
    image: "https://www.aakritiartgallery.com/uploads/2023/02/09/a9a68a467ac20a402adb51a3a22cc6ac.jpeg",
  },
  {
    id: 2,
    name: "Rahul Sharma",
    designation: "UI Designer",
    image: "https://www.aakritiartgallery.com/uploads/2023/02/09/a9a68a467ac20a402adb51a3a22cc6ac.jpeg",
  },
  {
    id: 3,
    name: "Aman Verma",
    designation: "3D Artist",
    image: "https://www.aakritiartgallery.com/uploads/2023/02/09/a9a68a467ac20a402adb51a3a22cc6ac.jpeg",
  },
];


  return(
    <div className="w-full min-h-screen bg-white relative z-20 flex flex-row items-center justify-center ">
     <div className="absolute top-0 left-0 w-full flex justify-center pt-12 ">
       <h1 className="text-7xl font-black text-black tracking-trighter ">Our Top Artist</h1>
     </div>
      <div className="flex flex-col md:flex-row ml-48">

         <AnimatedTooltip items={people} />
      </div>
       <div>
          <div className="flex min-h-screen w-full items-end justify-end p-10 bg-transparent  ">
      
      {/* Main Button Wrapper */}
      <button className="group relative inline-flex items-center justify-end outline-none cursor-pointer">
        
        {/* Background Black Shadow Box */}
        {/* Hover par ye thoda aur bahar niklega */}
        <div className="absolute inset-0 border-2 border-black bg-black translate-x-1.5 translate-y-1.5 transition-all duration-300 ease-out group-hover:translate-x-3 group-hover:translate-y-3 group-active:translate-x-0 group-active:translate-y-0" />

        {/* Front White Button */}
        {/* Hover par ye thoda upar aur left jayega 3D effect ke liye */}
        <div className="relative flex items-center justify-between gap-6 px-6 py-3 bg-white border-2 border-black transition-all duration-300 ease-out  group-hover:-translate-x-1 group-hover:-translate-y-1 group-active:translate-x-0 group-active:translate-y-0 ">
          
          {/* Text Container */}
          <div className="relative">
            {/* Red Text (Glitch effect - Hover par bottom-right shift hoga) */}
            <Link href="/artist"><span className="absolute top-0 left-0 text-black font-bold text-lg tracking-widest opacity-0 transition-all duration-300 ease-out group-hover:opacity-0group-hover:translate-x-[3px] group-hover:translate-y-[3px]">
              Explor All!
            </span></Link>
            {/* Main Black Text */}
           <Link href="/artist"> <span className="relative text-black font-bold text-lg tracking-widest z-10">
              Explor All!
            </span></Link>
          </div>

          {/* Arrow Container */}
          <div className="relative w-6 h-6 overflow-hidden">
            {/* Black Arrow (Hover par right ki taraf nikal jayega) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="absolute inset-0 w-full h-full text-black transition-transform duration-300 ease-out group-hover:translate-x-[150%]"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>

            {/* Red Arrow (Hover par left se andar aayega) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="absolute inset-0 w-full h-full text-green-700 -translate-x-[150%] transition-transform duration-300 ease-out group-hover:translate-x-0"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </div>

        </div>
      </button>

    </div>
       </div>
    </div>
  )
}