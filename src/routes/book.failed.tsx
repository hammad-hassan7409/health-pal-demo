import { createFileRoute, Link } from "@tanstack/react-router";
import { XCircle } from "lucide-react";
import { PageContainer } from "@/components/shared/state";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/book/failed")({
  head: () => ({ meta: [
    { title: "Payment Failed — Medivia" },
    { name: "description", content: "We couldn't process your payment." },
    { property: "og:title", content: "Payment Failed" },
    { property: "og:description", content: "Payment could not be processed." },
  ]}),
  component: () => (
    <PageContainer className="max-w-lg">
      <div className="rounded-3xl border border-destructive/20 bg-card p-10 text-center shadow-elevated">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-destructive/10 text-destructive"><XCircle className="h-8 w-8" /></div>
        <h1 className="mt-6 text-2xl font-semibold">Payment failed</h1>
        <p className="mt-2 text-sm text-muted-foreground">Your card was declined or the connection timed out. No charge was made. Please try again or use a different method.</p>
        <div className="mt-8 flex flex-col gap-2 sm:flex-row">
          <Link to="/doctors" className="flex-1"><Button variant="outline" className="w-full" size="lg">Choose another doctor</Button></Link>
          <Link to="/doctors" className="flex-1"><Button className="w-full" size="lg">Try again</Button></Link>
        </div>
      </div>
    </PageContainer>
  ),
});
