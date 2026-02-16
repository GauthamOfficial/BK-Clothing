"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const slides = [
  { src: "/img-1.png", alt: "BK Clothing Collection 1" },
  { src: "/img-2.png", alt: "BK Clothing Collection 2" },
  { src: "/img-3.png", alt: "BK Clothing Collection 3" },
  { src: "/img-4.png", alt: "BK Clothing Collection 4" },
  { src: "/img-5.png", alt: "BK Clothing Collection 5" },
  { src: "/img-6.png", alt: "BK Clothing Collection 6" },
];

export function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [next, isHovered]);

  return (
    <div
      className="relative w-full overflow-hidden leading-[0]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={slide.src} className="relative w-full flex-shrink-0 flex">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.src}
              alt={slide.alt}
              className="block w-full h-auto"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 sm:bottom-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === current
                ? "w-6 bg-accent-red"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Subtle gradient overlays for polish */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/5 to-transparent sm:w-12" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/5 to-transparent sm:w-12" />
    </div>
  );
}
