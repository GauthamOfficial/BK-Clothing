import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { CONTACT } from "@/lib/constants";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact BK Clothing Company for wholesale clothing inquiries. Located at Colombo 11, Sri Lanka.",
};

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-black pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-page-header mx-auto max-w-3xl text-center">
            <div className="mb-6 mx-auto h-px w-16 bg-accent-red" />
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-white/60">
              Get in touch for wholesale inquiries and partnerships
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Contact Info */}
            <AnimateOnScroll variant="fade-right">
              <h2 className="text-2xl font-bold text-gray-900">
                Get In Touch
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                We&apos;d love to hear from you. Whether you&apos;re a retailer
                looking for wholesale partnerships or have questions about our
                products, reach out to us.
              </p>

              <div className="mt-10 space-y-8">
                {/* Phone Numbers */}
                <AnimateOnScroll variant="fade-up" delay={100}>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
                      <Phone className="h-4 w-4 text-accent-red" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        Phone
                      </h3>
                      <div className="mt-2 space-y-1">
                        {CONTACT.phones.map((phone) => (
                          <a
                            key={phone.href}
                            href={phone.href}
                            className="block text-sm text-gray-600 transition-colors hover:text-accent-red"
                          >
                            {phone.display}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>

                {/* Email */}
                <AnimateOnScroll variant="fade-up" delay={200}>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
                      <Mail className="h-4 w-4 text-accent-red" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        Email
                      </h3>
                      <a
                        href={`mailto:${CONTACT.email}`}
                        className="mt-2 block text-sm text-gray-600 transition-colors hover:text-accent-red"
                      >
                        {CONTACT.email}
                      </a>
                    </div>
                  </div>
                </AnimateOnScroll>

                {/* Address */}
                <AnimateOnScroll variant="fade-up" delay={300}>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
                      <MapPin className="h-4 w-4 text-accent-red" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        Address
                      </h3>
                      <p className="mt-2 text-sm text-gray-600">
                        {CONTACT.address.line1}
                        <br />
                        {CONTACT.address.line2}
                        <br />
                        {CONTACT.address.line3}
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>

                {/* Hours */}
                <AnimateOnScroll variant="fade-up" delay={400}>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
                      <Clock className="h-4 w-4 text-accent-red" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        Business Hours
                      </h3>
                      <p className="mt-2 text-sm text-gray-600">
                        Monday - Saturday: 8:30 AM - 5:30 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>
              </div>
            </AnimateOnScroll>

            {/* Form */}
            <AnimateOnScroll variant="fade-left" delay={150}>
              <div className="relative">
                <div className="rounded-lg border bg-white p-6 shadow-sm sm:p-8">
                  <h2 className="mb-6 text-xl font-bold text-gray-900">
                    Send Us a Message
                  </h2>
                  <ContactForm />
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
