import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";
import { TikTok, WhatsApp } from "@/components/icons";
import { NAV_LINKS, CONTACT, SOCIAL, SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t bg-black text-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/footer-logo.png"
                alt={SITE_NAME}
                width={60}
                height={72}
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Premium wholesale clothing manufacturer and distributor. Delivering
              quality formal, casual, and innerwear across Sri Lanka.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-accent-red"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={CONTACT.phones[0].href}
                  className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-accent-red"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  {CONTACT.phones[0].display}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-accent-red"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>
                  {CONTACT.address.line1}
                  <br />
                  {CONTACT.address.line2}
                  <br />
                  {CONTACT.address.line3}
                </span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Follow Us
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-all hover:border-accent-red hover:text-accent-red"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-all hover:border-accent-red hover:text-accent-red"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on TikTok"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-all hover:border-accent-red hover:text-accent-red"
              >
                <TikTok className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-all hover:border-accent-red hover:text-accent-red"
              >
                <WhatsApp className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-4">
              <Image
                src="/bk-qr.jpeg"
                alt="BK Clothing QR Code"
                width={120}
                height={120}
                className="h-24 w-24 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p className="text-xs text-gray-500">
            &copy; 2021 {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
