// Next.js App Router page (server component) + client interactivity embedded via a Client component below.
// Drop this file in your app, then visit /case-studies/saas-admin-dashboard

import React from "react";
import {
  DashboardPreviewClient,
  DemoFormClient,
  HeroActionsClient,
} from "./client";
import { btnClasses, pillClasses } from "./ui";

export const metadata = {
  title: "SaaS Admin Dashboard - Case Study #02",
  description:
    "Case Study #02: A scalable SaaS admin dashboard with tables, filters, saved views, and role-based views.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#070A12] text-white overflow-x-hidden">
      {/* Subtle animated grid */}
      <div className="pointer-events-none fixed inset-[-2px] opacity-20 [mask-image:radial-gradient(520px_420px_at_50%_20%,black_45%,transparent_80%)]">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:44px_44px] animate-[drift_18s_linear_infinite]" />
      </div>

      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-200px] top-[-200px] h-[700px] w-[1000px] rounded-full bg-[#7C5CFF]/25 blur-[0px]" />
        <div className="absolute right-[-200px] top-[-240px] h-[650px] w-[900px] rounded-full bg-[#00D4FF]/15 blur-[0px]" />
        <div className="absolute right-[10%] bottom-[-320px] h-[520px] w-[700px] rounded-full bg-[#2EE59D]/10 blur-[0px]" />
      </div>

      <div className="mx-auto max-w-[1160px] px-4 pb-16 pt-7 relative">
        <TopBar />

        <section
          id="overview"
          className="mt-5 overflow-hidden rounded-[24px] border border-white/10 bg-[radial-gradient(900px_450px_at_15%_15%,rgba(124,92,255,.20),transparent_55%),radial-gradient(900px_450px_at_85%_25%,rgba(0,212,255,.14),transparent_60%),linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03))] shadow-[0_30px_80px_rgba(0,0,0,.55)]"
        >
          <div className="grid gap-4 p-6 md:grid-cols-[1.1fr_.9fr] md:p-8">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Tag>
                  <span className="font-mono font-bold tracking-[.12em]">
                    UI
                  </span>{" "}
                  Engineer - Tables + Filters + Role Views
                </Tag>
                <Tag>Saved Views</Tag>
                <Tag>Component-driven layout</Tag>
              </div>

              <h1 className="mt-2 text-[clamp(34px,4.2vw,54px)] leading-[1.02] tracking-[-0.03em]">
                A{" "}
                <span className="bg-gradient-to-r from-[#7C5CFF] via-[#00D4FF] to-[#2EE59D] bg-clip-text text-transparent">
                  scalable admin dashboard
                </span>
                <br />
                built for speed, clarity, and control.
              </h1>

              <p className="mt-3 max-w-[62ch] text-[15.5px] leading-7 text-white/70">
                This dashboard focuses on the hard parts: powerful table UX, fast
                filtering, saved views, and role-based access that changes what
                users see--without changing the mental model. The system is
                component-first, so new pages ship in hours, not weeks.
              </p>

              <div className="mt-4">
                <CaseStudyClientActions />
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                <Metric
                  title="Role-based UI"
                  desc="Admin / Manager / Support views with scoped actions"
                />
                <Metric
                  title="Filters + Search"
                  desc="Query builder-style filtering with persisted state"
                />
                <Metric
                  title="Component System"
                  desc="Tokens, primitives, and page templates for velocity"
                />
              </div>
            </div>

            <div>
              <DashboardPreview />
            </div>
          </div>
        </section>

        <Section
          id="features"
          title="Features that make the UI feel inevitable"
          subtitle="Everything is built to reduce cognitive load: predictable layout, consistent controls, and guardrails that prevent risky actions unless a role can do it."
          badge="UI Engineer focus"
        >
          <div className="grid gap-3 md:grid-cols-3">
            <Card
              title="Tables that do not fight the user"
              desc="Sticky headers, dense readability, hover states, accessible contrast, and fast scanning patterns."
              chips={["A11y", "Density", "Clarity"]}
            />
            <Card
              title="Filters + saved views"
              desc="Users create a view once, then operate from it--fewer repeated steps, fewer mistakes."
              chips={["Persisted state", "Speed"]}
            />
            <Card
              title="Role-based views"
              desc="Admin actions are gated, support workflows are streamlined, and managers see the right KPIs."
              chips={["RBAC UI", "Safety"]}
            />
          </div>
        </Section>

        <Section
          id="system"
          title="Component-driven layout system"
          subtitle="Built like a product: tokens -> primitives -> compositions. This keeps the UI consistent across teams and scales without redesigning every new page."
          badge="Systems / UX / Components"
        >
          <div className="grid gap-3 md:grid-cols-3">
            <Card
              title="Tokens"
              desc="Color, radius, shadow, typography, spacing--consistent brand energy without UI drift."
            />
            <Card
              title="Primitives"
              desc="Buttons, pills, badges, chips, inputs, tables--each predictable and composable."
            />
            <Card
              title="Templates"
              desc="Page patterns for admin surfaces: list -> detail -> settings -> audit flows."
            />
          </div>
        </Section>

        <Section
          id="results"
          title="Outcomes (what this delivers)"
          subtitle="Less confusion, faster workflows, fewer 'where is that?' moments. The UI feels controlled, modern, and built for real operators."
          badge="#02"
        >
          <div className="grid gap-3 md:grid-cols-3">
            <Card
              title="Operator speed"
              desc="Saved views + search reduce repeat actions and improve day-to-day velocity."
            />
            <Card
              title="Lower error rate"
              desc="Role gating + clear status states prevent accidental risky changes."
            />
            <Card
              title="Scales with the product"
              desc="New modules plug into the system without rewriting UI foundations."
            />
          </div>
        </Section>

        <Section
          id="contact"
          title="Want this built for your product?"
          subtitle="Drop a message--include your stack and what the dashboard needs to control."
          badge="Response-ready"
        >
          <div className="grid gap-3 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="rounded-[18px] border border-white/10 bg-white/[0.04] p-4">
                <h3 className="text-sm font-semibold tracking-tight">
                  Quick message
                </h3>
                <p className="mt-1 text-sm text-white/60">
                  (This is a front-end demo form -- wire it to your backend
                  later.)
                </p>

                <DemoForm />
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="rounded-[18px] border border-white/10 bg-white/[0.04] p-4">
                <h3 className="text-sm font-semibold tracking-tight">
                  What you are getting
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  A dashboard UI engineered for real usage: structured tables,
                  smart filtering, role-safe actions, and a design system that
                  holds up when the app grows.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge>Front-end architecture</Badge>
                  <Badge>Design system</Badge>
                  <Badge>UX for operators</Badge>
                  <Badge>Performance-minded</Badge>
                </div>

                <div className="mt-4 grid gap-2">
                  <a className={btnClasses(false)} href="#overview">
                    Back to top
                  </a>
                  <a className={btnClasses(false)} href="#">
                    LinkedIn
                  </a>
                  <a className={btnClasses(false)} href="#">
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <footer className="mt-5 flex flex-wrap items-center justify-between gap-3 px-2 pt-4 text-xs text-white/55">
          <div>
            (c) {new Date().getFullYear()} - SaaS Admin Dashboard - Case Study #02
          </div>
          <div className="font-mono">Systems / UX / Components</div>
        </footer>
      </div>

      {/* Local keyframes for grid drift */}
      <style>{`
        @keyframes drift {
          0% { transform: translate3d(0,0,0); }
          100% { transform: translate3d(44px,44px,0); }
        }
      `}</style>
    </main>
  );
}

