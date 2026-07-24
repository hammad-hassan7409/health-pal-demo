import { createFileRoute, Link } from "@tanstack/react-router";
import { Video, MessageSquare, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import { PageContainer, SectionHeading } from "@/components/shared/state";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/online-consultation")({
  head: () => ({
    meta: [
      { title: "Online Consultation — Medivia" },
      { name: "description", content: "Consult verified doctors by video or chat from home. Prescriptions and follow ups included." },
      { property: "og:title", content: "Online Consultation — Medivia" },
      { property: "og:description", content: "Video and chat consultations with PMDC-verified doctors." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <PageContainer>
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading eyebrow="Online consultation" title="See a doctor without leaving home" description="Video and secure chat consultations with verified specialists — same-day availability, digital prescriptions, and complimentary follow ups." />
          <div className="mt-8 space-y-4">
            {[
              { icon: Video, t: "HD video with your specialist", b: "Encrypted end to end, no downloads required." },
              { icon: MessageSquare, t: "Async chat if you prefer", b: "Send symptoms, images or reports and get a reply within hours." },
              { icon: ShieldCheck, t: "Digital prescriptions", b: "Delivered to your inbox and stored in your records." },
              { icon: Clock, t: "Follow up included", b: "One complimentary follow up within 72 hours." },
            ].map((f) => (
              <div key={f.t} className="flex gap-4">
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary"><f.icon className="h-5 w-5" /></span>
                <div><p className="font-semibold">{f.t}</p><p className="text-sm text-muted-foreground">{f.b}</p></div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex gap-3">
            <Link to="/doctors"><Button size="lg">Find a doctor</Button></Link>
            <Link to="/faqs"><Button variant="outline" size="lg">Read FAQs</Button></Link>
          </div>
        </div>
        <div className="rounded-3xl border border-border bg-surface p-8 shadow-elevated">
          <h3 className="text-lg font-semibold">What you'll need</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {["A smartphone or laptop with camera and microphone", "A stable internet connection (3G+ works fine)", "A quiet, private space for 10–15 minutes", "Any relevant reports or medication list (optional)"].map((x) => (
              <li key={x} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-success" /> <span className="text-muted-foreground">{x}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </PageContainer>
  );
}
