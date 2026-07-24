
# Telemedicine Platform — Frontend Build Plan

A premium, minimal, trust-first telemedicine web app. Frontend only, structured so a Django REST API can plug in later without UI changes.

## Stack reality check (important)

Your brief specifies React Router + Vite + Axios + React Query. This project is a **TanStack Start** template (React 19 + Vite 7 + TanStack Router + TanStack Query + Tailwind v4 + shadcn/ui). I'll keep the spirit of your brief but adapt:

- **Routing**: TanStack Router file-based routes under `src/routes/` (equivalent to React Router; type-safe). Every page you listed becomes its own route file — no hash-anchor sections.
- **Data**: TanStack Query + a thin **Axios** client in `src/lib/api/`. Every list/detail/mutation goes through a typed service module so swapping mock data for the Django endpoints later is a one-line change per resource.
- **Forms**: React Hook Form + Zod.
- **Animation**: Framer Motion (`motion/react`) for tasteful entrances and hovers only — no flashy motion.
- **Icons**: lucide-react. **UI**: shadcn/ui, deeply customized (not stock).

## Design system

Tokens go in `src/styles.css` under `@theme` + `:root` (oklch equivalents of your hex palette, mapped semantically). No hardcoded colors in components.

- Primary `#2563EB` → `--primary`
- Background `#FFFFFF` / Surface `#F8FAFC`
- Text `#111827` / Muted `#6B7280` / Border `#E5E7EB`
- Success `#22C55E` / Warning `#F59E0B` / Danger `#EF4444`
- Font: **Inter** loaded via `<link>` in `__root.tsx` head (Tailwind v4 rule — no `@import` URLs in CSS)
- Radius scale 14–20px, soft elevation shadows (`--shadow-sm/md/lg` tokens), 200ms transitions
- No gradients, no neon, generous whitespace, restrained motion

Custom shadcn variants: `Button` (primary/secondary/ghost/outline/danger + `hero` size), `Card` (flat, soft-elevated, outlined), `Badge` (status, specialty), `Input` (with leading icon slot).

## Information architecture (all 41 pages)

```text
src/routes/
  __root.tsx                     shell (Navbar + Footer + Outlet)
  index.tsx                      Landing / Home (merged; single premium landing)
  about.tsx
  doctors.index.tsx              Our Doctors (grid + filters)
  doctors.search.tsx             Search Doctors (advanced filters)
  doctors.$id.tsx                Doctor Details
  departments.index.tsx
  specializations.index.tsx
  online-consultation.tsx
  book.$doctorId.tsx             Book Appointment (multi-step)
  book.success.tsx
  book.failed.tsx
  reviews.tsx
  blog.index.tsx
  blog.$slug.tsx
  faqs.tsx
  contact.tsx
  legal.privacy.tsx
  legal.terms.tsx
  legal.refund.tsx
  auth.login.tsx
  auth.signup.tsx
  auth.forgot-password.tsx
  auth.reset-password.tsx
  auth.verify-otp.tsx
  _app.tsx                       authed shell (sidebar + topbar) — pathless layout
  _app.patient.index.tsx         Patient Dashboard
  _app.doctor.index.tsx          Doctor Dashboard
  _app.admin.index.tsx           Admin Dashboard
  _app.notifications.tsx
  _app.messages.index.tsx        Inbox
  _app.messages.$threadId.tsx    Chat Screen (WhatsApp-style)
  _app.consultation.$id.tsx      Video Consultation
  _app.reports.tsx               Medical Reports (upload/drag-drop)
  _app.prescriptions.index.tsx
  _app.prescriptions.$id.tsx     Prescription (print/PDF layout)
  _app.payments.tsx
  _app.invoices.tsx
  _app.settings.tsx
  _app.profile.tsx
  maintenance.tsx
  coming-soon.tsx
  $.tsx                          404 (catch-all)
```

Each page ships its own `head()` with unique title, description, og:*, twitter:card.

## Component library (`src/components/`)

