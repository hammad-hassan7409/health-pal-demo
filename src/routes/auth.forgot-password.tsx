import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authApi } from "@/lib/api";

export const Route = createFileRoute("/auth/forgot-password")({
  head: () => ({ meta: [
    { title: "Forgot Password — Medivia" },
    { name: "description", content: "Reset access to your Medivia account." },
    { property: "og:title", content: "Forgot Password — Medivia" },
    { property: "og:description", content: "Recover your account access." },
  ]}),
  component: Page,
});
const schema = z.object({ email: z.string().email() });
function Page() {
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });
  return (
    <AuthShell title="Forgot password?" subtitle="Enter your email and we'll send a reset link." footer={<Link to="/auth/login" className="text-primary hover:underline">Back to login</Link>}>
      <form onSubmit={handleSubmit(async (d: any) => { await authApi.forgot(d.email); toast.success("Reset link sent."); nav({ to: "/auth/reset-password" }); })} className="space-y-4">
        <div><Label>Email</Label><Input type="email" {...register("email")} className="mt-1.5 h-11" />{errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message as string}</p>}</div>
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>Send reset link</Button>
      </form>
    </AuthShell>
  );
}
