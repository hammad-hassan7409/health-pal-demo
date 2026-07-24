import { createFileRoute, Link } from "@tanstack/react-router";
import { HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/maintenance")({
  head: () => ({ meta: [
    { title: "Under Maintenance — Medivia" },
    { name: "description", content: "Medivia is undergoing scheduled maintenance." },
    { property: "og:title", content: "Under Maintenance" },
    { property: "og:description", content: "We'll be back shortly." },
  ]}),
  component: () => (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-warning/10 text-warning"><HardHat className="h-8 w-8" /></div>
        <h1 className="mt-6 text-3xl font-semibold">We'll be right back</h1>
        <p className="mt-3 text-sm text-muted-foreground">Medivia is undergoing scheduled maintenance to make things even smoother. We'll be back online in a few minutes.</p>
        <Link to="/" className="mt-6 inline-block"><Button size="lg">Return home</Button></Link>
      </div>
    </div>
  ),
});
