import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Star, MapPin, Award, Languages, Calendar, Video, MessageSquare, GraduationCap, Building2, BadgeCheck, ChevronLeft } from "lucide-react";
import { doctorsApi, reviewsApi } from "@/lib/api";
import { PageContainer, LoadingState, ErrorState } from "@/components/shared/state";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Route = createFileRoute("/doctors/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Doctor Profile — Medivia` },
      { name: "description", content: `Verified doctor profile ${params.id}. Book online consultation.` },
      { property: "og:title", content: "Doctor Profile — Medivia" },
      { property: "og:description", content: "PMDC-verified specialist profile with reviews and availability." },
    ],
  }),
  component: DoctorDetail,
});

function DoctorDetail() {
  const { id } = Route.useParams();
  const d = useQuery({ queryKey: ["doctor", id], queryFn: () => doctorsApi.get(id) });
  const r = useQuery({ queryKey: ["reviews", id], queryFn: () => reviewsApi.list(id) });

  if (d.isLoading) return <PageContainer><LoadingState rows={2} /></PageContainer>;
  if (d.error || !d.data) return <PageContainer><ErrorState onRetry={() => d.refetch()} /></PageContainer>;
  const doc = d.data;

  return (
    <PageContainer>
      <Link to="/doctors" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="h-4 w-4" /> Back to doctors
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="relative shrink-0">
                <img src={doc.photo} alt={doc.name} className="h-32 w-32 rounded-2xl object-cover ring-1 ring-border md:h-40 md:w-40" />
                {doc.online && <span className="absolute -bottom-1 -right-1 rounded-full border-2 border-card bg-success px-2 py-0.5 text-xs font-medium text-success-foreground">Online</span>}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{doc.name}</h1>
                    <p className="mt-1 text-primary">{doc.specialization}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
                    <BadgeCheck className="h-3.5 w-3.5" /> PMDC verified
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{doc.qualifications} · {doc.pmdc}</p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                  <span className="inline-flex items-center gap-1"><Star className="h-4 w-4 fill-warning text-warning" /><strong>{doc.rating.toFixed(1)}</strong><span className="text-muted-foreground">({doc.reviewsCount} reviews)</span></span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground"><MapPin className="h-4 w-4" /> {doc.city}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="rounded-full">{doc.experienceYears}+ yrs experience</Badge>
                  <Badge variant="secondary" className="rounded-full">Consultation PKR {doc.consultationFee.toLocaleString()}</Badge>
                  <Badge variant="secondary" className="rounded-full">{doc.hospital}</Badge>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="about" className="mt-8">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({doc.reviewsCount})</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="mt-6 space-y-6">
              <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="text-lg font-semibold">Biography</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{doc.bio}</p>
              </section>
              <section className="grid gap-4 md:grid-cols-2">
                {[
                  { icon: Building2, label: "Hospital", value: doc.hospital },
                  { icon: Building2, label: "Clinic", value: doc.clinic },
                  { icon: Languages, label: "Languages", value: doc.languages.join(", ") },
                  { icon: Calendar, label: "Availability", value: doc.availability.join(", ") },
                ].map((r) => (
                  <div key={r.label} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary"><r.icon className="h-4 w-4" /></span>
                    <div><p className="text-xs text-muted-foreground">{r.label}</p><p className="text-sm font-medium">{r.value}</p></div>
                  </div>
                ))}
              </section>
            </TabsContent>
            <TabsContent value="experience" className="mt-6 space-y-4">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold"><GraduationCap className="h-5 w-5 text-primary" /> Certificates</h3>
                <ul className="space-y-2 text-sm">
                  {doc.certificates.map((c) => <li key={c} className="flex items-center gap-2 text-muted-foreground"><BadgeCheck className="h-4 w-4 text-success" /> {c}</li>)}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold"><Award className="h-5 w-5 text-primary" /> Awards</h3>
                <ul className="space-y-2 text-sm">
                  {doc.awards.map((c) => <li key={c} className="flex items-center gap-2 text-muted-foreground"><Award className="h-4 w-4 text-warning" /> {c}</li>)}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6 space-y-4">
              {r.isLoading && <LoadingState rows={3} />}
              {r.data?.map((rv) => (
                <div key={rv.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <div className="flex items-center gap-3">
                    <Avatar><AvatarFallback>{rv.patientName[0]}</AvatarFallback></Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{rv.patientName}</p>
                      <div className="flex text-warning">{Array.from({ length: rv.rating }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-warning" />)}</div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{rv.comment}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Booking sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-elevated">
            <p className="text-sm text-muted-foreground">Consultation fee</p>
            <p className="mt-1 text-3xl font-semibold text-foreground">PKR {doc.consultationFee.toLocaleString()}</p>
            <p className="mt-1 text-xs text-muted-foreground">Includes one complimentary follow up</p>
            <div className="mt-6 space-y-2">
              <Link to="/book/$doctorId" params={{ doctorId: doc.id }}>
                <Button size="lg" className="w-full"><Video className="h-4 w-4" /> Video consultation</Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full"><MessageSquare className="h-4 w-4" /> Chat consultation</Button>
              <Button variant="ghost" size="lg" className="w-full"><Calendar className="h-4 w-4" /> Visit clinic</Button>
            </div>
            <div className="mt-6 rounded-xl bg-surface p-4 text-xs text-muted-foreground">
              <p><strong className="text-foreground">Next available:</strong> Today, {new Date(doc.nextAvailable).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
            </div>
          </div>
        </aside>
      </div>
    </PageContainer>
  );
}
