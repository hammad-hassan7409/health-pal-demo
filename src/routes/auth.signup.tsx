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

export const Route = createFileRoute("/auth/signup")({
  head: () => ({ meta: [
    { title: "Create Account — Medivia" },
    { name: "description", content: "Create your Medivia account to book verified doctors online." },
    { property: "og:title", content: "Sign up — Medivia" },
    { property: "og:description", content: "Create your Medivia account." },
  ]}),
  component: SignupPage,
});

const schema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email(),
  phone: z.string().min(10, "Enter a valid phone"),
  password: z.string().min(6, "At least 6 characters"),
});
type Form = z.infer<typeof schema>;

function SignupPage() {
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(schema) });
  const onSubmit = async (d: Form) => {
    await authApi.signup(d.name, d.email, d.password);
    toast.success("Account created. Please verify your phone.");
    nav({ to: "/auth/verify-otp" });
  };
  return (
    <AuthShell title="Create your account" subtitle="Book verified doctors in minutes." footer={<>Already have an account? <Link to="/auth/login" className="font-medium text-primary hover:underline">Sign in</Link></>}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div><Label>Full name</Label><Input {...register("name")} className="mt-1.5 h-11" />{errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}</div>
        <div><Label>Email</Label><Input type="email" {...register("email")} className="mt-1.5 h-11" />{errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}</div>
        <div><Label>Phone</Label><Input {...register("phone")} className="mt-1.5 h-11" placeholder="+92 300 1234567" />{errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}</div>
        <div><Label>Password</Label><Input type="password" {...register("password")} className="mt-1.5 h-11" />{errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>}</div>
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>Create account</Button>
        <p className="text-center text-xs text-muted-foreground">By creating an account you agree to our <Link to="/legal/terms" className="underline">terms</Link> and <Link to="/legal/privacy" className="underline">privacy policy</Link>.</p>
      </form>
    </AuthShell>
  );
}