/* --------------------------- Shared UI (Server) --------------------------- */

function TopBar() {
  return (
    <header className="sticky top-3 z-10 rounded-full border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.04] px-3 py-3 shadow-[0_18px_55px_rgba(0,0,0,.45)] backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-[220px] items-center gap-2">
          <div className="h-10 w-10 rounded-[12px] border border-white/20 bg-[radial-gradient(12px_12px_at_30%_30%,rgba(255,255,255,.9),transparent_55%),linear-gradient(135deg,rgba(124,92,255,.95),rgba(0,212,255,.75))] shadow-[0_18px_40px_rgba(124,92,255,.22)]" />
          <div>
            <div className="text-[13px] uppercase tracking-[.16em] text-white/90">
              SaaS Admin Dashboard
            </div>
            <div className="mt-0.5 font-mono text-[12px] text-white/55">
              #02 - Systems / UX / Components
            </div>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-2">
          <a className={pillClasses()} href="#overview">
            Overview
          </a>
          <a className={pillClasses()} href="#features">
            Features
          </a>
          <a className={pillClasses()} href="#system">
            Design System
          </a>
          <a className={pillClasses()} href="#results">
            Outcomes
          </a>
        </nav>

        <div className="flex min-w-[220px] items-center justify-end gap-2">
          <a className={btnClasses(false)} href="#contact">
            View Repo
          </a>
          <a className={btnClasses(true)} href="#contact">
            <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_0_6px_rgba(255,255,255,.18)]" />
            Request a Demo
          </a>
        </div>
      </div>
    </header>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-2 text-xs tracking-wide text-white/85">
      {children}
    </span>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-2 text-xs text-white/80">
      {children}
    </span>
  );
}

