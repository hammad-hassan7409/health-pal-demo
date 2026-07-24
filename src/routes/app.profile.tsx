import { createFileRoute } from "@tanstack/react-router";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/app/profile")({
  head: () => ({ meta: [
    { title: "Profile — Medivia" },
    { name: "description", content: "Manage your profile." },
    { name: "robots", content: "noindex" },
  ]}),
  component: Page,
});

function Page() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">Profile</h1>
      <p className="mt-1 text-sm text-muted-foreground">This information helps doctors provide better care.</p>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
        <div className="flex items-center gap-6">
          <div className="relative">
            <Avatar className="h-24 w-24"><AvatarFallback className="text-2xl">AR</AvatarFallback></Avatar>
            <button aria-label="Change photo" className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground shadow-elevated">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div>
            <p className="text-xl font-semibold">Ali Raza</p>
            <p className="text-sm text-muted-foreground">ali@example.com · +92 300 1234567</p>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="mt-8 grid gap-5 sm:grid-cols-2">
          <div><Label>Full name</Label><Input defaultValue="Ali Raza" className="mt-1.5 h-11" /></div>
          <div><Label>Email</Label><Input defaultValue="ali@example.com" className="mt-1.5 h-11" /></div>
          <div><Label>Phone</Label><Input defaultValue="+92 300 1234567" className="mt-1.5 h-11" /></div>
          <div><Label>Date of birth</Label><Input type="date" defaultValue="1990-03-15" className="mt-1.5 h-11" /></div>
          <div>
            <Label>Gender</Label>
            <Select defaultValue="male"><SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem><SelectItem value="other">Prefer not to say</SelectItem></SelectContent>
            </Select>
          </div>
          <div>
            <Label>Blood group</Label>
            <Select defaultValue="O+"><SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>{["A+","A-","B+","B-","O+","O-","AB+","AB-"].map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-2"><Label>Address</Label><Input defaultValue="12 Sea View, Karachi" className="mt-1.5 h-11" /></div>
          <div className="sm:col-span-2"><Label>Medical history (optional)</Label><Textarea rows={4} className="mt-1.5" placeholder="Allergies, chronic conditions, ongoing medications..." /></div>
          <div className="sm:col-span-2 flex justify-end gap-2"><Button variant="outline">Cancel</Button><Button>Save changes</Button></div>
        </form>
      </div>
    </div>
  );
}
