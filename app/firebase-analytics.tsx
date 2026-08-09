"use client";

import { useEffect } from "react";
import { getFirebaseApp } from "./firebase";

// Analytics only exists in the browser, and only where the environment supports it
// (isSupported is false in unsupported browsers and in-app webviews), so it is
// initialised from an effect rather than at module scope.
export default function FirebaseAnalytics() {
  useEffect(() => {
    let cancelled = false;
    import("firebase/analytics").then(async ({ getAnalytics, isSupported }) => {
      if (cancelled || !(await isSupported())) return;
      getAnalytics(getFirebaseApp());
    });
    return () => { cancelled = true; };
  }, []);

  return null;
}
