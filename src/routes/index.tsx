import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { HeroDots } from "@/components/site/HeroDots";
import { Quote } from "@/components/site/Quote";
import { WhyUs } from "@/components/site/WhyUs";
import { Services } from "@/components/site/Services";
import { Clients } from "@/components/site/Clients";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "per4max — Media & Digital Marketing Studio" },
      {
        name: "description",
        content:
          "per4max is a media and digital marketing studio engineering attention for brands that want to be impossible to ignore.",
      },
      { property: "og:title", content: "per4max — Media & Digital Marketing Studio" },
      {
        property: "og:description",
        content: "Performance marketing, content, brand and product — under one roof.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="bg-background text-foreground">
      <Nav />
      <HeroDots />
      <Quote />
      <WhyUs />
      <Services />
      <Clients />
      <CTA />
    </main>
  );
}
