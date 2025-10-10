"use client";

import React, { useMemo, useState } from "react";

type Reservation = {
  id: string;
  purpose: string;
  date: string; // ISO
  start_time: string;
  end_time: string;
  amount: number;
  discount_applied?: number;
  is_free_rental?: boolean;
  status: "approved" | "pending" | "rejected" | "cancelled";
  is_paid?: boolean;
  paid_date?: string;
  receipt_url?: string;
  notes?: string;
};

const MOCK_RESERVATIONS: Reservation[] = [
  {
    id: "r1",
    purpose: "Reunião Diretoria",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
    start_time: "14:00",
    end_time: "16:00",
    amount: 250,
    discount_applied: 10,
    is_free_rental: false,
    status: "approved",
    is_paid: false,
    notes: "Projetor e microfone serão usados.",
  },
  {
    id: "r2",
    purpose: "Treinamento Equipe",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    start_time: "09:00",
    end_time: "12:00",
    amount: 0,
    is_free_rental: true,
    status: "approved",
    is_paid: true,
    paid_date: new Date().toISOString(),
  },
  {
    id: "r3",
    purpose: "Workshop UX",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    start_time: "10:00",
    end_time: "17:00",
    amount: 500,
    is_free_rental: false,
    status: "pending",
    is_paid: false,
  },
  {
    id: "r4",
    purpose: "Evento Externo",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString(),
    start_time: "18:00",
    end_time: "22:00",
    amount: 1200,
    is_free_rental: false,
    status: "rejected",
    is_paid: false,
    notes: "Pendente aprovação do regulamento",
  },
];

