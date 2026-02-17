"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Lock,
  Plus,
  Trash2,
  Loader2,
  LogOut,
  ImageIcon,
  GripVertical,
  Edit2,
  Check,
  X,
} from "lucide-react";
import type { GalleryItem } from "@/lib/gallery";

const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

const addImageSchema = z.object({
  imageUrl: z.string().url("Please enter a valid URL"),
  title: z.string().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;
type AddImageFormData = z.infer<typeof addImageSchema>;

export function AdminForm() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [category, setCategory] = useState<string>("formal");
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState<string>("formal");
  const [updating, setUpdating] = useState(false);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const addForm = useForm<AddImageFormData>({
    resolver: zodResolver(addImageSchema),
    defaultValues: { imageUrl: "", title: "" },
  });

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/gallery", {
        headers: { "x-admin-password": password },
      });
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch {
      // Silently fail
    }
  }, [password]);

  useEffect(() => {
    if (authenticated) {
      fetchItems();
    }
  }, [authenticated, fetchItems]);

  const handleLogin = async (data: LoginFormData) => {
    setLoginError("");
    try {
      const res = await fetch("/api/admin/gallery", {
        headers: { "x-admin-password": data.password },
      });
      if (res.ok) {
        setPassword(data.password);
        setAuthenticated(true);
        const items = await res.json();
        setItems(items);
      } else {
        setLoginError("Invalid password");
      }
    } catch {
      setLoginError("Something went wrong");
    }
  };

  const handleAdd = async (data: AddImageFormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({
          imageUrl: data.imageUrl,
          category,
          title: data.title || undefined,
        }),
      });
      if (res.ok) {
        addForm.reset();
        setCategory("formal");
        await fetchItems();
      }
    } catch {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch("/api/admin/gallery", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ id }),
      });
      await fetchItems();
    } catch {
      // Handle error
    }
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", id);
    // Add a slight delay to allow drag image to be set
    setTimeout(() => {
      if (e.target instanceof HTMLElement) {
        e.target.style.opacity = "0.5";
      }
    }, 0);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (e.target instanceof HTMLElement) {
      e.target.style.opacity = "1";
    }
    setDraggedId(null);
    setDragOverId(null);
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (draggedId && draggedId !== id) {
      setDragOverId(id);
    }
  };

  const handleDragLeave = () => {
    setDragOverId(null);
  };

  const handleDrop = async (e: React.DragEvent, dropId: string) => {
    e.preventDefault();
    setDragOverId(null);

    if (!draggedId || draggedId === dropId) {
      setDraggedId(null);
      return;
    }

    const draggedIndex = items.findIndex((item) => item.id === draggedId);
    const dropIndex = items.findIndex((item) => item.id === dropId);

    if (draggedIndex === -1 || dropIndex === -1) {
      setDraggedId(null);
      return;
    }

    // Create new array with reordered items
    const newItems = [...items];
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);

    // Update local state immediately for better UX
    setItems(newItems);
    setDraggedId(null);

    // Send reorder request to server
    try {
      const orderedIds = newItems.map((item) => item.id);
      const res = await fetch("/api/admin/gallery", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ orderedIds }),
      });

      if (!res.ok) {
        // Revert on error
        await fetchItems();
      }
    } catch {
      // Revert on error
      await fetchItems();
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setEditTitle(item.title || "");
    setEditCategory(item.category);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditCategory("formal");
  };

  const handleSaveEdit = async (id: string) => {
    setUpdating(true);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({
          id,
          title: editTitle.trim() || undefined,
          category: editCategory,
        }),
      });

      if (res.ok) {
        await fetchItems();
        handleCancelEdit();
      }
    } catch {
      // Handle error
    } finally {
      setUpdating(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="mx-auto max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <Lock className="h-6 w-6 text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold">Admin Access</h1>
          <p className="mt-2 text-sm text-gray-500">
            Enter password to manage gallery
          </p>
        </div>

        <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter admin password"
              {...loginForm.register("password")}
            />
            {loginForm.formState.errors.password && (
              <p className="text-xs text-red-500">
                {loginForm.formState.errors.password.message}
              </p>
            )}
            {loginError && (
              <p className="text-xs text-red-500">{loginError}</p>
            )}
          </div>
          <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
            <Lock className="mr-2 h-4 w-4" />
            Login
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gallery Manager</h1>
          <p className="text-sm text-gray-500">
            Add or remove images from the product gallery
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setAuthenticated(false);
            setPassword("");
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      {/* Add Image Form */}
      <div className="rounded-lg border bg-gray-50 p-6">
        <h2 className="mb-4 text-lg font-semibold">Add New Image</h2>
        <form onSubmit={addForm.handleSubmit(handleAdd)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL *</Label>
              <Input
                id="imageUrl"
                placeholder="https://example.com/image.jpg"
                {...addForm.register("imageUrl")}
              />
              {addForm.formState.errors.imageUrl && (
                <p className="text-xs text-red-500">
                  {addForm.formState.errors.imageUrl.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title (optional)</Label>
              <Input
                id="title"
                placeholder="Product name"
                {...addForm.register("title")}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Category *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="inners">Inners</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="bg-accent-red text-white hover:bg-red-600"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            Add Image
          </Button>
        </form>
      </div>

      {/* Existing Items */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">
          Gallery Items ({items.length})
        </h2>
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12 text-center">
            <ImageIcon className="mb-3 h-10 w-10 text-gray-300" />
            <p className="text-sm text-gray-500">No gallery items yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                draggable={editingId !== item.id}
                onDragStart={(e) => editingId !== item.id && handleDragStart(e, item.id)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => editingId !== item.id && handleDragOver(e, item.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => editingId !== item.id && handleDrop(e, item.id)}
                className={`group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all ${
                  editingId === item.id
                    ? "border-accent-red border-2"
                    : draggedId === item.id
                    ? "opacity-50 cursor-grabbing"
                    : dragOverId === item.id
                    ? "border-accent-red border-2 scale-105 shadow-lg"
                    : "hover:shadow-md cursor-grab"
                }`}
              >
                {editingId === item.id ? (
                  /* Edit Mode */
                  <div className="p-4 space-y-4">
                    {/* Image Preview */}
                    <div className="relative aspect-[4/5] bg-gray-100 rounded overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={item.title || item.category}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    {/* Edit Form */}
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor={`edit-title-${item.id}`} className="text-xs">
                          Product Name
                        </Label>
                        <Input
                          id={`edit-title-${item.id}`}
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          placeholder="Product name (optional)"
                          className="text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`edit-category-${item.id}`} className="text-xs">
                          Category
                        </Label>
                        <Select value={editCategory} onValueChange={setEditCategory}>
                          <SelectTrigger className="w-full text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="formal">Formal</SelectItem>
                            <SelectItem value="casual">Casual</SelectItem>
                            <SelectItem value="inners">Inners</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          onClick={() => handleSaveEdit(item.id)}
                          disabled={updating}
                          className="flex-1 bg-accent-red text-white hover:bg-red-600"
                        >
                          {updating ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Check className="h-3 w-3" />
                          )}
                          <span className="ml-1 text-xs">Save</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancelEdit}
                          disabled={updating}
                          className="flex-1"
                        >
                          <X className="h-3 w-3" />
                          <span className="ml-1 text-xs">Cancel</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Display Mode */
                  <>
                    {/* Drag Handle */}
                    <div className="absolute left-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                      <GripVertical className="h-4 w-4 text-white" />
                    </div>

                    {/* Image */}
                    <div className="relative aspect-[4/5] bg-gray-100">
                      <Image
                        src={item.imageUrl}
                        alt={item.title || item.category}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    {/* Info Overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-8">
                      {item.title && (
                        <p className="text-sm font-medium text-white line-clamp-1">
                          {item.title}
                        </p>
                      )}
                      <Badge
                        variant="secondary"
                        className="mt-1.5 text-xs uppercase bg-white/20 text-white border-white/30"
                      >
                        {item.category}
                      </Badge>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute right-2 top-2 z-10 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(item);
                        }}
                        className="h-8 w-8 bg-black/50 text-white hover:bg-blue-600 hover:text-white"
                        aria-label={`Edit ${item.title || item.category}`}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                        className="h-8 w-8 bg-black/50 text-white hover:bg-red-600 hover:text-white"
                        aria-label={`Delete ${item.title || item.category} image`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Note */}
      <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
        <strong>Production:</strong> Set <code className="rounded bg-amber-100 px-1">REDIS_URL</code> (Redis connection string) or Vercel KV env vars so gallery changes persist.
      </div>
    </div>
  );
}
