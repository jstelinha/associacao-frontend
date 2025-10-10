"use client";

import React, { useMemo, useState } from "react";

type AuditItem = {
  id: string;
  action_type: string;
  description: string;
  user_name: string;
  user_email?: string;
  created_date: string;
  entity_type?: string;
  metadata?: Record<string, any>;
};

const MOCK_LOGS: AuditItem[] = [
  {
    id: "1",
    action_type: "expense_paid",
    description: "Marcou como paga a despesa de Impostos no valor de R$ 7000000000.00",
    user_name: "Julia",
    user_email: "exemploo@gmail.com",
    created_date: new Date().toISOString(),
    entity_type: "Expense",
    metadata: {
      Categoria: "Impostos",
      Valor: "R$ 7000000000.00",
      "Data de Pagamento": "08/10/2025",
    },
  },
  {
    id: "2",
    action_type: "expense_created",
    description: "Criou uma despesa de Impostos no valor de R$ 7000000000.00",
    user_name: "Julia",
    user_email: "exemploo@gmail.com",
    created_date: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    entity_type: "Expense",
    metadata: {
      Categoria: "Impostos",
      Valor: "R$ 7000000000.00",
    },
  },
];

export default function AuditoriaPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const logs = MOCK_LOGS;

  const filtered = useMemo(() => {
    return logs.filter((l) => {
      if (filter !== "all" && l.action_type !== filter) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        l.user_name.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        (l.user_email || "").toLowerCase().includes(q)
      );
    });
  }, [logs, search, filter]);

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
    } catch {
      return iso;
    }
  };

  const actionLabel = (t: string) => {
    const map: Record<string, string> = {
      user_registered: "Cadastro",
      user_converted_to_member: "Conversão para Membro",
      reservation_created: "Reserva Criada",
      reservation_approved: "Reserva Aprovada",
      payment_made: "Pagamento",
      expense_created: "Despesa Criada",
      expense_paid: "Despesa Paga",
    };
    return map[t] || t;
  };

  const actionColor = (t: string) => {
    if (t.includes("created")) return "bg-blue-50 text-blue-700 border border-blue-100";
    if (t.includes("paid") || t.includes("made") || t.includes("approved")) return "bg-green-50 text-green-700 border border-green-100";
    if (t.includes("rejected")) return "bg-red-50 text-red-700 border border-red-100";
    return "bg-gray-50 text-gray-700 border border-gray-100";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1a2332] to-[#0f1419] flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" className="text-yellow-300">
            <path fill="currentColor" d="M12 3v18M3 12h18" />
          </svg>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#1a2332]">Auditoria do Sistema</h1>
          <p className="text-gray-500">Acompanhe todas as ações realizadas no sistema</p>
        </div>
      </div>

      {/* Search / Filter */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <input
              placeholder="Buscar por usuário ou ação..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M21 21l-4.35-4.35M10.5 18A7.5 7.5 0 1 1 18 10.5 7.508 7.508 0 0 1 10.5 18z" /></svg>
            </div>
          </div>

          <div className="w-full md:w-64">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full py-3 px-3 border rounded-md bg-white"
            >
              <option value="all">Todas as Ações</option>
              <option value="user_registered">Cadastros</option>
              <option value="user_converted_to_member">Conversões para Membro</option>
              <option value="reservation_created">Reservas Criadas</option>
              <option value="payment_made">Pagamentos</option>
              <option value="expense_created">Despesas Criadas</option>
              <option value="expense_paid">Despesas Pagas</option>
              <option value="event_created">Eventos Criados</option>
            </select>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center text-gray-400">
            <div className="mb-4">
              <svg width="48" height="48" viewBox="0 0 24 24" className="mx-auto text-gray-300"><path fill="currentColor" d="M12 3v18M3 12h18" /></svg>
            </div>
            <div>Nenhum registro de auditoria encontrado</div>
          </div>
        ) : (
          filtered.map((log) => (
            <div key={log.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex gap-4 items-start">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${actionColor(log.action_type)}`}>
                  <div className="text-sm font-semibold">{log.action_type[0]?.toUpperCase()}</div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="font-medium text-[#1a2332]">{log.description}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        por <span className="font-medium">{log.user_name}</span>
                        {log.user_email && <span className="text-gray-400"> ({log.user_email})</span>}
                      </div>
                    </div>

                    <div className={`text-xs px-3 py-1 rounded-full ${actionColor(log.action_type)} whitespace-nowrap ml-2`}>
                      {actionLabel(log.action_type)}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-400 mt-2">
                    <span>{formatDate(log.created_date)}</span>
                    {log.entity_type && <span className="flex items-center gap-1">• {log.entity_type}</span>}
                  </div>

                  {log.metadata && Object.keys(log.metadata).length > 0 && (
                    <div className="mt-3 bg-gray-50 rounded-md p-3">
                      <div className="text-xs font-semibold text-gray-600 mb-1">DETALHES</div>
                      <div className="space-y-1 text-sm text-gray-700">
                        {Object.entries(log.metadata).map(([k, v]) => (
                          <div key={k}><span className="font-medium">{k}:</span> {String(v)}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer summary */}
      {filtered.length > 0 && (
        <div className="bg-gradient-to-br from-[#1a2332] to-[#0f1419] text-white rounded-lg p-6 shadow">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-sm opacity-80 mb-1">Total de Registros</div>
              <div className="text-3xl font-bold text-[#d4af37]">{logs.length}</div>
            </div>
            <div>
              <div className="text-sm opacity-80 mb-1">Filtrados</div>
              <div className="text-3xl font-bold text-[#d4af37]">{filtered.length}</div>
            </div>
            <div>
              <div className="text-sm opacity-80 mb-1">Últimas 24h</div>
              <div className="text-3xl font-bold text-[#d4af37]">
                {logs.filter((l) => new Date(l.created_date) > new Date(Date.now() - 24 * 3600 * 1000)).length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
