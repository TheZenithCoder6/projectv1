import gsap from "gsap";
import { RefObject } from "react";

// Canvas animation function
export const canim = (ref: RefObject<HTMLDivElement | null>) => {
  const target = ref.current;
  if (!target) return;
  
  // placeholder for future animation
  console.log("Animation target ready:", target);
};

// Window events function
export const setupWindowEvents = () => {
  const onWheel = (e: WheelEvent) => {
    const isDown = e.deltaY > 0;

    if (isDown) {
      gsap.to(".marque", {
        xPercent: -50,
        duration: 3,
        ease: "none",
        repeat: -1,
        overwrite: true,
      });
      gsap.to(".marque img", { rotate: 180, overwrite: true });
    } else {
      gsap.to(".marque", {
        xPercent: 0,
        duration: 3,
        ease: "none",
        repeat: -1,
        overwrite: true,
      });
      gsap.to(".marque img", { rotate: 0, overwrite: true });
    }
  };

  window.addEventListener("wheel", onWheel);
  return () => window.removeEventListener("wheel", onWheel);
};