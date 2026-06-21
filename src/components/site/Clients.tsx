const logos = [
  "Northwind", "Acme Co", "Globex", "Initech", "Umbrella",
  "Stark Ind", "Wayne Ent", "Soylent", "Hooli", "Pied Piper",
  "Massive Dyn", "Tyrell", "Vandelay",
];

export function Clients() {
  const row = [...logos, ...logos];
  return (
    <section id="clients" className="bg-background py-24 border-y border-border overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 mb-10 flex items-end justify-between gap-6">
        <div>
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
            / 04 — partners in growth
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            The brands we build with.
          </h2>
        </div>
        <div className="hidden sm:block font-mono text-xs text-muted-foreground">
          challengers · category leaders · global brands
        </div>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex marquee w-max">
          {row.map((name, i) => (
            <div
              key={i}
              className="flex items-center justify-center px-12 py-6 min-w-[200px] border-r border-border"
            >
              <span className="font-display text-2xl font-semibold text-muted-foreground/70 hover:text-brand transition-colors whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
