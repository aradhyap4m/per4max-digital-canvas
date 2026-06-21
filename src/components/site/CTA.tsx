import { ArrowUpRight } from "lucide-react";

export function CTA() {
  return (
    <section id="contact" className="relative bg-foreground text-background overflow-hidden">
      <div className="absolute inset-0 grain opacity-20" />
      <div className="absolute -top-40 -right-40 h-[480px] w-[480px] rounded-full bg-brand/40 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 py-32">
        <div className="text-xs font-mono text-background/50 uppercase tracking-widest mb-6">
          / 05 — let's build
        </div>
        <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight max-w-4xl">
          Got a brand that
          <br />
          deserves <span className="text-brand">attention?</span>
        </h2>
        <p className="mt-8 max-w-lg text-background/70 text-lg">
          Tell us what you're building. We'll come back within 24 hours with a point of view —
          not a deck.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href="mailto:hello@per4max.co"
            className="group inline-flex items-center gap-3 rounded-full bg-brand text-brand-foreground pl-6 pr-2 py-2 text-base font-medium hover:bg-background hover:text-foreground transition-colors"
          >
            hello@per4max.co
            <span className="h-10 w-10 rounded-full bg-background text-foreground grid place-items-center group-hover:bg-brand group-hover:text-brand-foreground transition-colors">
              <ArrowUpRight size={18} />
            </span>
          </a>
          <a
            href="#top"
            className="text-sm font-mono text-background/60 hover:text-background transition-colors"
          >
            or book a 20-min intro →
          </a>
        </div>

        <div className="mt-32 grid sm:grid-cols-3 gap-8 pt-12 border-t border-background/15 text-sm">
          <div>
            <div className="font-mono text-xs text-background/40 uppercase tracking-widest mb-2">Studio</div>
            <div>123 Signal St.<br />Brooklyn, NY</div>
          </div>
          <div>
            <div className="font-mono text-xs text-background/40 uppercase tracking-widest mb-2">Press</div>
            <div>press@per4max.co</div>
          </div>
          <div>
            <div className="font-mono text-xs text-background/40 uppercase tracking-widest mb-2">Social</div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-brand">IG</a>
              <a href="#" className="hover:text-brand">LI</a>
              <a href="#" className="hover:text-brand">X</a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between text-xs font-mono text-background/40">
          <div>© {new Date().getFullYear()} per4max</div>
          <div>strategy · consulting · media</div>
        </div>
      </div>
    </section>
  );
}
