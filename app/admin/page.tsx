import type { Metadata } from "next";
import { AdminForm } from "@/components/admin-form";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <section className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <AdminForm />
      </div>
    </section>
  );
}
