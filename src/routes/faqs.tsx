import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { faqsApi } from "@/lib/api";
import { PageContainer, SectionHeading, LoadingState } from "@/components/shared/state";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — Medivia" },
      { name: "description", content: "Answers to common questions about consultations, payments, privacy and refunds on Medivia." },
      { property: "og:title", content: "FAQs — Medivia" },
      { property: "og:description", content: "Answers to common questions." },
    ],
  }),
  component: Page,
});

function Page() {
  const { data, isLoading } = useQuery({ queryKey: ["faqs"], queryFn: () => faqsApi.list() });
  const [cat, setCat] = useState<string>("All");
  const cats = ["All", ...Array.from(new Set(data?.map((f) => f.category) ?? []))];
  const items = data?.filter((f) => cat === "All" || f.category === cat) ?? [];

  return (
    <PageContainer className="max-w-4xl">
      <SectionHeading eyebrow="Help center" title="Frequently asked questions" description="Can't find your answer? Reach out and we'll get back within a few hours." />
      <div className="mt-8 flex flex-wrap gap-2">
        {cats.map((c) => (
          <Button key={c} size="sm" variant={cat === c ? "default" : "outline"} onClick={() => setCat(c)}>{c}</Button>
        ))}
      </div>
      <div className="mt-6">
        {isLoading ? <LoadingState rows={3} /> : (
          <Accordion type="single" collapsible className="divide-y divide-border rounded-2xl border border-border bg-card">
            {items.map((f, i) => (
              <AccordionItem key={i} value={String(i)} className="border-0 px-5">
                <AccordionTrigger className="py-5 text-left text-sm font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="pb-5 text-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </PageContainer>
  );
}
