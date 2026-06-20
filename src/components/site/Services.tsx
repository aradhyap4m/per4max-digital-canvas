import { ArrowUpRight } from "lucide-react";

const services = [
  {
    n: "01",
    title: "Performance Marketing",
    tag: "paid · search · social",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Full-funnel paid media across Meta, Google, TikTok and programmatic — engineered for CAC you can defend.",
    points: ["Paid social", "Search & shopping", "Programmatic", "CRO"],
  },
  {
    n: "02",
    title: "Content & Production",
    tag: "studio · video · stills",
    body:
      "An in-house studio that turns briefs into scroll-stoppers. Concept, shoot, edit, ship — all under one roof, all on one timeline.",
    points: ["Video production", "Photography", "Motion design", "Editorial"],
  },
  {
    n: "03",
    title: "Brand & Strategy",
    tag: "positioning · identity",
    body:
      "The sharp end of strategy. We unearth what makes a brand magnetic, then dress it in identity systems built to last more than one campaign cycle.",
    points: ["Positioning", "Identity systems", "Naming", "Messaging"],
  },
  {
    n: "04",
    title: "Web & Product",
    tag: "design · engineering",
    body:
      "Sites and products that feel as good as the work that drives traffic to them. Custom builds, headless stacks, and conversion-led design.",
    points: ["Web design", "Engineering", "E-commerce", "Analytics"],
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
          A studio shaped like a <span className="text-brand">flywheel.</span>
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
                        Start a brief <ArrowUpRight size={16} />
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
