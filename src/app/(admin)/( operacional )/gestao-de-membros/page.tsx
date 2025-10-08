'use client'

import React, { useState } from 'react'
import { Card, Input, Typography, Row, Col, Empty, Button } from 'antd'
import { SearchOutlined, TeamOutlined } from '@ant-design/icons'
import Link from 'next/link'

const { Title, Paragraph } = Typography
const { Search } = Input

export default function GestaoDeMembrosPage() {
  // Protótipo: lista vazia por enquanto
  const [query, setQuery] = useState('')
  const membros: any[] = [] // futuramente substituir por fetch()
  const usuariosExternos: any[] = []

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <header className="mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#7787ad] text-white flex items-center justify-center">
                  <TeamOutlined />
                </div>
                <div>
                  <Title level={2} className="!mb-1 !text-2xl">Gestão de Membros</Title>
                  <Paragraph className="text-gray-500 !mb-0">Gerencie membros e converta usuários externos</Paragraph>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Search bar (grande card) */}
        <Card className="rounded-2xl shadow-lg mb-6" bodyStyle={{ padding: '1rem 1.25rem' }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <SearchOutlined style={{ fontSize: 20, color: '#6b7280' }} />
              <div>
                <div className="font-semibold">Buscar Usuários</div>
              </div>
            </div>

            <div className="w-full sm:w-1/3">
              <Search
                placeholder="Buscar por nome ou email..."
                onSearch={(v) => setQuery(v)}
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                enterButton
                size="middle"
                allowClear
              />
            </div>
          </div>
        </Card>

        {/* Painéis */}
        <Row gutter={[20, 20]}>
          <Col xs={24} lg={12}>
            <Card className="rounded-xl shadow-md min-h-[160px]">
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-semibold">Membros ( {membros.length} )</div>
                {/* futuramente filtros / botão */}
              </div>

              {membros.length === 0 ? (
                <div className="py-8">
                  <Empty description="Nenhum membro cadastrado" />
                </div>
              ) : (
                <div className="space-y-3">
                  {/* map membros */}
                </div>
              )}
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card className="rounded-xl shadow-md min-h-[160px]">
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-semibold">Usuários Externos ( {usuariosExternos.length} )</div>
                <div>
                  <Button size="small">Importar</Button>
                </div>
              </div>

              {usuariosExternos.length === 0 ? (
                <div className="py-8">
                  <Empty description="Nenhum usuário externo" />
                </div>
              ) : (
                <div className="space-y-3">
                  {/* map externos */}
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </main>
  )
}
