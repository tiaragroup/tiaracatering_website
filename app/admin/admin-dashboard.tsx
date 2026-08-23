"use client";

import {
  CalendarDays,
  LogOut,
  Mail,
  MessageCircle,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  type Timestamp,
} from "firebase/firestore";
import { getFirebaseApp } from "../firebase";

type AccessState = "checking" | "signed-out" | "admin" | "denied";
type QuoteStatus = "new" | "contacted" | "quoted" | "won" | "lost";

type Quotation = {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  guestCount: number;
  details: string;
  menuId: string;
  menuName: string;
  menuPriceSar: number;
  source: "homepage" | "menus";
  locale: "en" | "ar";
  status: QuoteStatus;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

const statusOptions: { value: QuoteStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "quoted", label: "Quoted" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
];

const dateFormatter = new Intl.DateTimeFormat("en-SA", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Riyadh",
});

function whatsappNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("00")) return digits.slice(2);
  if (digits.startsWith("0")) return `966${digits.slice(1)}`;
  return digits;
}

function LoginPanel({ onSignedIn }: { onSignedIn: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(
        getAuth(getFirebaseApp()),
        String(form.get("email") ?? "").trim(),
        String(form.get("password") ?? ""),
      );
      onSignedIn();
    } catch {
      setError("The email or password is incorrect, or this account is not enabled.");
    } finally {
      setLoading(false);
    }
  }

  return <main className="admin-shell admin-login-shell">
    <section className="admin-login-card">
      <Image src="/tiara-logo.png" alt="Tiara Catering" width={180} height={180} priority />
      <div className="admin-login-copy">
        <span>Private administration</span>
        <h1>Tiara Catering<br /><em>dashboard.</em></h1>
        <p>Manage enquiries, quotations and sales activity from one secure workspace.</p>
      </div>
      <form onSubmit={submit}>
        <label>Email address<input name="email" type="email" autoComplete="username" required /></label>
        <label>Password<input name="password" type="password" autoComplete="current-password" minLength={6} required /></label>
        <button type="submit" disabled={loading}>{loading ? "Signing in…" : "Sign in securely"}</button>
        {error && <p className="admin-error" role="alert">{error}</p>}
      </form>
      <small><ShieldCheck size={14} /> Protected by Firebase Authentication and Firestore rules</small>
    </section>
  </main>;
}