export default function MinhasReservasPage() {
  const [reservations, setReservations] = useState<Reservation[]>(MOCK_RESERVATIONS);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [uploading, setUploading] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (activeTab === "all") return reservations;
    return reservations.filter((r) => r.status === activeTab);
  }, [reservations, activeTab]);

  const formatFullDate = (iso: string) =>
    new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

  const formatShortDate = (iso: string) =>
    new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });

  const getStatusColor = (status: Reservation["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-50 text-green-800 border-green-200";
      case "pending":
        return "bg-orange-50 text-orange-800 border-orange-200";
      case "rejected":
        return "bg-red-50 text-red-800 border-red-200";
      default:
        return "bg-gray-50 text-gray-800 border-gray-200";
    }
  };

  const getStatusLabel = (status: Reservation["status"]) => {
    switch (status) {
      case "approved":
        return "Aprovada";
      case "pending":
        return "Pendente";
      case "rejected":
        return "Rejeitada";
      default:
        return "Cancelada";
    }
  };

  const handleFileSelect = (reservationId: string, file?: File) => {
    if (!file) return;
    setUploading(reservationId);

    // Simula upload
    setTimeout(() => {
      const objectUrl = URL.createObjectURL(file);
      setReservations((prev) =>
        prev.map((r) =>
          r.id === reservationId
            ? { ...r, is_paid: true, paid_date: new Date().toISOString(), receipt_url: objectUrl }
            : r
        )
      );
      setUploading(null);
    }, 1400);
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1a2332] mb-2">Minhas Reservas</h1>
        <p className="text-gray-500">Acompanhe e gerencie suas reservas do espaço</p>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-md ${activeTab === "all" ? "bg-gray-100 font-medium" : "text-gray-600"}`}
          >
            Todas
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-4 py-2 rounded-md ${activeTab === "pending" ? "bg-gray-100 font-medium" : "text-gray-600"}`}
          >
            Pendentes
          </button>
          <button
            onClick={() => setActiveTab("approved")}
            className={`px-4 py-2 rounded-md ${activeTab === "approved" ? "bg-gray-100 font-medium" : "text-gray-600"}`}
          >
            Aprovadas
          </button>
          <button
            onClick={() => setActiveTab("rejected")}
            className={`px-4 py-2 rounded-md ${activeTab === "rejected" ? "bg-gray-100 font-medium" : "text-gray-600"}`}
          >
            Rejeitadas
          </button>
        </div>

        {/* Content */}
        <div className="mt-6">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              <svg width="56" height="56" viewBox="0 0 24 24" className="mx-auto mb-4 text-gray-300">
                <path fill="currentColor" d="M12 3v18M3 12h18" />
              </svg>
              <div>Nenhuma reserva encontrada</div>
            </div>
          ) : (
            <div className="grid gap-4">
              {filtered.map((res) => (
                <div key={res.id} className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xl font-bold text-[#1a2332]">{res.purpose}</div>
                      <div className="text-gray-500 mt-1">{formatFullDate(res.date)}</div>
                    </div>

                    <div className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(res.status)} whitespace-nowrap`}>
                      {getStatusLabel(res.status)}
                    </div>
                  </div>

                  <div className="mt-4 grid md:grid-cols-2 gap-4 text-gray-700">
                    <div className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" className="text-gray-400">
                        <path fill="currentColor" d="M12 7v5l3 3" />
                      </svg>
                      <span>{res.start_time} - {res.end_time}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" className="text-gray-400">
                        <path fill="currentColor" d="M12 1v22" />
                      </svg>
                      <span>
                        {res.is_free_rental ? (
                          <span className="text-green-600 font-medium">GRÁTIS</span>
                        ) : (
                          <>
                            R$ {res.amount.toLocaleString("pt-BR")}
                            {res.discount_applied ? (
                              <span className="text-sm text-gray-500 ml-2">({res.discount_applied}% de desconto)</span>
                            ) : null}
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  {res.notes && (
                    <div className="mt-4 bg-gray-50 rounded-md p-3 text-sm text-gray-700">
                      {res.notes}
                    </div>
                  )}

                  {/* Payment section */}
                  {res.status === "approved" && !res.is_free_rental && (
                    <div className="mt-4 border-t pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-700">Status de Pagamento</div>
                          {res.is_paid ? (
                            <div className="flex items-center gap-2 mt-1 text-sm text-green-600">
                              <svg width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M20 6L9 17l-5-5"/></svg>
                              Pago em {res.paid_date ? formatShortDate(res.paid_date) : "--"}
                            </div>
                          ) : (
                            <div className="text-sm text-orange-600">Pagamento pendente</div>
                          )}
                        </div>

                        {!res.is_paid && (
                          <div>
                            <input
                              id={`file-${res.id}`}
                              type="file"
                              accept=".jpg,.jpeg,.png,.pdf"
                              className="hidden"
                              onChange={(e) => handleFileChange(e, res.id)}
                            />
                            <label
                              htmlFor={`file-${res.id}`}
                              className={`inline-flex items-center gap-2 px-3 py-2 border rounded-md cursor-pointer select-none ${uploading === res.id ? "opacity-60 pointer-events-none" : ""}`}
                            >
                              {uploading === res.id ? (
                                <>
                                  <svg width="14" height="14" viewBox="0 0 24 24" className="animate-spin"><path fill="currentColor" d="M12 2v4"/></svg>
                                  Enviando...
                                </>
                              ) : (
                                <>
                                  <svg width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3v12"/></svg>
                                  Enviar Comprovante
                                </>
                              )}
                            </label>
                          </div>
                        )}
                      </div>

                      {res.receipt_url && (
                        <a
                          href={res.receipt_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline mt-2"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M4 4h16v16H4z"/></svg>
                          Ver Comprovante
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* helper: handle file change (defined after mapping to keep code compact) */}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // --- local helper (kept here so outside return it's available) ---
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>, reservationId: string) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(reservationId);

    // simulate upload delay and update reservation
    setTimeout(() => {
      const url = URL.createObjectURL(file);
      setReservations((prev) =>
        prev.map((r) => (r.id === reservationId ? { ...r, is_paid: true, paid_date: new Date().toISOString(), receipt_url: url } : r))
      );
      setUploading(null);
    }, 1400);
  }
}
