# Medivia — Premium Online Clinic & Telemedicine Platform

A production-ready, frontend-first telemedicine platform for booking verified
doctors, attending video consultations, managing medical records &
prescriptions, secure messaging, online payments, and admin management.
Built to look cleaner and more premium than Practo, Marham, and Oladoc.

> Frontend-only by design. Every page reads from a typed mock service layer
> (`src/lib/api/`) that mirrors a Django REST Framework contract, so a real
> backend can be dropped in later without touching the UI.

## Display title

**Medivia — Premium Online Clinic & Doctor Consultations**

## Short description

Book PMDC-verified doctors for video, chat, or in-clinic consultations.
Prescriptions, records, follow-ups, and secure messaging — all in one calm,
premium telemedicine platform.

## Tech stack

- **Framework:** TanStack Start v1 (React 19, SSR/SSG-ready)
- **Build:** Vite 7
- **Routing:** TanStack Router (file-based)
- **Data:** TanStack Query + Axios mock client
- **Styling:** Tailwind CSS v4 (native `@theme` tokens) + shadcn/ui
- **Forms/Validation:** React Hook Form + Zod (ready to wire)
- **Animation:** Motion (Framer Motion)
- **Icons:** Lucide React

## Features

### Public
- Landing / Home with hero, departments, featured doctors, how-it-works,
  testimonials, FAQ, and app-download CTA.
- Doctor listing with advanced filters (department, city, gender, availability,
  experience, fee, rating) + live debounced search + pagination.
- Doctor profile with bio, specialities, languages, credentials, awards,
  certificates, and live availability / booking CTA.
- Departments & specializations directories, online-consultation landing,
  reviews, blog (index + post), about, contact, FAQ, and legal pages
  (privacy, terms, refund).
- Auth flow: login, signup, forgot/reset password, verify OTP.
- Booking wizard: date/time slot picker (live availability), reason, review,
  payment → success page with booking reference; failed fallback.
- Maintenance, coming-soon, and a custom 404.

### Authenticated app (role-aware: Patient / Doctor / Admin)
- Dashboards per role with relevant stats and quick actions.
- Secure messaging: thread list + full chat UI (typing, attachments, status).
- Video consultation room with camera/mic controls, waiting room, side panel
  for chat + live prescription drafting.
- Reports upload (drag-and-drop, progress, categories).
- Prescriptions archive + printable digital prescription with signature.
- Payments (saved methods, history) and itemized invoices.
- Notifications feed scoped to the current viewer — a booking with Dr. Ayesha
  notifies **only** Dr. Ayesha, not other doctors or patients.
- Profile editor, settings (notifications, privacy, 2FA, language, account
  deletion), and admin management (doctors, revenue, support tickets).

## Project structure

```
src/
  routes/            # file-based routes (public, auth, booking, app/*, legal)
  components/         # shadcn primitives + shared/domain components
  lib/api/            # typed mock service layer (swap for DRF later)
  lib/mocks/          # mock dataset (3 doctors for testing)
  lib/viewer.ts       # demo role context (patient/doctor/admin)
  styles.css          # Tailwind v4 theme tokens
```

## Getting started

```sh
npm i
npm run dev
```

## Notes

- The mock dataset intentionally contains **3 doctors** (Dr. Ayesha Khan,
  Dr. Bilal Ahmad, Dr. Sana Malik) for testing and iteration.
- Notifications are targeted: only the booked doctor receives a booking
  notification.
