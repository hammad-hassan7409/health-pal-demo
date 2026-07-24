import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authApi } from "@/lib/api";

export const Route = createFileRoute("/auth/login")({
  head: () => ({ meta: [
    { title: "Login — Medivia" },
    { name: "description", content: "Sign in to your Medivia account to manage appointments, records and prescriptions." },
    { property: "og:title", content: "Login — Medivia" },
    { property: "og:description", content: "Sign in to Medivia." },
  ]}),
  component: LoginPage,
});

const schema = z.object({ email: z.string().email("Enter a valid email"), password: z.string().min(6, "At least 6 characters") });
type Form = z.infer<typeof schema>;

function LoginPage() {
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(schema) });
  const onSubmit = async (d: Form) => {
    const res = await authApi.login(d.email, d.password);
    if (typeof window !== "undefined") window.localStorage.setItem("auth_token", res.token);
    toast.success("Welcome back!");
    nav({ to: "/app/patient" });
  };
  return (
    <AuthShell title="Welcome back" subtitle="Sign in to continue your care." footer={<>Don't have an account? <Link to="/auth/signup" className="font-medium text-primary hover:underline">Sign up</Link></>}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div><Label>Email</Label><Input type="email" {...register("email")} className="mt-1.5 h-11" />{errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}</div>
        <div>
          <div className="flex items-center justify-between"><Label>Password</Label><Link to="/auth/forgot-password" className="text-xs text-primary hover:underline">Forgot?</Link></div>
          <Input type="password" {...register("password")} className="mt-1.5 h-11" />{errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>}
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>Sign in</Button>
      </form>
    </AuthShell>
  );
}
