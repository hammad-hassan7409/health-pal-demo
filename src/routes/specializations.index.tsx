import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import * as Icons from "lucide-react";
import { departmentsApi } from "@/lib/api";
import { PageContainer, SectionHeading, LoadingState } from "@/components/shared/state";

export const Route = createFileRoute("/specializations/")({
  head: () => ({
    meta: [
      { title: "Specializations — Medivia" },
      { name: "description", content: "All medical specializations available for online consultation on Medivia." },
      { property: "og:title", content: "Specializations — Medivia" },
      { property: "og:description", content: "All medical specializations at a glance." },
    ],
  }),
  component: Page,
});

function Page() {
  const { data, isLoading } = useQuery({ queryKey: ["departments"], queryFn: () => departmentsApi.list() });
  return (
    <PageContainer>
      <SectionHeading eyebrow="Specializations" title="Every specialization, one platform" description="From routine care to rare specialties — book a verified expert in minutes." />
      <div className="mt-10">
        {isLoading ? <LoadingState rows={6} /> : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {data?.map((d) => {
              const Icon = (Icons as any)[d.icon] ?? Icons.Stethoscope;
              return (
                <Link key={d.id} to="/doctors" className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elevated">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary group-hover:bg-primary group-hover:text-primary-foreground"><Icon className="h-5 w-5" /></span>
                  <h3 className="font-medium">{d.name}</h3>
                  <p className="text-xs text-muted-foreground">{d.doctorsCount} doctors</p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
