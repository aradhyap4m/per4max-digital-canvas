import { ArrowUpRight } from "lucide-react";

const services = [
  {
    n: "01",
    title: "Go To Market Strategy",
    tag: "strategy · positioning · launch",
    body:
      "End-to-end GTM planning that turns product-market fit into market dominance. We architect the path from idea to revenue — messaging, channel strategy, and launch sequencing.",
    points: ["Market Research", "Positioning", "Launch Playbooks", "Revenue Planning"],
  },
  {
    n: "02",
    title: "Business Consulting",
    tag: "growth · operations · transformation",
    body:
      "Strategic advisory for leaders who need clarity, not more reports. We diagnose bottlenecks, design operating models, and build roadmaps that teams can actually execute.",
    points: ["Growth Strategy", "Operational Design", "KPI Frameworks", "Board Advisory"],
  },
  {
    n: "03",
    title: "Integrated Media Services",
    tag: "media · planning · buying",
    body:
      "Unified media strategy across every touchpoint. We plan, buy, and optimize across traditional and digital channels — one budget, one team, one coherent message.",
    points: ["Media Planning", "Programmatic", "Traditional Media", "Cross-Channel Optimization"],
  },
  {
    n: "04",
    title: "Digital Marketing & Transformation",
    tag: "digital · performance · martech",
    body:
      "Full-stack digital marketing that moves the needle. From paid acquisition to marketing automation, we build high-performing digital engines and transform how brands grow online.",
    points: ["Paid Media", "SEO & Content", "Marketing Automation", "Analytics"],
  },
  {
    n: "05",
    title: "Experiential Events",
    tag: "events · activations · experiences",
    body:
      "Live moments that audiences remember and share. From product launches to brand activations, we design experiences that create emotional connections and measurable buzz.",
    points: ["Brand Activations", "Product Launches", "Pop-Ups", "Virtual & Hybrid Events"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative bg-surface-muted">
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-12">
        <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
          / 03 — services
        </div>
        <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight max-w-3xl">
          Everything you need to <span className="text-brand">launch and grow.</span>
        </h2>
      </div>

      <div>
        {services.map((s, i) => (
          <div
            key={s.n}
            className="sticky top-16"
            style={{ top: `${64 + i * 24}px` }}
          >
            <article className="mx-auto max-w-7xl px-6">
              <div className="rounded-3xl bg-background border border-border shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)] overflow-hidden">
                <div className="grid lg:grid-cols-[1fr_1.2fr] min-h-[70vh]">
                  <div className="p-10 lg:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border">
                    <div>
                      <div className="font-mono text-sm text-brand">{s.n}</div>
                      <div className="mt-3 font-mono text-xs text-muted-foreground uppercase tracking-widest">
                        {s.tag}
                      </div>
                      <h3 className="mt-6 font-display text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">
                        {s.title}
                      </h3>
                      <p className="mt-6 text-muted-foreground max-w-md">{s.body}</p>
                    </div>
                    <div className="mt-10">
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 text-sm font-medium hover:text-brand transition-colors"
                      >
                        Start a conversation <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </div>
                  <div className="p-10 lg:p-14 bg-foreground text-background flex flex-col justify-between">
                    <ul className="space-y-4">
                      {s.points.map((p) => (
                        <li
                          key={p}
                          className="flex items-center justify-between border-b border-background/15 pb-4"
                        >
                          <span className="font-display text-2xl sm:text-3xl">{p}</span>
                          <ArrowUpRight size={20} className="text-brand" />
                        </li>
                      ))}
                    </ul>
                    <div className="mt-10 font-mono text-xs text-background/50 uppercase tracking-widest">
                      capability · {s.n}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        ))}
        <div className="h-24" />
      </div>
    </section>
  );
}
