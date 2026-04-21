"use client"

import React, { useState } from "react"
import { FaWhatsapp } from "react-icons/fa"
const  Wicon: React.FC = () => {  
  
 

    return(
            <div className="fixed bottom-32 md:bottom-20 right-4 z-50 group">

              <a
              href="https://wa.me/9878767876"
              target="_blank"
              className="bg-green-500 text-white p-2 rounded-full block">
                 <FaWhatsapp size={24}/>
              </a>
              
                  
                    <span 
                    className="absolute right-14 top-1/2 bg-black text-white text-sm px-4 py-2 
                    rounded-full whitespace-nowrap -translate-y-1/2
                    opacity-0 group-hover:opacity-100 pointer-event-none transition duration-300 hover:opacity-0">
                        Do you have questions? WhatsApp us 
                    </span>
                     
            </div>
    );
  };

export default Wicon;