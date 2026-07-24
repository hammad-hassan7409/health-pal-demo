import type { ReactNode } from "react";
import { PageContainer } from "@/components/shared/state";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <PageContainer className="max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {updated}</p>
      <div className="prose prose-slate mt-8 max-w-none text-foreground [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_p]:mt-3 [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_li]:text-muted-foreground [&_ul]:mt-3 [&_ul]:space-y-1.5 [&_ul]:pl-6 [&_ul]:list-disc">
        {children}
      </div>
    </PageContainer>
  );
}
