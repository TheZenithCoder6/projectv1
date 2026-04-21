"use client"
import { useEffect,useState } from "react"
import { HiArrowUp } from "react-icons/hi"
export default function Scroll_Button(){
const [show, setShow] = useState(true)  

const scrollToTop =() => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

if(!show) return null;
    return(
        <div>
            <button
            onClick={scrollToTop}
            className="fixed 
            right-4 
            bottom-3
            md:right-4 
            md:bottom-5
            lg:right-4
            lg:bottom-3
             z-50 bg-white text-black p-2 rounded-full
             shadow-lg hover:bg-gray-200 transition cursor-pointer">
                <HiArrowUp size={18}/>
            </button>
        </div>
    )}