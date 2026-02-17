import fs from "fs";
import path from "path";

export interface GalleryItem {
  id: string;
  imageUrl: string;
  category: "formal" | "casual" | "inners";
  title?: string;
}

const GALLERY_PATH = path.join(process.cwd(), "data", "gallery.json");
const KV_GALLERY_KEY = "bk-clothing:gallery";

function useKV(): boolean {
  return typeof process.env.KV_REST_API_URL === "string" && process.env.KV_REST_API_URL.length > 0;
}

function useRedisUrl(): boolean {
  return typeof process.env.REDIS_URL === "string" && process.env.REDIS_URL.length > 0;
}

interface RedisClientLike {
  isOpen: boolean;
  connect(): Promise<void>;
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<unknown>;
}

declare global {
  // eslint-disable-next-line no-var
  var __redisClient: RedisClientLike | undefined;
}

/** Get Redis client for REDIS_URL. Reused per process to avoid connection limits. */
async function getRedisClient(): Promise<RedisClientLike> {
  if (globalThis.__redisClient?.isOpen) {
    return globalThis.__redisClient;
  }
  const { createClient } = await import("redis");
  const client = createClient({ url: process.env.REDIS_URL! }) as unknown as RedisClientLike;
  await client.connect();
  globalThis.__redisClient = client;
  return client;
}

/**
 * Read gallery items.
 * Uses Vercel KV when KV_REST_API_URL is set, or Redis when REDIS_URL is set, otherwise file system.
 */
export async function getGalleryItems(): Promise<GalleryItem[]> {
  if (useKV()) {
    try {
      const { kv } = await import("@vercel/kv");
      let data = await kv.get<GalleryItem[]>(KV_GALLERY_KEY);
      if (!Array.isArray(data) || data.length === 0) {
        try {
          const fileData = fs.readFileSync(GALLERY_PATH, "utf-8");
          const parsed = JSON.parse(fileData) as GalleryItem[];
          if (Array.isArray(parsed) && parsed.length > 0) {
            await kv.set(KV_GALLERY_KEY, parsed);
            return parsed;
          }
        } catch {
          // ignore
        }
        return Array.isArray(data) ? data : [];
      }
      return data;
    } catch {
      return [];
    }
  }

  if (useRedisUrl()) {
    try {
      const client = await getRedisClient();
      const raw = await client.get(KV_GALLERY_KEY);
      if (raw === null || raw === undefined) {
        try {
          const fileData = fs.readFileSync(GALLERY_PATH, "utf-8");
          const parsed = JSON.parse(fileData) as GalleryItem[];
          if (Array.isArray(parsed) && parsed.length > 0) {
            await client.set(KV_GALLERY_KEY, JSON.stringify(parsed));
            return parsed;
          }
        } catch {
          // ignore
        }
        return [];
      }
      const data = JSON.parse(raw) as GalleryItem[];
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }

  try {
    const data = fs.readFileSync(GALLERY_PATH, "utf-8");
    return JSON.parse(data) as GalleryItem[];
  } catch {
    return [];
  }
}

/**
 * Write gallery items.
 */
export async function saveGalleryItems(items: GalleryItem[]): Promise<void> {
  if (useKV()) {
    const { kv } = await import("@vercel/kv");
    await kv.set(KV_GALLERY_KEY, items);
    return;
  }

  if (useRedisUrl()) {
    const client = await getRedisClient();
    await client.set(KV_GALLERY_KEY, JSON.stringify(items));
    return;
  }

  const dir = path.dirname(GALLERY_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(GALLERY_PATH, JSON.stringify(items, null, 2), "utf-8");
}

/**
 * Add a new item to the gallery (at the top)
 */
export async function addGalleryItem(
  item: Omit<GalleryItem, "id">
): Promise<GalleryItem> {
  const items = await getGalleryItems();
  const newItem: GalleryItem = {
    ...item,
    id: Date.now().toString(),
  };
  items.unshift(newItem);
  await saveGalleryItems(items);
  return newItem;
}

/**
 * Delete an item from the gallery by ID
 */
export async function deleteGalleryItem(id: string): Promise<boolean> {
  const items = await getGalleryItems();
  const filtered = items.filter((item) => item.id !== id);
  if (filtered.length === items.length) return false;
  await saveGalleryItems(filtered);
  return true;
}

/**
 * Update an existing gallery item by ID
 */
export async function updateGalleryItem(
  id: string,
  updates: Partial<Pick<GalleryItem, "title" | "category">>
): Promise<GalleryItem | null> {
  const items = await getGalleryItems();
  const index = items.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  items[index] = {
    ...items[index],
    ...updates,
  };

  await saveGalleryItems(items);
  return items[index];
}

/**
 * Reorder gallery items by providing an array of item IDs in the desired order
 */
export async function reorderGalleryItems(orderedIds: string[]): Promise<boolean> {
  const items = await getGalleryItems();

  if (orderedIds.length !== items.length) {
    return false;
  }

  const existingIds = new Set(items.map((item) => item.id));
  if (!orderedIds.every((id) => existingIds.has(id))) {
    return false;
  }

  const itemMap = new Map(items.map((item) => [item.id, item]));
  const reorderedItems = orderedIds
    .map((id) => itemMap.get(id))
    .filter((item): item is GalleryItem => item !== undefined);

  await saveGalleryItems(reorderedItems);
  return true;
}
