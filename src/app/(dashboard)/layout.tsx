// app/(dashboard)/dashboard/layout.tsx

"use client";

import { Layout } from "antd";

const { Content } = Layout;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar à esquerda */}

      {/* Conteúdo principal à direita */}
      <Layout className="bg-gray-50">
        <Content className="p-6">{children}</Content>
      </Layout>
    </Layout>
  );
}
