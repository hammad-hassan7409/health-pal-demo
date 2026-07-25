import { createFileRoute } from "@tanstack/react-router";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Search, Star } from "lucide-react";
import { doctorsApi, type DoctorFilters } from "@/lib/api";
import { DoctorCard } from "@/components/shared/DoctorCard";
import { PageContainer, LoadingState, EmptyState, SectionHeading } from "@/components/shared/state";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

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
const PAGE_SIZE = 9;

function SearchPage() {
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [filters, setFilters] = useState<DoctorFilters>({});
  const [page, setPage] = useState(1);

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q), 300);
    return () => clearTimeout(t);
  }, [q]);

  // Reset to page 1 whenever any filter or query changes
  useEffect(() => { setPage(1); }, [debouncedQ, filters]);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["search", debouncedQ, filters, page],
    queryFn: () => doctorsApi.list({ ...filters, q: debouncedQ, page, pageSize: PAGE_SIZE }),
    placeholderData: keepPreviousData,
  });

  const total = data?.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const reset = () => { setQ(""); setFilters({}); setPage(1); };

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
            <Select value={filters.gender ?? "any"} onValueChange={(v) => setFilters({ ...filters, gender: v as DoctorFilters["gender"] })}>
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

        <div className="mt-5 grid gap-6 sm:grid-cols-3">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <Label className="text-xs">Min experience</Label>
              <span className="text-xs text-muted-foreground">{filters.minExperience ?? 0}+ yrs</span>
            </div>
            <Slider value={[filters.minExperience ?? 0]} min={0} max={30} step={1} onValueChange={([v]) => setFilters({ ...filters, minExperience: v || undefined })} />
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <Label className="text-xs">Max fee</Label>
              <span className="text-xs text-muted-foreground">PKR {filters.maxFee ?? 5000}</span>
            </div>
            <Slider value={[filters.maxFee ?? 5000]} min={500} max={5000} step={100} onValueChange={([v]) => setFilters({ ...filters, maxFee: v })} />
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <Label className="text-xs">Min rating</Label>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Star className="h-3 w-3 fill-warning text-warning" /> {filters.minRating ?? 0}+</span>
            </div>
            <Slider value={[filters.minRating ?? 0]} min={0} max={5} step={0.5} onValueChange={([v]) => setFilters({ ...filters, minRating: v || undefined })} />
          </div>
        </div>

        <div className="mt-4 flex justify-end"><Button variant="ghost" onClick={reset}>Clear all</Button></div>
      </div>

      <div className="mt-8">
        {isLoading ? <LoadingState rows={6} /> : !data?.results.length ? (
          <EmptyState icon={Search} title="No results" description="Try broadening your search or clearing filters." />
        ) : (
          <>
            <p className="mb-4 text-sm text-muted-foreground">
              {total} doctor{total === 1 ? "" : "s"} found{isFetching ? " • updating…" : ""}
            </p>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {data.results.map((d) => <DoctorCard key={d.id} doctor={d} />)}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                  <ChevronLeft className="h-4 w-4" /> Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <Button
                    key={n}
                    variant={n === page ? "default" : "outline"}
                    size="sm"
                    className="w-10"
                    onClick={() => setPage(n)}
                  >
                    {n}
                  </Button>
                ))}
                <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </PageContainer>
  );
}
