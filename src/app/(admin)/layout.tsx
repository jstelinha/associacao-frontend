"use client";

import { Layout } from "antd";
import type React from "react";
import { Sidebar } from "@/components/Sidebar";

const { Content } = Layout;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar />
      <Layout className="bg-gray-50">
        <Content className="py-6">
          {/* Centraliza e limita largura do conteúdo — ajusta para ficar igual ao mock */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
