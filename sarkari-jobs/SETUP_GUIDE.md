# 🚀 SarkariJobs Maharashtra – Complete Setup Guide

## Production-ready Next.js 14 Platform

---

## 📁 Project Structure

```
sarkari-jobs/
├── app/
│   ├── layout.jsx              # Root layout (fonts, metadata, AdSense)
│   ├── page.jsx                # Homepage (SSG)
│   ├── loading.jsx             # Loading skeleton
│   ├── not-found.jsx           # 404 page
│   ├── sitemap.js              # Auto sitemap generator
│   ├── robots.js               # robots.txt generator
│   ├── globals.css             # Tailwind + custom CSS
│   ├── jobs/
│   │   ├── page.jsx            # Jobs listing (SSG)
│   │   ├── JobsClient.jsx      # Client filtering/search
│   │   └── [slug]/page.jsx     # Job detail (SSG)
│   ├── results/page.jsx        # Results listing
│   ├── admit-card/page.jsx     # Admit cards listing
│   ├── blog/
│   │   ├── page.jsx            # Blog listing
│   │   └── [slug]/page.jsx     # Blog detail (SSG)
│   ├── admin/page.jsx          # Admin CMS (Firebase dynamic)
│   ├── about/page.jsx
│   ├── contact/page.jsx
│   ├── privacy-policy/page.jsx
│   └── disclaimer/page.jsx
├── components/
│   ├── Navbar.jsx              # Sticky navbar + ticker
│   ├── Footer.jsx              # Footer with SEO links
│   ├── JobCard.jsx             # Job card (full + compact)
│   ├── Cards.jsx               # Blog, Result, Ad, Breadcrumb cards
│   └── SearchBar.jsx           # Search with suggestions
├── lib/
│   ├── firebase.js             # Firebase client SDK
│   ├── seo.js                  # SEO metadata + JSON-LD schemas
│   └── utils.js                # Utility functions
├── data/
│   ├── jobs.json               # 5 sample jobs (SSG source)
│   ├── results.json            # 3 sample results
│   ├── admitCards.json         # 2 sample admit cards
│   └── blogs.json              # 5 SEO-optimized blogs
├── scripts/
│   └── exportData.js           # Firestore → JSON exporter
├── public/
│   └── firebase-messaging-sw.js  # FCM service worker
├── .env.example                # Environment variables template
├── firestore.rules             # Firestore security rules
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

## ⚡ Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env.local
# Edit .env.local with your Firebase config
```

