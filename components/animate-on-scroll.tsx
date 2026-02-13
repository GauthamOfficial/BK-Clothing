"use client";

import { useEffect, useRef } from "react";

type AnimationVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade-in"
  | "zoom-in"
  | "slide-up";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

export function AnimateOnScroll({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 850,
  className = "",
  threshold = 0.1,
  rootMargin = "0px 0px -60px 0px",
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add("aos-visible");
          });
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold, rootMargin]);

  return (
    <div
      ref={ref}
      className={`aos-init aos-${variant} ${className}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
}

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  duration?: number;
}

export function StaggerChildren({
  children,
  className = "",
  staggerDelay = 120,
  duration = 850,
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const items = el.querySelectorAll<HTMLElement>(".aos-stagger-child");
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              items.forEach((child, i) => {
                child.style.transitionDelay = `${i * staggerDelay}ms`;
                child.style.transitionDuration = `${duration}ms`;
                child.classList.add("aos-visible");
              });
            });
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [staggerDelay, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
