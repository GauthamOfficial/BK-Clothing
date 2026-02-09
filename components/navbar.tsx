"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { NAV_LINKS, SOCIAL, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBg = scrolled || !isHome
    ? "bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-sm"
    : "bg-transparent";

  const textColor = scrolled || !isHome ? "text-black" : "text-white";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        navBg
      )}
      role="banner"
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "text-xl font-bold tracking-wider transition-colors",
            textColor
          )}
          aria-label={`${SITE_NAME} - Home`}
        >
          BK<span className="text-accent-red">.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium tracking-wide uppercase transition-colors hover:text-accent-red",
                textColor,
                pathname === link.href && "text-accent-red"
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* Social Icons */}
          <div className="flex items-center gap-3 border-l border-current/20 pl-6">
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
              className={cn(
                "transition-colors hover:text-accent-red",
                textColor
              )}
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Facebook"
              className={cn(
                "transition-colors hover:text-accent-red",
                textColor
              )}
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn("md:hidden", textColor)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-white p-0">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex h-full flex-col">
              {/* Mobile Logo */}
              <div className="flex h-16 items-center border-b px-6">
                <span className="text-xl font-bold tracking-wider">
                  BK<span className="text-accent-red">.</span>
                </span>
              </div>

              {/* Mobile Links */}
              <nav className="flex-1 space-y-1 px-4 py-6" aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-lg px-4 py-3 text-sm font-medium tracking-wide uppercase transition-colors hover:bg-gray-50",
                      pathname === link.href
                        ? "bg-gray-50 text-accent-red"
                        : "text-gray-900"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Social */}
              <div className="border-t px-6 py-4">
                <div className="flex items-center gap-4">
                  <a
                    href={SOCIAL.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on Instagram"
                    className="text-gray-600 transition-colors hover:text-accent-red"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href={SOCIAL.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on Facebook"
                    className="text-gray-600 transition-colors hover:text-accent-red"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
