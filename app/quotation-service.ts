import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
import { getFirebaseApp } from "./firebase";

export type QuotationSource = "homepage" | "menus";

export type QuotationInput = {
  customerName: string;
  phone: string;
  email?: string;
  eventType: string;
  eventDate?: string;
  guestCount?: number;
  details?: string;
  menuId?: string;
  menuName?: string;
  menuPriceSar?: number;
  source: QuotationSource;
  locale: "en" | "ar";
  privacyAccepted: true;
};

const clean = (value?: string) => value?.trim() ?? "";

export async function createQuotation(input: QuotationInput): Promise<string> {
  const quotation = await addDoc(collection(getFirestore(getFirebaseApp()), "quotations"), {
    customerName: clean(input.customerName),
    phone: clean(input.phone),
    email: clean(input.email).toLowerCase(),
    eventType: clean(input.eventType),
    eventDate: clean(input.eventDate),
    guestCount: input.guestCount ?? 0,
    details: clean(input.details),
    menuId: clean(input.menuId),
    menuName: clean(input.menuName),
    menuPriceSar: input.menuPriceSar ?? 0,
    source: input.source,
    locale: input.locale,
    privacyAccepted: input.privacyAccepted,
    status: "new",
    createdAt: serverTimestamp(),
  });

  return quotation.id;
}
