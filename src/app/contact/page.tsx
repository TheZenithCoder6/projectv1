"use client";

import { useEffect, useRef } from "react";
import { canim, setupWindowEvents } from "@/components/canim/Canim";

export default function Contacts() {
  const contactRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!contactRef.current) return;

    // init canvas animation
    canim(contactRef);

    // window listeners
    const cleanup = setupWindowEvents();

    return () => {
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={contactRef}
      className="bg-white  min-h-screen overflow-hidden relative z-20"
    >
      {/* Heading */}
      <div className="font- text-center pt-3">
        <h1 className="text-black lg:text-[8.9rem] text-7xl uppercase leading-[1]">
          Fine Arts <br />
          Nanopixel <br />
          vast <br />
          collection
        </h1>
      </div>

      {/* Info section */}
      <div className="flex justify-between text-black p-8">
        <p className="lg:ml-30">
          Global recognition among
          <br />
          the world's top startup
          <br />
          Partout.
        </p>

        <p className="lg:mr-30">
          Enhancing aesthetic value
        </p>
      </div>

      {/* Marquee */}
      <section className="lg:mt-36 mt-7 w-max">
        <div id="page1" />

        <div id="page2" className="h-[80px]">
          <div className="flex bg-white border border-1 overflow-hidden shadow-lg">
            <div className="flex marque">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-7 px-2 py-[2vw] shrink-0"
                >
                  <h1 className="font-[font1] text-[4vw]">
                    Art's Beyonds limits
                  </h1>

                  <img
                    src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg"
                    alt="arrow"
                    className="h-[65px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social */}
      <div className="flex flex-col items-center text-center text-white uppercase font-[font1] gap-4">
        <p className="lg:mt-72 mt-30">Suivez-nous</p>

        <button
          onClick={() =>
            window.open("https://t.me/telegram.org", "_blank")
          }
          className="uppercase text-[5.5vw] leading-[5vw]
          border-2 border-white rounded-full
          px-14 pt-1
          hover:text-green-400 hover:border-green-400
          transition"
        >
          tg
        </button>
      </div>
    </div>
  );
}