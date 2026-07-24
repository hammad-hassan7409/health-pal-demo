import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Clock } from "lucide-react";
import { blogsApi } from "@/lib/api";
import { PageContainer, SectionHeading, LoadingState } from "@/components/shared/state";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Medivia Health Journal" },
      { name: "description", content: "Evidence-based health writing from Medivia doctors — no scare tactics, no jargon." },
      { property: "og:title", content: "Blog — Medivia Health Journal" },
      { property: "og:description", content: "Health writing from real doctors." },
    ],
  }),
  component: Page,
});

function Page() {
  const { data, isLoading } = useQuery({ queryKey: ["blog"], queryFn: () => blogsApi.list() });
  return (
    <PageContainer>
      <SectionHeading eyebrow="Journal" title="Health writing, without the noise" description="Practical, evidence-based, and written by doctors — not marketers." />
      <div className="mt-10">
        {isLoading ? <LoadingState rows={6} /> : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data?.map((p) => (
              <Link key={p.id} to="/blog/$slug" params={{ slug: p.slug }} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated">
                <div className="aspect-[16/10] overflow-hidden bg-muted">
                  <img src={p.cover} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-[1.03]" />
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-primary">{p.category}</span>
                  <h3 className="mt-2 text-lg font-semibold leading-snug group-hover:text-primary">{p.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{p.author}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {p.readMinutes} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
