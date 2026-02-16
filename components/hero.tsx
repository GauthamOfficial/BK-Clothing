import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white"
      aria-label="Hero section"
    >
      {/* Soft radial accents */}
      <div className="hero-bg absolute inset-0">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 20% 50%, rgba(255,0,58,0.04) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(0,0,0,0.03) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {/* Card */}
        <div className="hero-card mx-auto max-w-3xl rounded-2xl border border-black/[0.08] bg-white px-6 py-16 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08),0_16px_64px_-16px_rgba(0,0,0,0.1)] sm:px-12 sm:py-20">
          {/* Accent Line */}
          <div className="hero-line mx-auto mb-8 h-px w-16 bg-accent-red" />

          <h1 className="hero-title font-[family-name:var(--font-black-ops-one)] text-5xl font-normal tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            BK{" "}
            <span className="text-accent-red">CLOTHING</span>
          </h1>

          <p className="hero-subtitle mt-6 text-sm font-bold tracking-normal uppercase text-gray-500 sm:text-base">
            Manufacturers &amp; Wholesale Dealers In Men&apos;s Clothing
          </p>

          {/* Buttons */}
          <div className="hero-buttons mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="group bg-accent-red px-8 text-sm font-medium uppercase tracking-wider text-white hover:bg-red-600"
            >
              <Link href="/products">
                View Products
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-gray-900 bg-transparent px-8 text-sm font-medium uppercase tracking-wider text-gray-900 hover:bg-gray-900 hover:text-white"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom edge — subtle separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
    </section>
  );
}
