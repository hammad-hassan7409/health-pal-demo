import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Users, Award, HeartPulse, Sparkles, Target } from "lucide-react";
import { PageContainer, SectionHeading } from "@/components/shared/state";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Medivia — Premium Telemedicine, Human Care" },
      { name: "description", content: "Medivia is a premium telemedicine platform connecting patients with verified doctors across Pakistan." },
      { property: "og:title", content: "About Medivia" },
      { property: "og:description", content: "Premium telemedicine, built on trust and craft." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageContainer>
      <SectionHeading eyebrow="About us" title="Healthcare, quietly reimagined" description="Medivia is a premium telemedicine platform built for people who value their time and their trust." />

      <div className="mt-14 grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <h3 className="text-2xl font-semibold">Our mission</h3>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            To make world-class medical care accessible from anywhere in Pakistan — without the friction. We work with verified specialists,
            build calm, deliberate software, and refuse to add anything that doesn't help you get better.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Users, k: "2,400+", v: "Verified doctors" },
            { icon: HeartPulse, k: "180k+", v: "Consultations" },
            { icon: Award, k: "4.9 / 5", v: "Avg. rating" },
            { icon: ShieldCheck, k: "100%", v: "PMDC verified" },
          ].map((s) => (
            <div key={s.v} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <s.icon className="h-5 w-5 text-primary" />
              <p className="mt-3 text-2xl font-semibold">{s.k}</p>
              <p className="text-sm text-muted-foreground">{s.v}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {[
          { icon: ShieldCheck, t: "Trust first", b: "Every credential verified. Every record encrypted. Every price transparent." },
          { icon: Sparkles, t: "Craft in every detail", b: "Whitespace, restraint, and calm — because healthcare shouldn't feel loud." },
          { icon: Target, t: "Outcomes, not funnels", b: "We measure how well you feel, not how many screens you scroll." },
        ].map((v) => (
          <div key={v.t} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground"><v.icon className="h-5 w-5" /></span>
            <h4 className="mt-4 font-semibold">{v.t}</h4>
            <p className="mt-2 text-sm text-muted-foreground">{v.b}</p>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
