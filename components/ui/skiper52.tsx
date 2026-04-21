"use client";

import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { cn } from "@/src/lib/utils";

const Skiper51 = () => {
  const images = [
    {
      src: "https://www.aakritiartgallery.com/uploads/2024/09/21/4b4e2421dbe3739d3425c6325c3ca79c.jpg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "https://www.aakritiartgallery.com/uploads/2024/09/21/4b4e2421dbe3739d3425c6325c3ca79c.jpg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "https://www.aakritiartgallery.com/uploads/2024/09/21/4b4e2421dbe3739d3425c6325c3ca79c.jpg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "https://www.aakritiartgallery.com/uploads/2024/09/21/4b4e2421dbe3739d3425c6325c3ca79c.jpg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "https://www.aakritiartgallery.com/uploads/2024/09/21/4b4e2421dbe3739d3425c6325c3ca79c.jpg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "https://www.aakritiartgallery.com/uploads/2024/09/21/4b4e2421dbe3739d3425c6325c3ca79c.jpg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "https://www.aakritiartgallery.com/uploads/2024/09/21/4b4e2421dbe3739d3425c6325c3ca79c.jpg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "https://www.aakritiartgallery.com/uploads/2024/09/21/4b4e2421dbe3739d3425c6325c3ca79c.jpg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "https://www.aakritiartgallery.com/uploads/2024/09/21/4b4e2421dbe3739d3425c6325c3ca79c.jpg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "https://www.aakritiartgallery.com/uploads/2024/09/21/4b4e2421dbe3739d3425c6325c3ca79c.jpg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "https://www.aakritiartgallery.com/uploads/2024/09/21/4b4e2421dbe3739d3425c6325c3ca79c.jpg",
      alt: "Illustrations by my fav AarzooAly",
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-white">
      <Carousel_005 className="" images={images} autoplay showPagination loop />
    </div>
  );
};

export { Skiper51 };
const Carousel_005 = ({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 0,
}: {
  images: { src: string; alt: string }[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
}) => {

  const css = `
  .Carousal_005 {
    width: 100%;
    height: 100%;
    padding-bottom: 40px !important;
  }

  .Carousal_005 .swiper-slide {
    border-radius: 20px;
    overflow: hidden;
  }

  .Carousal_005 .swiper-pagination-bullet {
    background-color: #000 !important;
  }
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      <style>{css}</style>

      <Swiper
        spaceBetween={spaceBetween}
        autoplay={
          autoplay
            ? { delay: 2000, disableOnInteraction: false }
            : false
        }
        effect="creative"
        grabCursor
        centeredSlides
        slidesPerView={1}
        loop={loop}
        pagination={
          showPagination
            ? { clickable: true }
            : false
        }
        navigation={
          showNavigation
            ? {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }
            : false
        }
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -300],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        modules={[EffectCreative, Pagination, Autoplay]}
        className="Carousal_005"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="w-full 
              h-[220px] 
              sm:h-[320px] 
              md:h-[420px] 
              lg:h-[500px]">
              
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </SwiperSlide>
        ))}

        {showNavigation && (
          <>
            <div className="swiper-button-next after:hidden text-white" />
            <div className="swiper-button-prev after:hidden text-white" />
          </>
        )}
      </Swiper>
    </motion.div>
  );
};

export { Carousel_005 };