export default function AdminDashboard() {
  const [access, setAccess] = useState<AccessState>("checking");
  const [user, setUser] = useState<User | null>(null);
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loadingQuotes, setLoadingQuotes] = useState(true);
  const [dataError, setDataError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | QuoteStatus>("all");
  const [updating, setUpdating] = useState<string | null>(null);

  async function verifyAdmin(nextUser: User | null) {
    setUser(nextUser);
    if (!nextUser) {
      setAccess("signed-out");
      return;
    }
    setAccess("checking");
    try {
      const admin = await getDoc(doc(getFirestore(getFirebaseApp()), "admins", nextUser.uid));
      const approved = admin.exists() && admin.data().active === true;
      if (approved) setLoadingQuotes(true);
      setAccess(approved ? "admin" : "denied");
    } catch {
      setAccess("denied");
    }
  }

  useEffect(() => onAuthStateChanged(getAuth(getFirebaseApp()), verifyAdmin), []);

  useEffect(() => {
    if (access !== "admin") return;
    const quotationQuery = query(
      collection(getFirestore(getFirebaseApp()), "quotations"),
      orderBy("createdAt", "desc"),
    );
    return onSnapshot(quotationQuery, (snapshot) => {
      setQuotations(snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as Quotation));
      setLoadingQuotes(false);
      setDataError("");
    }, () => {
      setLoadingQuotes(false);
      setDataError("Quotations could not be loaded. Confirm the latest Firestore rules are deployed.");
    });
  }, [access]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return quotations.filter((quotation) => {
      const matchesStatus = filter === "all" || quotation.status === filter;
      const matchesSearch = !term || [quotation.id, quotation.customerName, quotation.phone, quotation.email, quotation.eventType, quotation.menuName]
        .some((value) => String(value ?? "").toLowerCase().includes(term));
      return matchesStatus && matchesSearch;
    });
  }, [filter, quotations, search]);

  const newCount = quotations.filter((quotation) => quotation.status === "new").length;
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Riyadh" });
  const todayCount = quotations.filter((quotation) => quotation.createdAt?.toDate().toLocaleDateString("en-CA", { timeZone: "Asia/Riyadh" }) === today).length;

  async function changeStatus(id: string, status: QuoteStatus) {
    setUpdating(id);
    setDataError("");
    try {
      await updateDoc(doc(getFirestore(getFirebaseApp()), "quotations", id), {
        status,
        updatedAt: serverTimestamp(),
      });
    } catch {
      setDataError("The quotation status could not be updated.");
    } finally {
      setUpdating(null);
    }
  }

  async function logout() {
    await signOut(getAuth(getFirebaseApp()));
  }

  if (access === "checking") return <main className="admin-shell admin-state"><RefreshCw className="admin-spin" /><p>Checking secure access…</p></main>;
  if (access === "signed-out") return <LoginPanel onSignedIn={() => setAccess("checking")} />;
  if (access === "denied") return <main className="admin-shell admin-state"><ShieldCheck /><h1>Access not approved</h1><p>This Firebase account is authenticated but is not listed as an active Tiara administrator.</p><button onClick={logout}>Sign out</button></main>;

  return <main className="admin-shell admin-dashboard">
    <aside className="admin-sidebar">
      <Image src="/tiara-logo.png" alt="Tiara Catering" width={180} height={180} priority />
      <div><span>Admin workspace</span><strong>Tiara Dashboard</strong></div>
      <nav aria-label="Dashboard sections"><a className="active" href="#quotations">Quotation inbox</a></nav>
      <div className="admin-account"><small>Signed in as</small><span>{user?.email}</span><button onClick={logout}><LogOut size={15} /> Sign out</button></div>
    </aside>

    <section className="admin-main" id="quotations">
      <header className="admin-heading">
        <div><span>Sales operations</span><h1>Quotation <em>inbox.</em></h1><p>Review new requests, contact customers and move each opportunity through the sales process.</p></div>
        <div className="admin-live"><i /> Live Firestore data</div>
      </header>

      <div className="admin-metrics">
        <article><span>Total requests</span><strong>{quotations.length}</strong><Users /></article>
        <article><span>New requests</span><strong>{newCount}</strong><MessageCircle /></article>
        <article><span>Received today</span><strong>{todayCount}</strong><CalendarDays /></article>
      </div>

      <div className="admin-toolbar">
        <label><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, phone, email or reference" /></label>
        <select value={filter} onChange={(event) => setFilter(event.target.value as "all" | QuoteStatus)} aria-label="Filter by status">
          <option value="all">All statuses</option>
          {statusOptions.map((status) => <option value={status.value} key={status.value}>{status.label}</option>)}
        </select>
      </div>

      {dataError && <p className="admin-banner-error" role="alert">{dataError}</p>}

      <div className="quotation-list">
        {loadingQuotes ? <div className="admin-empty"><RefreshCw className="admin-spin" /> Loading quotations…</div> : filtered.length === 0 ? <div className="admin-empty">No quotations match this view.</div> : filtered.map((quotation) => {
          const waNumber = whatsappNumber(quotation.phone);
          return <article className="quotation-card" key={quotation.id}>
            <div className="quotation-topline">
              <div><span className={`status-dot ${quotation.status}`} /> <small>{quotation.status}</small></div>
              <time>{quotation.createdAt ? dateFormatter.format(quotation.createdAt.toDate()) : "Pending timestamp"}</time>
            </div>
            <div className="quotation-person"><h2>{quotation.customerName}</h2><code>#{quotation.id}</code></div>
            <div className="quotation-event">
              <span><small>Event</small>{quotation.eventType}</span>
              <span><small>Date</small>{quotation.eventDate || "Not provided"}</span>
              <span><small>Guests</small>{quotation.guestCount || "Not provided"}</span>
              <span><small>Menu</small>{quotation.menuName ? `${quotation.menuName} · SAR ${quotation.menuPriceSar}` : "Custom quotation"}</span>
            </div>
            {quotation.details && <p className="quotation-notes">{quotation.details}</p>}
            <div className="quotation-actions">
              <div>
                {waNumber && <a className="whatsapp" href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={15} /> WhatsApp</a>}
                <a href={`tel:${quotation.phone}`}><Phone size={15} /> Call</a>
                {quotation.email && <a href={`mailto:${quotation.email}`}><Mail size={15} /> Email</a>}
              </div>
              <label>Status<select value={quotation.status} disabled={updating === quotation.id} onChange={(event) => changeStatus(quotation.id, event.target.value as QuoteStatus)}>{statusOptions.map((status) => <option value={status.value} key={status.value}>{status.label}</option>)}</select></label>
            </div>
          </article>;
        })}
      </div>
    </section>
  </main>;
}
