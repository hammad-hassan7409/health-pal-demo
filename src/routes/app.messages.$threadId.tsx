import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Send, Paperclip, Smile, Mic, FileText, Check, CheckCheck, Video, Phone } from "lucide-react";
import { chatApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingState } from "@/components/shared/state";
import type { ChatMessage } from "@/lib/api/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/messages/$threadId")({
  head: () => ({ meta: [
    { title: "Chat — Medivia" },
    { name: "description", content: "Chat with your doctor." },
    { name: "robots", content: "noindex" },
  ]}),
  component: ChatPage,
});

function ChatPage() {
  const { threadId } = Route.useParams();
  const threads = useQuery({ queryKey: ["threads"], queryFn: () => chatApi.threads() });
  const msgs = useQuery({ queryKey: ["msgs", threadId], queryFn: () => chatApi.messages(threadId) });
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (msgs.data) setMessages(msgs.data); }, [msgs.data]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const thread = threads.data?.find((t) => t.id === threadId);

  const send = () => {
    if (!text.trim()) return;
    const m: ChatMessage = { id: `local-${Date.now()}`, threadId, fromMe: true, text, time: "Now", status: "sent" };
    setMessages((prev) => [...prev, m]);
    setText("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { id: `r-${Date.now()}`, threadId, fromMe: false, text: "Thanks, noted. I'll get back shortly.", time: "Now", status: "read" }]);
    }, 1400);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <div className="flex items-center gap-3 border-b border-border p-4">
        <Link to="/app/messages"><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
        {thread && (
          <>
            <img src={thread.peerAvatar} alt="" className="h-10 w-10 rounded-xl object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{thread.peerName}</p>
              <p className="text-xs text-success">{thread.online ? "Online" : "Offline"}</p>
            </div>
            <Button variant="ghost" size="icon"><Phone className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><Video className="h-4 w-4" /></Button>
          </>
        )}
      </div>

      <div className="flex-1 overflow-y-auto bg-surface/40 p-4 md:p-6">
        {msgs.isLoading ? <LoadingState rows={2} /> : (
          <div className="mx-auto max-w-3xl space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={cn("flex", m.fromMe ? "justify-end" : "justify-start")}>
                <div className={cn("max-w-[75%] rounded-2xl px-4 py-2.5 shadow-soft",
                  m.fromMe ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-card text-foreground rounded-bl-sm border border-border")}>
                  {m.text && <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>}
                  {m.attachment && (
                    <div className={cn("mt-1 flex items-center gap-2 rounded-lg p-2", m.fromMe ? "bg-white/10" : "bg-muted")}>
                      <FileText className="h-4 w-4" />
                      <span className="text-xs">{m.attachment.name}</span>
                    </div>
                  )}
                  <div className={cn("mt-1 flex items-center justify-end gap-1 text-[10px]", m.fromMe ? "text-primary-foreground/70" : "text-muted-foreground")}>
                    <span>{m.time}</span>
                    {m.fromMe && (m.status === "read" ? <CheckCheck className="h-3 w-3" /> : m.status === "delivered" ? <CheckCheck className="h-3 w-3 opacity-60" /> : <Check className="h-3 w-3" />)}
                  </div>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm border border-border bg-card px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <div className="border-t border-border p-3">
        <div className="mx-auto flex max-w-3xl items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Attach"><Paperclip className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" aria-label="Emoji"><Smile className="h-4 w-4" /></Button>
          <Input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Type a message..." className="h-11" />
          {text ? (
            <Button size="icon" onClick={send} aria-label="Send"><Send className="h-4 w-4" /></Button>
          ) : (
            <Button variant="ghost" size="icon" aria-label="Voice note"><Mic className="h-4 w-4" /></Button>
          )}
        </div>
      </div>
    </div>
  );
}
