import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
      aria-label="Hero section"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, rgba(255,0,58,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Subtle Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {/* Glass Card */}
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 px-6 py-16 backdrop-blur-xl sm:px-12 sm:py-20">
          {/* Accent Line */}
          <div className="mx-auto mb-8 h-px w-16 bg-accent-red" />

          <h1 className="animate-fade-in-up font-[family-name:var(--font-playfair)] text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            BK{" "}
            <span className="text-accent-red">CLOTHING</span>
          </h1>

          <p className="animate-fade-in-up animation-delay-100 mt-6 text-lg font-light tracking-[0.3em] uppercase text-white/70 sm:text-xl">
            Formal &nbsp;|&nbsp; Casual &nbsp;|&nbsp; Inners
          </p>

          <p className="animate-fade-in-up animation-delay-200 mt-4 text-sm tracking-wider text-white/50">
            Wholesale Clothing Excellence
          </p>

          {/* Buttons */}
          <div className="animate-fade-in-up animation-delay-300 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
              className="border-white/30 bg-transparent px-8 text-sm font-medium uppercase tracking-wider text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
