
"use client";
import { Layout, Menu } from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  HomeOutlined,
  DollarOutlined,
  TeamOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const { Sider } = Layout;

export function Sidebar() {
  return (
    <Sider width={230} className="bg-white shadow-md min-h-screen">
      <div className="p-4 text-xl font-bold text-center">SpaceHub</div>
      <Menu mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link href="/">Painel</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<CalendarOutlined />}>
          <Link href="/calendario">Calendário</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<AppstoreOutlined />}>
          <Link href="/minhas-reservas">Minhas Reservas</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />}>
          <Link href="/eventos">Eventos</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<UserOutlined />}>
          <Link href="/portal-operacional">Portal Operacional</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<DollarOutlined />}>
          <Link href="/financas">Finanças</Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<TeamOutlined />}>
          <Link href="/gestao-de-membros">Gestão de Membros</Link>
        </Menu.Item>
        <Menu.Item key="8" icon={<UserOutlined />}>
          <Link href="/tipos-de-membro">Tipos de Membro</Link>
        </Menu.Item>
        <Menu.Item key="9" icon={<UserOutlined />}>
          <Link href="/auditoria"> Auditoria </Link>
        </Menu.Item>
      </Menu>
    </Sider>

    
  );
}