### 3. Run development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
npm start
```

---

## 🔥 Firebase Setup (Step by Step)

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add Project" → Name it "sarkari-jobs-prod"
3. Enable Google Analytics (optional but recommended)

### Step 2: Enable Firestore
1. Sidebar → Firestore Database → Create Database
2. Start in **Production mode**
3. Choose region: `asia-south1` (Mumbai – best for India)

### Step 3: Enable Authentication
1. Sidebar → Authentication → Get Started
2. Enable **Email/Password** provider
3. Add your admin email manually in the Users tab

### Step 4: Get Firebase Config
1. Project Settings → Your Apps → Add Web App
2. Copy the `firebaseConfig` object
3. Paste values into `.env.local`

### Step 5: Deploy Firestore Rules
```bash
npm install -g firebase-tools
firebase login
firebase use YOUR_PROJECT_ID
firebase deploy --only firestore:rules
```

### Step 6: Add Admin User to Firestore
In Firestore Console, create collection `admins`:
```
Collection: admins
Document ID: YOUR_USER_UID (from Authentication tab)
Fields: { email: "your@email.com", role: "admin" }
```

### Step 7: Enable FCM (Push Notifications)
1. Project Settings → Cloud Messaging
2. Generate VAPID key under "Web Push certificates"
3. Copy VAPID key to `NEXT_PUBLIC_FIREBASE_VAPID_KEY` in `.env.local`

---

## 🔄 Data Flow (Hybrid Architecture)

```
Admin Panel → Firebase Firestore → exportData.js → JSON files → next build → Static Pages
```

### Workflow for new jobs:
1. Login to `/admin`
2. Add job via the form
3. Saved to Firebase Firestore
4. Run: `npm run export-data` (exports Firestore → JSON)
5. Run: `npm run build` (regenerates static pages with new data)
6. Deploy to Vercel/hosting

### For automatic rebuilds (Recommended):
Set up a GitHub Action to run export + build on Firestore write events via Firebase Functions webhook.

---

## 🌐 Deployment (Vercel – Recommended)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repo
3. Add all environment variables from `.env.example`
4. Deploy!

### Step 3: Custom Domain
1. In Vercel → Domains → Add your domain
2. Update DNS records with your domain registrar

---

## 💰 Google AdSense Setup

### Step 1: Apply for AdSense
1. Go to [Google AdSense](https://adsense.google.com)
2. Add your website URL
3. Wait for approval (usually 2-4 weeks)

### Step 2: Add Publisher ID
```env
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
```

### Step 3: Ad Slot IDs
Create ad units in AdSense dashboard and replace the slot IDs in:
- `app/page.jsx` → multiple AdBanner components
- `app/jobs/[slug]/page.jsx` → in-content ads
- `app/blog/[slug]/page.jsx` → article ads

### AdSense Placement Strategy:
- **Top Banner**: Above the fold on all pages
- **In-Job-Listings**: After every 6 cards (implemented)
- **Sidebar Rectangle**: 300×250 on desktop
- **In-Blog-Content**: Mid-article + bottom
- **Between Sections**: On homepage

### AdSense Approval Tips:
✅ Privacy Policy page (/privacy-policy) – ✅ Done
✅ Disclaimer page (/disclaimer) – ✅ Done
✅ About Us page (/about) – ✅ Done
✅ Contact page (/contact) – ✅ Done
✅ Original content (5 blogs) – ✅ Done
✅ No copyrighted content
✅ Clean UI without excessive ads initially

---

## 🔍 SEO Checklist

### Technical SEO (all implemented):
- [x] Next.js App Router for best SEO
- [x] Static Generation (SSG) for all public pages
- [x] Dynamic metadata per page
- [x] OpenGraph tags
- [x] Structured data (JSON-LD): JobPosting, Article, BreadcrumbList, WebSite
- [x] Sitemap.xml (auto-generated at /sitemap.xml)
- [x] Robots.txt (at /robots.txt)
- [x] Canonical URLs
- [x] Fast loading (static pages)

### Content SEO (do after launch):
- [ ] Submit sitemap to Google Search Console
- [ ] Add 20+ more blog articles
- [ ] Get backlinks from job portals / edu sites
- [ ] Add local SEO (Maharashtra-specific keywords)

---

## 📈 Traffic & Performance

### Performance features implemented:
- Static Generation (SSG) for all public pages → CDN served
- `next/image` with AVIF/WebP formats
- Font optimization (next/font)
- Code splitting per route
- Lazy loading
- Minimal client-side JS (only SearchBar and Admin use "use client")

### Scalability:
- Static pages → handled by CDN (Vercel Edge Network)
- Can handle 1 Lakh+ concurrent users with zero server cost on static pages
- Firebase is only hit from admin panel
- No per-request server computation

---

## 📱 Telegram & WhatsApp Integration

### Telegram:
1. Create a Telegram channel
2. Get channel link (e.g., `https://t.me/your_channel`)
3. Set: `NEXT_PUBLIC_TELEGRAM_LINK=https://t.me/your_channel`

### WhatsApp:
1. Create WhatsApp Channel (via WhatsApp Business)
2. Get channel link
3. Set: `NEXT_PUBLIC_WHATSAPP_LINK=https://whatsapp.com/channel/...`

---

## 🔔 Push Notifications Setup

### Step 1: FCM Setup (already in code)
1. Get VAPID key from Firebase Console
2. Add to `.env.local`

### Step 2: Send notifications from admin:
Currently, use Firebase Console → Cloud Messaging → New Campaign
For automated sending: Add a Firebase Function that triggers on Firestore writes

---

## 🛠 Common Commands

```bash
# Development
npm run dev

# Export data from Firestore to JSON
npm run export-data

# Production build
npm run build

# Start production server
npm start

# Deploy Firestore rules
firebase deploy --only firestore:rules
```

---

## 🚨 Security Checklist

- [x] Firebase config in env vars (never hardcoded)
- [x] Admin panel protected by Firebase Auth
- [x] Firestore rules restrict writes to admin only
- [x] Admin route excluded from robots.txt
- [x] VAPID key in env vars
- [x] Security headers in next.config.js

---

## 📞 Support

- Email: contact@sarkarijobs.com
- Telegram: @sarkarijobs_mr
