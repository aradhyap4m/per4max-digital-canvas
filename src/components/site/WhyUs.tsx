import { useEffect, useRef, useState } from "react";
import { Zap, Target, Sparkles, LineChart, Rocket } from "lucide-react";

const items = [
  {
    icon: Zap,
    title: "Velocity that compounds",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. We ship campaigns in days, not quarters — every iteration faster than the last.",
  },
  {
    icon: Target,
    title: "Precision targeting",
    body:
      "Audiences sliced by signal, not assumption. We find the exact rooms your buyers live in and walk you through the door.",
  },
  {
    icon: Sparkles,
    title: "Creative with teeth",
    body:
      "Beautiful work that performs. Our studio pairs art directors with data scientists so every frame earns its place on the timeline.",
  },
  {
    icon: LineChart,
    title: "Measurement, honestly",
    body:
      "No vanity dashboards. Just the numbers that move the business, reported in the language of your boardroom.",
  },
  {
    icon: Rocket,
    title: "Built to scale",
    body:
      "From scrappy launches to global rollouts, the same team carries the work — no hand-offs, no dropped batons.",
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
              / 02 — the difference
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
