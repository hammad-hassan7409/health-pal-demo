import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Download, Receipt } from "lucide-react";
import { invoicesApi } from "@/lib/api";
import { LoadingState } from "@/components/shared/state";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/invoices")({
  head: () => ({ meta: [
    { title: "Invoices — Medivia" },
    { name: "description", content: "Download your invoices." },
    { name: "robots", content: "noindex" },
  ]}),
  component: Page,
});

function Page() {
  const { data, isLoading } = useQuery({ queryKey: ["invoices"], queryFn: () => invoicesApi.list() });
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Invoices</h1>
      <p className="mt-1 text-sm text-muted-foreground">Download itemized receipts for insurance or records.</p>
      <div className="mt-8">
        {isLoading ? <LoadingState rows={3} /> : (
          <div className="divide-y divide-border rounded-2xl border border-border bg-card shadow-soft">
            {data?.map((inv) => (
              <div key={inv.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary"><Receipt className="h-5 w-5" /></span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{inv.number}</p>
                  <p className="text-sm text-muted-foreground">{inv.description}</p>
                </div>
                <p className="font-semibold">PKR {inv.amount.toLocaleString()}</p>
                <Badge variant={inv.status === "paid" ? "default" : inv.status === "pending" ? "secondary" : "destructive"} className="rounded-full capitalize">{inv.status}</Badge>
                <Button variant="outline" size="sm"><Download className="h-4 w-4" /> PDF</Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