- **Primitives** (shadcn, restyled): Button, Input, Textarea, Select, Combobox, Checkbox, Radio, Switch, Slider, Label, Tabs, Accordion, Dialog, Sheet (Drawer), Popover, Tooltip, Toast (sonner), Badge, Avatar, Skeleton, Spinner, Breadcrumb, Pagination, Table, Calendar, DatePicker, TimePicker.
- **Domain**: `DoctorCard`, `DoctorFilters`, `SpecialtyPill`, `DepartmentCard`, `SlotPicker`, `AppointmentSummaryCard`, `PaymentMethodCard`, `RatingStars`, `ReviewCard`, `TestimonialCard`, `BlogCard`, `StatCard`, `EmptyState`, `ErrorState`, `LoadingState`, `SectionHeading`, `TrustBar`.
- **Layout**: `PublicNavbar`, `Footer`, `AppSidebar`, `AppTopbar`, `PageContainer`.
- **Feature modules**: `chat/` (ConversationList, MessageBubble, Composer, TypingDots, SeenTicks, AttachmentPreview), `video/` (VideoTile, CallControls, WaitingRoom, SideDrawer for chat/prescription), `prescription/` (PrescriptionDocument printable), `reports/` (Dropzone, ReportRow, PreviewDialog).

Every page renders **five states** using shared primitives: loading (skeleton), error, empty, success, and content.

## API-ready data layer

```text
src/lib/api/
  client.ts        axios instance, interceptors, auth header hook
  types.ts         Doctor, Patient, Appointment, Prescription, Invoice, ...
  doctors.ts       list/search/get — currently reads src/mocks/doctors.ts
  appointments.ts  book/list/cancel — mocked with delays
  auth.ts          login/signup/otp/reset — mocked
  payments.ts, prescriptions.ts, reports.ts, messages.ts, notifications.ts, reviews.ts, blogs.ts
```

Each service returns the same shape a DRF endpoint returns (`{results, count, next, previous}` for lists). Components consume via TanStack Query hooks in `src/hooks/queries/`. Switching to Django later = replace the mock resolver body with an axios call to `/api/...`; no component edits.

Auth state via a lightweight `useAuth()` (zustand or React context) with role (`patient` | `doctor` | `admin`) driving the `_app` sidebar. No real auth calls yet; login form resolves after a mock delay.

## Key flows

**Booking**: `book.$doctorId` is a 4-step wizard (Date & Slot → Reason & Info → Review → Payment). Payment screen shows JazzCash / EasyPaisa / Bank / Card options with secure badge. On submit → `book.success` or `book.failed`.

**Video Consultation**: two participant tiles, mute/cam/end controls, side drawer with Chat + live Prescription builder tabs, waiting-room state, connection indicator. No WebRTC wiring — UI-only with a placeholder video pane.

**Chat**: WhatsApp-style thread list + conversation with typing indicator, seen ticks, online dot, emoji/attachment buttons, voice-note button (UI only), image/PDF attachment previews.

**Prescription**: printable A4 layout, doctor + hospital header, patient block, medicines table (name/dose/frequency/duration/notes), digital signature placeholder, Print + Download PDF buttons (`window.print` + `react-to-print` or html2pdf-lite; UI-ready either way).

**Medical Reports**: dropzone upload with per-file progress bars, previews (image inline, PDF via `<embed>`), delete, empty state.

## Non-negotiables applied everywhere

- Loading skeletons + error + empty states on every list/detail page
- Full responsive layouts (mobile → 4xl)
- Keyboard focus rings, ARIA labels on icon-only buttons, semantic landmarks, single `<main>` per page
- SEO head() per route, sitemap.xml route, robots.txt
- No hardcoded colors, no ad-hoc gradients, 200ms transitions, soft shadows only

## Build order

1. Design tokens + Inter font + shadcn variants + shared primitives (EmptyState, ErrorState, LoadingState, PageContainer, SectionHeading).
2. Public shell (Navbar, Footer) in `__root.tsx`.
3. Mock data + axios client + query hooks.
4. Public marketing pages: Home, About, Doctors, Doctor Details, Departments, Specializations, Online Consultation, Reviews, Blog, Blog Details, FAQs, Contact, Legal (3), Search.
5. Auth pages (5) with RHF + Zod.
6. Booking flow (wizard + success/failed).
7. `_app` authed shell (sidebar + topbar) + role-aware nav.
8. Patient, Doctor, Admin dashboards.
9. Messages + Chat, Video Consultation, Reports, Prescriptions (list + printable), Payments, Invoices, Notifications, Settings, Profile.
10. 404, Maintenance, Coming Soon.
11. Sitemap + robots + final SEO/a11y pass.

## Scope note

This is ~55 route files + ~80 components. I'll build it in a few sequential turns, keeping each turn coherent (tokens+shell → public pages → auth+booking → authed shell+dashboards → chat/video/records → polish). The app stays runnable after every turn — no half-broken pages.

Reply "go" (or with any adjustments) and I'll start with the design system, shell, mock data layer, and the Home + Doctors + Doctor Details pages in turn one.
