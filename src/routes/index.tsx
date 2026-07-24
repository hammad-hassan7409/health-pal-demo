import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import {
  Search, ShieldCheck, Video, Clock, Award, Star, ArrowRight,
  HeartPulse, Sparkles, Brain, Baby, Bone, Flower2, BrainCircuit,
  Stethoscope, Smile, Ear, Eye, Activity, CheckCircle2, MessageSquare,
  Calendar, ChevronRight, Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { doctorsApi, departmentsApi, faqsApi } from "@/lib/api";
import { DoctorCard } from "@/components/shared/DoctorCard";
import { SectionHeading, LoadingState } from "@/components/shared/state";
import heroImg from "@/assets/hero-doctor.jpg";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  HeartPulse, Sparkles, Brain, Baby, Bone, Flower2, BrainCircuit,
  Stethoscope, Smile, Ear, Eye, Activity,
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Medivia — Book Verified Doctors Online, Instantly" },
      { name: "description", content: "Consult PMDC-verified doctors by video, chat, or in-clinic. Prescriptions, medical records, and follow ups — all in one premium telemedicine platform." },
      { property: "og:title", content: "Medivia — Premium Online Clinic" },
      { property: "og:description", content: "Verified doctors, video consultations, prescriptions online." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const doctorsQ = useQuery({ queryKey: ["doctors", "featured"], queryFn: () => doctorsApi.featured() });
  const departmentsQ = useQuery({ queryKey: ["departments"], queryFn: () => departmentsApi.list() });
  const faqQ = useQuery({ queryKey: ["faqs"], queryFn: () => faqsApi.list() });

  return (
    <div>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
        <div className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary">
              <ShieldCheck className="h-3.5 w-3.5" /> PMDC-verified doctors
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Premium healthcare,<br /><span className="text-primary">on your schedule.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              Consult verified specialists by video, chat, or in-clinic. Prescriptions, records and follow ups — all in one calm place.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 flex flex-col gap-2 rounded-2xl border border-border bg-card p-2 shadow-elevated sm:flex-row sm:items-center"
            >
              <div className="flex flex-1 items-center gap-2 px-3">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  className="border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
                  placeholder="Search doctors, specialities, symptoms..."
                  aria-label="Search doctors"
                />
              </div>
              <Link to="/doctors/search" className="sm:ml-auto">
                <Button size="lg" className="h-12 w-full rounded-xl px-6 sm:w-auto">Search</Button>
              </Link>
            </form>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> No hidden fees</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> Same-day appointments</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> Encrypted records</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
            <div className="relative aspect-[6/7] overflow-hidden rounded-3xl bg-primary-soft shadow-floating">
              <img src={heroImg} alt="Doctor available for a video consultation" className="h-full w-full object-cover" />
            </div>
            {/* Floating trust cards */}
            <div className="absolute -left-4 top-10 hidden max-w-[220px] rounded-2xl border border-border bg-card p-4 shadow-elevated md:block">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-success/10 text-success">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">2,400+ verified</p>
                  <p className="text-xs text-muted-foreground">doctors on Medivia</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 bottom-10 hidden max-w-[220px] rounded-2xl border border-border bg-card p-4 shadow-elevated md:block">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-warning/10 text-warning">
                  <Star className="h-5 w-5 fill-warning" />
                </div>
                <div>
                  <p className="text-sm font-semibold">4.9 / 5</p>
                  <p className="text-xs text-muted-foreground">based on 12k+ reviews</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== Departments ===== */}
      <section className="border-t border-border bg-surface/50">
        <div className="container-page py-16 md:py-20">
          <div className="flex items-end justify-between gap-6">
            <SectionHeading eyebrow="Departments" title="Care for every specialty" description="Twelve core departments, 2,400+ verified doctors, one seamless experience." />
            <Link to="/specializations" className="hidden shrink-0 text-sm font-medium text-primary hover:underline sm:inline-flex sm:items-center">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {(departmentsQ.data ?? Array.from({ length: 12 })).slice(0, 12).map((d: any, i) => {
              const Icon = d ? (iconMap[d.icon] ?? Stethoscope) : Stethoscope;
              return (
                <Link
                  key={d?.id ?? i}
                  to="/doctors"
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elevated"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium">{d?.name ?? "Loading"}</span>
                  <span className="text-xs text-muted-foreground">{d?.doctorsCount ?? "—"} doctors</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Featured doctors ===== */}
      <section>
        <div className="container-page py-16 md:py-20">
          <div className="flex items-end justify-between gap-6">
            <SectionHeading eyebrow="Top doctors" title="Meet a few of our specialists" description="Handpicked, PMDC-verified, and consistently five-star reviewed." />
            <Link to="/doctors" className="hidden shrink-0 text-sm font-medium text-primary hover:underline sm:inline-flex sm:items-center">
              Browse all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10">
            {doctorsQ.isLoading ? (
              <LoadingState rows={6} />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {doctorsQ.data?.map((d) => <DoctorCard key={d.id} doctor={d} />)}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== How it works ===== */}
      <section className="border-t border-border bg-surface/50">
        <div className="container-page py-16 md:py-20">
          <SectionHeading eyebrow="How it works" title="Care in three calm steps" align="center" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { icon: Search, title: "Find a doctor", body: "Search by specialty, symptom, or preferred language." },
              { icon: Calendar, title: "Book a time", body: "Pick a slot that fits — same-day, evening, or weekend." },
              { icon: Video, title: "Consult securely", body: "Meet by video or chat. Prescription arrives in your inbox." },
            ].map((s, i) => (
              <div key={s.title} className="relative rounded-2xl border border-border bg-card p-6 shadow-soft">
                <span className="absolute right-5 top-5 text-4xl font-semibold text-primary/10">0{i + 1}</span>
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Why choose us ===== */}
      <section>
        <div className="container-page py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading eyebrow="Why Medivia" title="Healthcare that respects your time" description="We removed the queues, the paperwork, and the guesswork — and kept the human part." />
              <div className="mt-8 space-y-5">
                {[
                  { icon: ShieldCheck, title: "PMDC-verified doctors", body: "Every credential reviewed before onboarding." },
                  { icon: Clock, title: "Same-day appointments", body: "Most consultations available within 30 minutes." },
                  { icon: Award, title: "Award-winning specialists", body: "Doctors from Aga Khan, Shifa, and other leading hospitals." },
                  { icon: MessageSquare, title: "Follow up included", body: "One complimentary follow up with every consultation." },
                ].map((f) => (
                  <div key={f.title} className="flex gap-4">
                    <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                      <f.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-semibold">{f.title}</h4>
                      <p className="text-sm text-muted-foreground">{f.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { k: "2,400+", v: "Verified doctors" },
                { k: "180k+", v: "Consultations completed" },
                { k: "4.9 / 5", v: "Average rating" },
                { k: "12 min", v: "Median wait time" },
              ].map((s) => (
                <div key={s.v} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <p className="text-3xl font-semibold text-primary">{s.k}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="border-t border-border bg-surface/50">
        <div className="container-page py-16 md:py-20">
          <SectionHeading eyebrow="Reviews" title="Patients who felt heard" align="center" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { name: "Sana A.", role: "Karachi", quote: "Booked a dermatologist at 9 PM, spoke to her by 9:20. My prescription was in my inbox before 10." },
              { name: "Ahmed R.", role: "Lahore", quote: "Genuinely the calmest healthcare experience I've had. No queues, no chaos, just care." },
              { name: "Hiba S.", role: "Islamabad", quote: "The follow up messaging is what sold me. My doctor actually checked in a week later." },
            ].map((t) => (
              <figure key={t.name} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="flex text-warning">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-warning" />)}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-foreground">"{t.quote}"</blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-semibold">{t.name}</span>
                  <span className="ml-2 text-muted-foreground">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section>
        <div className="container-page py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <SectionHeading eyebrow="FAQ" title="Answers, before you ask" description="Everything about appointments, payments, privacy and refunds." />
              <Link to="/faqs" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                Full FAQ <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div>
              <Accordion type="single" collapsible defaultValue="0" className="divide-y divide-border rounded-2xl border border-border bg-card">
                {(faqQ.data ?? []).slice(0, 6).map((f, i) => (
                  <AccordionItem key={i} value={String(i)} className="border-0 px-5">
                    <AccordionTrigger className="py-5 text-left text-sm font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm text-muted-foreground">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Download app ===== */}
      <section className="border-t border-border">
        <div className="container-page py-16 md:py-20">
          <div className="grid gap-10 rounded-3xl bg-primary p-8 text-primary-foreground md:p-14 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
                <Smartphone className="h-3.5 w-3.5" /> Mobile apps
              </span>
              <h3 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">Your clinic, always in your pocket.</h3>
              <p className="mt-3 max-w-md text-primary-foreground/80">Book, chat, video-consult, and manage records — on iOS and Android.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-primary shadow-soft hover:bg-white/90">App Store</a>
                <a href="#" className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">Google Play</a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="grid grid-cols-2 gap-3">
                {[Video, MessageSquare, ShieldCheck, Calendar].map((Icon, i) => (
                  <div key={i} className="grid h-24 w-24 place-items-center rounded-2xl bg-white/10 text-white md:h-32 md:w-32">
                    <Icon className="h-8 w-8 md:h-10 md:w-10" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
