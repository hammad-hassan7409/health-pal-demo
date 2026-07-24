import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Clock, ChevronLeft } from "lucide-react";
import { blogsApi } from "@/lib/api";
import { PageContainer, LoadingState, ErrorState } from "@/components/shared/state";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — Medivia Journal` },
      { name: "description", content: "Evidence-based health article on Medivia." },
      { property: "og:title", content: "Medivia Journal Article" },
      { property: "og:description", content: "Evidence-based health writing." },
    ],
  }),
  component: Page,
});

function Page() {
  const { slug } = Route.useParams();
  const { data, isLoading, error, refetch } = useQuery({ queryKey: ["blog", slug], queryFn: () => blogsApi.get(slug) });
  if (isLoading) return <PageContainer><LoadingState rows={2} /></PageContainer>;
  if (error || !data) return <PageContainer><ErrorState onRetry={() => refetch()} /></PageContainer>;
  return (
    <PageContainer className="max-w-3xl">
      <Link to="/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ChevronLeft className="h-4 w-4" /> Back to blog</Link>
      <span className="text-xs font-semibold text-primary">{data.category}</span>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{data.title}</h1>
      <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
        <span>{data.author} · {data.authorRole}</span>
        <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {data.readMinutes} min read</span>
      </div>
      <div className="mt-8 overflow-hidden rounded-2xl">
        <img src={data.cover} alt={data.title} className="w-full object-cover" />
      </div>
      <article className="prose prose-slate mt-10 max-w-none text-foreground">
        <p className="text-lg leading-relaxed text-muted-foreground">{data.excerpt}</p>
        <p className="mt-6 leading-relaxed">{data.content} Ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac risus vitae velit posuere placerat. Curabitur commodo, felis sit amet ultrices vestibulum, arcu nunc gravida est.</p>
        <h2 className="mt-8 text-2xl font-semibold">Key takeaways</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
          <li>Small, sustainable habits outperform dramatic interventions.</li>
          <li>Track outcomes, not just symptoms.</li>
          <li>Speak to your doctor before starting any new regimen.</li>
        </ul>
      </article>
    </PageContainer>
  );
}
