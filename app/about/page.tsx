import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { AnimateOnScroll, StaggerChildren } from "@/components/animate-on-scroll";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about BK Clothing Company - a premier wholesale clothing distributor based in Colombo, Sri Lanka, committed to quality and excellence.",
};

const values = [
  {
    title: "Quality First",
    description:
      "Every garment passes through rigorous quality checks to ensure our partners receive only the best products for their customers.",
  },
  {
    title: "Wholesale Focus",
    description:
      "We specialize exclusively in wholesale distribution, offering competitive bulk pricing and dedicated support for retailers and businesses.",
  },
  {
    title: "Sri Lanka Wide",
    description:
      "Our distribution network spans across Sri Lanka, ensuring reliable and timely delivery to retail partners nationwide.",
  },
  {
    title: "Diverse Range",
    description:
      "From premium formal wear to everyday casuals and essential innerwear, we provide a comprehensive clothing solution under one roof.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-black pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-page-header mx-auto max-w-3xl text-center">
            <div className="mb-6 mx-auto h-px w-16 bg-accent-red" />
            <h1 className="font-[family-name:var(--font-poppins)] text-4xl font-bold tracking-tight text-white sm:text-5xl">
              About Us
            </h1>
            <p className="mt-4 text-lg text-white/60">
              Delivering wholesale clothing excellence since establishment
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <AnimateOnScroll variant="fade-up">
              <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold tracking-tight text-gray-900">
                Our Story
              </h2>
            </AnimateOnScroll>
            <div className="mt-8 space-y-6 text-gray-600 leading-relaxed">
              <AnimateOnScroll variant="fade-up" delay={100}>
                <p>
                  BK Clothing Company is a trusted wholesale clothing distributor
                  headquartered in the heart of Colombo, Sri Lanka. We have built
                  our reputation on a foundation of quality, reliability, and
                  competitive pricing that serves the needs of retailers and
                  businesses across the nation.
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll variant="fade-up" delay={150}>
                <p>
                  Our comprehensive product range spans three core categories:
                  premium formal wear for the professional market, comfortable and
                  stylish casual clothing for everyday wear, and high-quality
                  innerwear essentials. This diverse portfolio enables our retail
                  partners to source their complete clothing inventory from a
                  single, dependable supplier.
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll variant="fade-up" delay={200}>
                <p>
                  Located at No. 25, 3rd Cross Street, Colombo 11, our central
                  distribution hub allows us to efficiently serve retailers across
                  Sri Lanka. Our dedicated logistics team ensures that orders are
                  processed promptly and delivered reliably, helping our partners
                  maintain well-stocked shelves and satisfied customers.
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll variant="fade-up" delay={250}>
                <p>
                  At BK Clothing Company, we believe that the success of our
                  retail partners is our success. This philosophy drives us to
                  continuously improve our product quality, expand our range, and
                  enhance our service standards to meet the evolving needs of the
                  Sri Lankan clothing market.
                </p>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-gray-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Vision */}
            <AnimateOnScroll variant="fade-up">
              <div className="rounded-lg border bg-white p-8 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-1 w-12 bg-accent-red" />
                  <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-gray-900">
                    Vision
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To set a new benchmark in Sri Lanka's wholesale clothing industry
                  by delivering globally inspired quality with locally trusted
                  service.
                </p>
              </div>
            </AnimateOnScroll>

            {/* Mission */}
            <AnimateOnScroll variant="fade-up" delay={100}>
              <div className="rounded-lg border bg-white p-8 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-1 w-12 bg-accent-red" />
                  <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-gray-900">
                    Mission
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To set a new benchmark in Sri Lanka's wholesale clothing industry
                  by delivering globally inspired quality with locally trusted
                  service.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up" className="mb-14 text-center">
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold tracking-tight text-gray-900">
              What Sets Us Apart
            </h2>
          </AnimateOnScroll>
          <StaggerChildren className="grid gap-8 sm:grid-cols-2" staggerDelay={120}>
            {values.map((value) => (
              <div
                key={value.title}
                className="aos-stagger-child rounded-lg border bg-white p-8 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-red" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up">
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-white sm:text-4xl">
              Partner With Us
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll variant="fade-up" delay={100}>
            <p className="mx-auto mt-4 max-w-xl text-gray-400">
              Join our growing network of retail partners across Sri Lanka. Get
              access to quality wholesale clothing at competitive prices.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll variant="fade-up" delay={200}>
            <a
              href="/contact"
              className="mt-8 inline-flex items-center rounded-md bg-accent-red px-8 py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-red-600"
            >
              Get In Touch
            </a>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
