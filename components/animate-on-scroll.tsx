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
  as?: keyof HTMLElementTagNameMap;
  threshold?: number;
  stagger?: number;
}

export function AnimateOnScroll({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 850,
  className = "",
  as: Tag = "div",
  threshold = 0.1,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Use rAF to batch the style change with the next paint
          requestAnimationFrame(() => {
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add("aos-visible");
          });
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    // @ts-expect-error - dynamic tag element
    <Tag
      ref={ref}
      className={`aos-init aos-${variant} ${className}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </Tag>
  );
}

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  variant?: AnimationVariant;
  duration?: number;
  as?: keyof HTMLElementTagNameMap;
}

export function StaggerChildren({
  children,
  className = "",
  staggerDelay = 120,
  variant = "fade-up",
  duration = 850,
  as: Tag = "div",
}: StaggerChildrenProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const items = el.querySelectorAll<HTMLElement>(".aos-stagger-child");
          // Use double-rAF to ensure the browser has painted the initial state
          // before we trigger the transition — prevents frame skipping
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
    // @ts-expect-error - dynamic tag element
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
