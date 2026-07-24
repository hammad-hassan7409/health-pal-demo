import { Link, Outlet, useRouterState, useNavigate, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard, Calendar, MessageSquare, FileText, Pill, CreditCard, Receipt,
  User, Settings as SettingsIcon, Bell, Video, Stethoscope, Menu, LogOut, Users, ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app")({
  head: () => ({ meta: [
    { title: "Dashboard — Medivia" },
    { name: "description", content: "Your Medivia dashboard." },
    { name: "robots", content: "noindex" },
  ]}),
  component: AppLayout,
});

const patientNav = [
  { to: "/app/patient", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/messages", label: "Messages", icon: MessageSquare },
  { to: "/app/reports", label: "Medical Reports", icon: FileText },
  { to: "/app/prescriptions", label: "Prescriptions", icon: Pill },
  { to: "/app/payments", label: "Payments", icon: CreditCard },
  { to: "/app/invoices", label: "Invoices", icon: Receipt },
  { to: "/app/notifications", label: "Notifications", icon: Bell },
] as const;

const roleShortcuts = [
  { to: "/app/doctor", label: "Doctor view", icon: Stethoscope },
  { to: "/app/admin", label: "Admin view", icon: ShieldCheck },
] as const;

function SidebarContent({ onNav }: { onNav?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="flex h-full flex-col">
      <Link to="/" className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground"><Stethoscope className="h-5 w-5" /></span>
        <span className="text-lg font-semibold">Medivia</span>
      </Link>
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        <p className="px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Patient</p>
        {patientNav.map((l) => {
          const active = pathname === l.to || (l.to !== "/app/patient" && pathname.startsWith(l.to));
          return (
            <Link key={l.to} to={l.to} onClick={onNav}
              className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:bg-sidebar-accent hover:text-foreground")}>
              <l.icon className="h-4 w-4" /> {l.label}
            </Link>
          );
        })}
        <p className="mt-4 px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Switch role (demo)</p>
        {roleShortcuts.map((l) => {
          const active = pathname.startsWith(l.to);
          return (
            <Link key={l.to} to={l.to} onClick={onNav}
              className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:bg-sidebar-accent hover:text-foreground")}>
              <l.icon className="h-4 w-4" /> {l.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-sidebar-border p-3">
        <Link to="/app/profile" className="flex items-center gap-3 rounded-xl p-2 hover:bg-sidebar-accent">
          <Avatar className="h-9 w-9"><AvatarFallback>AR</AvatarFallback></Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">Ali Raza</p>
            <p className="truncate text-xs text-muted-foreground">Patient</p>
          </div>
          <SettingsIcon className="h-4 w-4 text-muted-foreground" />
        </Link>
      </div>
    </div>
  );
}

function AppLayout() {
  const nav = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  // If someone lands on exactly /app, send them to the patient dashboard.
  if (pathname === "/app") { nav({ to: "/app/patient", replace: true }); }

  return (
    <div className="flex min-h-screen bg-surface/40">
      <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar lg:block">
        <SidebarContent />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl md:px-8">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu"><Menu className="h-5 w-5" /></Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0"><SheetTitle className="sr-only">Menu</SheetTitle><SidebarContent onNav={() => setOpen(false)} /></SheetContent>
          </Sheet>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/app/notifications"><Button variant="ghost" size="icon" aria-label="Notifications"><Bell className="h-5 w-5" /></Button></Link>
            <Link to="/app/consultation/$id" params={{ id: "demo" }}><Button size="sm"><Video className="h-4 w-4" /> Join call</Button></Link>
            <button onClick={() => { if (typeof window !== "undefined") window.localStorage.removeItem("auth_token"); nav({ to: "/" }); }}
              aria-label="Log out" className="ml-1 grid h-9 w-9 place-items-center rounded-xl hover:bg-accent">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
