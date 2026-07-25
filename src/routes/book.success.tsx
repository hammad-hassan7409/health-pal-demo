import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, Calendar, Video, Copy, User, Clock, Stethoscope, Receipt } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { PageContainer, LoadingState } from "@/components/shared/state";
import { Button } from "@/components/ui/button";
import { appointmentsApi } from "@/lib/api";

const searchSchema = z.object({ id: z.string().optional() });

export const Route = createFileRoute("/book/success")({
  validateSearch: searchSchema,
  head: () => ({ meta: [
    { title: "Appointment Confirmed — Medivia" },
    { name: "description", content: "Your appointment is confirmed." },
    { property: "og:title", content: "Appointment Confirmed" },
    { property: "og:description", content: "Your consultation is booked." },
    { name: "robots", content: "noindex" },
  ]}),
  component: SuccessPage,
});

function SuccessPage() {
  const { id } = Route.useSearch();
  const { data: appt, isLoading } = useQuery({
    queryKey: ["appointment", id],
    queryFn: () => appointmentsApi.get(id!),
    enabled: !!id,
  });

  const reference = appt?.id ?? id ?? "MED-PENDING";
  const copy = () => {
    navigator.clipboard?.writeText(reference).then(() => toast.success("Reference copied"));
  };

  return (
    <PageContainer className="max-w-2xl">
      <div className="rounded-3xl border border-border bg-card p-8 shadow-elevated md:p-10">
        <div className="text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-success/10 text-success">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight">Appointment confirmed</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We've sent the details to your email. You'll receive a reminder 15 minutes before your consultation.
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between rounded-2xl border border-dashed border-primary/40 bg-primary-soft/40 p-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Booking reference</p>
            <p className="mt-1 font-mono text-lg font-semibold text-primary">{reference}</p>
          </div>
          <Button variant="outline" size="sm" onClick={copy} disabled={!appt}><Copy className="h-4 w-4" /> Copy</Button>
        </div>

        {isLoading ? (
          <div className="mt-6"><LoadingState rows={3} /></div>
        ) : appt ? (
          <div className="mt-6 grid gap-3 rounded-2xl border border-border bg-surface/40 p-5 text-sm">
            <Row icon={Stethoscope} label="Doctor" value={`${appt.doctorName} · ${appt.specialization}`} />
            <Row icon={Calendar} label="Date" value={new Date(appt.date).toDateString()} />
            <Row icon={Clock} label="Time" value={`${appt.time} · ${appt.type} consultation`} />
            <Row icon={User} label="Patient" value={appt.patientName} />
            {appt.reason && <Row icon={Receipt} label="Reason" value={appt.reason} />}
            <Row icon={Receipt} label="Consultation fee" value={`PKR ${appt.fee.toLocaleString()}`} />
          </div>
        ) : (
          <p className="mt-6 text-center text-sm text-muted-foreground">Details will appear in your dashboard shortly.</p>
        )}

        <div className="mt-8 space-y-2">
          <Link to="/app/patient"><Button className="w-full" size="lg"><Calendar className="h-4 w-4" /> View my appointments</Button></Link>
          <Link to="/app/consultation/$id" params={{ id: appt?.id ?? "demo" }}>
            <Button variant="outline" className="w-full" size="lg"><Video className="h-4 w-4" /> Join consultation</Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}

function Row({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
