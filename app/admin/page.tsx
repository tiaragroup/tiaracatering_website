import type { Metadata } from "next";
import AdminDashboard from "./admin-dashboard";
import "./admin.css";

export const metadata: Metadata = {
  title: "Tiara Catering Dashboard",
  description: "Private Tiara Catering administration dashboard.",
  alternates: { canonical: "/admin" },
  openGraph: {
    title: "Tiara Catering Dashboard",
    description: "Private administrator workspace.",
    url: "/admin",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Tiara Catering Dashboard",
    description: "Private administrator workspace.",
    images: [],
  },
  robots: { index: false, follow: false, noarchive: true },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
