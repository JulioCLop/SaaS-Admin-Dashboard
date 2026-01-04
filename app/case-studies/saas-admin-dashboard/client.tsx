/* eslint-disable react/no-unknown-property */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { btnClasses } from "./ui";

type Status = "healthy" | "watch" | "action";
type Role = "admin" | "manager" | "support";

const seedData = [
  {
    account: "Northwind",
    owner: "A. Patel",
    status: "healthy" as Status,
    mrr: 12800,
    last: "2h ago",
    id: "AC-1042",
  },
  {
    account: "Starlight Labs",
    owner: "J. Lopez",
    status: "watch" as Status,
    mrr: 6400,
    last: "1d ago",
    id: "AC-2018",
  },
  {
    account: "Blue Peak",
    owner: "M. Chen",
    status: "healthy" as Status,
    mrr: 9800,
    last: "6h ago",
    id: "AC-3321",
  },
  {
    account: "Orbit Freight",
    owner: "S. Rivera",
    status: "action" as Status,
    mrr: 4100,
    last: "3d ago",
    id: "AC-7780",
  },
  {
    account: "Helio Health",
    owner: "K. Singh",
    status: "watch" as Status,
    mrr: 7200,
    last: "9h ago",
    id: "AC-4401",
  },
  {
    account: "Cobalt Commerce",
    owner: "R. Nguyen",
    status: "healthy" as Status,
    mrr: 15400,
    last: "45m ago",
    id: "AC-9012",
  },
  {
    account: "Atlas Systems",
    owner: "T. Brown",
    status: "action" as Status,
    mrr: 5600,
    last: "5d ago",
    id: "AC-1189",
  },
];

export function HeroActionsClient() {
  const [viewName, setViewName] = useState("default");

  // Stored view snapshot (demo only)
  const viewStore = useRef<Record<string, { q: string; status: "all" | Status }>>({
    default: { q: "", status: "all" },
  });

  useEffect(() => {
    // Expose to preview component through window for tiny demo coupling
    (window as any).__caseStudyViewStore = viewStore;
    (window as any).__setCaseStudyViewName = setViewName;
    (window as any).__caseStudyViewName = viewName;
  }, [viewName]);

  function saveView() {
    const name = prompt("Name this view (e.g., 'triage', 'my-accounts'):", viewName);
    if (!name) return;

    const api = (window as any).__previewApi as
      | undefined
      | {
          getState: () => { q: string; status: "all" | Status };
          applyView: (n: string) => void;
          addChip: (n: string) => void;
        };
    if (!api) return;

    const st = api.getState();
    viewStore.current[name] = { q: st.q, status: st.status };
    api.addChip(name);
    api.applyView(name);
    setViewName(name);
  }

  function reset() {
    const api = (window as any).__previewApi as
      | undefined
      | { resetFilters: () => void; applyView: (n: string) => void };
    if (!api) return;
    api.resetFilters();
    api.applyView("default");
    setViewName("default");
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button className={btnClasses(true)} onClick={saveView} type="button">
        <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_0_6px_rgba(255,255,255,.18)]" />
        Save Current View
      </button>
      <button className={btnClasses(false)} onClick={reset} type="button">
        Reset Filters
      </button>
      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-2 text-xs font-mono text-white/80">
        view: {viewName}
      </span>
    </div>
  );
}

