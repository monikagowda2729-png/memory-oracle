import { useEffect, useState } from "react";
import { Sparkles, X } from "lucide-react";

const messages = [
  "Scanning incident memory graph…",
  "3 similar incidents found from Q2.",
  "Suggested fix: rollback deploy v2.41.0",
  "Confidence: 96% — applying recommendation.",
];

export function AIAssistant() {
  const [open, setOpen] = useState(true);
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const msg = messages[idx];
    setTyped("");
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(msg.slice(0, i));
      if (i >= msg.length) clearInterval(t);
    }, 30);
    const next = setTimeout(() => setIdx((v) => (v + 1) % messages.length), 4200);
    return () => { clearInterval(t); clearTimeout(next); };
  }, [idx]);

  if (!open) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[320px] animate-fade-up">
      <div className="glass-strong glow-border rounded-2xl p-4 shadow-glow">
        <div className="flex items-start gap-3">
          <div className="relative shrink-0">
            <div className="absolute inset-0 animate-pulse-glow rounded-full" />
            <div className="relative grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-cyan to-violet">
              <Sparkles className="h-5 w-5 text-background" />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold tracking-wide text-cyan">MEMORY AGENT</p>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1 text-sm leading-snug text-foreground">
              {typed}
              <span className="ml-0.5 inline-block h-3 w-1.5 -mb-0.5 animate-blink bg-cyan" />
            </p>
            <div className="mt-2 flex gap-1">
              {messages.map((_, i) => (
                <span
                  key={i}
                  className={`h-0.5 flex-1 rounded-full ${i === idx ? "bg-cyan" : "bg-white/10"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
