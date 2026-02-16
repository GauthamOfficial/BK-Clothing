import fs from "fs";
import path from "path";

export interface GalleryItem {
  id: string;
  imageUrl: string;
  category: "formal" | "casual" | "inners";
  title?: string;
}

const GALLERY_PATH = path.join(process.cwd(), "data", "gallery.json");

/**
 * Read gallery items from gallery.json
 * Falls back to empty array if file doesn't exist
 */
export function getGalleryItems(): GalleryItem[] {
  try {
    const data = fs.readFileSync(GALLERY_PATH, "utf-8");
    return JSON.parse(data) as GalleryItem[];
  } catch {
    return [];
  }
}

/**
 * Write gallery items to gallery.json
 * Note: On Vercel serverless, file writes are ephemeral.
 * For production, consider using a database or Vercel KV.
 */
export function saveGalleryItems(items: GalleryItem[]): void {
  const dir = path.dirname(GALLERY_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(GALLERY_PATH, JSON.stringify(items, null, 2), "utf-8");
}

/**
 * Add a new item to the gallery
 */
export function addGalleryItem(
  item: Omit<GalleryItem, "id">
): GalleryItem {
  const items = getGalleryItems();
  const newItem: GalleryItem = {
    ...item,
    id: Date.now().toString(),
  };
  items.push(newItem);
  saveGalleryItems(items);
  return newItem;
}

/**
 * Delete an item from the gallery by ID
 */
export function deleteGalleryItem(id: string): boolean {
  const items = getGalleryItems();
  const filtered = items.filter((item) => item.id !== id);
  if (filtered.length === items.length) return false;
  saveGalleryItems(filtered);
  return true;
}

/**
 * Reorder gallery items by providing an array of item IDs in the desired order
 */
export function reorderGalleryItems(orderedIds: string[]): boolean {
  const items = getGalleryItems();
  
  // Validate that all IDs exist and match the count
  if (orderedIds.length !== items.length) {
    return false;
  }
  
  const existingIds = new Set(items.map((item) => item.id));
  if (!orderedIds.every((id) => existingIds.has(id))) {
    return false;
  }
  
  // Create a map for quick lookup
  const itemMap = new Map(items.map((item) => [item.id, item]));
  
  // Reorder items based on the provided order
  const reorderedItems = orderedIds
    .map((id) => itemMap.get(id))
    .filter((item): item is GalleryItem => item !== undefined);
  
  saveGalleryItems(reorderedItems);
  return true;
}
