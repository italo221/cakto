"use client";

import { useEffect } from "react";

/* ================================================================
   CAKTO SENTINEL — Compliance em ESCALA (TV 42")
   Projetado para CENTENAS de clientes em risco simultâneos:
   · Matriz de risco (scatter MED × CB) — carteira inteira de uma vez
   · Funil de severidade com contadores e deltas do dia
   · Fila priorizada por EXPOSIÇÃO com paginação automática
   · Esteira de bloqueios ao vivo

   Integração (via console ou wiring futuro):
   window.CaktoSentinel.setPortfolio({tpv30d, med, cb, pre, disputes, winRate, queue, sla})
   window.CaktoSentinel.setMerchants([{id, name, tpv, med, cb}])
   window.CaktoSentinel.blockMerchant(id, {auto:true})
   window.CaktoSentinel.pushEvent({type, text})
   ================================================================ */

type Merchant = {
  id: number;
  name: string;
  tpv: number;
  med: number;
  cb: number;
  blocked: boolean;
  blockFade: number;
};

type SentinelMerchant = {
  id: number;
  name: string;
  tpv: number;
  med: number;
  cb: number;
  blocked?: boolean;
  blockFade?: number;
};

type SentinelAPI = {
  setPortfolio: (d: Record<string, unknown>) => void;
  setMerchants: (list: SentinelMerchant[]) => void;
  blockMerchant: (id: number, opts?: { auto?: boolean }) => void;
  pushEvent: (e: { type: string; text: string }) => void;
};

declare global {
  interface Window {
    CaktoSentinel?: SentinelAPI;
  }
}

