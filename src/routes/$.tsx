import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/$")({
  head: () => ({ meta: [
    { title: "Page Not Found — Medivia" },
    { name: "description", content: "The page you're looking for doesn't exist." },
    { name: "robots", content: "noindex" },
  ]}),
  component: () => (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold text-primary">404</p>
        <h1 className="mt-2 text-4xl font-semibold">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="mt-6 inline-block"><Button size="lg">Back to home</Button></Link>
      </div>
    </div>
  ),
});
