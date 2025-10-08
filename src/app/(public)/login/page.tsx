

'use client'

import React, { useState } from 'react'
import { Form, Input, Button, Typography, Card, message } from 'antd'
import { LockOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography

export default function LoginPage() {
  const [loading, setLoading] = useState(false)

  const onFinish = (values: any) => {
    setLoading(true)
    console.log('Login:', values)
    // Exemplo: chamada de API
    setTimeout(() => {
      message.success('Login realizado com sucesso!')
      setLoading(false)
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card
        className="w-full max-w-md shadow-xl rounded-2xl"
        bodyStyle={{ padding: '2.5rem' }}
      >
        <div className="text-center mb-6">
          <Title level={3}>Bem-vindo(a)</Title>
          <Paragraph className="text-gray-500">
            Faça login para acessar o sistema
          </Paragraph>
        </div>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Usuário"
            name="username"
            rules={[{ required: true, message: 'Insira seu nome de usuário' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Digite seu usuário" />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[{ required: true, message: 'Insira sua senha' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Digite sua senha" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            icon={<LoginOutlined />}
            loading={loading}
            className="w-full mt-2"
          >
            Entrar
          </Button>

          <Paragraph className="text-center text-gray-500 mt-6">
            Não tem conta?{' '}
            <a href="/cadastro" className="text-blue-600 hover:underline">
              Cadastre-se
            </a>
          </Paragraph>
        </Form>
      </Card>
    </main>
  )
}
