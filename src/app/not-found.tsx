"use client"
import Link from 'next/link'
import { motion } from 'framer-motion' // Thoda smooth feel ke liye

export default function NotFound() {
  return (
    <main className="h-screen w-full flex flex-col items-center justify-center bg-white text-black px-5 relative z-20">
      {/* Badi Heading - Tumhara Custom Font yahan mast lagega */}
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-[15vw] font-black italic leading-none tracking-tighter uppercase"
        style={{ fontFamily: '"CustomArtFont", sans-serif' }}
      >
        Void
      </motion.h1>

      <div className="max-w-md text-center mt-10">
        <h2 className="text-xl font-bold uppercase tracking-widest mb-4">
          Error 404 / Lost in Space
        </h2>
        <p className="text-sm text-zinc-500 uppercase leading-relaxed font-medium">
          Jo aap dhoond rahe hain wo shayad is dimension mein exist nahi karta. 
          Ya shayad aapne kuch aisa dekhne ki koshish ki jo "Secret" hai.
        </p>
      </div>

      {/* Interactive Back Button */}
      <Link href="/" className="mt-12 group relative overflow-hidden border border-black px-12 py-4">
        <span className="relative z-10 font-black uppercase text-xs tracking-[0.3em] group-hover:text-white transition-colors duration-500">
          Back to Gallery
        </span>
        <div className="absolute inset-0 bg-black translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
      </Link>

      {/* Background Subtle Detail */}
      <div className="absolute bottom-10 left-10 text-[10px] font-mono opacity-20 uppercase tracking-widest">
        Target: Unknown_Route // Status: Terminated
      </div>
    </main>
  )
}