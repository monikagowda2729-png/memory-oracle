import { useMemo } from "react";

export function NeuralBackground() {
  const { nodes, links } = useMemo(() => {
    const rand = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    const nodes = Array.from({ length: 38 }, (_, i) => ({
      id: i,
      x: rand(i + 1) * 100,
      y: rand(i + 99) * 100,
      delay: rand(i + 7) * 4,
    }));
    const links: { a: number; b: number }[] = [];
    nodes.forEach((n, i) => {
      const distances = nodes
        .map((m, j) => ({ j, d: Math.hypot(n.x - m.x, n.y - m.y) }))
        .filter((x) => x.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      distances.forEach((m) => {
        if (!links.find((l) => (l.a === m.j && l.b === i))) {
          links.push({ a: i, b: m.j });
        }
      });
    });
    return { nodes, links };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="lineGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.85 0.16 200)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="oklch(0.75 0.18 220)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="oklch(0.62 0.24 300)" stopOpacity="0.6" />
          </linearGradient>
          <radialGradient id="nodeGrad">
            <stop offset="0%" stopColor="oklch(0.95 0.18 200)" />
            <stop offset="100%" stopColor="oklch(0.62 0.24 290)" />
          </radialGradient>
        </defs>
        {links.map((l, i) => {
          const a = nodes[l.a];
          const b = nodes[l.b];
          return (
            <line
              key={i}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke="url(#lineGrad)"
              strokeWidth="0.08"
              className="neural-line"
              style={{ animationDelay: `${(i % 10) * 0.3}s` }}
            />
          );
        })}
        {nodes.map((n) => (
          <circle
            key={n.id}
            cx={n.x} cy={n.y} r="0.35"
            fill="url(#nodeGrad)"
            className="neural-node"
            style={{ animationDelay: `${n.delay}s` }}
          />
        ))}
      </svg>
      {/* Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-cyan/70 shadow-cyan"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              animation: `float ${6 + (i % 5)}s ease-in-out ${i * 0.3}s infinite`,
              opacity: 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
}
