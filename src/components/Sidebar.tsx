
'use client'

import React from 'react'
import { Layout, Menu, Avatar, Button, Divider } from 'antd'
import {
  CalendarOutlined,
  UserOutlined,
  HomeOutlined,
  DollarOutlined,
  TeamOutlined,
  AppstoreOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const { Sider } = Layout

export function Sidebar() {
  const pathname = usePathname() || '/'
  // mapeia rota para key do menu (simples)
  const mapPathToKey = (p: string) => {
    if (p.startsWith('/calendario')) return '2'
    if (p.startsWith('/minhas-reservas')) return '3'
    if (p.startsWith('/eventos')) return '4'
    if (p.startsWith('/portal-operacional')) return '5'
    if (p.startsWith('/financas')) return '6'
    if (p.startsWith('/gestao-de-membros')) return '7'
    if (p.startsWith('/tipos-de-membro')) return '8'
    if (p.startsWith('/auditoria')) return '9'
    return '1'
  }

  const selectedKey = mapPathToKey(pathname)

  return (
    <Sider width={260} className="bg-white shadow-md min-h-screen flex flex-col justify-between">
      {/* Top: logo / app name */}
      <div>
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow">
              {/* ícone simples */}
              <CalendarOutlined style={{ color: '#081c15', fontSize: 20 }} />
            </div>
            <div>
              <div className="text-lg font-extrabold">SpaceHub</div>
              <div className="text-xs text-gray-400">Gestão de Associação</div>
            </div>
          </div>
        </div>

        <Divider className="my-0" />

        {/* Menu */}
        <Menu mode="inline" selectedKeys={[selectedKey]} className="border-none">
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
            <Link href="/auditoria">Auditoria</Link>
          </Menu.Item>
        </Menu>
      </div>

      {/* Bottom: user area + logout */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-3 px-2">
          <Avatar size={44} style={{ backgroundColor: '#fde68a', color: '#0f172a' }}>
            
          </Avatar>
          <div className="flex-1">
            <div className="text-sm font-medium">UserName</div>
            <div className="text-xs text-gray-400">Tipo de usuário</div>
          </div>
          <div>
            <Button type="text" icon={<LogoutOutlined />} href="/login" />
          </div>
        </div>
        <div className="mt-3 px-2">
          <Button block size="small" className="rounded-md" href="/perfil">
            Ver perfil
          </Button>
        </div>
      </div>
    </Sider>
  )
}

