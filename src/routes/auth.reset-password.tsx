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

export const Route = createFileRoute("/auth/reset-password")({
  head: () => ({ meta: [
    { title: "Reset Password — Medivia" },
    { name: "description", content: "Set a new password for your Medivia account." },
    { property: "og:title", content: "Reset Password — Medivia" },
    { property: "og:description", content: "Set a new password." },
  ]}),
  component: Page,
});
const schema = z.object({
  password: z.string().min(6, "At least 6 characters"),
  confirm: z.string(),
}).refine((d) => d.password === d.confirm, { message: "Passwords don't match", path: ["confirm"] });

function Page() {
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });
  return (
    <AuthShell title="Set a new password" subtitle="Choose something you'll remember." footer={<Link to="/auth/login" className="text-primary hover:underline">Back to login</Link>}>
      <form onSubmit={handleSubmit(async (d: any) => { await authApi.reset("token", d.password); toast.success("Password updated."); nav({ to: "/auth/login" }); })} className="space-y-4">
        <div><Label>New password</Label><Input type="password" {...register("password")} className="mt-1.5 h-11" />{errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message as string}</p>}</div>
        <div><Label>Confirm password</Label><Input type="password" {...register("confirm")} className="mt-1.5 h-11" />{errors.confirm && <p className="mt-1 text-xs text-destructive">{errors.confirm.message as string}</p>}</div>
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>Update password</Button>
      </form>
    </AuthShell>
  );
}
