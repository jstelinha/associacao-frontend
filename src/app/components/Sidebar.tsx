"use client";

import {
  AppstoreOutlined,
  AuditOutlined,
  CalendarOutlined,
  DollarOutlined,
  HomeOutlined,
  IdcardOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UserOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Layout, Menu } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

import LogoAescam from "@/public/logo-aescam.png";

const { Sider } = Layout;

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname() || "/";

  const mapearRotaParaChave = (rota: string) => {
    if (rota.startsWith("/calendario")) return "2";
    if (rota.startsWith("/minhas-reservas")) return "3";
    if (rota.startsWith("/eventos")) return "4";
    if (rota.startsWith("/portal-operacional")) return "5";
    if (rota.startsWith("/financas")) return "6";
    if (rota.startsWith("/gestao-de-usuario")) return "7";
    if (rota.startsWith("/tipos-de-socio")) return "8";
    if (rota.startsWith("/auditoria")) return "9";
    return "1";
  };

  const chaveSelecionada = mapearRotaParaChave(pathname);

  return (
    <Sider
      width={260}
      collapsible
      collapsed={collapsed}
      theme="light"
      trigger={null}
      style={{
        height: "100vh",
        position: "fixed",
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        zIndex: 50,
        overflow: "auto",
      }}
    >

      {/* === Cabeçalho === */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Image
            src={LogoAescam}
            alt="Logo AESCAM"
            width={collapsed ? 32 : 48}
            height={collapsed ? 32 : 48}
          />
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold text-[#005A8C] uppercase">
                aescam
              </h2>
              <p className="text-sm text-gray-500 -mt-1">Campo Mourão</p>
            </div>
          )}
        </div>

        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>

      {/* === Menu === */}
      <Menu
        mode="inline"
        selectedKeys={[chaveSelecionada]}
        style={{ borderInlineEnd: "none", marginTop: "8px" }}
        items={[
          {
            key: "1",
            icon: <HomeOutlined />,
            label: <Link href="/">Painel</Link>,
          },
          {
            key: "2",
            icon: <CalendarOutlined />,
            label: <Link href="/calendario">Calendário</Link>,
          },
          {
            key: "3",
            icon: <AppstoreOutlined />,
            label: <Link href="/minhas-reservas">Minhas Reservas</Link>,
          },
          {
            key: "4",
            icon: <AppstoreOutlined />,
            label: <Link href="/eventos">Eventos</Link>,
          },
          {
            key: "5",
            icon: <ApartmentOutlined />,
            label: "Operacional",
            children: [
              {
                key: "5-1",
                label: <Link href="/portal-operacional">Portal Operacional</Link>,
              },
              {
                key: "5-2",
                label: <Link href="/gestao-de-usuario">Gestão de Usuário</Link>,
              },
              {
                key: "5-3",
                label: <Link href="/tipos-de-socio">Tipos de Sócio</Link>,
              },
              {
                key: "5-4",
                label: <Link href="/auditoria">Auditoria</Link>,
              },
              
            ],
          },
          {
            key: "6",
            icon: <DollarOutlined />,
            label: "Financeiro",
            children: [
              {
                key: "6-1",
                label: <Link href="financas">Financas</Link>,
              },
            ],
          },
        ]}
      />

      {/* === Rodapé com usuário === */}
      <div className="absolute bottom-0 w-full border-t border-gray-100 px-4 py-4">
        <div className="flex items-center gap-3">
          <Avatar
            size={collapsed ? 36 : 44}
            className="bg-gradient-to-br from-[#0B8B4D] to-[#005A8C] text-white font-semibold"
          >
            U
          </Avatar>
          {!collapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium text-[#005A8C]">UserName</p>
              <p className="text-xs text-gray-500">Tipo de usuário</p>
            </div>
          )}
          <Button
            type="text"
            icon={<LogoutOutlined />}
            href="/login"
            className="text-gray-500 hover:text-red-600"
          />
        </div>
      </div>
    </Sider>
  );
}
