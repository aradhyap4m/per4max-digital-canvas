import { useEffect, useRef, useState } from "react";
import { Compass, Layers, Cpu, BarChart3, Globe2 } from "lucide-react";

const items = [
  {
    icon: Compass,
    title: "Strategy-led, always",
    body:
      "Every engagement starts with a sharp point of view. We map the market, the buyer, and the moment — so the work that follows is built on conviction, not guesswork.",
  },
  {
    icon: Layers,
    title: "Integrated by design",
    body:
      "Strategy, media, creative, and tech sit on one team and one P&L. No silos, no finger-pointing — just a single engine moving your brand forward.",
  },
  {
    icon: Cpu,
    title: "Tech and AI fluent",
    body:
      "We operate the modern marketing stack — automation, AI, CRM, analytics — and use it to compress timelines and unlock outcomes legacy agencies can't match.",
  },
  {
    icon: BarChart3,
    title: "Outcomes over outputs",
    body:
      "We're measured the way our clients are: pipeline, revenue, share. Reporting is honest, frequent, and tied to the metrics that actually move the business.",
  },
  {
    icon: Globe2,
    title: "Built for ambitious brands",
    body:
      "From category challengers to global leaders, we partner with teams who want to grow faster than the market — and have the appetite to do what it takes.",
  },
];

export function WhyUs() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / total, 0), 0.9999);
      const idx = Math.floor(progress * items.length);
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const angleStep = 360 / items.length;
  const rotation = -active * angleStep;

  return (
    <section
      id="why"
      ref={sectionRef}
      className="relative bg-background"
      style={{ height: `${items.length * 90}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center">
        <div className="mx-auto max-w-7xl w-full px-6 grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">
              / 02 — why per4max
            </div>
            <div className="space-y-2 mb-8">
              {items.map((_, i) => (
                <div
                  key={i}
                  className={`h-0.5 transition-all duration-500 ${
                    i === active ? "bg-brand w-12" : "bg-border w-6"
                  }`}
                />
              ))}
            </div>
            <div key={active} className="reveal-up">
              <h3 className="font-display text-4xl sm:text-6xl font-bold leading-tight tracking-tight">
                {items[active].title}
              </h3>
              <p className="mt-6 text-lg text-muted-foreground max-w-md">
                {items[active].body}
              </p>
              <div className="mt-8 font-mono text-sm text-muted-foreground">
                {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </div>
            </div>
          </div>

          {/* Rotating plate */}
          <div className="relative aspect-square max-w-[520px] w-full mx-auto">
            <div
              className="absolute inset-0 rounded-full border border-border transition-transform duration-700 ease-out"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <div className="absolute inset-6 rounded-full border border-dashed border-border/60" />
              <div className="absolute inset-16 rounded-full border border-border/40" />
              {items.map((item, i) => {
                const Icon = item.icon;
                const angle = (i * angleStep - 90) * (Math.PI / 180);
                const radius = 44; // percent
                const x = 50 + Math.cos(angle) * radius;
                const y = 50 + Math.sin(angle) * radius;
                const isActive = i === active;
                const size = isActive ? 110 : 56;
                return (
                  <div
                    key={i}
                    className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      width: size,
                      height: size,
                      transform: `translate(-50%, -50%) rotate(${-rotation}deg)`,
                    }}
                  >
                    <div
                      className={`w-full h-full rounded-2xl flex items-center justify-center border transition-colors duration-500 ${
                        isActive
                          ? "bg-brand text-brand-foreground border-brand shadow-2xl"
                          : "bg-background text-muted-foreground border-border"
                      }`}
                    >
                      <Icon
                        size={isActive ? 44 : 22}
                        strokeWidth={isActive ? 1.8 : 1.5}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            {/* center mark */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-brand" />
          </div>
        </div>
      </div>
    </section>
  );
}
