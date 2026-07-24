import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import * as Icons from "lucide-react";
import { departmentsApi } from "@/lib/api";
import { PageContainer, SectionHeading, LoadingState } from "@/components/shared/state";

export const Route = createFileRoute("/departments/")({
  head: () => ({
    meta: [
      { title: "Departments — Medivia" },
      { name: "description", content: "Explore Medivia's twelve core medical departments, from Cardiology to Endocrinology." },
      { property: "og:title", content: "Departments — Medivia" },
      { property: "og:description", content: "All medical departments in one place." },
    ],
  }),
  component: DepartmentsPage,
});

function DepartmentsPage() {
  const { data, isLoading } = useQuery({ queryKey: ["departments"], queryFn: () => departmentsApi.list() });
  return (
    <PageContainer>
      <SectionHeading eyebrow="Departments" title="Care across every specialty" description="Twelve core departments, 2,400+ verified specialists." />
      <div className="mt-10">
        {isLoading ? <LoadingState rows={6} /> : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data?.map((d) => {
              const Icon = (Icons as any)[d.icon] ?? Icons.Stethoscope;
              return (
                <Link key={d.id} to="/doctors" className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elevated">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary group-hover:bg-primary group-hover:text-primary-foreground"><Icon className="h-5 w-5" /></span>
                  <div>
                    <h3 className="font-semibold">{d.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{d.description}</p>
                    <p className="mt-3 text-xs font-medium text-primary">{d.doctorsCount} doctors →</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
