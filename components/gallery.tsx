"use client";

import { useState } from "react";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { GalleryItem } from "@/lib/gallery";
import type { Category } from "@/lib/constants";

interface GalleryProps {
  items: GalleryItem[];
  showFilter?: boolean;
}

export function Gallery({ items, showFilter = true }: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | Category>("all");

  const filtered =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <div>
      {showFilter && (
        <div className="mb-10 flex justify-center">
          <Tabs
            defaultValue="all"
            onValueChange={(val) => setActiveCategory(val as "all" | Category)}
          >
            <TabsList className="bg-gray-100">
              <TabsTrigger value="all" className="text-xs uppercase tracking-wider">
                All
              </TabsTrigger>
              <TabsTrigger value="formal" className="text-xs uppercase tracking-wider">
                Formal
              </TabsTrigger>
              <TabsTrigger value="casual" className="text-xs uppercase tracking-wider">
                Casual
              </TabsTrigger>
              <TabsTrigger value="inners" className="text-xs uppercase tracking-wider">
                Inners
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-sm text-gray-500">
          No products found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-gray-100"
            >
              <Image
                src={item.imageUrl}
                alt={item.title || `${item.category} clothing`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Hover Overlay */}
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
        </div>
      )}
    </div>
  );
}
