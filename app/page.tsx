import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Instagram, Facebook } from "lucide-react";
import { TikTok, WhatsApp } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Hero } from "@/components/hero";
import { ImageSlider } from "@/components/image-slider";
import { getGalleryItems } from "@/lib/gallery";
import { SOCIAL } from "@/lib/constants";
import { AnimateOnScroll, StaggerChildren } from "@/components/animate-on-scroll";

export const dynamic = "force-dynamic";

const categories = [
  {
    name: "Formal",
    image: "/formal.png",
    description:
      "Premium formal wear for professionals. Shirts, trousers, suits, and more.",
  },
  {
    name: "Casual",
    image: "/casual.png",
    description:
      "Comfortable everyday clothing. T-shirts, jeans, polos, and casual essentials.",
  },
  {
    name: "Inners",
    image: "/Inners.png",
    description:
      "Quality innerwear and essentials. Cotton-rich, comfortable, and durable.",
  },
];

export default async function HomePage() {
  const galleryItems = await getGalleryItems();
  const latestItems = galleryItems.slice(0, 6);

  return (
    <>
      {/* Image Slider + Hero */}
      <section className="relative z-[2] pt-16">
        <div className="animate-slider-in mx-auto max-w-3xl px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
          <div className="overflow-hidden rounded-xl shadow-lg leading-[0]">
            <ImageSlider />
          </div>
        </div>
        <Hero />
      </section>

      {/* About Preview */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <AnimateOnScroll variant="fade-in">
              <div className="mb-6 h-px w-16 mx-auto bg-accent-red" />
            </AnimateOnScroll>
            <AnimateOnScroll variant="fade-up" delay={100}>
              <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Manufacturers &amp; Wholesale Dealers in Men&apos;s Clothing
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll variant="fade-up" delay={200}>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                BK Clothing Company is a premier wholesale clothing distributor
                based in Colombo, Sri Lanka. With a commitment to quality and
                competitive pricing, we supply a comprehensive range of formal,
                casual, and innerwear products to retailers across the nation.
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll variant="fade-up" delay={300}>
              <Button
                asChild
                variant="outline"
                className="mt-8 border-black text-black hover:bg-black hover:text-white"
              >
                <Link href="/about">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-50 py-20 sm:py-28" aria-label="Product categories">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up" className="mb-14 text-center">
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Categories
            </h2>
            <p className="mt-4 text-gray-600">
              Comprehensive range of wholesale clothing solutions
            </p>
          </AnimateOnScroll>
          <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={150}>
            {categories.map((cat) => (
              <Card
                key={cat.name}
                className="aos-stagger-child group overflow-hidden border-0 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative w-full overflow-hidden bg-gray-50">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={600}
                    height={600}
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-semibold tracking-wide">
                    {cat.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">
                    {cat.description}
                  </p>
                  <Link
                    href={`/products?category=${cat.name.toLowerCase()}`}
                    className="mt-5 inline-flex items-center text-sm font-medium text-accent-red transition-colors hover:underline"
                  >
                    Explore
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Product Preview */}
      {latestItems.length > 0 && (
        <section className="bg-white py-20 sm:py-28" aria-label="Latest products">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll variant="fade-up" className="mb-14 text-center">
              <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our Products
              </h2>
              <p className="mt-4 text-gray-600">
                A glimpse into our latest collection
              </p>
            </AnimateOnScroll>
            <StaggerChildren className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={100}>
              {latestItems.map((item) => (
                <div
                  key={item.id}
                  className="aos-stagger-child group relative aspect-[4/5] overflow-hidden rounded-lg bg-gray-100"
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title || `${item.category} clothing`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="w-full p-5">
                      {item.title && (
                        <h3 className="text-sm font-medium text-white">
                          {item.title}
                        </h3>
                      )}
                      <span className="mt-1 inline-block text-xs uppercase tracking-wider text-white/70">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </StaggerChildren>
            <AnimateOnScroll variant="fade-up" delay={200} className="mt-12 text-center">
              <Button
                asChild
                size="lg"
                className="bg-black text-white hover:bg-gray-800"
              >
                <Link href="/products">
                  View All Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </AnimateOnScroll>
          </div>
        </section>
      )}

      {/* Social Section */}
      <section className="bg-gray-50 py-20 overflow-hidden" aria-label="Social media">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up">
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Connect With Us
            </h2>
            <p className="mt-4 text-gray-600">
              Follow us on social media for the latest updates
            </p>
          </AnimateOnScroll>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
              className="group flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 transition-all hover:border-accent-red hover:shadow-md sm:gap-3 sm:px-8 sm:py-4"
            >
              <Instagram className="h-4 w-4 text-gray-600 transition-colors group-hover:text-accent-red sm:h-5 sm:w-5" />
              <span className="text-xs font-medium text-gray-700 group-hover:text-accent-red sm:text-sm">
                Instagram
              </span>
            </a>
            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Facebook"
              className="group flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 transition-all hover:border-accent-red hover:shadow-md sm:gap-3 sm:px-8 sm:py-4"
            >
              <Facebook className="h-4 w-4 text-gray-600 transition-colors group-hover:text-accent-red sm:h-5 sm:w-5" />
              <span className="text-xs font-medium text-gray-700 group-hover:text-accent-red sm:text-sm">
                Facebook
              </span>
            </a>
            <a
              href={SOCIAL.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on TikTok"
              className="group flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 transition-all hover:border-accent-red hover:shadow-md sm:gap-3 sm:px-8 sm:py-4"
            >
              <TikTok className="h-4 w-4 text-gray-600 transition-colors group-hover:text-accent-red sm:h-5 sm:w-5" />
              <span className="text-xs font-medium text-gray-700 group-hover:text-accent-red sm:text-sm">
                TikTok
              </span>
            </a>
            <a
              href={SOCIAL.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="group flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 transition-all hover:border-accent-red hover:shadow-md sm:gap-3 sm:px-8 sm:py-4"
            >
              <WhatsApp className="h-4 w-4 text-gray-600 transition-colors group-hover:text-accent-red sm:h-5 sm:w-5" />
              <span className="text-xs font-medium text-gray-700 group-hover:text-accent-red sm:text-sm">
                WhatsApp
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
