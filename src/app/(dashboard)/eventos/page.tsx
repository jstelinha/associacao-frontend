

// app/eventos/page.tsx
'use client'

import React from 'react'
import 'antd/dist/reset.css' // (pode ser importado globalmente)
import { Card, Empty } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'
import { Typography } from 'antd'

const { Title, Paragraph } = Typography

export default function EventosPage() {
  // Exemplo: se no futuro buscar eventos, substitua por fetch/axios e useState/useEffect
  const events: any[] = [] // vazio para mostrar o estado "Nenhum evento agendado"

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="p-6 md:p-8 space-y-6">
        {/* Header */}
        <header className="mb-8">
          <Title level={2} className="!text-3xl !mb-1">
            Eventos
          </Title>
          <Paragraph className="text-gray-500 !mb-0">
            Descubra e inscreva-se nos próximos eventos
          </Paragraph>
        </header>

        {/* Conteúdo principal */}
        <section>
          {events.length === 0 ? (
            // Card grande vazio, centralizado, com sombra e ícone
            <div className="w-full">
              <Card
                bordered={false}
                className="rounded-2xl shadow-lg"
                style={{ background: 'white' }}
                bodyStyle={{ padding: '3.5rem' }}
              >
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="text-gray-300">
                    <CalendarOutlined style={{ fontSize: 56 }} />
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500 text-lg">Nenhum evento agendado</p>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            // Caso haja eventos: grade de cards (exemplo)
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((ev, i) => (
                <Card
                  key={i}
                  hoverable
                  className="rounded-xl shadow-md"
                  bodyStyle={{ padding: '1rem' }}
                >
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">{ev.title}</h3>
                    <p className="text-sm text-gray-500 mt-2">{ev.date}</p>
                    <p className="mt-4 text-gray-700 text-sm line-clamp-3">{ev.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
