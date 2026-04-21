"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { IMAGES } from "@/components/Image/images";

import "swiper/css";
import "swiper/css/pagination";

export default function Slider() {
  return (
    <div className="w-full relative z-20 mt-4">
      {/* Yahan maine responsive heights add ki hain */}
      <div className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[650px]">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop
          className="w-full h-full"
        >
          {IMAGES.home.slider.map((src, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full">
                <Image
                  src={src}
                  alt={`slide-${i}`}
                  fill
                  priority={i === 0}
                  // object-center add kiya taaki image hamesha center se crop ho
                  className="object-cover object-center" 
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}