import type { Metadata } from "next";
import PrivacyPolicyPage from "../../privacy-policy/privacy-policy-page";

export const metadata: Metadata = {
  title: "سياسة الخصوصية | تيارا للضيافة الرياض",
  description:
    "اطلع على سياسة الخصوصية لدى تيارا للضيافة وكيف نقوم بجمع واستخدام وحماية بياناتك الشخصية.",
  alternates: {
    canonical: "/ar/privacy-policy",
    languages: {
      en: "/privacy-policy",
      ar: "/ar/privacy-policy",
    },
  },
};

export default function PagePrivacyArabic() {
  return <PrivacyPolicyPage lang="ar" />;
}