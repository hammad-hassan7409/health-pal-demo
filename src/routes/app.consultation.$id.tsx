import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Pill, Users, Signal, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/consultation/$id")({
  head: () => ({ meta: [
    { title: "Video Consultation — Medivia" },
    { name: "description", content: "Your live consultation." },
    { name: "robots", content: "noindex" },
  ]}),
  component: Consultation,
});

function Consultation() {
  const nav = useNavigate();
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [waiting, setWaiting] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-white">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10"><Video className="h-4 w-4" /></span>
          <div>
            <p className="text-sm font-semibold">Consultation with Dr. Ayesha Khan</p>
            <p className="flex items-center gap-1 text-xs text-white/70"><Signal className="h-3 w-3 text-success" /> Connected · HD</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => nav({ to: "/app/patient" })} aria-label="Leave" className="text-white hover:bg-white/10"><X className="h-5 w-5" /></Button>
      </div>

      <div className="flex flex-1 gap-4 px-6 pb-6">
        <div className="relative flex-1 overflow-hidden rounded-3xl bg-slate-800">
          {waiting ? (
            <div className="grid h-full place-items-center">
              <div className="text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white/10"><Users className="h-8 w-8" /></div>
                <p className="mt-4 text-lg font-semibold">Waiting for your doctor</p>
                <p className="mt-1 text-sm text-white/60">Your consultation will begin shortly.</p>
              </div>
            </div>
          ) : (
            <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200" alt="" className="h-full w-full object-cover" />
          )}
          {/* self video */}
          <div className="absolute bottom-4 right-4 h-32 w-24 overflow-hidden rounded-xl border-2 border-white/20 bg-slate-700 md:h-40 md:w-32">
            <div className="grid h-full place-items-center text-white/60"><VideoOff className={cn("h-6 w-6", cam && "hidden")} /></div>
          </div>
        </div>

        {drawerOpen && (
          <aside className="hidden w-96 flex-col rounded-3xl bg-white text-foreground shadow-floating lg:flex">
            <Tabs defaultValue="chat" className="flex h-full flex-col">
              <TabsList className="mx-4 mt-4 justify-start">
                <TabsTrigger value="chat"><MessageSquare className="h-4 w-4 mr-1" /> Chat</TabsTrigger>
                <TabsTrigger value="rx"><Pill className="h-4 w-4 mr-1" /> Prescription</TabsTrigger>
              </TabsList>
              <TabsContent value="chat" className="flex-1 overflow-hidden p-4">
                <div className="flex h-full flex-col gap-3">
                  <div className="flex-1 space-y-2 overflow-y-auto rounded-xl bg-surface p-3 text-sm">
                    <div className="rounded-xl bg-card p-2.5 text-xs">Hi, can you describe your symptoms?</div>
                    <div className="ml-auto max-w-[80%] rounded-xl bg-primary p-2.5 text-xs text-primary-foreground">Chest tightness for the last 2 days, especially when climbing stairs.</div>
                  </div>
                  <div className="flex gap-2"><Input placeholder="Message..." className="h-10" /><Button size="icon"><Send className="h-4 w-4" /></Button></div>
                </div>
              </TabsContent>
              <TabsContent value="rx" className="flex-1 overflow-y-auto p-4">
                <div className="space-y-3 text-sm">
                  <div><label className="text-xs font-medium">Diagnosis</label><Textarea rows={2} className="mt-1" defaultValue="Suspected exertional angina" /></div>
                  <div><label className="text-xs font-medium">Medicines</label>
                    <div className="mt-1 space-y-2">
                      <Input placeholder="e.g. Amlodipine 5mg — 1 tab OD" />
                      <Input placeholder="Add another medicine..." />
                    </div>
                  </div>
                  <div><label className="text-xs font-medium">Advice</label><Textarea rows={3} className="mt-1" placeholder="Rest, ECG follow up in 3 days..." /></div>
                  <Button className="w-full">Sign & send prescription</Button>
                </div>
              </TabsContent>
            </Tabs>
          </aside>
        )}
      </div>

      <div className="flex items-center justify-center gap-3 border-t border-white/10 py-4">
        <Button variant="ghost" onClick={() => setMic((v) => !v)} aria-label="Toggle mic" className={cn("h-12 w-12 rounded-full text-white hover:bg-white/10", !mic && "bg-destructive hover:bg-destructive/90")}>
          {mic ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        </Button>
        <Button variant="ghost" onClick={() => setCam((v) => !v)} aria-label="Toggle camera" className={cn("h-12 w-12 rounded-full text-white hover:bg-white/10", !cam && "bg-destructive hover:bg-destructive/90")}>
          {cam ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </Button>
        <Button variant="ghost" onClick={() => setDrawerOpen((v) => !v)} aria-label="Toggle side panel" className="h-12 w-12 rounded-full text-white hover:bg-white/10"><MessageSquare className="h-5 w-5" /></Button>
        <Button variant="ghost" onClick={() => setWaiting((v) => !v)} aria-label="Waiting room" className="h-12 w-12 rounded-full text-white hover:bg-white/10"><Users className="h-5 w-5" /></Button>
        <Button onClick={() => nav({ to: "/app/patient" })} className="h-12 gap-2 rounded-full bg-destructive px-6 hover:bg-destructive/90"><PhoneOff className="h-5 w-5" /> End</Button>
      </div>
    </div>
  );
}