function Metric({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="min-h-[76px] rounded-[16px] border border-white/10 bg-white/[0.04] p-3">
      <div className="font-mono text-[16px] tracking-[.06em]">{title}</div>
      <div className="mt-1.5 text-xs leading-5 text-white/55">{desc}</div>
    </div>
  );
}

function Section({
  id,
  title,
  subtitle,
  badge,
  children,
}: {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="mt-5 overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.035] shadow-[0_18px_55px_rgba(0,0,0,.45)]"
    >
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] px-4 py-4">
        <div>
          <h2 className="text-base font-semibold tracking-tight">{title}</h2>
          <p className="mt-1 max-w-[75ch] text-sm leading-6 text-white/70">
            {subtitle}
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-2 text-xs font-mono text-white/80">
          {badge}
        </span>
      </div>

      <div className="p-4">{children}</div>
    </section>
  );
}

function Card({
  title,
  desc,
  chips,
}: {
  title: string;
  desc: string;
  chips?: string[];
}) {
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.04] p-4">
      <div className="pointer-events-none absolute -bottom-14 -right-10 h-44 w-44 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(124,92,255,.35),transparent_60%)] opacity-70" />
      <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/70">{desc}</p>
      {chips?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {chips.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-2 text-xs font-mono text-white/80"
            >
              {c}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* -------------------------- Client Components -------------------------- */

function DashboardPreview() {
  return (
    <div className="relative rounded-[22px] border border-white/15 bg-[rgba(10,14,26,.55)] p-3 shadow-[0_26px_70px_rgba(0,0,0,.45)] backdrop-blur">
      <div className="pointer-events-none absolute inset-[-2px] -z-10 rounded-[24px] bg-gradient-to-br from-[#7C5CFF]/65 via-[#00D4FF]/35 to-[#2EE59D]/20 opacity-35 blur-[18px]" />

      <div className="flex items-center justify-between gap-2 px-2 pb-2 pt-1">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full border border-white/10 bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full border border-white/10 bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full border border-white/10 bg-white/15" />
        </div>
        <div className="text-xs uppercase tracking-[.08em] text-white/75">
          Dashboard Preview
        </div>
        <div className="font-mono text-xs text-white/80">
          <DashboardRoleBadge />
        </div>
      </div>

      <DashboardPreviewClient />
    </div>
  );
}

function DashboardRoleBadge() {
  // Render a placeholder that the client component will overwrite visually.
  // Keeps layout stable during hydration.
  return (
    <span className="rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-2">
      role: admin
    </span>
  );
}

/**
 * Client actions shown under hero (save/reset + view badge)
 */
function CaseStudyClientActions() {
  return <HeroActionsClient />;
}

/**
 * Demo contact form: client-only note handling
 */
function DemoForm() {
  return <DemoFormClient />;
}
