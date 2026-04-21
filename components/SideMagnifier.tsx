"use client";
import { useState, useRef } from "react";
import Image from "next/image";

export default function SideMagnifier({ src, alt, onImageClick }: { src: string; alt: string; onImageClick: () => void }) {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [[x, y], setXY] = useState([0, 0]);
  const imgRef = useRef<HTMLDivElement>(null);

  const zoomLevel = 2.5;

  const handleMouseMove = (e: React.MouseEvent) => {
    const { top, left, width, height } = imgRef.current!.getBoundingClientRect();
    const x = e.pageX - left - window.pageXOffset;
    const y = e.pageY - top - window.pageYOffset;
    setSize([width, height]);
    setXY([x, y]);
  };

  return (
    <div className="relative flex gap-4">
      {/* Original Image Section */}
      <div 
        ref={imgRef}
        className="relative w-full aspect-[4/3] border border-gray-200 cursor-pointer overflow-hidden"
        onMouseEnter={() => setShowMagnifier(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setShowMagnifier(false)}
        onClick={onImageClick}
      >
        <Image src={src} alt={alt} fill className="object-cover" />
        
        {/* The Square Selector (Lens) */}
        {showMagnifier && (
          <div 
            style={{
              position: "absolute",
              left: `${x - 50}px`,
              top: `${y - 50}px`,
              width: "100px",
              height: "100px",
              border: "1px solid rgba(0,0,0,0.4)",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              pointerEvents: "none"
            }}
          />
        )}
      </div>

      {/* Side Zoom Window (Visible on Hover) */}
      {showMagnifier && (
        <div 
          className="absolute left-[102%] top-0 z-[100] border-2 border-white shadow-2xl bg-white hidden lg:block"
          style={{
            width: `${imgWidth}px`,
            height: `${imgHeight}px`,
            backgroundImage: `url('${src}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
            backgroundPosition: `${-x * zoomLevel + imgWidth / 4}px ${-y * zoomLevel + imgHeight / 4}px`
          }}
        />
      )}
    </div>
  );
}