export default function SentinelPage() {
  useEffect(() => {
    let alive = true;
    const intervals: number[] = [];
    const timeouts: number[] = [];
    const iv = (fn: () => void, ms: number) => {
      const id = window.setInterval(() => {
        if (alive) fn();
      }, ms);
      intervals.push(id);
      return id;
    };
    const to = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        if (alive) fn();
      }, ms);
      timeouts.push(id);
      return id;
    };
    const $ = (id: string) => document.getElementById(id) as HTMLElement;
    const root = document.querySelector(".sentinel") as HTMLElement;

    const LIMITS = { med: 0.5, cb: 0.9, pre: 1.2 };
    const fmtPct = (v: number) => v.toFixed(2).replace(".", ",");
    const fmtBRL = (v: number) => {
      if (v >= 1e9) return "R$ " + (v / 1e9).toFixed(2).replace(".", ",") + " bi";
      if (v >= 1e6) return "R$ " + (v / 1e6).toFixed(1).replace(".", ",") + " mi";
      if (v >= 1e3) return "R$ " + (v / 1e3).toFixed(0) + " mil";
      return "R$ " + Math.round(v).toLocaleString("pt-BR");
    };

    /* ---------- carteira demo (centenas de sellers) ---------- */
    const PREFIX = ["Curso", "Mentoria", "Academia", "Protocolo", "Método", "Studio", "Clube", "Fórmula", "Imersão", "Comunidade", "Jornada", "Escola"];
    const CORE = ["Trader", "Fitness", "Inglês", "Dropshipping", "Confeitaria", "Lash", "Marketing", "Renda Extra", "Concursos", "Emagrecimento", "Crypto", "Vendas", "Fotografia", "Costura", "Barber", "Imóveis", "Música", "Yoga", "Excel", "Design"];
    const SUF = ["Pro", "Turbo", "Alpha", "Prime", "Expert", "Master", "360", "VIP", "Elite", "Black", "Express", "Lab"];
    const genName = (i: number) =>
      PREFIX[i % PREFIX.length] + " " + CORE[(i * 7) % CORE.length] + " " + SUF[(i * 13) % SUF.length];

    let merchants: Merchant[] = [];
    (function genPortfolio() {
      const N = 620;
      for (let i = 0; i < N; i++) {
        const r = Math.random();
        let med: number, cb: number;
        if (r < 0.7) {
          med = Math.random() * 0.28;
          cb = Math.random() * 0.5;
        } else if (r < 0.9) {
          med = 0.3 + Math.random() * 0.2;
          cb = 0.54 + Math.random() * 0.36;
        } else {
          med = 0.5 + Math.random() * 1.3;
          cb = 0.9 + Math.random() * 1.6;
        }
        merchants.push({
          id: i,
          name: genName(i),
          tpv: 60_000 + Math.pow(Math.random(), 2.2) * 8_000_000,
          med,
          cb,
          blocked: false,
          blockFade: 0,
        });
      }
    })();

    const P = {
      tpv30d: 184_500_000,
      med: 0.34,
      cb: 0.61,
      pre: 0.84,
      prev: { med: 0.31, cb: 0.58, pre: 0.88 } as Record<"med" | "cb" | "pre", number>,
      disputes: 312,
      winRate: 46.8,
      queue: 23,
      sla: "3h12",
      blockedAuto30d: 61,
      blockedManual30d: 35,
      blockedToday: 0,
      deltaToday: { warn: 9, crit: 4 },
    };

    /* ---------- classificação ---------- */
    function sevOf(m: Merchant) {
      if (m.blocked) return "blk";
      if (m.med >= LIMITS.med || m.cb >= LIMITS.cb) return "crit";
      if (m.med >= LIMITS.med * 0.6 || m.cb >= LIMITS.cb * 0.6) return "warn";
      return "ok";
    }
    const exposure = (m: Merchant) => {
      const exc = Math.max(m.med / LIMITS.med, m.cb / LIMITS.cb);
      return m.tpv * Math.max(0, exc - 0.6);
    };
    const level = (v: number, lim: number) => {
      const r = v / lim;
      return r >= 0.9 ? "crit-c" : r >= 0.6 ? "warn-c" : "ok";
    };

    /* ---------- funil / contadores ---------- */
    function counts() {
      const c: Record<string, number> = { ok: 0, warn: 0, crit: 0, blk: 0 };
      for (const m of merchants) c[sevOf(m)]++;
      return c;
    }
    function renderFunnel() {
      const c = counts();
      const active = merchants.length - c.blk;
      $("f-total").textContent = active.toLocaleString("pt-BR") + " SELLERS ATIVOS";
      $("n-ok").textContent = c.ok.toLocaleString("pt-BR");
      $("n-warn").textContent = String(c.warn);
      $("n-crit").textContent = String(c.crit);
      $("n-block").textContent = (P.blockedAuto30d + P.blockedManual30d).toLocaleString("pt-BR");
      $("block-desc").textContent = `${P.blockedToday} hoje · ${P.blockedAuto30d} automáticos`;
      $("d-ok").textContent = "base ativa";
      const dw = $("d-warn");
      dw.textContent = "+" + P.deltaToday.warn + " hoje";
      dw.className = "f-delta " + (P.deltaToday.warn > 0 ? "bad" : "neutral");
      const dc = $("d-crit");
      dc.textContent = "+" + P.deltaToday.crit + " hoje";
      dc.className = "f-delta " + (P.deltaToday.crit > 0 ? "bad" : "neutral");
      $("d-block").textContent = "+" + P.blockedToday + " hoje";

      $("ff-queue").textContent = String(P.queue);
      $("ff-sla").textContent = P.sla;
      $("ff-disputes").textContent = P.disputes.toLocaleString("pt-BR");
      $("ff-win").textContent = fmtPct(P.winRate) + "%";

      const exp = merchants
        .filter((m) => !m.blocked && sevOf(m) === "crit")
        .reduce((a, m) => a + m.tpv, 0);
      $("kpi-exp").textContent = fmtBRL(exp);
      $("kpi-tpv").textContent = fmtBRL(P.tpv30d);

      $("c-crit").textContent = String(c.crit);
      $("c-warn").textContent = String(c.warn);
      $("c-blk").textContent = String(P.blockedToday);
      $("mx-count").textContent = active.toLocaleString("pt-BR") + " CLIENTES";
    }

    /* ---------- métricas de carteira ---------- */
    function renderMetric(
      key: "med" | "cb" | "pre",
      valEl: string,
      fillEl: string,
      deltaEl: string,
      cardEl: string
    ) {
      const cur = P[key],
        prev = P.prev[key],
        lim = LIMITS[key];
      const lv = level(cur, lim);
      const v = $(valEl);
      v.innerHTML = fmtPct(cur) + "<small>%</small>";
      v.className = "m-val " + lv;
      const f = $(fillEl);
      f.style.width = Math.min(100, (cur / lim) * 90) + "%";
      f.className = "fill " + lv;
      const d = $(deltaEl);
      const diff = cur - prev;
      d.textContent = (diff >= 0 ? "▲ +" : "▼ ") + fmtPct(Math.abs(diff)) + " pp";
      d.className = "m-delta " + (diff >= 0 ? "up" : "down");
      $(cardEl).className =
        "metric" + (lv === "crit-c" ? " crit" : lv === "warn-c" ? " warn" : "");
    }

    /* ---------- MATRIZ DE RISCO ---------- */
    const mx = $("matrix") as HTMLCanvasElement;
    const mctx = mx.getContext("2d")!;
    let MW = 0,
      MH = 0;
    const X_MAX = 2.6,
      Y_MAX = 2.0;

    function mxResize() {
      const r = mx.parentElement!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      MW = r.width;
      MH = r.height;
      mx.width = MW * dpr;
      mx.height = MH * dpr;
      mctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    window.addEventListener("resize", mxResize);
    mxResize();

    const PADL = 52,
      PADB = 34,
      PADT = 16,
      PADR = 18;
    const mxX = (v: number) => PADL + (Math.min(v, X_MAX) / X_MAX) * (MW - PADL - PADR);
    const mxY = (v: number) => MH - PADB - (Math.min(v, Y_MAX) / Y_MAX) * (MH - PADB - PADT);

    function drawMatrix(now: number) {
      mctx.clearRect(0, 0, MW, MH);
      const breathe = 0.5 + 0.5 * Math.sin(now / 1600);

      // zona vermelha = além de qualquer limite
      mctx.fillStyle = "rgba(255,86,48,.045)";
      mctx.fillRect(mxX(LIMITS.cb), PADT, MW - PADR - mxX(LIMITS.cb), MH - PADB - PADT);
      mctx.fillRect(PADL, PADT, MW - PADL - PADR, mxY(LIMITS.med) - PADT);

      // grid
      mctx.strokeStyle = "#15202B";
      mctx.lineWidth = 1;
      mctx.font = "600 9.5px JetBrains Mono";
      mctx.fillStyle = "#46586A";
      for (let gx = 0; gx <= X_MAX + 0.01; gx += 0.5) {
        const x = mxX(gx);
        mctx.beginPath();
        mctx.moveTo(x, PADT);
        mctx.lineTo(x, MH - PADB);
        mctx.stroke();
        mctx.fillText(fmtPct(gx) + "%", x - 12, MH - PADB + 16);
      }
      for (let gy = 0; gy <= Y_MAX + 0.01; gy += 0.5) {
        const y = mxY(gy);
        mctx.beginPath();
        mctx.moveTo(PADL, y);
        mctx.lineTo(MW - PADR, y);
        mctx.stroke();
        mctx.fillText(fmtPct(gy) + "%", 8, y + 3);
      }
      mctx.fillStyle = "#5C6B78";
      mctx.font = "700 10px Inter";
      mctx.fillText("CHARGEBACK % →", MW - PADR - 118, MH - 8);
      mctx.save();
      mctx.translate(14, PADT + 74);
      mctx.rotate(-Math.PI / 2);
      mctx.fillText("MED % →", 0, 0);
      mctx.restore();

      // linhas de limite
      mctx.setLineDash([5, 5]);
      mctx.lineWidth = 1.4;
      mctx.strokeStyle = "rgba(255,86,48,.7)";
      const lx = mxX(LIMITS.cb);
      mctx.beginPath();
      mctx.moveTo(lx, PADT);
      mctx.lineTo(lx, MH - PADB);
      mctx.stroke();
      const ly = mxY(LIMITS.med);
      mctx.beginPath();
      mctx.moveTo(PADL, ly);
      mctx.lineTo(MW - PADR, ly);
      mctx.stroke();
      mctx.setLineDash([]);
      mctx.fillStyle = "rgba(255,86,48,.85)";
      mctx.font = "700 9px JetBrains Mono";
      mctx.fillText("VAMP 0,90%", lx + 5, PADT + 12);
      mctx.fillText("MED 0,50%", MW - PADR - 66, ly - 6);

      // bolhas (uma por cliente)
      for (const m of merchants) {
        const x = mxX(m.cb),
          y = mxY(m.med);
        const r = 2 + Math.sqrt(m.tpv) / 720;
        if (m.blocked) {
          if (m.blockFade < 1) m.blockFade = Math.min(1, m.blockFade + 0.004);
          const a = 0.55 * (1 - m.blockFade * 0.7);
          mctx.strokeStyle = `rgba(110,128,145,${a})`;
          mctx.lineWidth = 1.6;
          const s = Math.max(3, r * 0.8);
          mctx.beginPath();
          mctx.moveTo(x - s, y - s);
          mctx.lineTo(x + s, y + s);
          mctx.moveTo(x + s, y - s);
          mctx.lineTo(x - s, y + s);
          mctx.stroke();
          continue;
        }
        const sev = sevOf(m);
        if (sev === "crit") {
          mctx.fillStyle = `rgba(255,86,48,${0.55 + breathe * 0.25})`;
          mctx.shadowColor = "#FF5630";
          mctx.shadowBlur = 7;
        } else if (sev === "warn") {
          mctx.fillStyle = "rgba(255,171,0,.6)";
          mctx.shadowBlur = 0;
        } else {
          mctx.fillStyle = "rgba(46,140,106,.42)";
          mctx.shadowBlur = 0;
        }
        mctx.beginPath();
        mctx.arc(x, y, r, 0, 6.2832);
        mctx.fill();
        mctx.shadowBlur = 0;
      }
    }

    /* ---------- FILA PRIORIZADA com paginação automática ---------- */
    const PAGE_SIZE = 9,
      PAGE_MS = 8000;
    let pageIdx = 0,
      queueList: Merchant[] = [];
    const wlist = $("wlist");

    function buildQueue() {
      queueList = merchants
        .filter((m) => !m.blocked && sevOf(m) !== "ok")
        .sort((a, b) => exposure(b) - exposure(a));
    }
    const initials = (n: string) =>
      n
        .split(" ")
        .filter((w) => w.length > 2)
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase();

    function renderPage(animate: boolean) {
      const pages = Math.max(1, Math.ceil(queueList.length / PAGE_SIZE));
      pageIdx = ((pageIdx % pages) + pages) % pages;
      const slice = queueList.slice(pageIdx * PAGE_SIZE, (pageIdx + 1) * PAGE_SIZE);

      const page = document.createElement("div");
      page.className = "w-page" + (animate ? " in" : "");
      slice.forEach((m, i) => {
        const sev = sevOf(m);
        const row = document.createElement("div");
        row.className = "w-row";
        row.dataset.mid = String(m.id);
        row.innerHTML = `
      <span class="w-rank">${String(pageIdx * PAGE_SIZE + i + 1).padStart(2, "0")}</span>
      <span class="w-av">${initials(m.name)}</span>
      <div class="w-info">
        <div class="w-name">${m.name}</div>
        <div class="w-tpv">TPV ${fmtBRL(m.tpv)} · exposição ${fmtBRL(exposure(m))}</div>
      </div>
      <div class="w-rates">
        <div class="w-rate"><div class="rv ${level(m.med, LIMITS.med)}">${fmtPct(m.med)}%</div><div class="rl">MED</div></div>
        <div class="w-rate"><div class="rv ${level(m.cb, LIMITS.cb)}">${fmtPct(m.cb)}%</div><div class="rl">CB</div></div>
      </div>
      <span class="w-status ${sev === "crit" ? "crit" : "mon"}">${sev === "crit" ? "Bloquear" : "Monitorar"}</span>`;
        page.appendChild(row);
      });

      const old = wlist.querySelector(".w-page:not(.out)");
      if (old) {
        old.classList.add("out");
        to(() => old.remove(), 500);
      }
      wlist.appendChild(page);
      requestAnimationFrame(() => page.classList.remove("in"));

      const dots = $("q-dots");
      dots.innerHTML = "";
      const maxDots = Math.min(pages, 12);
      for (let i = 0; i < maxDots; i++) {
        const d = document.createElement("span");
        d.className = "q-dot" + (i === pageIdx % maxDots ? " on" : "");
        dots.appendChild(d);
      }
      $("q-info").textContent = `${pageIdx * PAGE_SIZE + 1}–${Math.min(
        (pageIdx + 1) * PAGE_SIZE,
        queueList.length
      )} de ${queueList.length}`;
      $("q-tag").textContent = queueList.length + " EM FILA";
    }
    iv(() => {
      pageIdx++;
      renderPage(true);
    }, PAGE_MS);

    /* ---------- header / alarme de carteira ---------- */
    const METRIC_LABELS: Record<string, string> = { med: "MED", cb: "CHARGEBACK", pre: "PRÉ-CB" };
    function renderHeader() {
      const cur = { med: P.med, cb: P.cb, pre: P.pre };
      const keys = Object.keys(cur) as Array<"med" | "cb" | "pre">;
      const lvs = keys.map((k) => level(cur[k], LIMITS[k]));
      const breached = keys.filter((k) => cur[k] >= LIMITS[k]);
      const h = $("health"),
        t = $("health-txt");
      if (breached.length) {
        h.className = "health crit";
        t.textContent = "🚨 Limite de carteira excedido";
      } else if (lvs.includes("crit-c")) {
        h.className = "health crit";
        t.textContent = "Atenção crítica";
      } else if (lvs.includes("warn-c")) {
        h.className = "health warn";
        t.textContent = "Em observação";
      } else {
        h.className = "health ok";
        t.textContent = "Operação saudável";
      }

      if (breached.length) {
        $("alarm-detail").innerHTML = breached
          .map((k) => `${METRIC_LABELS[k]} <b>${fmtPct(cur[k])}%</b> / limite ${fmtPct(LIMITS[k])}%`)
          .join(" &nbsp;·&nbsp; ");
        if (!root.classList.contains("breach")) {
          root.classList.add("breach");
          breached.forEach((k) =>
            pushEvent({
              type: "cb",
              text: `🚨 LIMITE DE CARTEIRA · ${METRIC_LABELS[k]} <b>${fmtPct(cur[k])}%</b> (teto ${fmtPct(LIMITS[k])}%)`,
            })
          );
        }
      } else root.classList.remove("breach");
    }

    /* ---------- feed ---------- */
    const feedEl = $("feed");
    const feedItems: string[] = [];
    function pushEvent(e: { type: string; text: string }) {
      const t = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
      feedItems.unshift(
        `<span class="f-item ${e.type}"><span class="f-time">${t}</span>${e.text}</span>`
      );
      if (feedItems.length > 12) feedItems.pop();
      const html = feedItems.join("");
      feedEl.innerHTML = html + html;
    }

    /* ---------- BLOQUEIO ---------- */
    function blockMerchant(id: number, { auto = true }: { auto?: boolean } = {}) {
      const m = merchants.find((x) => x.id === id);
      if (!m || m.blocked) return;
      m.blocked = true;
      m.blockFade = 0;
      P.blockedToday++;
      if (auto) P.blockedAuto30d++;
      else P.blockedManual30d++;
      pushEvent({
        type: "blk",
        text: `⛔ Cliente bloqueado ${auto ? "(automático)" : "(manual)"} · <b>${m.name}</b> · CB ${fmtPct(m.cb)}%`,
      });
      const row = wlist.querySelector(`.w-row[data-mid="${id}"]`);
      if (row) row.classList.add("blocked-anim");
      buildQueue();
      renderFunnel();
      to(() => renderPage(false), row ? 950 : 0);
    }

    /* ---------- relógio ---------- */
    function tickClock() {
      const n = new Date();
      $("clock-time").textContent = n.toLocaleTimeString("pt-BR");
      $("clock-date").textContent = n.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
      });
    }
    iv(tickClock, 1000);
    tickClock();

    /* ---------- API pública ---------- */
    window.CaktoSentinel = {
      setPortfolio(d) {
        Object.assign(P, d);
        renderAll();
      },
      setMerchants(list) {
        merchants = list.map((m) => ({
          ...m,
          blocked: m.blocked ?? false,
          blockFade: m.blockFade ?? 0,
        }));
        buildQueue();
        renderAll();
        renderPage(false);
      },
      blockMerchant,
      pushEvent,
    };

    /* ---------- render geral + loop ---------- */
    function renderAll() {
      renderFunnel();
      renderMetric("med", "v-med", "f-med", "d-med", "card-med");
      renderMetric("cb", "v-cb", "f-cb", "d-cb", "card-cb");
      renderMetric("pre", "v-pre", "f-pre", "d-pre", "card-pre");
      renderHeader();
    }
    let raf = 0;
    function loop(now: number) {
      if (!alive) return;
      drawMatrix(now);
      raf = requestAnimationFrame(loop);
    }

    /* ================================================================
       SIMULAÇÃO — remover em produção (trocar por dados reais)
       ================================================================ */
    const FEED_TPL: Array<[string, string]> = [
      ["med", "MED recebido · {m} · <b>R$ {v}</b>"],
      ["cb", "Chargeback aberto · {m} · <b>R$ {v}</b>"],
      ["pre", "Alerta pré-CB (Ethoca) · {m} · <b>R$ {v}</b>"],
      ["res", "Disputa vencida · {m} · <b>+R$ {v}</b>"],
    ];
    function simEvent() {
      const risky = merchants.filter((m) => !m.blocked && sevOf(m) !== "ok");
      if (risky.length) {
        const m = risky[Math.floor(Math.random() * risky.length)];
        const [type, tpl] = FEED_TPL[Math.floor(Math.random() * FEED_TPL.length)];
        pushEvent({
          type,
          text: tpl.replace("{m}", m.name).replace("{v}", (50 + Math.random() * 900).toFixed(0)),
        });
        m.cb = Math.max(0.05, m.cb + (Math.random() - 0.42) * 0.06);
        m.med = Math.max(0.02, m.med + (Math.random() - 0.42) * 0.04);
      }
      to(simEvent, 2200 + Math.random() * 3000);
    }
    // esteira de bloqueios: a cada 7–14s o crítico de maior exposição é bloqueado
    function simBlock() {
      const crits = merchants
        .filter((m) => !m.blocked && sevOf(m) === "crit")
        .sort((a, b) => exposure(b) - exposure(a));
      if (crits.length) blockMerchant(crits[0].id, { auto: Math.random() < 0.8 });
      to(simBlock, 7000 + Math.random() * 7000);
    }
    // novos sellers entram em risco (repõe a fila)
    function simNewRisk() {
      const healthy = merchants.filter((m) => !m.blocked && sevOf(m) === "ok");
      if (healthy.length) {
        const m = healthy[Math.floor(Math.random() * healthy.length)];
        m.cb = LIMITS.cb * (0.7 + Math.random() * 0.6);
        m.med = LIMITS.med * (0.5 + Math.random() * 0.7);
        P.deltaToday.warn++;
        if (sevOf(m) === "crit") P.deltaToday.crit++;
        buildQueue();
        renderFunnel();
      }
      to(simNewRisk, 9000 + Math.random() * 8000);
    }
    // deriva das métricas de carteira
    function simPortfolio() {
      P.med = Math.max(0.1, P.med + (Math.random() - 0.48) * 0.02);
      P.cb = Math.max(0.2, P.cb + (Math.random() - 0.48) * 0.03);
      P.pre = Math.max(0.3, P.pre + (Math.random() - 0.48) * 0.04);
      P.disputes = Math.max(50, P.disputes + Math.floor((Math.random() - 0.45) * 6));
      renderAll();
      to(simPortfolio, 8000);
    }
    // DEMO do alarme: estoura CB de carteira ~25s após abrir, normaliza em 12s
    function demoBreach() {
      const orig = P.cb;
      P.cb = LIMITS.cb + 0.03 + Math.random() * 0.06;
      renderAll();
      to(() => {
        P.cb = Math.min(orig, LIMITS.cb * 0.92);
        renderAll();
      }, 12000);
      to(demoBreach, 60000);
    }

    /* ---------- boot ---------- */
    buildQueue();
    renderAll();
    renderPage(false);
    raf = requestAnimationFrame(loop);
    simEvent();
    simBlock();
    simNewRisk();
    simPortfolio();
    to(demoBreach, 25000);

    return () => {
      alive = false;
      intervals.forEach((id) => clearInterval(id));
      timeouts.forEach((id) => clearTimeout(id));
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", mxResize);
      delete window.CaktoSentinel;
    };
  }, []);

  return (
    <div className="sentinel">
      <header>
        <div className="brand">
          <div className="brand-mark">
            <span>C</span>
          </div>
          <div>
            <h1>
              Cakto <b>Sentinel</b>
            </h1>
            <div className="sub">Compliance &amp; Risco · Carteira completa · 30 dias</div>
          </div>
        </div>
        <div className="health ok" id="health">
          <i />
          <span id="health-txt">Operação saudável</span>
        </div>
        <div className="h-kpis">
          <div className="kpi">
            <div className="label">TPV · 30 dias</div>
            <div className="value" id="kpi-tpv">
              —
            </div>
          </div>
          <div className="kpi">
            <div className="label">Exposição em risco</div>
            <div className="value" id="kpi-exp" style={{ color: "var(--amber)" }}>
              —
            </div>
          </div>
          <div className="clock">
            <div id="clock-time">--:--:--</div>
            <div className="date" id="clock-date"></div>
          </div>
        </div>
      </header>

      <main>
        {/* FUNIL DE SEVERIDADE */}
        <section className="card funnel">
          <div className="card-h">
            <span className="t">Carteira por severidade</span>
            <span className="tag" id="f-total">
              —
            </span>
          </div>
          <div className="f-body">
            <div className="f-step s-ok">
              <div className="bar-v"></div>
              <div className="f-num" id="n-ok">
                —
              </div>
              <div className="f-info">
                <div className="f-name">Saudáveis</div>
                <div className="f-desc">abaixo de 60% dos limites</div>
              </div>
              <div className="f-delta neutral" id="d-ok">
                —
              </div>
            </div>
            <div className="f-step s-warn">
              <div className="bar-v"></div>
              <div className="f-num" id="n-warn">
                —
              </div>
              <div className="f-info">
                <div className="f-name">Em observação</div>
                <div className="f-desc">entre 60% e 100% do limite</div>
              </div>
              <div className="f-delta" id="d-warn">
                —
              </div>
            </div>
            <div className="f-step s-crit hot">
              <div className="bar-v"></div>
              <div className="f-num" id="n-crit">
                —
              </div>
              <div className="f-info">
                <div className="f-name">Acima do limite</div>
                <div className="f-desc">MED ou CB estourado · ação imediata</div>
              </div>
              <div className="f-delta" id="d-crit">
                —
              </div>
            </div>
            <div className="f-step s-block">
              <div className="bar-v"></div>
              <div className="f-num" id="n-block">
                —
              </div>
              <div className="f-info">
                <div className="f-name">Bloqueados · 30d</div>
                <div className="f-desc" id="block-desc">
                  — hoje · — automáticos
                </div>
              </div>
              <div className="f-delta neutral" id="d-block">
                —
              </div>
            </div>
          </div>
          <div className="f-foot">
            <div className="ff">
              <div className="v red" id="ff-queue">
                —
              </div>
              <div className="l">Fila revisão manual</div>
            </div>
            <div className="ff">
              <div className="v cyan" id="ff-sla">
                —
              </div>
              <div className="l">SLA médio da fila</div>
            </div>
            <div className="ff">
              <div className="v" id="ff-disputes">
                —
              </div>
              <div className="l">Disputas abertas</div>
            </div>
            <div className="ff">
              <div className="v" id="ff-win">
                —
              </div>
              <div className="l">Win rate disputas</div>
            </div>
          </div>
        </section>

        {/* MÉTRICAS DE CARTEIRA + MATRIZ */}
        <section className="center">
          <div className="metrics">
            <div className="metric" id="card-med">
              <div className="m-top">
                <div className="m-name">MED % · carteira</div>
                <div className="m-delta" id="d-med">
                  —
                </div>
              </div>
              <div className="m-val" id="v-med">
                —
              </div>
              <div className="limit">
                <div className="lt">
                  <span>limite interno</span>
                  <b>0,50%</b>
                </div>
                <div className="track">
                  <div className="fill" id="f-med"></div>
                  <div className="th"></div>
                </div>
              </div>
            </div>
            <div className="metric" id="card-cb">
              <div className="m-top">
                <div className="m-name">Chargeback % · carteira</div>
                <div className="m-delta" id="d-cb">
                  —
                </div>
              </div>
              <div className="m-val" id="v-cb">
                —
              </div>
              <div className="limit">
                <div className="lt">
                  <span>limite bandeira (VAMP)</span>
                  <b>0,90%</b>
                </div>
                <div className="track">
                  <div className="fill" id="f-cb"></div>
                  <div className="th"></div>
                </div>
              </div>
            </div>
            <div className="metric" id="card-pre">
              <div className="m-top">
                <div className="m-name">Pré-CB % · carteira</div>
                <div className="m-delta" id="d-pre">
                  —
                </div>
              </div>
              <div className="m-val" id="v-pre">
                —
              </div>
              <div className="limit">
                <div className="lt">
                  <span>teto de alerta</span>
                  <b>1,20%</b>
                </div>
                <div className="track">
                  <div className="fill" id="f-pre"></div>
                  <div className="th"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="card matrix-card">
            <div className="card-h">
              <span className="t">Matriz de risco · cada bolha é um cliente</span>
              <span className="tag" id="mx-count">
                —
              </span>
            </div>
            <div className="matrix-wrap">
              <canvas id="matrix"></canvas>
            </div>
            <div className="mx-legend">
              <span className="mxl">
                <i style={{ background: "#2E8C6A" }} />
                Saudável
              </span>
              <span className="mxl">
                <i style={{ background: "#FFAB00" }} />
                Observação
              </span>
              <span className="mxl">
                <i style={{ background: "#FF5630" }} />
                Acima do limite
              </span>
              <span className="mxl">
                <i className="sq" style={{ background: "#5B6B7A" }} />✕ Bloqueado
              </span>
              <span className="mxl" style={{ marginLeft: "auto" }}>
                Bolha = TPV 30d · Zona vermelha = além do limite
              </span>
            </div>
          </div>
        </section>

        {/* FILA PRIORIZADA */}
        <section className="card queue">
          <div className="card-h">
            <span className="t">Fila de ação · por exposição</span>
            <span className="tag" id="q-tag">
              —
            </span>
          </div>
          <div className="q-chips">
            <div className="chip c-red">
              <div className="cv" id="c-crit">
                —
              </div>
              <div className="cl">Acima do limite</div>
            </div>
            <div className="chip c-amber">
              <div className="cv" id="c-warn">
                —
              </div>
              <div className="cl">Observação</div>
            </div>
            <div className="chip c-grey">
              <div className="cv" id="c-blk">
                —
              </div>
              <div className="cl">Bloq. hoje</div>
            </div>
          </div>
          <div className="w-list" id="wlist"></div>
          <div className="q-foot">
            <div className="q-pages" id="q-dots"></div>
            <div className="q-info" id="q-info">
              —
            </div>
          </div>
        </section>
      </main>

      <div id="alarm">
        <div className="vignette"></div>
        <div className="banner">
          <div className="a-title">
            <span>🚨</span>
            <span>Limite excedido</span>
            <span>🚨</span>
          </div>
          <div className="a-detail" id="alarm-detail"></div>
          <div className="a-sub">Acionar protocolo de contenção · Compliance &amp; Risco</div>
        </div>
      </div>

      <div className="feed">
        <div className="feed-label">
          <i />
          EVENTOS
        </div>
        <div className="feed-track" id="feed"></div>
      </div>
    </div>
  );
}
