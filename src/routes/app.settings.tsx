import { createFileRoute } from "@tanstack/react-router";
import { Bell, Lock, Globe, Trash2, ShieldCheck } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [
    { title: "Settings — Medivia" },
    { name: "description", content: "Manage your Medivia settings." },
    { name: "robots", content: "noindex" },
  ]}),
  component: Page,
});

function Row({ icon: Icon, title, desc, action }: any) {
  return (
    <div className="flex items-center gap-4 py-5">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary"><Icon className="h-4 w-4" /></span>
      <div className="min-w-0 flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
      {action}
    </div>
  );
}

function Page() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">Preferences, privacy and account controls.</p>

      <section className="mt-8 rounded-2xl border border-border bg-card px-6 shadow-soft">
        <h2 className="pt-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Notifications</h2>
        <div className="divide-y divide-border">
          <Row icon={Bell} title="Appointment reminders" desc="15 minutes before every consultation." action={<Switch defaultChecked />} />
          <Row icon={Bell} title="Message notifications" desc="When your doctor replies." action={<Switch defaultChecked />} />
          <Row icon={Bell} title="Marketing updates" desc="Occasional articles and product news." action={<Switch />} />
        </div>
        <div className="h-4" />
      </section>

      <section className="mt-6 rounded-2xl border border-border bg-card px-6 shadow-soft">
        <h2 className="pt-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Privacy & security</h2>
        <div className="divide-y divide-border">
          <Row icon={Lock} title="Two-factor authentication" desc="Extra layer of security at sign in." action={<Switch />} />
          <Row icon={ShieldCheck} title="Share data with doctors" desc="Allow doctors to view your medical history during consultations." action={<Switch defaultChecked />} />
          <Row icon={Globe} title="Language" desc="Choose your preferred language." action={
            <Select defaultValue="en"><SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="en">English</SelectItem><SelectItem value="ur">Urdu</SelectItem></SelectContent>
            </Select>
          } />
        </div>
        <div className="h-4" />
      </section>

      <section className="mt-6 rounded-2xl border border-destructive/20 bg-card p-6 shadow-soft">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-destructive">Danger zone</h2>
        <Separator className="my-4" />
        <div className="flex items-center gap-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-destructive/10 text-destructive"><Trash2 className="h-4 w-4" /></span>
          <div className="min-w-0 flex-1">
            <p className="font-medium">Delete account</p>
            <p className="text-sm text-muted-foreground">Permanently remove your data. This cannot be undone.</p>
          </div>
          <Button variant="outline" className="border-destructive/40 text-destructive hover:bg-destructive/10">Delete</Button>
        </div>
      </section>
    </div>
  );
}
