import { Link } from "@tanstack/react-router";
import { Stethoscope } from "lucide-react";
import type { ReactNode } from "react";

export function AuthShell({ title, subtitle, children, footer }: { title: string; subtitle?: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden bg-primary lg:flex lg:flex-col lg:justify-between lg:p-12 text-primary-foreground">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10"><Stethoscope className="h-5 w-5" /></span>
          <span className="text-lg font-semibold">Medivia</span>
        </Link>
        <div>
          <blockquote className="text-2xl font-medium leading-snug">"Booked a specialist at 9 PM, spoke to her by 9:20, prescription in my inbox before 10."</blockquote>
          <p className="mt-4 text-sm text-primary-foreground/70">— Sana A., patient in Karachi</p>
        </div>
        <p className="text-xs text-primary-foreground/60">© {new Date().getFullYear()} Medivia Health</p>
      </div>
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground"><Stethoscope className="h-5 w-5" /></span>
            <span className="text-lg font-semibold">Medivia</span>
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
