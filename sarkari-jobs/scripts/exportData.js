// scripts/exportData.js
// Run this script to export Firestore data to static JSON files for SSG
// Usage: node scripts/exportData.js
// Add to package.json: "export-data": "node scripts/exportData.js"

const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

// ── Init Firebase Admin ────────────────────────────────────────────────────
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();
const DATA_DIR = path.join(__dirname, "../data");

// ── Ensure data directory exists ───────────────────────────────────────────
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// ── Export function ────────────────────────────────────────────────────────
async function exportCollection(collectionName, filename, filter = {}) {
  try {
    let query = db.collection(collectionName).orderBy("createdAt", "desc");

    // Apply filters
    if (filter.isActive !== undefined) {
      query = query.where("isActive", "==", filter.isActive);
    }
    if (filter.isPublished !== undefined) {
      query = query.where("isPublished", "==", filter.isPublished);
    }

    const snapshot = await query.get();
    const data = snapshot.docs.map((doc) => {
      const d = doc.data();
      // Convert Firestore timestamps to ISO strings
      Object.keys(d).forEach((key) => {
        if (d[key]?.toDate) {
          d[key] = d[key].toDate().toISOString();
        }
      });
      return { id: doc.id, ...d };
    });

    const filePath = path.join(DATA_DIR, `${filename}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    console.log(`✅ Exported ${data.length} ${collectionName} → data/${filename}.json`);
    return data;
  } catch (err) {
    console.error(`❌ Error exporting ${collectionName}:`, err.message);
    return [];
  }
}

// ── Main export ────────────────────────────────────────────────────────────
async function main() {
  console.log("🚀 Starting Firestore → JSON export...\n");

  await Promise.all([
    exportCollection("jobs", "jobs", { isActive: true }),
    exportCollection("results", "results"),
    exportCollection("admitCards", "admitCards"),
    exportCollection("blogs", "blogs", { isPublished: true }),
  ]);

  console.log("\n✅ Export complete! Run `next build` to regenerate static pages.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
