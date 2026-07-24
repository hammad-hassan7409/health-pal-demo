import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/shared/LegalPage";

export const Route = createFileRoute("/legal/refund")({
  head: () => ({ meta: [
    { title: "Refund Policy — Medivia" },
    { name: "description", content: "How and when Medivia refunds consultation fees." },
    { property: "og:title", content: "Refund Policy — Medivia" },
    { property: "og:description", content: "Fair, transparent refunds." },
  ]}),
  component: () => (
    <LegalPage title="Refund Policy" updated="July 24, 2026">
      <p>We want every consultation to be worth your time and money. Here's how refunds work.</p>
      <h2>Eligible cases</h2><ul>
        <li>Technical failure on Medivia's end that prevents the consultation.</li>
        <li>Doctor no-show without a rescheduled slot within 24 hours.</li>
        <li>Cancellation by you at least 2 hours before the appointment.</li>
      </ul>
      <h2>Processing time</h2><p>Refunds are issued to the original payment method within 5–7 working days.</p>
      <h2>Non-refundable</h2><ul><li>Late cancellations (within 2 hours of the appointment).</li><li>Completed consultations, unless a service quality complaint is upheld.</li></ul>
    </LegalPage>
  ),
});
