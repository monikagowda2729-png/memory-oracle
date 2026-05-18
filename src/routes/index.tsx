import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Activity, AlertTriangle, ArrowRight, Boxes, Brain, ChartLine, Cpu,
  Database, Eye, Fingerprint, Gauge, GitBranch, Globe2, History, Layers,
  LineChart, MessageSquare, Mic, Network, Play, Radar, Rocket, Search,
  Shield, Sparkles, TerminalSquare, TrendingUp, Workflow, Zap,
} from "lucide-react";
import { NeuralBackground } from "@/components/NeuralBackground";
import { AIAssistant } from "@/components/AIAssistant";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Incident Memory Agent — Never solve the same problem twice" },
      { name: "description", content: "An intelligent operational memory system that transforms past production incidents into a living organizational brain. Semantic search, root-cause AI, autonomous resolution." },
      { property: "og:title", content: "AI Incident Memory Agent" },
      { property: "og:description", content: "From forgotten incidents to organizational intelligence." },
    ],
  }),
  component: Landing,
});

function useCountUp(target: number, duration = 1800) {
  const [n, setN] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setN(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return n;
}

function Stat({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const n = useCountUp(value);
  return (
    <div className="glass rounded-2xl p-5 transition-transform hover:-translate-y-1">
      <p className="font-mono text-3xl font-bold text-gradient md:text-4xl">
        {n.toLocaleString()}{suffix}
      </p>
      <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-2xl glass px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan via-primary to-accent shadow-cyan">
            <Brain className="h-5 w-5 text-background" />
            <span className="absolute -right-1 -top-1 h-2 w-2 animate-pulse rounded-full bg-neon shadow-cyan" />
          </div>
          <div className="leading-tight">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">MemoryOS</p>
            <p className="text-sm font-semibold">Incident Memory Agent</p>
          </div>
        </div>
        <nav className="hidden gap-7 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#engine" className="hover:text-foreground">Memory Engine</a>
          <a href="#agent" className="hover:text-foreground">AI Agent</a>
          <a href="#stack" className="hover:text-foreground">Stack</a>
        </nav>
        <button className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan to-violet px-4 py-2 text-sm font-semibold text-background shadow-glow transition hover:scale-[1.03]">
          Try AI Agent <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-32">
      <NeuralBackground />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground animate-fade-up">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
            </span>
            <span className="font-mono tracking-wider">LIVE · v3.1 NEURAL CORE ONLINE</span>
          </div>

          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl animate-rise">
            <span className="text-gradient animate-gradient">AI INCIDENT</span>
            <br />
            <span className="text-foreground">MEMORY AGENT</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Never solve the same production problem twice. A living organizational brain that
            remembers every incident, predicts the next failure, and resolves it autonomously.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3 animate-fade-up" style={{ animationDelay: "0.35s" }}>
            <button className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan via-primary to-violet px-6 py-3 font-semibold text-background shadow-glow transition hover:scale-[1.04]">
              <Sparkles className="h-4 w-4" /> Try AI Agent
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl glass glow-border px-6 py-3 font-semibold text-foreground transition hover:bg-white/5">
              <Radar className="h-4 w-4 text-cyan" /> Analyze Incident
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-foreground/90 transition hover:text-cyan">
              <Play className="h-4 w-4" /> View Live Demo
            </button>
          </div>
        </div>

        {/* Pipeline visualization */}
        <div className="relative mx-auto mt-20 max-w-5xl animate-rise" style={{ animationDelay: "0.5s" }}>
          <PipelineViz />
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Stat value={14823} label="Incidents Remembered" />
          <Stat value={9420} suffix="h" label="Engineering Hours Saved" />
          <Stat value={97} suffix="%" label="Resolution Accuracy" />
          <Stat value={284} label="Teams Protected" />
        </div>
      </div>
    </section>
  );
}

function PipelineViz() {
  const steps = [
    { icon: History, label: "Past Incidents", sub: "Logs · Tickets · Chats" },
    { icon: Brain, label: "AI Memory Engine", sub: "Vector + Graph" },
    { icon: Sparkles, label: "Recommendations", sub: "Confidence · Context" },
    { icon: Zap, label: "Instant Resolution", sub: "Autonomous Actions" },
  ];
  return (
    <div className="glass-strong glow-border relative rounded-3xl p-6 md:p-10 shadow-glow">
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute -inset-x-10 -top-10 h-40 bg-gradient-to-b from-cyan/10 to-transparent blur-2xl" />
        <div className="absolute inset-x-0 top-0 h-px animate-scan bg-gradient-to-r from-transparent via-cyan to-transparent opacity-60" />
      </div>
      <div className="relative grid grid-cols-1 items-center gap-6 md:grid-cols-7">
        {steps.map((s, i) => (
          <>
            <div key={s.label} className="md:col-span-1 col-span-1 flex md:flex-col items-center gap-3 text-center">
              <div className="relative shrink-0">
                <div className="absolute inset-0 animate-pulse-glow rounded-2xl" />
                <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-background to-secondary glow-border">
                  <s.icon className="h-6 w-6 text-cyan" />
                </div>
              </div>
              <div className="text-left md:text-center">
                <p className="text-sm font-semibold">{s.label}</p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{s.sub}</p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div key={`c-${i}`} className="hidden md:flex md:col-span-1 items-center">
                <div className="relative h-px w-full overflow-hidden bg-white/10">
                  <div className="absolute inset-y-0 -left-1/3 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-cyan to-transparent" />
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}

function SearchDemo() {
  const [query, setQuery] = useState("Payment service timeout issue");
  const results = [
    { title: "Stripe webhook timeouts during peak traffic", sim: 96, team: "Payments", time: "42m", cause: "Connection pool exhaustion" },
    { title: "Checkout API latency spike after deploy v2.41", sim: 91, team: "Core API", time: "1h 12m", cause: "N+1 query in order service" },
    { title: "Payment provider 504 cascade", sim: 87, team: "Platform", time: "28m", cause: "Upstream rate limiting" },
  ];
  return (
    <div className="glass-strong glow-border rounded-3xl p-6 md:p-8 shadow-glow">
      <div className="flex items-center gap-3 rounded-2xl bg-background/60 px-4 py-3 border border-white/10">
        <Search className="h-5 w-5 text-cyan" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
          placeholder="Describe the incident…"
        />
        <span className="hidden md:inline font-mono text-[10px] text-muted-foreground">⌘K</span>
      </div>
      <div className="mt-2 flex flex-wrap gap-2 text-xs">
        {["timeout", "latency", "checkout", "stripe", "deploy"].map((t) => (
          <span key={t} className="rounded-full glass px-3 py-1 text-muted-foreground">#{t}</span>
        ))}
      </div>
      <div className="mt-5 space-y-3">
        {results.map((r, i) => (
          <div key={r.title} className="group flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-cyan/40 hover:bg-white/[0.04]">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{r.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                <span className="text-cyan">Root cause:</span> {r.cause} · <span className="font-mono">{r.team}</span> · resolved in {r.time}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <div className="font-mono text-lg font-bold text-gradient">{r.sim}%</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">similarity</div>
            </div>
          </div>
        ))}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="h-3 w-3 text-cyan animate-pulse" /> 12 more retrieved from memory graph · embedding match in 84ms
        </div>
      </div>
    </div>
  );
}

const features = [
  { icon: Search, title: "AI Incident Search", desc: "Semantic retrieval across years of incidents. Find the exact prior fix in milliseconds." },
  { icon: Network, title: "AI Memory Engine", desc: "Vector storage + knowledge graph + temporal learning compress your tribal knowledge." },
  { icon: Layers, title: "Similar Incident Cards", desc: "Glowing recommendations ranked by similarity, recency, and contextual fit." },
  { icon: Radar, title: "Root Cause Intelligence", desc: "Predicts likely causes, failure patterns, dependency blast radius, and risk scores." },
  { icon: MessageSquare, title: "Conversational Agent", desc: '"Have we seen this outage before?" The agent answers from organizational memory.' },
  { icon: TrendingUp, title: "Predictive Failure Detection", desc: "Anomaly trends and early warning signals before the pager ever fires." },
  { icon: GitBranch, title: "Timeline Replay", desc: "Animate the journey: Alert → Investigation → Root cause → Fix → Recovery." },
  { icon: Workflow, title: "Autonomous Resolution", desc: "Suggested rollbacks, scaling, restarts and deploy fixes with confidence meters." },
];

function Features() {
  return (
    <section id="features" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Core Capabilities"
          title={<>An <span className="text-gradient">operational brain</span> for your engineering org</>}
          sub="Every incident becomes a permanent neuron. Every fix sharpens the network."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-2xl glass p-6 transition hover:-translate-y-1 hover:shadow-glow"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-cyan/20 to-violet/20 blur-2xl transition group-hover:scale-150" />
              <div className="relative">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-background/60 glow-border">
                  <f.icon className="h-5 w-5 text-cyan" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SearchSection() {
  return (
    <section id="engine" className="relative py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <div>
          <SectionHeader
            align="left"
            eyebrow="Semantic Incident Search"
            title={<>Type an outage. <span className="text-gradient">Get the playbook.</span></>}
            sub="Vector embeddings + knowledge graph retrieval surface every similar incident, root cause, and the team that fixed it last time."
          />
          <ul className="mt-8 space-y-3 text-sm">
            {[
              ["Embedding match in <100ms", Zap],
              ["Cross-team, cross-service retrieval", Globe2],
              ["Confidence scoring with explainable evidence", Eye],
              ["Auto-clustering of recurring failure modes", Boxes],
            ].map(([t, Icon]) => (
              <li key={t as string} className="flex items-center gap-3 text-muted-foreground">
                <div className="grid h-7 w-7 place-items-center rounded-lg glass">
                  {/* @ts-expect-error icon as component */}
                  <Icon className="h-3.5 w-3.5 text-cyan" />
                </div>
                <span>{t as string}</span>
              </li>
            ))}
          </ul>
        </div>
        <SearchDemo />
      </div>
    </section>
  );
}

function RootCauseRadar() {
  const axes = ["Latency", "Errors", "Saturation", "Traffic", "Deploys", "Deps"];
  const values = [0.85, 0.7, 0.55, 0.9, 0.65, 0.78];
  const cx = 150, cy = 150, R = 110;
  const point = (i: number, r: number) => {
    const a = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  };
  const poly = values.map((v, i) => point(i, R * v).join(",")).join(" ");

  return (
    <div className="glass-strong glow-border rounded-3xl p-6 shadow-glow">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-cyan">Root Cause Radar</p>
          <p className="mt-1 text-sm font-semibold">Probable cause distribution</p>
        </div>
        <div className="rounded-full glass px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-neon">Risk · High</div>
      </div>
      <div className="mt-2 grid place-items-center">
        <svg viewBox="0 0 300 300" className="h-72 w-72">
          <defs>
            <radialGradient id="rg" cx="50%" cy="50%">
              <stop offset="0%" stopColor="oklch(0.85 0.16 200)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="oklch(0.62 0.24 300)" stopOpacity="0.1" />
            </radialGradient>
          </defs>
          {[0.25, 0.5, 0.75, 1].map((r) => (
            <circle key={r} cx={cx} cy={cy} r={R * r} fill="none" stroke="oklch(1 0 0 / 0.08)" />
          ))}
          {axes.map((_, i) => {
            const [x, y] = point(i, R);
            return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="oklch(1 0 0 / 0.08)" />;
          })}
          <polygon points={poly} fill="url(#rg)" stroke="oklch(0.85 0.16 200)" strokeWidth="1.5" />
          {values.map((v, i) => {
            const [x, y] = point(i, R * v);
            return <circle key={i} cx={x} cy={y} r="3.5" fill="oklch(0.95 0.18 200)" />;
          })}
          {axes.map((a, i) => {
            const [x, y] = point(i, R + 18);
            return (
              <text key={a} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
                className="fill-muted-foreground" fontSize="10" fontFamily="JetBrains Mono">
                {a}
              </text>
            );
          })}
        </svg>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          ["Deploy regression", "62%"],
          ["DB saturation", "24%"],
          ["Upstream dep", "14%"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl bg-background/40 p-3 border border-white/5">
            <p className="font-mono text-lg font-bold text-gradient">{v}</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{k}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatAgent() {
  return (
    <div className="glass-strong glow-border rounded-3xl p-6 shadow-glow">
      <div className="flex items-center gap-3 border-b border-white/5 pb-4">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan to-violet shadow-cyan">
          <Brain className="h-5 w-5 text-background" />
        </div>
        <div>
          <p className="text-sm font-semibold">Memory Agent · Conversational</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-neon">● Thinking from 14,823 memories</p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-gradient-to-br from-primary/30 to-violet/20 p-3 text-sm">
          Have we seen Stripe webhook 504s during a Black Friday rush before?
        </div>
        <div className="max-w-[88%] rounded-2xl rounded-bl-sm glass p-4 text-sm leading-relaxed">
          <p>Yes — <span className="text-cyan font-semibold">3 matching incidents</span> in Nov '23, Nov '24, and Jul '25.</p>
          <p className="mt-2 text-muted-foreground">Pattern: connection pool exhaustion under burst traffic. Previous fix that worked in 28 minutes:</p>
          <ul className="mt-2 space-y-1 text-foreground/90">
            <li>→ Increase pool from 50 → 200 on payments-api</li>
            <li>→ Enable HPA on stripe-webhook-worker</li>
            <li>→ Toggle <span className="font-mono text-cyan">FEATURE_RATE_LIMIT_V2</span></li>
          </ul>
          <div className="mt-3 flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[96%] rounded-full bg-gradient-to-r from-cyan via-primary to-neon" />
            </div>
            <span className="font-mono text-xs text-neon">96%</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex gap-1">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan" style={{ animationDelay: "0s" }} />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan" style={{ animationDelay: "0.15s" }} />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan" style={{ animationDelay: "0.3s" }} />
          </span>
          Agent composing autonomous runbook…
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-xl bg-background/60 border border-white/10 p-2 pl-4">
        <input className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="Ask the memory agent anything…" />
        <button className="grid h-8 w-8 place-items-center rounded-lg glass hover:bg-white/10">
          <Mic className="h-4 w-4 text-cyan" />
        </button>
        <button className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-cyan to-violet text-background">
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function IntelligenceSection() {
  return (
    <section id="agent" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Root Cause Intelligence × Conversational Agent"
          title={<>Talk to your <span className="text-gradient">incident history</span></>}
          sub="Combine radar-style root cause distributions with a memory-grounded agent that explains its reasoning."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <RootCauseRadar />
          <ChatAgent />
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  const steps = [
    { t: "00:00", label: "Alert", icon: AlertTriangle, color: "from-magenta to-destructive" },
    { t: "00:02", label: "Investigation", icon: TerminalSquare, color: "from-cyan to-primary" },
    { t: "00:09", label: "Root Cause", icon: Radar, color: "from-primary to-violet" },
    { t: "00:18", label: "Fix Applied", icon: Workflow, color: "from-violet to-accent" },
    { t: "00:24", label: "Recovery", icon: Shield, color: "from-neon to-cyan" },
  ];
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Incident Timeline Replay"
          title={<>Re-live every outage as a <span className="text-gradient">cinematic playback</span></>}
          sub="Step through the agent's autonomous response, second by second."
        />
        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 overflow-hidden">
            <div className="h-full w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-cyan to-transparent" />
          </div>
          <div className="relative grid grid-cols-2 gap-6 md:grid-cols-5">
            {steps.map((s, i) => (
              <div key={s.label} className={`text-center ${i % 2 ? "md:translate-y-8" : "md:-translate-y-8"}`}>
                <div className="relative mx-auto h-16 w-16">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${s.color} opacity-40 blur-xl animate-pulse-glow`} />
                  <div className="relative grid h-16 w-16 place-items-center rounded-2xl glass-strong glow-border">
                    <s.icon className="h-6 w-6 text-cyan" />
                  </div>
                </div>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.t}</p>
                <p className="text-sm font-semibold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PredictiveChart() {
  // simple inline area chart
  const pts = [12, 18, 14, 22, 30, 26, 40, 55, 48, 70, 92, 88];
  const max = 100;
  const w = 600, h = 180, pad = 20;
  const stepX = (w - pad * 2) / (pts.length - 1);
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${pad + i * stepX} ${h - pad - (p / max) * (h - pad * 2)}`).join(" ");
  const area = `${path} L ${pad + (pts.length - 1) * stepX} ${h - pad} L ${pad} ${h - pad} Z`;
  return (
    <div className="glass-strong glow-border rounded-3xl p-6 shadow-glow">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-cyan">Predictive Failure Forecast</p>
          <p className="mt-1 text-sm font-semibold">Next 24h · payments-api</p>
        </div>
        <div className="rounded-full glass px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-magenta">⚠ 78% failure risk in 4h</div>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="mt-4 w-full">
        <defs>
          <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.85 0.16 200)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="oklch(0.62 0.24 300)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1={pad} x2={w - pad} y1={h - pad - g * (h - pad * 2)} y2={h - pad - g * (h - pad * 2)} stroke="oklch(1 0 0 / 0.06)" />
        ))}
        <path d={area} fill="url(#area)" />
        <path d={path} fill="none" stroke="oklch(0.85 0.16 200)" strokeWidth="2" />
        {pts.map((p, i) => (
          <circle key={i} cx={pad + i * stepX} cy={h - pad - (p / max) * (h - pad * 2)} r="2.5" fill="oklch(0.95 0.18 200)" />
        ))}
      </svg>
      <div className="mt-2 grid grid-cols-3 gap-2 text-center">
        <Mini label="Anomaly Score" value="0.82" />
        <Mini label="Drift" value="+14%" />
        <Mini label="Lead Time" value="3h 52m" />
      </div>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-background/40 p-3 border border-white/5">
      <p className="font-mono text-base font-bold text-gradient">{value}</p>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  );
}

function PredictiveSection() {
  return (
    <section className="relative py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <PredictiveChart />
        <div>
          <SectionHeader
            align="left"
            eyebrow="Predictive Failure Detection"
            title={<>See the outage <span className="text-gradient">before it happens</span></>}
            sub="Anomaly trends, warning signals, and probability forecasts derived from millions of historical signals."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              { i: Gauge, t: "Anomaly trend scoring" },
              { i: Activity, t: "Live warning signals" },
              { i: LineChart, t: "Failure probability curves" },
              { i: Fingerprint, t: "Service fingerprinting" },
            ].map(({ i: Icon, t }) => (
              <div key={t} className="flex items-center gap-3 rounded-xl glass p-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-background/60 glow-border">
                  <Icon className="h-4 w-4 text-cyan" />
                </div>
                <p className="text-sm">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Autonomous() {
  const actions = [
    { t: "Rollback deploy v2.41.0", c: 96, k: "Rollback" },
    { t: "Scale payments-api 4 → 12 replicas", c: 89, k: "Scale" },
    { t: "Restart stripe-webhook-worker pod set", c: 74, k: "Restart" },
    { t: "Toggle FEATURE_RATE_LIMIT_V2", c: 68, k: "Feature flag" },
  ];
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Autonomous Resolution"
          title={<>From recommendation to <span className="text-gradient">one-click recovery</span></>}
          sub="The agent proposes resolution actions with explainable confidence — ready to execute under your guardrails."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {actions.map((a) => (
            <div key={a.t} className="group glass glow-border rounded-2xl p-5 transition hover:-translate-y-1 hover:shadow-glow">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-cyan">{a.k}</p>
                  <p className="mt-1 text-base font-semibold">{a.t}</p>
                </div>
                <button className="rounded-lg bg-gradient-to-r from-cyan to-violet px-3 py-1.5 text-xs font-semibold text-background opacity-90 transition group-hover:opacity-100">
                  Execute
                </button>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan via-primary to-neon"
                    style={{ width: `${a.c}%` }}
                  />
                </div>
                <span className="font-mono text-sm font-bold text-gradient">{a.c}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdvancedGrid() {
  const items = [
    { i: Boxes, t: "Multi-Agent Collaboration", d: "Specialist agents for DB, network, deploy & security coordinate in real time." },
    { i: Brain, t: "Self-Learning Memory", d: "Every resolution feeds the embedding store and graph weights." },
    { i: Cpu, t: "AI Copilots", d: "Always-on assistants embedded in dashboards, runbooks and PRs." },
    { i: Mic, t: "Voice Incident Assistant", d: "Drive the war room with voice. Hands-free, on-call friendly." },
    { i: Sparkles, t: "Generative Summaries", d: "Post-incident reports written in your team's voice in seconds." },
    { i: Globe2, t: "Organization Intelligence Graph", d: "Cross-team learning at the scale of your entire engineering org." },
    { i: Eye, t: "Explainable AI Reasoning", d: "Every recommendation cites the memories and signals behind it." },
    { i: Rocket, t: "Cross-Team Learning Engine", d: "Lessons from one squad protect every other team automatically." },
  ];
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="The Future Stack"
          title={<>Advanced capabilities, <span className="text-gradient">already live</span></>}
          sub="A composable AI operations layer designed for the next decade of reliability."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map(({ i: Icon, t, d }) => (
            <div key={t} className="group relative overflow-hidden rounded-2xl glass p-5 transition hover:-translate-y-1">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan/0 via-violet/0 to-magenta/0 opacity-0 transition group-hover:opacity-20" />
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-background/60 glow-border">
                <Icon className="h-5 w-5 text-cyan" />
              </div>
              <p className="mt-4 text-sm font-semibold">{t}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StackSection() {
  const stack = [
    { k: "Frontend", v: "React · Next.js · Tailwind", icon: Layers, accent: "from-cyan to-primary" },
    { k: "AI", v: "RAG · Vector DB · LLM · Embeddings", icon: Brain, accent: "from-violet to-magenta" },
    { k: "Backend", v: "FastAPI · PostgreSQL", icon: Database, accent: "from-primary to-violet" },
    { k: "Cloud", v: "AWS · Kubernetes", icon: ChartLine, accent: "from-neon to-cyan" },
  ];
  return (
    <section id="stack" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Tech Stack"
          title={<>Engineered like <span className="text-gradient">infrastructure</span></>}
          sub="Production-ready architecture, designed to plug into your existing observability and incident tooling."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {stack.map(({ k, v, icon: Icon, accent }) => (
            <div key={k} className="group relative overflow-hidden rounded-2xl glass-strong glow-border p-6 transition hover:-translate-y-1 hover:shadow-glow">
              <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${accent} opacity-25 blur-2xl transition group-hover:scale-125`} />
              <div className="relative">
                <Icon className="h-7 w-7 text-cyan" />
                <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{k}</p>
                <p className="mt-1 text-base font-semibold leading-snug">{v}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-3xl glass-strong glow-border p-10 text-center shadow-glow md:p-16">
          <div className="absolute inset-0 -z-10 opacity-60" style={{ background: "var(--gradient-hero)" }} />
          <div className="absolute inset-x-0 top-0 h-px animate-scan bg-gradient-to-r from-transparent via-cyan to-transparent" />
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan">Deploy the memory layer</p>
          <h3 className="mx-auto mt-4 max-w-2xl text-balance text-3xl font-bold leading-tight md:text-5xl">
            Turn every <span className="text-gradient">postmortem</span> into permanent intelligence.
          </h3>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan via-primary to-violet px-6 py-3 font-semibold text-background shadow-glow transition hover:scale-[1.04]">
              <Sparkles className="h-4 w-4" /> Activate Memory Agent
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl glass glow-border px-6 py-3 font-semibold transition hover:bg-white/5">
              <Play className="h-4 w-4 text-cyan" /> Watch 90s demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-cyan via-primary to-accent">
              <Brain className="h-4 w-4 text-background" />
            </div>
            <p className="text-sm font-semibold">Incident Memory Agent</p>
          </div>
          <p className="text-center text-sm text-gradient font-medium">
            From forgotten incidents to organizational intelligence.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">© 2026 MemoryOS</p>
        </div>
      </div>
    </footer>
  );
}

function SectionHeader({
  eyebrow, title, sub, align = "center",
}: { eyebrow: string; title: React.ReactNode; sub: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan">{eyebrow}</p>
      <h2 className="mt-3 text-balance text-3xl font-bold leading-tight md:text-5xl">{title}</h2>
      <p className="mt-4 text-pretty text-muted-foreground md:text-lg">{sub}</p>
    </div>
  );
}

function Landing() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Features />
      <SearchSection />
      <IntelligenceSection />
      <Timeline />
      <PredictiveSection />
      <Autonomous />
      <AdvancedGrid />
      <StackSection />
      <CTA />
      <Footer />
      <AIAssistant />
    </main>
  );
}
