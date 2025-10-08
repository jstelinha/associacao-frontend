
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Painel de Login</h1>
      {children}
    </section>
  );
}
