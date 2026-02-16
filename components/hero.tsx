import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-6 pt-4 sm:px-6 sm:pb-10 sm:pt-6 lg:px-8">
      <div className="hero-card rounded-2xl bg-white px-6 py-10 text-center shadow-[0_6px_30px_-4px_rgba(0,0,0,0.2),0_20px_70px_-12px_rgba(0,0,0,0.25)] sm:px-12 sm:py-14">
        {/* Accent Line */}
        <div className="hero-line mx-auto mb-6 h-px w-16 bg-accent-red" />

        <h1 className="hero-title font-[family-name:var(--font-black-ops-one)] text-4xl font-normal tracking-tight text-accent-red sm:text-5xl lg:text-6xl">
          BK CLOTHING
        </h1>

        <p className="hero-subtitle mt-4 text-xs font-bold tracking-normal uppercase text-gray-500 sm:text-sm">
          Manufacturers &amp; Wholesale Dealers In Men&apos;s Clothing
        </p>

        {/* Buttons */}
        <div className="hero-buttons mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="group bg-black px-8 text-sm font-medium uppercase tracking-wider text-white hover:bg-gray-800"
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
  );
}
