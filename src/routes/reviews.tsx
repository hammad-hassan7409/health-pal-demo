import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { reviewsApi } from "@/lib/api";
import { PageContainer, SectionHeading, LoadingState } from "@/components/shared/state";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Patient Reviews — Medivia" },
      { name: "description", content: "Read genuine reviews from Medivia patients across every specialty." },
      { property: "og:title", content: "Patient Reviews — Medivia" },
      { property: "og:description", content: "Genuine patient experiences." },
    ],
  }),
  component: Page,
});
function Page() {
  const { data, isLoading } = useQuery({ queryKey: ["reviews", "all"], queryFn: () => reviewsApi.list() });
  return (
    <PageContainer>
      <SectionHeading eyebrow="Reviews" title="Voices from real consultations" description="Every review is from a verified patient after a completed consultation." />
      <div className="mt-10">
        {isLoading ? <LoadingState rows={6} /> : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data?.map((r) => (
              <figure key={r.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="flex items-center gap-3">
                  <Avatar><AvatarFallback>{r.patientName[0]}</AvatarFallback></Avatar>
                  <div>
                    <p className="text-sm font-semibold">{r.patientName}</p>
                    <div className="flex text-warning">{Array.from({length:r.rating}).map((_,i)=><Star key={i} className="h-3.5 w-3.5 fill-warning"/>)}</div>
                  </div>
                </div>
                <blockquote className="mt-4 text-sm text-muted-foreground">"{r.comment}"</blockquote>
              </figure>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
