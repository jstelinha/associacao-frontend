"use client";

import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./components/Sidebar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const { Header, Content } = Layout;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [siderWidth, setSiderWidth] = useState<number>(260);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // tenta obter sider(s) periodicamente até existir no DOM
    let retryTimer: number | undefined;
    const tryFind = () => {
      const leftFixed = findLeftFixedElements();
      if (leftFixed.length > 0) {
        // já encontrou: observa alterações
        observeCandidates(leftFixed, setSiderWidth);
      } else {
        // tenta novamente
        retryTimer = window.setTimeout(tryFind, 100);
      }
    };
    tryFind();

    return () => {
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, []);

  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Layout style={{ minHeight: "100vh" }}>
          {/* renderiza sidebar existente */}
          <Sidebar />

          {/* Conteúdo principal deslocado pela largura detectada */}
          <Layout
            style={{
              marginLeft: siderWidth,
              transition: "margin-left 180ms ease",
              minHeight: "100vh",
            }}
          >
            <Header
              style={{
                height: 64,
                display: "flex",
                alignItems: "center",
                padding: "0 24px",
                background: "#fff",
                borderBottom: "1px solid rgba(0,0,0,0.04)",
                position: "sticky",
                top: 0,
                zIndex: 20,
              }}
            >
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0 }}>Bem-vindo ao Dashboard!</h3>
              </div>
            </Header>

            <Content style={{ padding: 24, minHeight: "calc(100vh - 64px)", background: "#fafafa" }}>
              {children}
            </Content>
          </Layout>
        </Layout>
      </body>
    </html>
  );
}

/** Retorna elementos posicionados fixed (ou sticky) à esquerda da viewport.
 * Prioriza elementos com a classe .ant-layout-sider.
 */
function findLeftFixedElements(): HTMLElement[] {
  const all = Array.from(document.querySelectorAll<HTMLElement>("body *"));
  // candidates: elementos com position fixed/sticky (sticky pode aparecer) e que estejam grudados à esquerda (left ≈ 0)
  const candidates = all.filter((el) => {
    const style = window.getComputedStyle(el);
    if (!style) return false;
    const pos = style.position;
    if (pos !== "fixed" && pos !== "sticky") return false;
    const rect = el.getBoundingClientRect();
    // considerar elementos visíveis e à esquerda (small tolerance)
    return rect.width > 0 && rect.left >= -2 && rect.left <= 4;
  });

  // primeiro tenta retornar elementos ant-layout-sider (caso exista)
  const antSiders = candidates.filter((c) => c.classList.contains("ant-layout-sider"));
  if (antSiders.length > 0) return antSiders;

  // caso contrário, retorna os candidatos fixos à esquerda encontrados
  return candidates;
}

/**
 * Observa os candidates (arrays de elementos) e atualiza o setSiderWidth sempre que um mudar de largura.
 * Se houver mais de um candidate, escolhe o maior width (o que realmente está "por cima").
 */
function observeCandidates(candidates: HTMLElement[], setSiderWidth: (w: number) => void) {
  // função para recalcular a largura a partir dos elementos candidatos
  const update = () => {
    const widths = candidates.map((el) => {
      const r = el.getBoundingClientRect();
      return Math.round(r.width || 0);
    });
    // se algum width for 0, tenta recapturar elementos (podem ter sido trocados)
    const maxWidth = widths.length ? Math.max(...widths) : 0;
    if (maxWidth > 0) setSiderWidth(maxWidth);
  };

  update();

  // Observe cada candidate com ResizeObserver quando disponível
  const observers: ResizeObserver[] = [];
  try {
    for (const el of candidates) {
      const ro = new ResizeObserver(() => {
        update();
      });
      ro.observe(el);
      observers.push(ro);
    }
  } catch (e) {
    // ResizeObserver pode não estar disponível; fallback para window resize
  }

  // MutationObserver: se classes mudarem (ex.: collapsed), atualiza
  const mos: MutationObserver[] = [];
  for (const el of candidates) {
    const mo = new MutationObserver((mutations) => {
      update();
    });
    mo.observe(el, { attributes: true, attributeFilter: ["class", "style"] });
    mos.push(mo);
  }

  // window resize como fallback
  const onWinResize = () => update();
  window.addEventListener("resize", onWinResize);

  // Retorna cleanup
  return () => {
    observers.forEach((o) => o.disconnect());
    mos.forEach((m) => m.disconnect());
    window.removeEventListener("resize", onWinResize);
  };
}
