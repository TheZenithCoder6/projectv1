"use client";

export default function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="relative max-w-5xl w-full bg-white p-2 rounded-sm shadow-2xl animate-in zoom-in-95">
        <button 
          onClick={onClose}
          className="absolute -top-10 -right-2 text-white bg-black rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold border border-white hover:bg-gray-800"
        >
          ×
        </button>
        <img src={src} alt="Full View" className="w-full h-auto max-h-[85vh] object-contain" />
      </div>
    </div>
  );
}