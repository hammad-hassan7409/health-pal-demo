import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/shared/LegalPage";

export const Route = createFileRoute("/legal/privacy")({
  head: () => ({ meta: [
    { title: "Privacy Policy — Medivia" },
    { name: "description", content: "How Medivia collects, uses, and protects your personal and medical information." },
    { property: "og:title", content: "Privacy Policy — Medivia" },
    { property: "og:description", content: "Our commitment to your medical data privacy." },
  ]}),
  component: () => (
    <LegalPage title="Privacy Policy" updated="July 24, 2026">
      <p>Your trust is central to Medivia. This policy explains what we collect, why, and how we protect it.</p>
      <h2>Information we collect</h2>
      <p>Account details, medical history you provide, consultation records, and device information required to deliver the service.</p>
      <h2>How we use it</h2>
      <ul><li>To match you with appropriate specialists.</li><li>To deliver consultations, prescriptions and follow ups.</li><li>To improve service quality and safety.</li></ul>
      <h2>Data protection</h2>
      <p>All medical data is encrypted in transit and at rest. Access is limited to you and the doctors you consult.</p>
      <h2>Your rights</h2>
      <ul><li>Access, export or delete your data at any time.</li><li>Revoke consent for non-essential processing.</li><li>Contact our data officer at privacy@medivia.health.</li></ul>
    </LegalPage>
  ),
});
