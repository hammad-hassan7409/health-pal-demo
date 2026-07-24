import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Search, MessageSquare } from "lucide-react";
import { chatApi } from "@/lib/api";
import { LoadingState, EmptyState } from "@/components/shared/state";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/messages/")({
  head: () => ({ meta: [
    { title: "Messages — Medivia" },
    { name: "description", content: "Your conversations with doctors." },
    { name: "robots", content: "noindex" },
  ]}),
  component: Page,
});

function Page() {
  const [q, setQ] = useState("");
  const { data, isLoading } = useQuery({ queryKey: ["threads"], queryFn: () => chatApi.threads() });
  const items = data?.filter((t) => t.peerName.toLowerCase().includes(q.toLowerCase())) ?? [];

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Messages</h1>
      <p className="mt-1 text-sm text-muted-foreground">Secure conversations with your care team.</p>
      <div className="relative mt-6">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search conversations..." className="h-11 pl-10" />
      </div>
      <div className="mt-6">
        {isLoading ? <LoadingState rows={3} /> : !items.length ? <EmptyState icon={MessageSquare} title="No conversations" description="Start a chat with a doctor from their profile." /> : (
          <div className="divide-y divide-border rounded-2xl border border-border bg-card shadow-soft">
            {items.map((t) => (
              <Link key={t.id} to="/app/messages/$threadId" params={{ threadId: t.id }} className="flex items-center gap-4 p-4 transition-colors hover:bg-accent">
                <div className="relative shrink-0">
                  <img src={t.peerAvatar} alt="" className="h-12 w-12 rounded-xl object-cover" />
                  {t.online && <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-card bg-success" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate font-semibold">{t.peerName}</p>
                    <span className="whitespace-nowrap text-xs text-muted-foreground">{t.lastTime}</span>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">{t.lastMessage}</p>
                </div>
                {t.unread > 0 && <span className={cn("grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground")}>{t.unread}</span>}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
