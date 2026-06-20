export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-display font-bold text-lg tracking-tight">
          <span className="inline-block h-3 w-3 rounded-sm bg-brand" />
          per4max<span className="text-brand">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#why" className="hover:text-foreground transition-colors">Why us</a>
          <a href="#services" className="hover:text-foreground transition-colors">Services</a>
          <a href="#clients" className="hover:text-foreground transition-colors">Clients</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </nav>
        <a href="#contact" className="inline-flex items-center gap-2 rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-brand transition-colors">
          Start a project
        </a>
      </div>
    </header>
  );
}
