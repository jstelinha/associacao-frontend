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
  AuditOutlined,
  IdcardOutlined,
  ApartmentOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import LogoAescam from '@/public/logo-aescam.png' 

const { Sider } = Layout

export function Sidebar() {
  const pathname = usePathname() || '/'

  // === Mapeamento das rotas para a chave do menu ===
  const mapearRotaParaChave = (rota: string) => {
    if (rota.startsWith('/calendario')) return '2'
    if (rota.startsWith('/minhas-reservas')) return '3'
    if (rota.startsWith('/eventos')) return '4'
    if (rota.startsWith('/portal-operacional')) return '5'
    if (rota.startsWith('/financas')) return '6'
    if (rota.startsWith('/gestao-de-usuario')) return '7'
    if (rota.startsWith('/tipos-de-socio')) return '8'
    if (rota.startsWith('/auditoria')) return '9'
    return '1'
  }

  const chaveSelecionada = mapearRotaParaChave(pathname)

  return (
    <Sider
      width={260}
      className="bg-white border border-red-500">
      {/* === Cabeçalho com logo === */}
      <div>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#005A8C] to-[#0B8B4D] flex items-center justify-center shadow-md">
              <Image
                src={LogoAescam}
                alt="Logo AESCAM"
                width={40}
                height={40}
                className="rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-[#005A8C]">AESCAM</h2>
              <p className="text-xs text-gray-500">Campo Mourão</p>
            </div>
          </div>
        </div>

        {/* === Menu de navegação === */}
        <Menu
          mode="inline"
          selectedKeys={[chaveSelecionada]}
          className="border-none mt-2 px-2"
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: <Link href="/">Painel</Link>,
            },
            {
              key: '2',
              icon: <CalendarOutlined />,
              label: <Link href="/calendario">Calendário</Link>,
            },
            {
              key: '3',
              icon: <AppstoreOutlined />,
              label: <Link href="/minhas-reservas">Minhas Reservas</Link>,
            },
            {
              key: '4',
              icon: <UserOutlined />,
              label: <Link href="/eventos">Eventos</Link>,
            },
            {
              key: '5',
              icon: <ApartmentOutlined />,
              label: <Link href="/portal-operacional">Portal Operacional</Link>,
            },
            {
              key: '6',
              icon: <DollarOutlined />,
              label: <Link href="/financas">Finanças</Link>,
            },
            {
              key: '7',
              icon: <TeamOutlined />,
              label: <Link href="/gestao-de-usuario">Gestão de Usuários</Link>,
            },
            {
              key: '8',
              icon: <IdcardOutlined />,
              label: <Link href="/tipos-de-socio">Tipos de Sócio</Link>,
            },
            {
              key: '9',
              icon: <AuditOutlined />,
              label: <Link href="/auditoria">Auditoria</Link>,
            },
          ]}
        />
      </div>

      {/* === Rodapé com informações do usuário === */}
      {/* <div className="p-4 border-t border-gray-200 bg-[#F8FAFC]">
        <div className="flex items-center gap-3 px-2">
          <Avatar
            size={44}
            className="bg-gradient-to-br from-[#0B8B4D] to-[#005A8C] text-white font-semibold"
          >
            U
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium text-[#005A8C]">UserName</p>
            <p className="text-xs text-gray-500">Tipo de usuário</p>
          </div>
          <Button
            type="text"
            icon={<LogoutOutlined />}
            href="/login"
            className="text-gray-500 hover:text-red-600"
          />
        </div> */}
        <div className="mt-3 px-2">
          <Button
            block
            size="small"
            className="rounded-md border-none bg-[#005A8C] text-white hover:bg-[#0B8B4D]"
            href="/perfil"
          >
            Ver perfil
          </Button>
        </div>
      </div>
    </Sider>
  )
}
