import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Users, TrendingUp, MessageSquare, Video, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/doctor")({
  head: () => ({ meta: [
    { title: "Doctor Dashboard — Medivia" },
    { name: "description", content: "Your practice, at a glance." },
    { name: "robots", content: "noindex" },
  ]}),
  component: DoctorDashboard,
});

function DoctorDashboard() {
  const today = [
    { name: "Sarah Ahmed", time: "10:00 AM", reason: "Follow up · hypertension", type: "video" },
    { name: "Kamran L.", time: "11:30 AM", reason: "Chest pain", type: "video" },
    { name: "Nadia Q.", time: "02:00 PM", reason: "Routine check", type: "clinic" },
    { name: "Bilal K.", time: "03:15 PM", reason: "ECG review", type: "chat" },
  ];
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Good morning, Doctor</p>
          <h1 className="text-3xl font-semibold tracking-tight">Dr. Ayesha Khan</h1>
        </div>
        <div className="flex gap-2"><Button variant="outline">Availability</Button><Button>New prescription</Button></div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { i: Calendar, k: "12", l: "Today's appointments" },
          { i: Users, k: "348", l: "Active patients" },
          { i: TrendingUp, k: "PKR 84k", l: "Monthly income" },
          { i: Star, k: "4.9", l: "Average rating" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary"><s.i className="h-5 w-5" /></span>
            <p className="mt-4 text-3xl font-semibold">{s.k}</p>
            <p className="text-sm text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Today's schedule</h2>
            <Link to="/app/messages" className="text-sm text-primary hover:underline">Messages →</Link>
          </div>
          <div className="space-y-3">
            {today.map((a, i) => (
              <div key={i} className="flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary"><Clock className="h-5 w-5" /></div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{a.name}</p>
                  <p className="text-sm text-muted-foreground">{a.reason}</p>
                </div>
                <Badge variant="secondary" className="rounded-full">{a.time}</Badge>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm"><MessageSquare className="h-4 w-4" /></Button>
                  <Button size="sm"><Video className="h-4 w-4" /> Start</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="text-sm font-semibold">Income summary</h3>
          <p className="mt-2 text-3xl font-semibold text-primary">PKR 84,500</p>
          <p className="text-xs text-muted-foreground">This month · +12% vs last</p>
          <div className="mt-4 flex h-32 items-end gap-1">
            {[35, 52, 48, 66, 71, 58, 84].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-md bg-primary/20" style={{ height: `${h}%` }}>
                <div className="h-full rounded-t-md bg-primary" style={{ height: `${h}%` }} />
              </div>
            ))}
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground">Mon — Sun</p>
        </div>
      </div>
    </div>
  );
}
