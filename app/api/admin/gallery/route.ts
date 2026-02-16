import { NextResponse } from "next/server";
import {
  getGalleryItems,
  addGalleryItem,
  deleteGalleryItem,
  reorderGalleryItems,
} from "@/lib/gallery";

function isAuthenticated(request: Request): boolean {
  const password = request.headers.get("x-admin-password");
  return password === process.env.ADMIN_PASSWORD;
}

/**
 * GET - Fetch all gallery items (requires auth)
 */
export async function GET(request: Request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = getGalleryItems();
  return NextResponse.json(items);
}

/**
 * POST - Add a new gallery item (requires auth)
 */
export async function POST(request: Request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { imageUrl, category, title } = body;

    if (!imageUrl || !category) {
      return NextResponse.json(
        { error: "imageUrl and category are required" },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(imageUrl);
    } catch {
      return NextResponse.json(
        { error: "Invalid image URL format" },
        { status: 400 }
      );
    }

    // Validate category
    const validCategories = ["formal", "casual", "inners"];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: "Category must be formal, casual, or inners" },
        { status: 400 }
      );
    }

    const newItem = addGalleryItem({
      imageUrl,
      category,
      title: title || undefined,
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Remove a gallery item by ID (requires auth)
 */
export async function DELETE(request: Request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Item ID is required" },
        { status: 400 }
      );
    }

    const deleted = deleteGalleryItem(id);
    if (!deleted) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PUT - Reorder gallery items (requires auth)
 */
export async function PUT(request: Request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { orderedIds } = body;

    if (!Array.isArray(orderedIds)) {
      return NextResponse.json(
        { error: "orderedIds must be an array" },
        { status: 400 }
      );
    }

    if (orderedIds.length === 0) {
      return NextResponse.json(
        { error: "orderedIds cannot be empty" },
        { status: 400 }
      );
    }

    const success = reorderGalleryItems(orderedIds);
    if (!success) {
      return NextResponse.json(
        { error: "Invalid order or IDs do not match existing items" },
        { status: 400 }
      );
    }

    const items = getGalleryItems();
    return NextResponse.json({ success: true, items });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
