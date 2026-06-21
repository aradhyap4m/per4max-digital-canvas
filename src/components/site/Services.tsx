import { ArrowUpRight } from "lucide-react";

const services = [
  {
    n: "01",
    title: "Go To Market Strategy",
    tag: "positioning · narrative · launch",
    body:
      "We help brands enter, expand, and disrupt categories. From audience and competitive insight to positioning, narrative, and launch architecture — we build the playbook that turns ambition into traction.",
    points: ["Market & Audience Research", "Positioning & Messaging", "Launch Architecture", "Revenue Modeling"],
  },
  {
    n: "02",
    title: "Business Consulting",
    tag: "advisory · growth · transformation",
    body:
      "Senior advisory for founders and CMOs navigating growth, change, or scale. We diagnose the real bottlenecks, design operating models that work, and partner with leadership to execute against them.",
    points: ["Growth Strategy", "Operating Model Design", "Marketing Org Design", "Board & C-Suite Advisory"],
  },
  {
    n: "03",
    title: "Integrated Media Services",
    tag: "planning · buying · optimization",
    body:
      "One team, one media plan, every channel. We plan and buy across digital, programmatic, social, OTT, and traditional — orchestrating spend around the audiences and moments that actually drive results.",
    points: ["Media Strategy & Planning", "Programmatic & Paid Social", "Connected TV & OOH", "Cross-Channel Optimization"],
  },
  {
    n: "04",
    title: "Digital Marketing & Transformation",
    tag: "performance · martech · automation",
    body:
      "Full-stack digital execution and the systems behind it. We run performance campaigns, build CRM and lifecycle programs, and modernize the marketing stack so growth is repeatable, not lucky.",
    points: ["Performance & Paid Media", "SEO, Content & Organic", "CRM, Lifecycle & Automation", "Martech & Analytics"],
  },
  {
    n: "05",
    title: "Experiential Events",
    tag: "activations · events · IRL + virtual",
    body:
      "Live moments that earn attention long after the room empties. Launches, summits, pop-ups, and hybrid experiences designed for emotion, content, and measurable lift.",
    points: ["Brand Activations", "Product & Press Launches", "Pop-Ups & Field Marketing", "Virtual & Hybrid Events"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative bg-surface-muted">
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-12">
        <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
          / 03 — what we do
        </div>
        <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight max-w-3xl">
          Five capabilities. <span className="text-brand">One growth engine.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-muted-foreground text-lg">
          We operate as an extension of your team — designing the strategy, running the media,
          and wiring up the technology that turns marketing into a compounding asset.
        </p>
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
