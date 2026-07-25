// Tracks which role/user is "viewing" the app in this demo, so notifications
// and other role-scoped data can be filtered client-side. Wired to real auth later.
export type Viewer =
  | { role: "patient"; id: string; name: string }
  | { role: "doctor"; id: string; name: string }
  | { role: "admin"; id: string; name: string };

const KEY = "medivia_viewer";
const DEFAULT: Viewer = { role: "patient", id: "p1", name: "Ali Raza" };

export function getViewer(): Viewer {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Viewer;
  } catch {}
  return DEFAULT;
}

export function setViewer(v: Viewer) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(v));
}

export function viewerFromPath(pathname: string): Viewer | null {
  if (pathname.startsWith("/app/doctor")) return { role: "doctor", id: "doc-1", name: "Dr. Ayesha Khan" };
  if (pathname.startsWith("/app/admin")) return { role: "admin", id: "admin-1", name: "Admin" };
  if (pathname.startsWith("/app/patient") || pathname.startsWith("/app")) return DEFAULT;
  return null;
}
