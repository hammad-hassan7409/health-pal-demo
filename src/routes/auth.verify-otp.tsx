import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { authApi } from "@/lib/api";

export const Route = createFileRoute("/auth/verify-otp")({
  head: () => ({ meta: [
    { title: "Verify OTP — Medivia" },
    { name: "description", content: "Verify your phone with a one-time code." },
    { property: "og:title", content: "Verify OTP — Medivia" },
    { property: "og:description", content: "Verify your phone." },
  ]}),
  component: Page,
});

function Page() {
  const nav = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <AuthShell title="Verify your phone" subtitle="Enter the 6-digit code we sent to your number." footer={<Link to="/auth/login" className="text-primary hover:underline">Back to login</Link>}>
      <div className="flex justify-center">
        <InputOTP maxLength={6} value={code} onChange={setCode}>
          <InputOTPGroup>
            {Array.from({ length: 6 }).map((_, i) => <InputOTPSlot key={i} index={i} />)}
          </InputOTPGroup>
        </InputOTP>
      </div>
      <Button
        size="lg" className="mt-6 w-full" disabled={code.length !== 6 || loading}
        onClick={async () => { setLoading(true); await authApi.verifyOtp(code); toast.success("Verified!"); nav({ to: "/app/patient" }); }}
      >Verify</Button>
      <p className="mt-4 text-center text-xs text-muted-foreground">Didn't get the code? <button className="text-primary hover:underline">Resend</button></p>
    </AuthShell>
  );
}