export function DashboardPreviewClient() {
  const [role, setRole] = useState<Role>("admin");
  const [status, setStatus] = useState<"all" | Status>("all");
  const [q, setQ] = useState("");
  const [chips, setChips] = useState<string[]>(["default", "risk", "renewals"]);
  const [activeChip, setActiveChip] = useState("default");

  const savedViews = useRef<Record<string, { q: string; status: "all" | Status }>>({
    default: { q: "", status: "all" },
    risk: { q: "", status: "action" },
    renewals: { q: "", status: "watch" },
  });

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return seedData.filter((d) => {
      if (status !== "all" && d.status !== status) return false;
      if (!term) return true;
      const hay = `${d.account} ${d.owner} ${d.id}`.toLowerCase();
      return hay.includes(term);
    });
  }, [q, status]);

  function canSeeAdminActions(r: Role) {
    return r === "admin";
  }

  function fmtMoney(n: number) {
    return "$" + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function applyView(name: string) {
    const v = savedViews.current[name] ?? savedViews.current.default;
    setActiveChip(name);
    setQ(v.q ?? "");
    setStatus(v.status ?? "all");
    (window as any).__setCaseStudyViewName?.(name);
  }

  function addChip(name: string) {
    setChips((prev) => (prev.includes(name) ? prev : [...prev, name]));
  }

  function getState() {
    return { role, status, q };
  }

  function resetFilters() {
    setQ("");
    setStatus("all");
  }

  useEffect(() => {
    // Expose minimal API for the hero actions
    (window as any).__previewApi = { applyView, addChip, getState, resetFilters };
  }, [role, status, q]);

  const isAdmin = canSeeAdminActions(role);

  return (
    <div className="overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.03]">
      {/* top controls */}
      <div className="flex flex-col gap-2 border-b border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.02] p-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {chips.map((c) => (
            <button
              key={c}
              onClick={() => applyView(c)}
              type="button"
              className={[
                "rounded-full border px-3 py-2 text-xs transition hover:-translate-y-[1px]",
                activeChip === c
                  ? "border-[#7C5CFF]/70 bg-[#7C5CFF]/20 text-white/90"
                  : "border-white/15 bg-white/[0.04] text-white/80 hover:border-white/25 hover:bg-white/[0.06]",
              ].join(" ")}
            >
              {c === "default"
                ? "Default"
                : c === "risk"
                ? "Risk Queue"
                : c === "renewals"
                ? "Renewals"
                : c}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search orgs, owners, ids..."
            className="w-full min-w-0 rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-xs text-white/90 outline-none focus:border-[#00D4FF]/55 focus:shadow-[0_0_0_4px_rgba(0,212,255,.12)] md:w-[190px]"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="w-full min-w-0 rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-xs text-white/90 outline-none focus:border-[#00D4FF]/55 focus:shadow-[0_0_0_4px_rgba(0,212,255,.12)] md:w-[150px]"
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="support">Support</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "all" | Status)}
            className="w-full min-w-0 rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-xs text-white/90 outline-none focus:border-[#00D4FF]/55 focus:shadow-[0_0_0_4px_rgba(0,212,255,.12)] md:w-[150px]"
          >
            <option value="all">All status</option>
            <option value="healthy">Healthy</option>
            <option value="watch">Watch</option>
            <option value="action">Action needed</option>
          </select>
        </div>
      </div>

      {/* table */}
      <div className="overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-white/[0.02] text-left">
              <th className="whitespace-nowrap border-b border-white/10 px-3 py-3 text-[11px] uppercase tracking-[.12em] text-white/65">
                Account
              </th>
              <th className="whitespace-nowrap border-b border-white/10 px-3 py-3 text-[11px] uppercase tracking-[.12em] text-white/65">
                Owner
              </th>
              <th className="whitespace-nowrap border-b border-white/10 px-3 py-3 text-[11px] uppercase tracking-[.12em] text-white/65">
                Status
              </th>
              <th className="whitespace-nowrap border-b border-white/10 px-3 py-3 text-[11px] uppercase tracking-[.12em] text-white/65 font-mono">
                MRR
              </th>
              <th className="whitespace-nowrap border-b border-white/10 px-3 py-3 text-[11px] uppercase tracking-[.12em] text-white/65 font-mono">
                Last Active
              </th>
              {isAdmin ? (
                <th className="whitespace-nowrap border-b border-white/10 px-3 py-3 text-[11px] uppercase tracking-[.12em] text-white/65">
                  Admin Action
                </th>
              ) : null}
            </tr>
          </thead>

          <tbody>
            {filtered.map((d) => (
              <tr key={d.id} className="hover:bg-white/[0.03]">
                <td className="whitespace-nowrap border-b border-white/5 px-3 py-3 text-sm text-white/85">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold tracking-tight">{d.account}</span>
                    <span className="font-mono text-[11px] text-white/55">{d.id}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap border-b border-white/5 px-3 py-3 text-sm text-white/85">
                  {d.owner}
                </td>
                <td className="whitespace-nowrap border-b border-white/5 px-3 py-3 text-sm">
                  <StatusPill status={d.status} />
                </td>
                <td className="whitespace-nowrap border-b border-white/5 px-3 py-3 text-sm font-mono text-white/85">
                  {fmtMoney(d.mrr)}
                </td>
                <td className="whitespace-nowrap border-b border-white/5 px-3 py-3 text-sm font-mono text-white/55">
                  {d.last}
                </td>
                {isAdmin ? (
                  <td className="whitespace-nowrap border-b border-white/5 px-3 py-3 text-sm">
                    <button
                      type="button"
                      onClick={() => alert(`Admin action: open audit trail for ${d.id}`)}
                      className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-2 text-xs text-white/85 transition hover:-translate-y-[1px] hover:border-white/25 hover:bg-white/[0.06]"
                    >
                      Audit
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-3">
        <div className="text-xs text-white/60">
          <span className="font-mono text-white/80">{filtered.length}</span> results -
          filters persist per view
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>System tokens</Badge>
          <Badge>Table primitives</Badge>
          <Badge>Access gates</Badge>
        </div>
      </div>
    </div>
  );
}

export function DemoFormClient() {
  const [note, setNote] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNote("Sent. (Demo UI) Wire this to your backend and you're live.");
    window.setTimeout(() => setNote(""), 3500);
  }

  return (
    <form onSubmit={onSubmit} className="mt-3 grid gap-2">
      <input
        required
        placeholder="Name"
        className="w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm text-white/90 outline-none focus:border-[#00D4FF]/55 focus:shadow-[0_0_0_4px_rgba(0,212,255,.12)]"
      />
      <input
        placeholder="Company / Product"
        className="w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm text-white/90 outline-none focus:border-[#00D4FF]/55 focus:shadow-[0_0_0_4px_rgba(0,212,255,.12)]"
      />
      <input
        required
        placeholder="Email"
        className="w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm text-white/90 outline-none focus:border-[#00D4FF]/55 focus:shadow-[0_0_0_4px_rgba(0,212,255,.12)]"
      />
      <input
        required
        placeholder="What do you want the dashboard to do?"
        className="w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm text-white/90 outline-none focus:border-[#00D4FF]/55 focus:shadow-[0_0_0_4px_rgba(0,212,255,.12)]"
      />

      <button className={btnClasses(true)} type="submit">
        <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_0_6px_rgba(255,255,255,.18)]" />
        Send
      </button>

      {note ? <div className="text-xs text-white/60">{note}</div> : null}
    </form>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-2 text-xs text-white/80">
      {children}
    </span>
  );
}

function StatusPill({ status }: { status: Status }) {
  const conf =
    status === "healthy"
      ? {
          label: "Healthy",
          ring: "border-[#2EE59D]/35",
          bg: "bg-[#2EE59D]/10",
          dot: "bg-[#2EE59D]",
        }
      : status === "watch"
      ? {
          label: "Watch",
          ring: "border-[#FFC857]/35",
          bg: "bg-[#FFC857]/10",
          dot: "bg-[#FFC857]",
        }
      : {
          label: "Action",
          ring: "border-[#FF4D6D]/35",
          bg: "bg-[#FF4D6D]/10",
          dot: "bg-[#FF4D6D]",
        };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs text-white/80 ${conf.ring} ${conf.bg}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${conf.dot} shadow-[0_0_0_5px_rgba(255,255,255,.06)]`}
      />
      {conf.label}
    </span>
  );
}
