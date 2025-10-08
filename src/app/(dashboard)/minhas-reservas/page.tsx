

"use client";

import { Tabs, Empty, Typography } from "antd";

const { Title, Text } = Typography;

export default function MinhasReservasPage() {
  return (
    <div className="p-6">
      {/* Título e subtítulo */}
      <div className="mb-6">
        <Title level={2} className="!mb-1 !text-gray-900">
          Minhas Reservas
        </Title>
        <Text type="secondary">
          Acompanhe e gerencie suas reservas do espaço
        </Text>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <Tabs
          defaultActiveKey="aprovadas"
          items={[
            {
              key: "todas",
              label: "Todas",
              children: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="Nenhuma reserva encontrada"
                />
              ),
            },
            {
              key: "pendentes",
              label: "Pendentes",
              children: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="Nenhuma reserva encontrada"
                />
              ),
            },
            {
              key: "aprovadas",
              label: "Aprovadas",
              children: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="Nenhuma reserva encontrada"
                />
              ),
            },
            {
              key: "rejeitadas",
              label: "Rejeitadas",
              children: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="Nenhuma reserva encontrada"
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
