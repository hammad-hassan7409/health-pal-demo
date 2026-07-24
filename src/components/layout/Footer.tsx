import { Link } from "@tanstack/react-router";
import { Stethoscope, Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const cols = [
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/doctors", label: "Doctors" },
      { to: "/blog", label: "Blog" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { to: "/online-consultation", label: "Online Consultation" },
      { to: "/specializations", label: "Specializations" },
      { to: "/doctors/search", label: "Find a Doctor" },
      { to: "/reviews", label: "Reviews" },
    ],
  },
  {
    title: "Support",
    links: [
      { to: "/faqs", label: "FAQs" },
      { to: "/legal/privacy", label: "Privacy Policy" },
      { to: "/legal/terms", label: "Terms & Conditions" },
      { to: "/legal/refund", label: "Refund Policy" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/60">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Stethoscope className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold">Medivia</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Premium telemedicine — verified doctors, secure video consultations, and prescriptions delivered online.
          </p>
          <form className="mt-6 flex max-w-sm gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" placeholder="Your email" aria-label="Newsletter email" className="h-11" />
            <Button type="submit" className="h-11">Subscribe</Button>
          </form>
          <div className="mt-6 flex items-center gap-3">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social link" className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground hover:bg-accent hover:text-primary">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="text-sm font-semibold">{c.title}</h4>
            <ul className="mt-4 space-y-3">
              {c.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-start justify-between gap-3 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> care@medivia.health</span>
            <span className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> +92 300 1234567</span>
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Karachi · Lahore · Islamabad</span>
          </div>
          <p>© {new Date().getFullYear()} Medivia Health. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
