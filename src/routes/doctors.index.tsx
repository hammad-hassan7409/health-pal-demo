import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Search, SlidersHorizontal, Star } from "lucide-react";
import { doctorsApi, type DoctorFilters } from "@/lib/api";
import { DoctorCard } from "@/components/shared/DoctorCard";
import { LoadingState, EmptyState, PageContainer, SectionHeading } from "@/components/shared/state";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

export const Route = createFileRoute("/doctors/")({
  head: () => ({
    meta: [
      { title: "Find a Doctor — Medivia" },
      { name: "description", content: "Browse 2,400+ verified specialists. Filter by department, fee, rating, gender and availability." },
      { property: "og:title", content: "Find a Doctor — Medivia" },
      { property: "og:description", content: "Browse verified doctors across every specialty." },
    ],
  }),
  component: DoctorsPage,
});

const departments = ["All", "Cardiology", "Dermatology", "Neurology", "Pediatrics", "Orthopedics", "Gynecology", "Psychiatry", "General Physician", "ENT", "Ophthalmology", "Endocrinology"];

function Filters({ value, onChange }: { value: DoctorFilters; onChange: (v: DoctorFilters) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium">Department</label>
        <Select value={value.department ?? "All"} onValueChange={(v) => onChange({ ...value, department: v === "All" ? undefined : v })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>{departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium">Gender</label>
        <Select value={value.gender ?? "any"} onValueChange={(v) => onChange({ ...value, gender: v as any })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium">Max fee</label>
          <span className="text-sm text-muted-foreground">PKR {value.maxFee ?? 5000}</span>
        </div>
        <Slider value={[value.maxFee ?? 5000]} min={500} max={5000} step={100} onValueChange={([v]) => onChange({ ...value, maxFee: v })} />
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium">Min rating</label>
          <span className="inline-flex items-center gap-1 text-sm text-muted-foreground"><Star className="h-3.5 w-3.5 fill-warning text-warning" /> {value.minRating ?? 0}+</span>
        </div>
        <Slider value={[value.minRating ?? 0]} min={0} max={5} step={0.5} onValueChange={([v]) => onChange({ ...value, minRating: v })} />
      </div>
      <Button variant="outline" className="w-full" onClick={() => onChange({})}>Reset filters</Button>
    </div>
  );
}

function DoctorsPage() {
  const [filters, setFilters] = useState<DoctorFilters>({});
  const [q, setQ] = useState("");
  const { data, isLoading } = useQuery({ queryKey: ["doctors", filters, q], queryFn: () => doctorsApi.list({ ...filters, q }) });

  return (
    <PageContainer>
      <SectionHeading eyebrow="Our doctors" title="Browse verified specialists" description="Every doctor on Medivia is PMDC-verified. Filter to find your perfect match." />

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or specialty..." className="h-11 pl-10" />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="h-11 lg:hidden"><SlidersHorizontal className="h-4 w-4" /> Filters</Button>
          </SheetTrigger>
          <SheetContent side="right"><SheetTitle>Filters</SheetTitle><div className="mt-6"><Filters value={filters} onChange={setFilters} /></div></SheetContent>
        </Sheet>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="mb-6 text-sm font-semibold">Filters</h3>
            <Filters value={filters} onChange={setFilters} />
          </div>
        </aside>

        <div>
          {isLoading ? (
            <LoadingState rows={6} />
          ) : !data?.results.length ? (
            <EmptyState icon={Search} title="No doctors match your filters" description="Try clearing filters or broadening your search." />
          ) : (
            <>
              <p className="mb-4 text-sm text-muted-foreground">{data.results.length} doctors found</p>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {data.results.map((d) => <DoctorCard key={d.id} doctor={d} />)}
              </div>
            </>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
