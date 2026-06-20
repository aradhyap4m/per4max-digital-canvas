import { useEffect, useRef, useState } from "react";

/**
 * Hero intro sequence:
 *  1) scattered particles drift in random positions
 *  2) they fly toward the center and condense into a rotating ray of light
 *  3) the ray explodes outward and particles return to drifting
 *  4) headline reveals in the center
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
    let cx = 0;
    let cy = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = {
      x: number; y: number;
      sx: number; sy: number;   // scatter pos
      ex: number; ey: number;   // explode pos
      angle: number; radius: number; // ray pos (polar around center)
      r: number;
      hue: number;
    };
    let particles: P[] = [];
    const COUNT = 260;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      cx = width / 2;
      cy = height / 2;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < COUNT; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = rand(20, Math.min(width, height) * 0.42);
        particles.push({
          x: 0, y: 0,
          sx: rand(0, width),
          sy: rand(0, height),
          ex: rand(-width * 0.2, width * 1.2),
          ey: rand(-height * 0.2, height * 1.2),
          angle,
          radius,
          r: rand(0.6, 2.2),
          hue: Math.random(),
        });
      }
    };

    const css = getComputedStyle(document.documentElement);
    const ink = css.getPropertyValue("--ink").trim() || "oklch(0.16 0.01 270)";
    const brand = css.getPropertyValue("--brand").trim() || "oklch(0.55 0.22 28)";

    // Timeline (ms)
    const T_SCATTER = 900;   // 0 -> 900: drifting scatter
    const T_CONVERGE = 1100; // 900 -> 2000: fly to center & form ray
    const T_HOLD = 700;      // 2000 -> 2700: spin the ray
    const T_EXPLODE = 900;   // 2700 -> 3600: explode outward
    const T_TOTAL = T_SCATTER + T_CONVERGE + T_HOLD + T_EXPLODE;

    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const start = performance.now();
    let raf = 0;
    let drift = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      drift += 0.004;
      ctx.clearRect(0, 0, width, height);

      // Determine phase
      let phase: "scatter" | "converge" | "hold" | "explode" | "done";
      let local = 0;
      if (elapsed < T_SCATTER) {
        phase = "scatter";
        local = elapsed / T_SCATTER;
      } else if (elapsed < T_SCATTER + T_CONVERGE) {
        phase = "converge";
        local = (elapsed - T_SCATTER) / T_CONVERGE;
      } else if (elapsed < T_SCATTER + T_CONVERGE + T_HOLD) {
        phase = "hold";
        local = (elapsed - T_SCATTER - T_CONVERGE) / T_HOLD;
      } else if (elapsed < T_TOTAL) {
        phase = "explode";
        local = (elapsed - T_SCATTER - T_CONVERGE - T_HOLD) / T_EXPLODE;
      } else {
        phase = "done";
        local = 1;
      }

      // Ray glow during converge -> hold -> explode start
      if (phase === "converge" || phase === "hold" || phase === "explode") {
        let glow = 0;
        if (phase === "converge") glow = ease(local);
        else if (phase === "hold") glow = 1;
        else glow = 1 - ease(local);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(width, height) * 0.45);
        grad.addColorStop(0, `color-mix(in oklch, ${brand} ${Math.round(glow * 70)}%, transparent)`);
        grad.addColorStop(0.4, `color-mix(in oklch, ${brand} ${Math.round(glow * 18)}%, transparent)`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // rotating ray beams
        const beamRot =
          (phase === "converge" ? local * 1.5 :
           phase === "hold" ? 1.5 + local * 2.5 :
           4 + local * 1.5);
        const beamAlpha =
          phase === "converge" ? ease(local) :
          phase === "hold" ? 1 :
          1 - ease(local);
        const beams = 6;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(beamRot * Math.PI);
        for (let i = 0; i < beams; i++) {
          const a = (i / beams) * Math.PI * 2;
          const len = Math.min(width, height) * 0.5;
          const g = ctx.createLinearGradient(0, 0, Math.cos(a) * len, Math.sin(a) * len);
          g.addColorStop(0, `color-mix(in oklch, ${brand} ${Math.round(beamAlpha * 85)}%, transparent)`);
          g.addColorStop(1, "transparent");
          ctx.strokeStyle = g;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(a) * len, Math.sin(a) * len);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Particles
      for (const p of particles) {
        let x = 0, y = 0, alpha = 1, isBrand = false;

        if (phase === "scatter") {
          // gentle drift around scatter origin
          x = p.sx + Math.sin(drift + p.hue * 6) * 6;
          y = p.sy + Math.cos(drift + p.hue * 6) * 6;
          alpha = 0.35 + ease(local) * 0.35;
        } else if (phase === "converge") {
          const t = ease(local);
          // ray target position
          const rotation = local * 1.5 * Math.PI;
          const rad = p.radius * (1 - t * 0.55); // pull inward
          const tx = cx + Math.cos(p.angle + rotation) * rad;
          const ty = cy + Math.sin(p.angle + rotation) * rad;
          x = p.sx + (tx - p.sx) * t;
          y = p.sy + (ty - p.sy) * t;
          alpha = 0.7;
          isBrand = t > 0.55;
        } else if (phase === "hold") {
          const rotation = (1.5 + local * 2.5) * Math.PI;
          const rad = p.radius * 0.45 + Math.sin(now * 0.005 + p.hue * 10) * 4;
          x = cx + Math.cos(p.angle + rotation) * rad;
          y = cy + Math.sin(p.angle + rotation) * rad;
          alpha = 0.95;
          isBrand = true;
        } else if (phase === "explode") {
          const t = ease(local);
          const rotation = (4 + local * 1.5) * Math.PI;
          const rad = p.radius * 0.45;
          const sx = cx + Math.cos(p.angle + rotation) * rad;
          const sy = cy + Math.sin(p.angle + rotation) * rad;
          x = sx + (p.ex - sx) * t;
          y = sy + (p.ey - sy) * t;
          alpha = 0.95 - t * 0.65;
          isBrand = t < 0.4;
        } else {
          // done: drift gently from explode positions, settle to scatter
          const t = Math.min(1, (elapsed - T_TOTAL) / 1200);
          x = p.ex + (p.sx - p.ex) * ease(t) + Math.sin(drift + p.hue * 6) * 6;
          y = p.ey + (p.sy - p.ey) * ease(t) + Math.cos(drift + p.hue * 6) * 6;
          alpha = 0.25;
        }

        ctx.fillStyle = isBrand ? brand : ink;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(tick);
    };

    resize();
    init();
    raf = requestAnimationFrame(tick);
    const ro = new ResizeObserver(() => { resize(); init(); });
    ro.observe(wrap);

    const t = setTimeout(() => setReady(true), T_SCATTER + T_CONVERGE + T_HOLD + 200);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
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
        <div className="mx-auto max-w-7xl w-full px-6 text-center">
          <div className={ready ? "reveal-up" : "opacity-0"}>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 backdrop-blur px-3 py-1 text-xs font-mono text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
              media · digital · performance
            </div>
            <h1 className="mt-6 font-display font-bold text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tight mx-auto max-w-5xl">
              Where signals
              <br />
              become <span className="text-brand">stories.</span>
            </h1>
            <p className="mt-6 mx-auto max-w-xl text-base sm:text-lg text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. per4max is a media and
              digital marketing studio connecting brands to the people who matter.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center pointer-events-auto">
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
