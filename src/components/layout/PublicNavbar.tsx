import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, Stethoscope, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const links = [
  { to: "/", label: "Home" },
  { to: "/doctors", label: "Doctors" },
  { to: "/specializations", label: "Specializations" },
  { to: "/online-consultation", label: "Online Consultation" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function PublicNavbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center gap-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-soft">
            <Stethoscope className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">Medivia</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "text-primary" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/doctors/search"
            aria-label="Search doctors"
            className="hidden h-10 w-10 items-center justify-center rounded-xl border border-border hover:bg-accent md:inline-flex"
          >
            <Search className="h-4 w-4" />
          </Link>
          <Link to="/auth/login" className="hidden md:block">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link to="/auth/signup" className="hidden md:block">
            <Button variant="outline" size="sm">Sign up</Button>
          </Link>
          <Link to="/doctors" className="hidden sm:block">
            <Button size="sm">Book Appointment</Button>
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
                    <Stethoscope className="h-5 w-5" />
                  </span>
                  <span className="text-lg font-semibold">Medivia</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close menu"><X className="h-5 w-5" /></Button>
              </div>
              <nav className="mt-6 flex flex-col gap-1">
                {links.map((l) => (
                  <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-base font-medium hover:bg-accent">
                    {l.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 flex flex-col gap-2">
                <Link to="/auth/login" onClick={() => setOpen(false)}><Button variant="outline" className="w-full">Login</Button></Link>
                <Link to="/auth/signup" onClick={() => setOpen(false)}><Button variant="ghost" className="w-full">Sign up</Button></Link>
                <Link to="/doctors" onClick={() => setOpen(false)}><Button className="w-full">Book Appointment</Button></Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
