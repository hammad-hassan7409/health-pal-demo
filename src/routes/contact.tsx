import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { PageContainer, SectionHeading } from "@/components/shared/state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Medivia" },
      { name: "description", content: "Get in touch with the Medivia team. We reply within a few hours." },
      { property: "og:title", content: "Contact — Medivia" },
      { property: "og:description", content: "Reach the Medivia team." },
    ],
  }),
  component: Page,
});

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(3, "What is this about?"),
  message: z.string().min(10, "A little more detail helps us reply well"),
});
type Form = z.infer<typeof schema>;

function Page() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<Form>({ resolver: zodResolver(schema) });
  const onSubmit = async (data: Form) => {
    await new Promise((r) => setTimeout(r, 500));
    toast.success("Message sent — we'll reply within a few hours.");
    reset();
  };
  return (
    <PageContainer>
      <SectionHeading eyebrow="Contact" title="We'd love to hear from you" description="Support, partnerships, or general questions — the team is one message away." />
      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          {[
            { icon: Mail, t: "Email", v: "care@medivia.health" },
            { icon: Phone, t: "Phone", v: "+92 300 1234567" },
            { icon: MapPin, t: "Office", v: "Karachi · Lahore · Islamabad" },
          ].map((c) => (
            <div key={c.t} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary"><c.icon className="h-5 w-5" /></span>
              <div><p className="text-xs text-muted-foreground">{c.t}</p><p className="font-medium">{c.v}</p></div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div><Label>Name</Label><Input {...register("name")} className="mt-1.5" />{errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}</div>
            <div><Label>Email</Label><Input {...register("email")} className="mt-1.5" />{errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}</div>
          </div>
          <div><Label>Subject</Label><Input {...register("subject")} className="mt-1.5" />{errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject.message}</p>}</div>
          <div><Label>Message</Label><Textarea rows={6} {...register("message")} className="mt-1.5" />{errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}</div>
          <Button type="submit" size="lg" disabled={isSubmitting}><Send className="h-4 w-4" /> Send message</Button>
        </form>
      </div>
    </PageContainer>
  );
}
