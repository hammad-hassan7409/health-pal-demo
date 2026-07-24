import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Calendar, Video } from "lucide-react";
import { PageContainer } from "@/components/shared/state";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/book/success")({
  head: () => ({ meta: [
    { title: "Appointment Confirmed — Medivia" },
    { name: "description", content: "Your appointment is confirmed." },
    { property: "og:title", content: "Appointment Confirmed" },
    { property: "og:description", content: "Your consultation is booked." },
  ]}),
  component: () => (
    <PageContainer className="max-w-lg">
      <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-elevated">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-success/10 text-success"><CheckCircle2 className="h-8 w-8" /></div>
        <h1 className="mt-6 text-2xl font-semibold">Appointment confirmed</h1>
        <p className="mt-2 text-sm text-muted-foreground">We've sent the details to your email. You'll receive a reminder 15 minutes before your consultation.</p>
        <div className="mt-8 space-y-2">
          <Link to="/app/patient"><Button className="w-full" size="lg"><Calendar className="h-4 w-4" /> View my appointments</Button></Link>
          <Link to="/app/consultation/$id" params={{ id: "demo" }}><Button variant="outline" className="w-full" size="lg"><Video className="h-4 w-4" /> Join consultation</Button></Link>
        </div>
      </div>
    </PageContainer>
  ),
});
