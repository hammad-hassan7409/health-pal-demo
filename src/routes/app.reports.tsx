import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Upload, FileText, Image as ImageIcon, Trash2, Download, Eye } from "lucide-react";
import { reportsApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { EmptyState, LoadingState } from "@/components/shared/state";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/reports")({
  head: () => ({ meta: [
    { title: "Medical Reports — Medivia" },
    { name: "description", content: "Manage your medical reports." },
    { name: "robots", content: "noindex" },
  ]}),
  component: Page,
});

function Page() {
  const { data, isLoading } = useQuery({ queryKey: ["reports"], queryFn: () => reportsApi.list() });
  const [drag, setDrag] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);

  const fakeUpload = () => {
    setProgress(0);
    let p = 0;
    const t = setInterval(() => { p += 10; setProgress(p); if (p >= 100) { clearInterval(t); setTimeout(() => setProgress(null), 500); } }, 120);
  };

  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Medical Reports</h1>
          <p className="mt-1 text-sm text-muted-foreground">Upload and manage lab reports, scans and clinical notes.</p>
        </div>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); fakeUpload(); }}
        className={cn("mt-8 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition-colors",
          drag ? "border-primary bg-primary-soft" : "border-border bg-surface/40")}
      >
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary"><Upload className="h-6 w-6" /></div>
        <h3 className="mt-4 text-lg font-semibold">Drag and drop files here</h3>
        <p className="mt-1 text-sm text-muted-foreground">or click below to browse — PDF, JPG, PNG up to 20 MB</p>
        <Button onClick={fakeUpload} className="mt-5">Choose files</Button>
        {progress !== null && <div className="mt-5 w-full max-w-sm"><Progress value={progress} /><p className="mt-1 text-xs text-muted-foreground">{progress}% uploaded</p></div>}
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-lg font-semibold">Your reports</h2>
        {isLoading ? <LoadingState rows={2} /> : !data?.length ? (
          <EmptyState icon={FileText} title="No reports yet" description="Upload your first report to keep it safely stored." />
        ) : (
          <div className="divide-y divide-border rounded-2xl border border-border bg-card shadow-soft">
            {data.map((r) => (
              <div key={r.id} className="flex items-center gap-4 p-5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                  {r.type === "image" ? <ImageIcon className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{r.name}</p>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="rounded-full">{r.category}</Badge>
                    <span>{(r.size / 1024).toFixed(0)} KB</span>
                    <span>·</span>
                    <span>{new Date(r.uploadedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" aria-label="View"><Eye className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" aria-label="Download"><Download className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" aria-label="Delete" className="text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
