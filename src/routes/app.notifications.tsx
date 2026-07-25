import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Bell, MessageSquare, Calendar, CreditCard, Info } from "lucide-react";
import { notificationsApi } from "@/lib/api";
import { LoadingState, EmptyState } from "@/components/shared/state";
import { getViewer, type Viewer } from "@/lib/viewer";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/notifications")({
  head: () => ({ meta: [
    { title: "Notifications — Medivia" },
    { name: "description", content: "Your latest notifications." },
    { name: "robots", content: "noindex" },
  ]}),
  component: Page,
});
const icons = { appointment: Calendar, message: MessageSquare, payment: CreditCard, system: Info };

function Page() {
  const [viewer, setV] = useState<Viewer | null>(null);
  useEffect(() => { setV(getViewer()); }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["notifications", viewer?.role, viewer?.id],
    queryFn: () => notificationsApi.list({
      role: viewer!.role,
      doctorId: viewer!.role === "doctor" ? viewer!.id : undefined,
      patientId: viewer!.role === "patient" ? viewer!.id : undefined,
    }),
    enabled: !!viewer,
  });

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Notifications</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {viewer ? `Signed in as ${viewer.name} · ${viewer.role}` : "Everything worth your attention, in one calm feed."}
      </p>
      <div className="mt-8">
        {isLoading || !viewer ? <LoadingState rows={4} /> : !data?.length ? <EmptyState icon={Bell} title="You're all caught up" /> : (
          <div className="divide-y divide-border rounded-2xl border border-border bg-card shadow-soft">
            {data.map((n) => {
              const Icon = icons[n.kind];
              return (
                <div key={n.id} className={cn("flex items-start gap-4 p-5", !n.read && "bg-primary-soft/40")}>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary"><Icon className="h-4 w-4" /></span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{n.title}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
                  </div>
                  <span className="whitespace-nowrap text-xs text-muted-foreground">{n.time}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
