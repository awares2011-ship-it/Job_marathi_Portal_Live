// lib/firebase.js - Firebase Client SDK (Browser-safe)
// ALL credentials loaded from environment variables - never hardcoded

import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// ─── Config (from env vars only) ─────────────────────────────────────────────
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// ─── Singleton App Init (CLIENT ONLY) ─────────────────────────────────────────
let app;
let db;
let auth;

if (typeof window !== "undefined") {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
  db = getFirestore(app);
  auth = getAuth(app);
}

// Safe exports (avoid SSR crash)
export { app, db, auth };

// Messaging only on client
let messaging = null;
if (typeof window !== "undefined") {
  try {
    messaging = getMessaging(app);
  } catch (_) {}
}
export { messaging };

// ─── Collection Names ─────────────────────────────────────────────────────────
export const COLLECTIONS = {
  JOBS: "jobs",
  RESULTS: "results",
  EXAMS: "exams",
  ADMIT_CARDS: "admitCards",
  BLOGS: "blogs",
  NOTIFICATIONS: "notifications",
  ALERTS: "alerts",
  SETTINGS: "settings",
};

// ─── Generic CRUD ─────────────────────────────────────────────────────────────
export const getAll = async (collectionName, filters = [], limitCount = 50) => {
  try {
    let q = collection(db, collectionName);
    const constraints = [...filters, orderBy("createdAt", "desc"), limit(limitCount)];
    q = query(q, ...constraints);
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.error(`getAll(${collectionName}) error:`, e);
    return [];
  }
};

export const getBySlug = async (collectionName, slug) => {
  try {
    const q = query(collection(db, collectionName), where("slug", "==", slug));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    return { id: snap.docs[0].id, ...snap.docs[0].data() };
  } catch (e) {
    console.error(`getBySlug error:`, e);
    return null;
  }
};

export const getOne = async (collectionName, id) => {
  try {
    const snap = await getDoc(doc(db, collectionName, id));
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  } catch (e) {
    return null;
  }
};

export const create = async (collectionName, data) => {
  const ref = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
};

export const update = async (collectionName, id, data) => {
  await updateDoc(doc(db, collectionName, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

export const remove = async (collectionName, id) => {
  await deleteDoc(doc(db, collectionName, id));
};

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);
export const logout = () => signOut(auth);
export const onAuth = (cb) => onAuthStateChanged(auth, cb);

// ─── FCM Push Notifications ───────────────────────────────────────────────────
export const requestNotificationPermission = async () => {
  if (!messaging) return null;
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return null;
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });
    return token;
  } catch (e) {
    console.error("FCM token error:", e);
    return null;
  }
};

export const onForegroundMessage = (cb) => {
  if (!messaging) return () => {};
  return onMessage(messaging, cb);
};

// ─── Utilities ────────────────────────────────────────────────────────────────
export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();


