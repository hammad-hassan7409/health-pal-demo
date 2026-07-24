import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CreditCard, Wallet, Building2, Smartphone } from "lucide-react";
import { invoicesApi } from "@/lib/api";
import { LoadingState } from "@/components/shared/state";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/payments")({
  head: () => ({ meta: [
    { title: "Payments — Medivia" },
    { name: "description", content: "Your payments." },
    { name: "robots", content: "noindex" },
  ]}),
  component: Page,
});

function Page() {
  const { data, isLoading } = useQuery({ queryKey: ["invoices"], queryFn: () => invoicesApi.list() });
  const total = data?.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0) ?? 0;
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Payments</h1>
      <p className="mt-1 text-sm text-muted-foreground">Your payment history and saved methods.</p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <p className="text-xs text-muted-foreground">Total spent</p>
          <p className="mt-2 text-3xl font-semibold text-primary">PKR {total.toLocaleString()}</p>
          <p className="mt-1 text-xs text-muted-foreground">All time</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft md:col-span-2">
          <p className="mb-3 text-sm font-semibold">Saved payment methods</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { i: CreditCard, l: "Visa · 4242", s: "Expires 08/28" },
              { i: Wallet, l: "JazzCash", s: "Linked · +92 300 ****567" },
              { i: Smartphone, l: "EasyPaisa", s: "Linked" },
              { i: Building2, l: "HBL Bank", s: "IBFT" },
            ].map((m) => (
              <div key={m.l} className="flex items-center gap-3 rounded-xl border border-border p-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-soft text-primary"><m.i className="h-4 w-4" /></span>
                <div><p className="text-sm font-medium">{m.l}</p><p className="text-xs text-muted-foreground">{m.s}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <div className="border-b border-border px-6 py-4"><h2 className="font-semibold">Recent payments</h2></div>
        {isLoading ? <div className="p-6"><LoadingState rows={2} /></div> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border text-xs text-muted-foreground">
                <tr><th className="px-6 py-3 text-left font-medium">Invoice</th><th className="px-6 py-3 text-left font-medium">Description</th><th className="px-6 py-3 text-left font-medium">Amount</th><th className="px-6 py-3 text-left font-medium">Method</th><th className="px-6 py-3 text-left font-medium">Status</th></tr>
              </thead>
              <tbody>
                {data?.map((inv) => (
                  <tr key={inv.id} className="border-b border-border last:border-0">
                    <td className="px-6 py-4 font-medium">{inv.number}</td>
                    <td className="px-6 py-4 text-muted-foreground">{inv.description}</td>
                    <td className="px-6 py-4">PKR {inv.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-muted-foreground">{inv.method}</td>
                    <td className="px-6 py-4">
                      <Badge variant={inv.status === "paid" ? "default" : inv.status === "pending" ? "secondary" : "destructive"} className="rounded-full capitalize">{inv.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
