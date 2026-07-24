import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/coming-soon")({
  head: () => ({ meta: [
    { title: "Coming Soon — Medivia" },
    { name: "description", content: "Something new is on the way at Medivia." },
    { property: "og:title", content: "Coming Soon" },
    { property: "og:description", content: "Something new is on the way." },
  ]}),
  component: () => (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-primary-soft text-primary"><Sparkles className="h-8 w-8" /></div>
        <h1 className="mt-6 text-3xl font-semibold">Something new is coming</h1>
        <p className="mt-3 text-sm text-muted-foreground">Leave your email and we'll let you know the moment it's live.</p>
        <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex gap-2">
          <Input placeholder="you@email.com" className="h-11" />
          <Button size="lg">Notify me</Button>
        </form>
      </div>
    </div>
  ),
});
