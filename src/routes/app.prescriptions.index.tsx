import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Pill } from "lucide-react";
import { prescriptionsApi } from "@/lib/api";
import { LoadingState, EmptyState } from "@/components/shared/state";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/prescriptions/")({
  head: () => ({ meta: [
    { title: "Prescriptions — Medivia" },
    { name: "description", content: "Your prescriptions." },
    { name: "robots", content: "noindex" },
  ]}),
  component: Page,
});

function Page() {
  const { data, isLoading } = useQuery({ queryKey: ["rx"], queryFn: () => prescriptionsApi.list() });
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Prescriptions</h1>
      <p className="mt-1 text-sm text-muted-foreground">All prescriptions issued to you, in one place.</p>
      <div className="mt-8">
        {isLoading ? <LoadingState rows={2} /> : !data?.length ? <EmptyState icon={Pill} title="No prescriptions yet" description="Your prescriptions from consultations will appear here." /> : (
          <div className="grid gap-4 md:grid-cols-2">
            {data.map((rx) => (
              <Link key={rx.id} to="/app/prescriptions/$id" params={{ id: rx.id }} className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground"><Pill className="h-5 w-5" /></div>
                  <div>
                    <p className="font-semibold">{rx.doctorName}</p>
                    <p className="text-xs text-muted-foreground">{new Date(rx.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm font-medium">{rx.diagnosis}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {rx.medicines.slice(0, 3).map((m) => <Badge key={m.name} variant="secondary" className="rounded-full">{m.name}</Badge>)}
                  {rx.medicines.length > 3 && <Badge variant="secondary" className="rounded-full">+{rx.medicines.length - 3} more</Badge>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
