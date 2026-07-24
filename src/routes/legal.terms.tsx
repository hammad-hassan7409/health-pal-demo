import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/shared/LegalPage";

export const Route = createFileRoute("/legal/terms")({
  head: () => ({ meta: [
    { title: "Terms & Conditions — Medivia" },
    { name: "description", content: "The terms of service that govern your use of Medivia." },
    { property: "og:title", content: "Terms & Conditions — Medivia" },
    { property: "og:description", content: "Terms governing use of Medivia." },
  ]}),
  component: () => (
    <LegalPage title="Terms & Conditions" updated="July 24, 2026">
      <p>These terms govern your use of Medivia. By creating an account you agree to them.</p>
      <h2>Eligibility</h2><p>You must be 18 or older, or a legal guardian booking on behalf of a minor.</p>
      <h2>Medical disclaimer</h2><p>Medivia connects you with licensed doctors but does not itself provide medical advice.</p>
      <h2>Account responsibility</h2><ul><li>Keep your credentials secure.</li><li>Provide accurate medical information.</li><li>Attend booked consultations or cancel in time.</li></ul>
      <h2>Prohibited use</h2><p>No misuse, fraudulent bookings, or abusive behaviour toward doctors or staff.</p>
    </LegalPage>
  ),
});
