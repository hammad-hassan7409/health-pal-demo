import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Download, Printer, ChevronLeft, Stethoscope } from "lucide-react";
import { prescriptionsApi } from "@/lib/api";
import { LoadingState, ErrorState } from "@/components/shared/state";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/prescriptions/$id")({
  head: () => ({ meta: [
    { title: "Prescription — Medivia" },
    { name: "description", content: "Your prescription details." },
    { name: "robots", content: "noindex" },
  ]}),
  component: Page,
});

function Page() {
  const { id } = Route.useParams();
  const { data, isLoading, error, refetch } = useQuery({ queryKey: ["rx", id], queryFn: () => prescriptionsApi.get(id) });
  if (isLoading) return <LoadingState rows={2} />;
  if (error || !data) return <ErrorState onRetry={() => refetch()} />;
  return (
    <div>
      <div className="no-print mb-6 flex items-center justify-between">
        <Link to="/app/prescriptions" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ChevronLeft className="h-4 w-4" /> Back</Link>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.print()}><Printer className="h-4 w-4" /> Print</Button>
          <Button><Download className="h-4 w-4" /> Download PDF</Button>
        </div>
      </div>
      <article className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 shadow-soft md:p-12">
        <header className="flex items-start justify-between border-b border-border pb-6">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground"><Stethoscope className="h-6 w-6" /></span>
            <div>
              <p className="text-lg font-semibold">Medivia Health</p>
              <p className="text-xs text-muted-foreground">Digital prescription · Rx #{data.id.toUpperCase()}</p>
            </div>
          </div>
          <div className="text-right text-xs text-muted-foreground">
            <p>{new Date(data.date).toLocaleDateString()}</p>
            <p>Karachi · Pakistan</p>
          </div>
        </header>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Doctor</p>
            <p className="mt-1 font-semibold">{data.doctorName}</p>
            <p className="text-xs text-muted-foreground">MBBS, FCPS · PMDC-123456</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Patient</p>
            <p className="mt-1 font-semibold">{data.patientName}</p>
            <p className="text-xs text-muted-foreground">Age 34 · Male</p>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Diagnosis</p>
          <p className="mt-1">{data.diagnosis}</p>
        </div>

        <div className="mt-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">℞ Prescribed medicines</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="py-2 pr-3">Medicine</th>
                <th className="py-2 pr-3">Dose</th>
                <th className="py-2 pr-3">Frequency</th>
                <th className="py-2 pr-3">Duration</th>
                <th className="py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {data.medicines.map((m, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="py-3 pr-3 font-medium">{m.name}</td>
                  <td className="py-3 pr-3 text-muted-foreground">{m.dose}</td>
                  <td className="py-3 pr-3 text-muted-foreground">{m.frequency}</td>
                  <td className="py-3 pr-3 text-muted-foreground">{m.duration}</td>
                  <td className="py-3 text-muted-foreground">{m.notes ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Advice</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{data.advice}</p>
        </div>

        <div className="mt-12 flex items-end justify-between">
          <p className="text-xs text-muted-foreground">This prescription is digitally signed and verifiable at medivia.health/verify.</p>
          <div className="text-right">
            <div className="border-b border-foreground/40 pb-1 pl-8">
              <p className="italic text-sm">{data.doctorName}</p>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Digital signature</p>
          </div>
        </div>
      </article>
    </div>
  );
}
