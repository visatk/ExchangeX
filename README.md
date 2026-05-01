## 📌 ১. প্রজেক্ট ওভারভিউ (Project Overview)
এটি একটি **Currency/Crypto Exchange Platform** যেখানে ব্যবহারকারীরা এক কারেন্সি থেকে অন্য কারেন্সিতে (যেমন- BTC → PayPal, ETH → Tether) ফান্ড কনভার্ট করতে পারবে। 
* **Core Features:** ৩-স্টেপ এক্সচেঞ্জ ফ্লো, এডমিন প্যানেল, অপারেটর প্যানেল, KYC ভেরিফিকেশন, অ্যাফিলিয়েট/রেফারেল সিস্টেম।
* **Standard:** Sell-ready, high-level professional, secure, and SEO-friendly.

## 🛠 ২. টেক স্ট্যাক (Tech Stack)
* **Frontend:** React 18 + Vite + TypeScript
* **UI/Styling:** shadcn/ui + Tailwind CSS v4.2
* **State Management:** Zustand (Global State) + TanStack Query (Server State / API Caching)
* **Backend:** Hono (Cloudflare Workers)
* **Database:** Cloudflare D1 (SQLite at edge) + Drizzle ORM
* **Cache/Sessions:** Cloudflare KV
* **Storage:** Cloudflare R2 (KYC documents, receipts)
* **Authentication:** JWT (JSON Web Tokens)
* **Deployment:** Cloudflare Pages (Frontend) + Cloudflare Workers (Backend API)
* **Tooling:** Wrangler 4.82.2, latest `@cloudflare/vite-plugin`

## 🗄️ ৪. ডাটাবেস স্কিমা (Database Schema - D1)
* `users`: ব্যবহারকারীদের তথ্য (Role: admin, operator, user), ব্যালেন্স।
* `currencies`: কারেন্সি লিস্ট (BTC, USD, BDT, etc.), আইকন, স্ট্যাটাস।
* `exdirections`: এক্সচেঞ্জ ডিরেকশন (কোন কারেন্সি থেকে কোনটিতে এক্সচেঞ্জ করা যাবে), ফি, লিমিট।
* `exchanges`: এক্সচেঞ্জ অর্ডার হিস্ট্রি, স্ট্যাটাস (pending, processing, completed)।
* `settings`: ওয়েবসাইটের গ্লোবাল সেটিংস, লোগো, API keys।
* `gateways`: পেমেন্ট গেটওয়ে কনফিগারেশন।
* `reserve_requests`: রিজার্ভ রিকোয়েস্ট।
* `reviews`: ব্যবহারকারীদের রিভিউ।
* `news`: ব্লগের খবর বা আপডেট।
* `etemplates`: ইমেইল নোটিফিকেশন টেমপ্লেট।
* `languages`: মাল্টিলিঙ্গুয়াল সাপোর্ট ডাটা।

---

## 🚀 ৫. ইমপ্লিমেন্টেশন রোডম্যাপ (Phase-by-Phase Roadmap)

### Phase 1: Foundation (Current Target)
- [ ] Cloudflare Workers-এ Hono সেটআপ এবং বেসিক রাউটিং।
- [ ] `packages/db`-তে Drizzle ORM দিয়ে D1 স্কিমা তৈরি (`users` টেবিল দিয়ে শুরু)।
- [ ] JWT Auth middleware তৈরি।
- [ ] Frontend-এ Vite + React + Tailwind v4.2 + shadcn/ui স্ক্যাফোল্ড করা।
- [ ] Basic Login/Signup API এবং Frontend ইন্টিগ্রেশন।

### Phase 2: Exchange Core
- [ ] `currencies` এবং `exdirections` CRUD API।
- [ ] `GET /api/rates/:direction` API তৈরি।
- [ ] React-এ Multi-step Form হিসেবে ৩-স্টেপ এক্সচেঞ্জ ফ্লো তৈরি।
- [ ] Cloudflare Cron Worker তৈরি (Auto rate update-এর জন্য)।
- [ ] Frontend-এ TanStack Query দিয়ে polling সেটআপ।

### Phase 3: User Panel & KYC
- [ ] User Dashboard (Balance, Withdrawals, Reviews)।
- [ ] KYC Verification Flow (R2 ব্যবহার করে ফাইল আপলোড)।
- [ ] Affiliate/Referral ড্যাশবোর্ড তৈরি।

### Phase 4: Admin Panel
- [ ] Admin Route Protection.
- [ ] Users & Orders Management Dashboard.
- [ ] Exchange Directions এবং Currencies ম্যানেজমেন্ট।
- [ ] Reports এবং Settings পেজ।

### Phase 5: Operator Panel + Payments
- [ ] Operator Role (Sub-admin) প্যানেল।
- [ ] Payment Gateway Integration (Apirone, CryptoBot, PayPal, etc.)।

### Phase 6: Polish
- [ ] Email Notifications (Resend / Cloudflare Email Routing)।
- [ ] XML Rate Feed Public API।
- [ ] Multilingual (i18n) সাপোর্ট এবং SEO অপ্টিমাইজেশন।

---

## 🛑 ৬. AI Agent-এর জন্য কড়া নিয়ম (Strict Rules for AI)
1. **Full Code Delivery:** সবসময় সম্পূর্ণ কোড দিতে হবে। কোনো অসম্পূর্ণ বা স্কিপ করা কোড দেওয়া যাবে না। 
2. **Professional Quality:** প্রজেক্ট হতে হবে sell-ready এবং high-level professional। 
3. **Refinement:** কোড লেখার সময় খেয়াল রাখতে হবে আগের কোন লজিকে ভুল থাকলে তা নিজ দায়িত্বে ঠিক করা (clarify what was missing, incorrect or needs enhancement)।
4. **Cloudflare Standard:** যেকোনো Cloudflare স্পেসিফিক ফিচারের জন্য শুধুমাত্র official Cloudflare Docs (developers.cloudflare.com) এবং GitHub org থেকে নলেজ সোর্স করতে হবে।
5. **Tooling Versions:** Tailwind CSS v4.2, Wrangler 4.82.2 এবং latest `@cloudflare/vite-plugin` ব্যবহার করতে হবে।
6. **Execution:** ইউজার যখনই কাজ শুরু করতে বলবে, Agent এই ফাইলের Phase অনুযায়ী কাজ শুরু করবে এবং প্রতি ধাপে ইউজারের কনফার্মেশন নিবে।
