"use client";

import { useState, useEffect, useCallback, useRef } from "react";

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
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const totalSlides = slides.length;

  const next = useCallback(() => {
    setIsTransitioning(true);
    setCurrent((prev) => prev + 1);
  }, []);

  const goTo = useCallback((index: number) => {
    setIsTransitioning(true);
    setCurrent(index);
  }, []);

  // When we land on the clone (index === totalSlides), instantly reset to 0
  useEffect(() => {
    if (current === totalSlides) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrent(0);
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [current, totalSlides]);

  // Auto-advance
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [next, isHovered]);

  const displayIndex = current >= totalSlides ? 0 : current;

  return (
    <div
      className="relative w-full overflow-hidden leading-[0]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides — original slides + clone of first at the end */}
      <div
        ref={trackRef}
        className={`flex ${isTransitioning ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" : ""}`}
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
        {/* Clone of first slide for seamless loop */}
        <div className="relative w-full flex-shrink-0 flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slides[0].src}
            alt={slides[0].alt}
            className="block w-full h-auto"
            loading="lazy"
          />
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 sm:bottom-5 sm:gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 sm:h-2 ${
              i === displayIndex
                ? "w-4 bg-accent-red sm:w-6"
                : "w-1.5 bg-white/50 hover:bg-white/80 sm:w-2"
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
