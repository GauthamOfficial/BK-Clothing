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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-lg border bg-white"
              >
                <div className="relative aspect-[4/3] bg-gray-100">
                  <Image
                    src={item.imageUrl}
                    alt={item.title || item.category}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex items-center justify-between p-3">
                  <div>
                    {item.title && (
                      <p className="text-sm font-medium">{item.title}</p>
                    )}
                    <Badge variant="secondary" className="mt-1 text-xs uppercase">
                      {item.category}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(item.id)}
                    className="text-gray-400 hover:text-red-500"
                    aria-label={`Delete ${item.title || item.category} image`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Note */}
      <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
        <strong>Note:</strong> On Vercel serverless deployment, file writes are
        ephemeral. For persistent storage in production, consider using Vercel KV,
        a database, or an external CMS. Changes made here will persist during the
        current deployment lifecycle.
      </div>
    </div>
  );
}
