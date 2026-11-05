# MFM Ottawa — Payload CMS 3 + Next.js + TypeScript

A full-stack church website and Content Management System modeled after **Mountain of Fire and Miracles Ministries Ottawa (`mfmottawa.ca`)**, built with **Payload CMS 3**, **Next.js 15 (App Router)**, **SQLite**, and **TypeScript**.

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the Next.js + Payload development server
npm run dev
```

- **Public Website**: http://localhost:3000
- **French Homepage**: http://localhost:3000/accueil
- **Payload CMS Admin Panel**: http://localhost:3000/admin

> **Auto-Seeding**: On first startup (`onInit`), Payload automatically seeds the local SQLite database (`mfm-ottawa.db`) with all placeholder content from `mfmottawa.ca` (EN + FR hero banners, 13 ministries, 24 bookshop titles, church events, 22 gallery photos, 18 downloadable resources, 13 MFM Canada branches, and all page globals). When visiting `/admin` for the first time, Payload will prompt you to create your initial Admin user account.

## Included Pages & CMS Structure

| Route | Description | Backing Payload Collection / Global |
| --- | --- | --- |
| `/` & `/home` | English Homepage (Hero slider, COVID screening card, Give section, Leadership cards & quotes, Bible Verse of the Day, Sanctuary map) | `hero-slides`, `home-page`, `site-settings` |
| `/accueil` | French Homepage | `hero-slides` (`locale = fr`), `home-page` |
| `/about-us` | Circular photo banner, About Us, Ministries & Departments, What We Believe, Mission + Vision | `about-page`, `ministries` |
| `/books` & `/books/[slug]` | Searchable Bookshop catalog & single book detail view | `books` |
| `/connect` | Verse of the Day, MFM Daily Devotionals, Audio Sermons, Areas Served, Canada Branches map & directory | `connect-page`, `branches` |
| `/contact-us` | Bilingual Contact Form storing submissions directly in Payload | `contact-submissions` |
| `/events` | Month & List calendar views + Latest Past Events | `events` |
| `/gallery` | Photo gallery with native modal lightbox | `gallery-items` |
| `/resources` | Online Membership Form CTA + downloadable PMCH & form PDF cards | `resources` |
| `/donate` | Scripture header, Interac e-Transfer details, and CanadaHelps online giving | `site-settings`, `home-page` |
| `/privacy-policy` | Full Privacy Policy sections | `privacy-policy-page` |
| `/admin` | Payload CMS 3 Admin Dashboard | All 10 Collections & 5 Globals |
