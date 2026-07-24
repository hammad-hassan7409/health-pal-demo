import { createFileRoute } from "@tanstack/react-router";
import { Users, Stethoscope, Calendar, DollarSign, TrendingUp, Star, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/admin")({
  head: () => ({ meta: [
    { title: "Admin Dashboard — Medivia" },
    { name: "description", content: "Platform overview." },
    { name: "robots", content: "noindex" },
  ]}),
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-muted-foreground">Overview</p>
        <h1 className="text-3xl font-semibold tracking-tight">Admin Dashboard</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { i: Stethoscope, k: "2,412", l: "Verified doctors", d: "+38 this month" },
          { i: Users, k: "84,203", l: "Registered patients", d: "+1,204" },
          { i: Calendar, k: "12,504", l: "Consultations", d: "This month" },
          { i: DollarSign, k: "PKR 24.8M", l: "Revenue", d: "+18% MoM" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary"><s.i className="h-5 w-5" /></span>
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
            <p className="mt-4 text-3xl font-semibold">{s.k}</p>
            <p className="text-sm text-muted-foreground">{s.l}</p>
            <p className="mt-1 text-xs text-success">{s.d}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Revenue overview</h2>
            <Badge variant="secondary" className="rounded-full">Last 12 months</Badge>
          </div>
          <div className="flex h-56 items-end gap-2">
            {[35, 48, 52, 46, 62, 71, 68, 82, 78, 89, 92, 96].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-md bg-primary" style={{ height: `${h}%` }} title={`${h}%`} />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            {["J","F","M","A","M","J","J","A","S","O","N","D"].map((m) => <span key={m}>{m}</span>)}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="text-lg font-semibold">Support tickets</h2>
          <div className="mt-4 space-y-3">
            {[
              { t: "Payment refund inquiry", p: "high", s: "Open" },
              { t: "Doctor profile change", p: "medium", s: "In review" },
              { t: "Video quality issue", p: "medium", s: "Open" },
              { t: "Account verification", p: "low", s: "Resolved" },
            ].map((t, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl border border-border p-3">
                <div className="flex items-center gap-2 min-w-0">
                  <AlertCircle className={`h-4 w-4 shrink-0 ${t.p === "high" ? "text-destructive" : t.p === "medium" ? "text-warning" : "text-muted-foreground"}`} />
                  <p className="truncate text-sm">{t.t}</p>
                </div>
                <Badge variant="secondary" className="rounded-full">{t.s}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent doctor applications</h2>
          <Button variant="outline" size="sm">View all</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr className="border-b border-border">
                <th className="px-3 py-3 text-left font-medium">Name</th>
                <th className="px-3 py-3 text-left font-medium">Specialty</th>
                <th className="px-3 py-3 text-left font-medium">PMDC</th>
                <th className="px-3 py-3 text-left font-medium">Rating</th>
                <th className="px-3 py-3 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Dr. Areeba Khan", "Cardiology", "PMDC-108234", 4.9, "Verified"],
                ["Dr. Faisal Iqbal", "Neurology", "PMDC-102819", 4.7, "Pending"],
                ["Dr. Naila Ahmad", "Dermatology", "PMDC-104502", 4.8, "Verified"],
                ["Dr. Zubair Malik", "General Physician", "PMDC-109120", 4.6, "Rejected"],
              ].map((r, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="px-3 py-3 font-medium">{r[0]}</td>
                  <td className="px-3 py-3 text-muted-foreground">{r[1]}</td>
                  <td className="px-3 py-3 text-muted-foreground">{r[2]}</td>
                  <td className="px-3 py-3"><span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-warning text-warning" /> {r[3]}</span></td>
                  <td className="px-3 py-3">
                    <Badge variant={r[4] === "Verified" ? "default" : r[4] === "Rejected" ? "destructive" : "secondary"} className="rounded-full">{r[4]}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
