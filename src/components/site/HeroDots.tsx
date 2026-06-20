import { useEffect, useRef, useState } from "react";

/**
 * Interactive dot grid. Dots near the cursor connect with lines and shift
 * subtly toward the pointer. After mount, headline text reveals on top.
 */
export function HeroDots() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let dots: { x: number; y: number; ox: number; oy: number }[] = [];
    const pointer = { x: -9999, y: -9999, active: false };
    const SPACING = 38;
    const INFLUENCE = 140;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;
      const offX = (width - (cols - 1) * SPACING) / 2;
      const offY = (height - (rows - 1) * SPACING) / 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = offX + c * SPACING;
          const y = offY + r * SPACING;
          dots.push({ x, y, ox: x, oy: y });
        }
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const css = getComputedStyle(document.documentElement);
    const ink = css.getPropertyValue("--ink").trim() || "oklch(0.16 0.01 270)";
    const brand = css.getPropertyValue("--brand").trim() || "oklch(0.55 0.22 28)";

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      // update dots
      for (const d of dots) {
        const dx = pointer.x - d.ox;
        const dy = pointer.y - d.oy;
        const dist = Math.hypot(dx, dy);
        if (pointer.active && dist < INFLUENCE) {
          const f = (1 - dist / INFLUENCE) * 14;
          d.x = d.ox + (dx / dist) * f;
          d.y = d.oy + (dy / dist) * f;
        } else {
          d.x += (d.ox - d.x) * 0.08;
          d.y += (d.oy - d.y) * 0.08;
        }
      }
      // connecting lines near pointer
      if (pointer.active) {
        const near = dots.filter(
          (d) => Math.hypot(d.x - pointer.x, d.y - pointer.y) < INFLUENCE
        );
        for (let i = 0; i < near.length; i++) {
          for (let j = i + 1; j < near.length; j++) {
            const a = near[i];
            const b = near[j];
            const dd = Math.hypot(a.x - b.x, a.y - b.y);
            if (dd < SPACING * 1.6) {
              const alpha = (1 - dd / (SPACING * 1.6)) * 0.55;
              ctx.strokeStyle = `color-mix(in oklch, ${brand} ${Math.round(
                alpha * 100
              )}%, transparent)`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }
      // dots
      for (const d of dots) {
        const dist = pointer.active
          ? Math.hypot(d.x - pointer.x, d.y - pointer.y)
          : Infinity;
        const isNear = dist < INFLUENCE;
        const r = isNear ? 2.4 - (dist / INFLUENCE) * 1.2 : 1.1;
        ctx.fillStyle = isNear ? brand : ink;
        ctx.globalAlpha = isNear ? 0.95 : 0.28;
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    const t = setTimeout(() => setReady(true), 400);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      clearTimeout(t);
    };
  }, []);

  return (
    <section
      id="top"
      ref={wrapRef}
      className="relative w-full min-h-screen overflow-hidden bg-background"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none flex items-center">
        <div className="mx-auto max-w-7xl w-full px-6">
          <div className={ready ? "reveal-up" : "opacity-0"}>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 backdrop-blur px-3 py-1 text-xs font-mono text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
              media · digital · performance
            </div>
            <h1 className="mt-6 font-display font-bold text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tight max-w-5xl">
              Where signals
              <br />
              become <span className="text-brand">stories.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. per4max is a media and
              digital marketing studio connecting brands to the people who matter.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 pointer-events-auto">
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-md bg-foreground text-background px-5 py-3 text-sm font-medium hover:bg-brand transition-colors"
              >
                See what we do
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background/80 backdrop-blur px-5 py-3 text-sm font-medium hover:border-foreground transition-colors"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-0 right-0 flex justify-center text-xs font-mono text-muted-foreground/70 pointer-events-none">
        scroll ↓
      </div>
    </section>
  );
}
