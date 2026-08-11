// app/privacy-policy/page.tsx

import type { Metadata } from "next";
import PrivacyPolicyPage from "./privacy-policy-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Tiara Catering Riyadh",
  description:
    "Read Tiara Catering's privacy policy and learn how we collect, use and protect personal information.",
  alternates: {
    canonical: "/privacy-policy",
    languages: {
      en: "/privacy-policy",
      ar: "/ar/privacy-policy",
    },
  },
};

export default function PagePrivacy() {
  return <PrivacyPolicyPage lang="en" />;
}