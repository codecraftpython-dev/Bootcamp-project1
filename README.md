# JSSATEN Placement Intelligence Hub
### JSS Academy of Technical Education Noida Companies Research & Placement Analytics Portal

The **JSSATEN Companies Research & Placement Analytics Portal** is an enterprise-grade web application built to empower students and the Training & Placement Cell with strategic corporate intelligence, cognitive skill roadmaps, and recruiter metrics for campus placements.

---

## Key Architecture & Operating Model (Phase 1)

1. **Phase 1 Scope (UI-Only with Hardcoded Seed Data)**
   - All data currently flows through pure normalizer functions (`src/lib/companyData.ts`) fed by the typed seed dataset (`src/data/seedCompanies.ts`).
   - No active database connection, migrations, or backend API dependencies exist in Phase 1.
   - Reference enterprise dataset included: **Accenture plc** (Dream category, 163 fields spanning all 22 intelligence categories, and 12 core placement technical skills).

2. **Public Access Model (No Login / No Auth)**
   - The portal is 100% public and accessible directly by any visitor or student.
   - Zero login screens, zero protected routes, and no authentication walls.
   - Company selection is persisted via `localStorage` under key `selected-company` and safely recovered across browser refreshes.

3. **College Identity & Branding**
   - **College Full Name**: JSS Academy of Technical Education Noida
   - **College Tag / Short Code**: JSSATEN
   - **Branding Directive Compliance**: No college image logos or raster assets are used; clean typographic enterprise wordmark and `JSSATEN · INTELLIGENCE PLATFORM` badge are used instead.

4. **Phase 2 Ready (Seamless Transition to Supabase)**
   - The data layer in `src/lib/companyData.ts` outputs normalized models (`CompanySummary`, `CompanyProfile`, `DashboardSkill[]`) that directly ingest the future JSONB columns (`short_json`, `full_json`, `skill_levels`).
   - Transitioning to Supabase in Phase 2 requires changing only the data retrieval hook, without altering UI components or page structures.

5. **Strict Anti-Leakage Compliance**
   - In accordance with institutional placement compliance, CTC, Stipend, and Selection Ratio metrics are completely excluded and blocked across all normalization pipelines and views.

---

## Key Features

- **Home Portal (`/`)**:
  - Live tier filters with verified category badges: *All*, *Super Dream*, *Dream*, *Standard*, *Regular*.
  - 200ms debounced search filtering by company name, technology, domain, and location.
  - Organization cards displaying YoY growth rate, headquarters, workforce size, and tier badges.
- **Company Intelligence (`/company/intelligence`)**:
  - Sticky header bar with website, LinkedIn, and identity lockups.
  - Sticky 22-section tab navigation bar with scroll-spy synchronization.
  - 22 exhaustive intelligence dimensions: Company Identity, Overview & Vision, Leadership, Funding & Financials, Global Presence, Products & Services, Technology Stack, Partnerships & Ecosystem, Competitive Landscape, Market Opportunity, Core Value Proposition & ESG, Culture & Work Life, Recent News & Milestones, Sales & Customer Metrics, Risk & Compliance, Work Location & Commute, Safety & Wellbeing, Career Growth & Learning, Brand & Reputation, Compensation & Benefits, Digital Presence & Ratings, Contact Information.
- **Skill Intelligence (`/company/skills`)**:
  - Bloom's 5-level cognitive taxonomy legend (*CU, AP, AS, EV, CR*).
  - Interview criticality tiers (*Critical, Important, Baseline*).
  - 12 descending competency cards featuring dynamic progress meters, benchmark scores, and expandable 10-level preparation ladders from `src/data/skillTopics.ts`.

---

## Development & Testing

```bash
# Start development server
npm run dev

# Run Vitest smoke tests
npm test

# Typecheck and lint
npm run lint
```
