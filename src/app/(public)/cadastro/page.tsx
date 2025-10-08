

'use client'

import React, { useState } from 'react'
import { Form, Input, Button, Typography, Card, message } from 'antd'
import { UserAddOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography

export default function CadastroPage() {
  const [loading, setLoading] = useState(false)

  const onFinish = (values: any) => {
    setLoading(true)
    console.log('Cadastro:', values)
    setTimeout(() => {
      message.success('Cadastro realizado com sucesso!')
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
          <Title level={3}>Crie sua conta</Title>
          <Paragraph className="text-gray-500">
            Preencha os campos abaixo para se registrar
          </Paragraph>
        </div>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Nome completo"
            name="name"
            rules={[{ required: true, message: 'Informe seu nome' }]}
          >
            <Input prefix={<UserAddOutlined />} placeholder="Seu nome completo" />
          </Form.Item>

          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              { required: true, message: 'Informe seu e-mail' },
              { type: 'email', message: 'E-mail inválido' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="exemplo@email.com" />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[
              { required: true, message: 'Informe uma senha' },
              { min: 6, message: 'A senha deve ter no mínimo 6 caracteres' },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Crie uma senha" />
          </Form.Item>

          <Form.Item
            label="Confirmar senha"
            name="confirm"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Confirme sua senha' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('As senhas não coincidem!'))
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirme sua senha" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full mt-2"
          >
            Cadastrar
          </Button>

          <Paragraph className="text-center text-gray-500 mt-6">
            Já tem conta?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Entrar
            </a>
          </Paragraph>
        </Form>
      </Card>
    </main>
  )
}
