import { Link } from "@tanstack/react-router";
import { Star, MapPin, Video, MessageSquare, Calendar } from "lucide-react";
import type { Doctor } from "@/lib/api/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:shadow-elevated hover:-translate-y-0.5">
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <img src={doctor.photo} alt={doctor.name} loading="lazy" className="h-16 w-16 rounded-2xl object-cover ring-1 ring-border" />
          {doctor.online && (
            <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full border-2 border-card bg-success">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <Link to="/doctors/$id" params={{ id: doctor.id }} className="block">
            <h3 className="truncate text-base font-semibold text-foreground hover:text-primary">{doctor.name}</h3>
          </Link>
          <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
          <div className="mt-1 flex items-center gap-1 text-sm">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" />
            <span className="font-medium">{doctor.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({doctor.reviewsCount})</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <Badge variant="secondary" className="rounded-full">{doctor.experienceYears}+ yrs exp</Badge>
        <Badge variant="secondary" className="rounded-full">PKR {doctor.consultationFee.toLocaleString()}</Badge>
      </div>

      <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
        <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {doctor.hospital} · {doctor.city}</p>
        <p className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Available {doctor.availability.slice(0, 3).join(", ")}</p>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <Link to="/doctors/$id" params={{ id: doctor.id }}>
          <Button variant="outline" size="sm" className="w-full" aria-label="View profile">Profile</Button>
        </Link>
        <Button variant="outline" size="sm" aria-label="Chat" className="px-0">
          <MessageSquare className="h-4 w-4" />
        </Button>
        <Link to="/book/$doctorId" params={{ doctorId: doctor.id }}>
          <Button size="sm" className="w-full">
            <Video className="h-4 w-4" /> Book
          </Button>
        </Link>
      </div>
    </article>
  );
}
