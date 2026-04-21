"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

interface ArtItem {
  id: number;
  title: string;
  imagePath: string;
  link: string;
}

const artCategories: ArtItem[] = [
  { id: 1, title: 'Bronze & Metal', imagePath: 'https://www.aakritiartgallery.com/uploads/2023/02/09/f09f69bbc8c8c2eb61fd859c9abd64e0.jpg', link: '/category/metal' },
  { id: 2, title: 'Glass Art Sculptures', imagePath: 'https://www.aakritiartgallery.com/uploads/2023/02/09/f09f69bbc8c8c2eb61fd859c9abd64e0.jpg', link: '/category/sculpture' },
  { id: 3, title: 'Terracota', imagePath: 'https://www.aakritiartgallery.com/uploads/2023/04/08/ac11a22ba6bd5e88400fc78e0026b6e6.png', link: '/category/terracotta' },
  { id: 4, title: 'Ohers', imagePath: 'https://www.aakritiartgallery.com/uploads/2023/04/08/ac11a22ba6bd5e88400fc78e0026b6e6.png', link: '/category/installation' },
];

const ArtGallery: React.FC = () => {
  return (
    <div className="w-full max-w-8xl mx-auto px-4">
      {/* Grid structure ensures rows are even */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {artCategories.map((item) => (
          <CardContainer key={item.id} className="inter-var w-full py-2 md:py-10">
            {/* FIXED BOX: h-[550px] and w-full makes sure every div is identical */}
            <CardBody className="bg-white relative group/card focus-within:ring-0 border-zinc-300 w-full h-[400px] md:h-[550px] rounded-2xl p-4 md:p-6 border transition-all flex flex-col items-center shadow-sm hover:shadow-xl"
             >
              
              {/* IMAGE CONTAINER: Fixed height h-80 ensures images don't push the div */}
              <CardItem
                translateZ="100"
                className="w-full h-52 md:h-80 mt-2"
              >
                <Link href={item.link}>
                  <div className="relative h-full w-full overflow-hidden rounded-xl bg-zinc-50 border border-zinc-50">
                    <Image
                      src={item.imagePath}
                      alt={item.title}
                      fill
                      // 'object-contain' for full art view, or 'object-cover' for zoom-fill style
                      className="object-contain p-6 transition-transform duration-500 group-hover/card:scale-110"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                </Link>
              </CardItem>

              {/* TEXT SECTION: flex-grow makes sure text stays at the bottom area consistently */}
              <div className="flex-grow flex flex-col items-center justify-end w-full pb-4">
                <CardItem
                  translateZ="50"
                  className="w-full"
                >
                  <h2 className="text-zinc-800 text-xs md:text-sm font-black tracking-[0.3em] uppercase text-center group-hover/card:text-black italic leading-tight px-2">
                    {item.title}
                  </h2>
                </CardItem>
                
                <CardItem
                   translateZ="40"
                   as={Link}
                   href={item.link}
                   className="mt-6 px-8 py-3 rounded-full bg-black text-white text-[10px] font-black uppercase tracking-widest 
                                opacity-100 md:opacity-0 md:group-hover/card:opacity-100 transition-all duration-300"
                >
                  Explore
                </CardItem>
              </div>

            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
};

export default ArtGallery;