export const SITE_NAME = "BK Clothing Company";
export const SITE_TAGLINE = "Manufacturers & Wholesale Dealers in Men's Clothing";
export const SITE_DESCRIPTION =
  "BK Clothing Company - Premium wholesale clothing manufacturer and distributor in Sri Lanka. Specializing in formal wear, casual wear, and innerwear for wholesale buyers.";
export const SITE_URL = "https://bkclothing.lk";

export const CONTACT = {
  phones: [
    { display: "011 233 5727", href: "tel:+94112335727" },
    { display: "076 400 3976", href: "tel:+94764003976" },
    { display: "077 376 7841", href: "tel:+94773767841" },
    { display: "077 600 5053", href: "tel:+94776005053" },
  ],
  email: "bkclothinginfo@gmail.com",
  address: {
    line1: "No.25 3rd Cross Street",
    line2: "Colombo 11",
    line3: "Sri Lanka",
    full: "No.25 3rd Cross Street, Colombo 11, Sri Lanka",
  },
} as const;

export const SOCIAL = {
  instagram:
    "https://www.instagram.com/bkclothingcompany?igsh=M2ozMHh0andkcmln",
  facebook: "https://www.facebook.com/share/1DfaYj4ACF/",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
] as const;

export const CATEGORIES = ["formal", "casual", "inners"] as const;
export type Category = (typeof CATEGORIES)[number];
