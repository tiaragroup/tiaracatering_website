import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";

// Firebase web config is public by design — it identifies the project, it does not
// grant access. Access is controlled by Firebase security rules and App Check.
const firebaseConfig = {
  apiKey: "AIzaSyAaze_rmKesNkfrDSpu7fSsNZxePM_87RI",
  authDomain: "tiara-catering.firebaseapp.com",
  projectId: "tiara-catering",
  storageBucket: "tiara-catering.firebasestorage.app",
  messagingSenderId: "1074298446015",
  appId: "1:1074298446015:web:44b4d318d5258e052d260a",
  measurementId: "G-29E19KMH2X",
};

export function getFirebaseApp(): FirebaseApp {
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}
