import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Search } from "lucide-react";
import { doctorsApi, type DoctorFilters } from "@/lib/api";
import { DoctorCard } from "@/components/shared/DoctorCard";
import { PageContainer, LoadingState, EmptyState, SectionHeading } from "@/components/shared/state";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/doctors/search")({
  head: () => ({
    meta: [
      { title: "Search Doctors — Medivia" },
      { name: "description", content: "Advanced doctor search: name, specialty, city, fee, gender, rating, availability." },
      { property: "og:title", content: "Search Doctors — Medivia" },
      { property: "og:description", content: "Advanced live search across every specialty." },
    ],
  }),
  component: SearchPage,
});

const cities = ["All", "Karachi", "Lahore", "Islamabad", "Rawalpindi"];
const departments = ["All", "Cardiology", "Dermatology", "Neurology", "Pediatrics", "Orthopedics", "Gynecology", "Psychiatry", "General Physician", "ENT", "Ophthalmology", "Endocrinology"];

function SearchPage() {
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState<DoctorFilters>({});
  const { data, isLoading } = useQuery({ queryKey: ["search", q, filters], queryFn: () => doctorsApi.list({ ...filters, q }) });

  return (
    <PageContainer>
      <SectionHeading eyebrow="Search" title="Find the right doctor for you" />
      <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search doctors, specialities, symptoms..." className="h-14 pl-12 text-base" />
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Label className="mb-1.5 block text-xs">Department</Label>
            <Select value={filters.department ?? "All"} onValueChange={(v) => setFilters({ ...filters, department: v === "All" ? undefined : v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-1.5 block text-xs">City</Label>
            <Select value={filters.city ?? "All"} onValueChange={(v) => setFilters({ ...filters, city: v === "All" ? undefined : v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-1.5 block text-xs">Gender</Label>
            <Select value={filters.gender ?? "any"} onValueChange={(v) => setFilters({ ...filters, gender: v as any })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <div className="flex h-10 items-center gap-3 rounded-md border border-input px-3">
              <Switch id="online" checked={!!filters.online} onCheckedChange={(v) => setFilters({ ...filters, online: v })} />
              <Label htmlFor="online" className="text-sm">Available now</Label>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end"><Button variant="ghost" onClick={() => { setQ(""); setFilters({}); }}>Clear all</Button></div>
      </div>

      <div className="mt-8">
        {isLoading ? <LoadingState rows={6} /> : !data?.results.length ? (
          <EmptyState icon={Search} title="No results" description="Try broadening your search or clearing filters." />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {data.results.map((d) => <DoctorCard key={d.id} doctor={d} />)}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
