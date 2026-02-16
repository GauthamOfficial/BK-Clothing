import type { Metadata } from "next";
import { Gallery } from "@/components/gallery";
import { getGalleryItems } from "@/lib/gallery";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse our wholesale clothing collection - formal wear, casual clothing, and innerwear. BK Clothing Company Sri Lanka.",
};

export default function ProductsPage() {
  const items = getGalleryItems();

  return (
    <>
      {/* Header */}
      <section className="bg-black pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-page-header mx-auto max-w-3xl text-center">
            <div className="mb-6 mx-auto h-px w-16 bg-accent-red" />
            <h1 className="font-[family-name:var(--font-poppins)] text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Our Products
            </h1>
            <p className="mt-4 text-lg text-white/60">
              Browse our wholesale clothing collection
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up" threshold={0} rootMargin="0px 0px 200px 0px">
            <Gallery items={items} showFilter={true} />
          </AnimateOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up" threshold={0} rootMargin="0px 0px 100px 0px">
            <p className="text-gray-600">
              Interested in wholesale pricing?{" "}
              <a
                href="/contact"
                className="font-medium text-accent-red hover:underline"
              >
                Contact us for details
              </a>
            </p>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
