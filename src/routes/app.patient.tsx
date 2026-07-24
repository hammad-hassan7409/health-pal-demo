import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Video, MessageSquare, FileText, ChevronRight, Star, Pill, Heart } from "lucide-react";
import { appointmentsApi, doctorsApi } from "@/lib/api";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DoctorCard } from "@/components/shared/DoctorCard";
import { EmptyState, LoadingState } from "@/components/shared/state";

export const Route = createFileRoute("/app/patient")({
  head: () => ({ meta: [
    { title: "Patient Dashboard — Medivia" },
    { name: "description", content: "Your health, at a glance." },
    { name: "robots", content: "noindex" },
  ]}),
  component: Dashboard,
});

function Dashboard() {
  const apts = useQuery({ queryKey: ["apts", "all"], queryFn: () => appointmentsApi.list() });
  const featured = useQuery({ queryKey: ["doctors", "featured"], queryFn: () => doctorsApi.featured() });

  const upcoming = apts.data?.filter((a) => a.status === "upcoming") ?? [];
  const completed = apts.data?.filter((a) => a.status === "completed") ?? [];
  const cancelled = apts.data?.filter((a) => a.status === "cancelled") ?? [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Welcome back</p>
          <h1 className="text-3xl font-semibold tracking-tight">Ali Raza</h1>
        </div>
        <Link to="/doctors"><Button size="lg">Book new consultation</Button></Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Calendar, k: upcoming.length, l: "Upcoming appointments" },
          { icon: FileText, k: 3, l: "Medical reports" },
          { icon: Pill, k: 5, l: "Prescriptions" },
          { icon: Heart, k: 4, l: "Favourite doctors" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary"><s.icon className="h-5 w-5" /></span>
            <p className="mt-4 text-3xl font-semibold">{s.k}</p>
            <p className="text-sm text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">My appointments</h2>
          <Link to="/doctors" className="text-sm text-primary hover:underline">Book new →</Link>
        </div>
        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({cancelled.length})</TabsTrigger>
          </TabsList>
          {(["upcoming","completed","cancelled"] as const).map((k) => {
            const list = { upcoming, completed, cancelled }[k];
            return (
              <TabsContent key={k} value={k} className="mt-4">
                {apts.isLoading ? <LoadingState rows={2} /> : list.length === 0 ? (
                  <EmptyState icon={Calendar} title={`No ${k} appointments`} description="Book a consultation to see it here." action={<Link to="/doctors"><Button>Find a doctor</Button></Link>} />
                ) : (
                  <div className="space-y-3">
                    {list.map((a) => (
                      <div key={a.id} className="flex flex-col gap-4 rounded-xl border border-border bg-surface/40 p-4 sm:flex-row sm:items-center">
                        <img src={a.doctorPhoto} alt="" className="h-14 w-14 rounded-xl object-cover" />
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold">{a.doctorName}</p>
                          <p className="text-sm text-muted-foreground">{a.specialization} · {a.reason}</p>
                          <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
                            <Badge variant="secondary" className="rounded-full">{new Date(a.date).toLocaleDateString()}</Badge>
                            <Badge variant="secondary" className="rounded-full">{a.time}</Badge>
                            <Badge variant="secondary" className="rounded-full capitalize">{a.type}</Badge>
                          </div>
                        </div>
                        {k === "upcoming" && (
                          <div className="flex gap-2">
                            <Link to="/app/messages"><Button variant="outline" size="sm"><MessageSquare className="h-4 w-4" /></Button></Link>
                            <Link to="/app/consultation/$id" params={{ id: a.id }}><Button size="sm"><Video className="h-4 w-4" /> Join</Button></Link>
                          </div>
                        )}
                        {k === "completed" && <Link to="/app/prescriptions/$id" params={{ id: "rx-1" }}><Button variant="outline" size="sm">View Rx</Button></Link>}
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2"><Heart className="h-5 w-5 text-destructive" /> Favourite doctors</h2>
          <Link to="/doctors" className="text-sm text-primary hover:underline inline-flex items-center">Browse all <ChevronRight className="h-4 w-4" /></Link>
        </div>
        {featured.isLoading ? <LoadingState rows={3} /> : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featured.data?.slice(0, 3).map((d) => <DoctorCard key={d.id} doctor={d} />)}
          </div>
        )}
      </div>
    </div>
  );
}
