export function Quote() {
  return (
    <section className="relative bg-foreground text-background py-32 overflow-hidden">
      <div className="absolute inset-0 grain opacity-30" />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="text-xs font-mono text-background/50 uppercase tracking-widest mb-8">
          / 01 — our philosophy
        </div>
        <blockquote className="font-display text-3xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight">
          <span className="text-brand">"</span>
          Modern brands aren't built by
          spending more. They're built by
          <em className="italic font-light"> thinking sharper</em> — connecting
          strategy, media, and technology into one engine that compounds.
          <span className="text-brand">"</span>
        </blockquote>
        <div className="mt-12 flex items-center gap-4">
          <div className="h-px w-12 bg-brand" />
          <div className="text-sm font-mono text-background/60">
            the per4max point of view
          </div>
        </div>
      </div>
    </section>
  );
}
