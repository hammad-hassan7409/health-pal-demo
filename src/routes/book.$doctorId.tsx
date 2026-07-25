import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "motion/react";
import { Calendar as CalendarIcon, ChevronLeft, ShieldCheck, Video, CreditCard, Wallet, Building2, Smartphone, Check, Lock } from "lucide-react";
import { toast } from "sonner";
import { doctorsApi, appointmentsApi } from "@/lib/api";
import { PageContainer, LoadingState, ErrorState } from "@/components/shared/state";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/book/$doctorId")({
  head: () => ({ meta: [
    { title: "Book Appointment — Medivia" },
    { name: "description", content: "Book your consultation in four calm steps." },
    { property: "og:title", content: "Book Appointment — Medivia" },
    { property: "og:description", content: "Book your consultation in minutes." },
  ]}),
  component: BookPage,
});

const steps = ["Date & Time", "Reason", "Review", "Payment"] as const;

function BookPage() {
  const { doctorId } = Route.useParams();
  const nav = useNavigate();
  const doc = useQuery({ queryKey: ["doctor", doctorId], queryFn: () => doctorsApi.get(doctorId) });

  const [step, setStep] = useState(0);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [slot, setSlot] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [method, setMethod] = useState("card");

  const dateKey = date ? date.toISOString().slice(0, 10) : "today";
  const slots = useQuery({
    queryKey: ["slots", doctorId, dateKey],
    queryFn: () => doctorsApi.slots(doctorId, dateKey),
    enabled: !!date,
  });

  const booking = useMutation({
    mutationFn: () => appointmentsApi.book({
      doctorId,
      doctorName: doc.data?.name,
      doctorPhoto: doc.data?.photo,
      specialization: doc.data?.specialization,
      date: date?.toISOString(),
      time: slot ?? undefined,
      type: "video",
      status: "pending",
      reason,
      fee: doc.data?.consultationFee,
    }),
    onSuccess: (res) => {
      toast.success("Appointment booked", { description: `Confirmation #${res.id}` });
      nav({ to: "/book/success" });
    },
    onError: () => {
      toast.error("Payment failed", { description: "Please try a different method." });
      nav({ to: "/book/failed" });
    },
  });

  if (doc.isLoading) return <PageContainer><LoadingState rows={2} /></PageContainer>;
  if (doc.error || !doc.data) return <PageContainer><ErrorState onRetry={() => doc.refetch()} /></PageContainer>;
  const d = doc.data;
  const canNext = [!!date && !!slot, reason.length >= 3, true, true][step];
  const processing = booking.isPending;

  const submit = () => booking.mutate();

  return (
    <PageContainer>
      <Link to="/doctors/$id" params={{ id: doctorId }} className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="h-4 w-4" /> Back to profile
      </Link>

      <div className="mb-8 flex items-center gap-2 overflow-x-auto">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={cn("grid h-8 w-8 place-items-center rounded-full text-xs font-semibold transition-colors",
              i < step ? "bg-success text-success-foreground" : i === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={cn("text-sm font-medium whitespace-nowrap", i === step ? "text-foreground" : "text-muted-foreground")}>{s}</span>
            {i < steps.length - 1 && <div className="mx-2 h-px w-8 bg-border" />}
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
          {step === 0 && (
            <div>
              <h2 className="text-xl font-semibold">Pick a date and time</h2>
              <div className="mt-6 grid gap-8 md:grid-cols-2">
                <div><Calendar mode="single" selected={date} onSelect={setDate} className="rounded-xl border border-border p-3" /></div>
                <div>
                  <p className="mb-3 text-sm font-medium">Available slots</p>
                  {slots.isLoading ? <p className="text-sm text-muted-foreground">Loading...</p> : (
                    <div className="grid grid-cols-3 gap-2">
                      {slots.data?.map((s) => (
                        <button key={s.id} disabled={!s.available} onClick={() => setSlot(s.time)}
                          className={cn("rounded-lg border px-3 py-2 text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed",
                            slot === s.time ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/40 hover:bg-accent")}>
                          {s.time}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold">Tell the doctor about your visit</h2>
              <p className="mt-1 text-sm text-muted-foreground">A short summary helps your doctor prepare.</p>
              <div className="mt-6 space-y-4">
                <div><Label>Reason for visit</Label><Input value={reason} onChange={(e) => setReason(e.target.value)} className="mt-1.5 h-11" placeholder="e.g. Chest pain, follow up" /></div>
                <div><Label>Additional notes (optional)</Label><Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={5} className="mt-1.5" placeholder="Duration, medications, related history..." /></div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold">Review your appointment</h2>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between border-b border-border pb-3"><dt className="text-muted-foreground">Doctor</dt><dd className="font-medium">{d.name}</dd></div>
                <div className="flex justify-between border-b border-border pb-3"><dt className="text-muted-foreground">Specialty</dt><dd>{d.specialization}</dd></div>
                <div className="flex justify-between border-b border-border pb-3"><dt className="text-muted-foreground">Date</dt><dd>{date?.toDateString()}</dd></div>
                <div className="flex justify-between border-b border-border pb-3"><dt className="text-muted-foreground">Time</dt><dd>{slot}</dd></div>
                <div className="flex justify-between border-b border-border pb-3"><dt className="text-muted-foreground">Type</dt><dd className="inline-flex items-center gap-1"><Video className="h-4 w-4" /> Video</dd></div>
                <div className="flex justify-between border-b border-border pb-3"><dt className="text-muted-foreground">Reason</dt><dd className="max-w-xs text-right">{reason}</dd></div>
              </dl>
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold">Payment</h2>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><Lock className="h-3.5 w-3.5" /> Encrypted checkout · powered by Medivia Pay</p>
              <RadioGroup value={method} onValueChange={setMethod} className="mt-6 space-y-2">
                {[
                  { v: "card", i: CreditCard, l: "Credit / Debit Card", d: "Visa, Mastercard, UnionPay" },
                  { v: "jazzcash", i: Wallet, l: "JazzCash", d: "Pay from your JazzCash wallet" },
                  { v: "easypaisa", i: Smartphone, l: "EasyPaisa", d: "Pay from your EasyPaisa account" },
                  { v: "bank", i: Building2, l: "Bank Transfer", d: "Direct transfer via IBFT" },
                ].map((m) => (
                  <label key={m.v} className={cn("flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors",
                    method === m.v ? "border-primary bg-primary-soft" : "border-border hover:bg-accent")}>
                    <RadioGroupItem value={m.v} />
                    <m.i className="h-5 w-5 text-primary" />
                    <div className="flex-1"><p className="text-sm font-medium">{m.l}</p><p className="text-xs text-muted-foreground">{m.d}</p></div>
                  </label>
                ))}
              </RadioGroup>
              {method === "card" && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2"><Label>Card number</Label><Input placeholder="1234 5678 9012 3456" className="mt-1.5 h-11" /></div>
                  <div><Label>Expiry</Label><Input placeholder="MM / YY" className="mt-1.5 h-11" /></div>
                  <div><Label>CVC</Label><Input placeholder="123" className="mt-1.5 h-11" /></div>
                </div>
              )}
              <div className="mt-6"><Input placeholder="Have a coupon code?" className="h-11" /></div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <Button variant="ghost" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>Back</Button>
            {step < 3 ? (
              <Button disabled={!canNext} onClick={() => setStep((s) => s + 1)}>Continue</Button>
            ) : (
              <Button disabled={processing} onClick={submit}><Lock className="h-4 w-4" /> Pay PKR {d.consultationFee.toLocaleString()}</Button>
            )}
          </div>
        </motion.div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center gap-3">
              <img src={d.photo} alt={d.name} className="h-14 w-14 rounded-xl object-cover" />
              <div><p className="font-semibold">{d.name}</p><p className="text-sm text-muted-foreground">{d.specialization}</p></div>
            </div>
            <dl className="mt-6 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Consultation</dt><dd>PKR {d.consultationFee.toLocaleString()}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Platform fee</dt><dd>PKR 0</dd></div>
              <div className="mt-3 flex justify-between border-t border-border pt-3 text-base font-semibold"><dt>Total</dt><dd>PKR {d.consultationFee.toLocaleString()}</dd></div>
            </dl>
            <div className="mt-6 flex items-center gap-2 rounded-xl bg-success/10 p-3 text-xs text-success">
              <ShieldCheck className="h-4 w-4" /> Secure, encrypted payment
            </div>
            <p className="mt-4 flex items-center gap-1 text-xs text-muted-foreground"><CalendarIcon className="h-3.5 w-3.5" /> Free reschedule up to 2h before</p>
          </div>
        </aside>
      </div>
    </PageContainer>
  );
}
