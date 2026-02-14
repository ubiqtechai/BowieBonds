# ZiggyDust — Complete Product & Engineering Specification

## 1. What ZiggyDust Is

A platform that connects independent music artists with individual backers who fund YouTube ad campaigns for their releases. Backers earn a share of the incremental YouTube AdSense revenue. Artists keep their rights, their music, their independence.

**ZiggyDust is NOT:** a label, a distributor, a lender, an investment advisor, a fund custodian, or a securities platform. It is a technology facilitator for direct commercial arrangements between artists and backers.

**Intellectual ancestor:** Bowie Bonds (1997) — David Bowie securitised future royalties of 25 albums for $55M via Prudential Insurance. Same DNA, different organism. ZiggyDust applies the same logic (revenue-backed, time-bounded, transparent) to independent artists and individual backers at micro scale.

---

## 2. Core Mechanics

### The Flow
1. **Artist creates a Drop** — sets budget, co-pay (≥20%), minimum ticket size, revenue share %, return cap, tenor
2. **Backers commit funds** — browse live drops, see verified stats, pledge money
3. **Ads deploy** — Lockbox funds released exclusively to Google Ads for YouTube
4. **Revenue flows back** — YouTube AdSense channel-wide revenue tracked via OAuth API, uplift above baseline shared with backers monthly

### Key Terms
- **Drop** = a single promotion campaign for one YouTube video
- **Co-pay** = artist's own contribution, minimum 20% of total budget, first-in first-loss
- **Minimum ticket** = minimum pledge amount per backer, set by the artist at drop creation
- **Baseline** = average daily YouTube AdSense revenue across the artist's entire channel over 30 days before drop activation (non-disputable)
- **Uplift** = daily channel-wide revenue minus baseline (only positive uplift counts; captures cross-views and discovery of older content driven by the campaign)
- **Revenue share** = % of channel-wide uplift paid to backers monthly
- **Cap** = maximum return multiple (e.g. 1.5x means backers can earn max 1.5× their commitment)
- **Tenor** = maximum duration of obligation (e.g. 6 months) — obligation ends at cap OR tenor, whichever first
- **Currency** = USD or INR, selected by artist at drop creation. This is the **settlement currency** — all escrow, payouts, and settlements are denominated in it. Display currency toggling is cosmetic only
- **The Lockbox** = escrow account that can only release funds to a verified Google Ads account

### Settlement Waterfall
1. Escrow admin costs (minimal)
2. Backer principal (original commitment returned first)
3. Backer premium (revenue share continues until cap or tenor expiry)
4. Artist retains remainder

### 20% Minimum Co-Pay (Enforced)
- UI: create form blocks submission if co-pay < 20% of total budget
- Display: percentage shown on every drop detail page
- Legal: codified in House Rules §4 and The Numbers §1
- Purpose: filters unserious artists, aligns incentives, demonstrates belief

---

## 3. Trust Architecture (Six Layers)

### 3.1 Mandatory LinkedIn (all users)
- LinkedIn URL required at signup for both artists and backers
- Displayed as clickable links on Backer Wall and Artist profiles
- Purpose: real identity = better behaviour

### 3.2 YouTube OAuth (artists, read-only)
- Artist connects YouTube channel via OAuth during signup
- Platform pulls: subscriber count, total views, monthly views, channel age
- Revenue data tracked daily via YouTube Analytics API
- Verified badge displayed (not self-reported)
- Purpose: backers see real numbers

### 3.3 Track Records (all users)
- Every completed drop updates participant's track record
- Artists: drops completed, total raised, payback rate %, average uplift %
- Backers: drops backed, total deployed, average return multiple
- Visible on profiles and Backer Wall
- New participants get "⚡ First drop on ZiggyDust" badge

### 3.4 The Lockbox (escrow)
- Platform does not hold funds — escrow is campaign-specific
- Funds can only be released to a verified Google Ads account
- No personal transfers, no withdrawals
- Every deployment generates a receipt

### 3.5 20% Artist Co-Pay
- See §2 above

### 3.6 Public Ad Receipts
- Every Google Ads deployment tracked and displayed to all backers
- Fields: date, ad type (Pre-Roll/Discovery/Shorts), spend amount, impressions, views, CTR, Google Ads invoice reference number
- Totals displayed at bottom

---

## 4. Design System (FROZEN)

### Palette
```
Background:   #F5F0E8 (cream)
Warm:         #EDE6D8
Sand:         #D9CFC0
Ink:          #1A1814
Ink Mid:      #6B6358
Ink Light:    #9A9285
Amber:        #C8762D
Amber Light:  #E8A654
Amber Faint:  #F5E6D0
Red:          #C44B3F
Red Faint:    #FCEAE8
Green:        #3A7D5C
Green Faint:  #E5F2EC
Violet:       #6B5CA5
White:        #FFFFFF
```

### Typography
- Body: `system-ui, sans-serif`
- Data/labels/mono: `monospace`
- No external font imports (no Google Fonts)

### Aesthetic Rules
- **Zero border-radius** — all elements have sharp corners
- **Borders:** 2px solid ink for major sections, 1px solid sand for internal dividers
- **No rounded corners, no shadows, no gradients**
- **Zine/brutalist** feel — strong type hierarchy, monospace labels, amber accents
- **Alternating sections:** cream and ink (dark) backgrounds
- **Status badges:** solid background blocks with monospace uppercase text
- **Spark lines** for revenue charts (no chart libraries needed)
- **Progress bars:** flat, no radius, sand background, ink/amber/green fill

### Language (FROZEN)
| Old/Generic | ZiggyDust Term |
|---|---|
| Campaigns | **Drops** |
| New Campaign | **New Drop** |
| Agreements | **The Deal** |
| Platform TOS | **House Rules** |
| Campaign Funding Agreement | **The Pact** |
| Term Sheet | **The Numbers** |
| Escrow Ledger | **The Lockbox** |
| Settlement | **Payouts** |
| Backer List | **Backer Wall** |
| Submit/Accept | **I'm In** |
| Go Live | **Go Live** |
| Ad Deployment Log | **Ad Receipts** |
| Find Campaigns | **Find Drops** |

---

## 5. Frontend Architecture

### Two Apps

#### 5a. Public Website (`/`)
Pages (all built, HTML reference in `ziggydust-site.html`, React reference in `zd-site.jsx`):

| Route | Page | Purpose |
|---|---|---|
| `/` | Landing | Hero, how-it-works strip, trust grid, Bowie tease, CTA |
| `/how` | How It Works | 4-step deep dive with detail |
| `/artists` | For Artists | What you need (6-grid), what you keep |
| `/backers` | For Backers | What you get, risks plainly stated (red box) |
| `/bowie-bonds` | Bowie Bonds | Narrative intro + timeline 1997→2016 + comparison table |
| `/economics` | The Economics | AdSense explainer, baseline, scenario table, waterfall |
| `/trust` | Trust Architecture | 6 sections with Why/How columns |
| `/faq` | FAQ | 4 categories, 14 questions, accordion |
| `/login` | Auth Modal | Log In / Sign Up with role selector |
| `/signup` | Auth Modal | Sign Up with LinkedIn, YouTube OAuth (artists) |

**Auth Modal fields:**
- Login: email, password
- Signup: role (artist/backer), full name, email, password, LinkedIn URL (mandatory), YouTube OAuth connect button (artists only)

#### 5b. Dashboard App (`/app`)
Built and working in `ziggydust.jsx`. Sidebar + main content area.

| Route | Page | Who |
|---|---|---|
| `/app` | Dashboard | Both — hero, stats strip, drop cards |
| `/app/drops` | Drops | Both — list of all drops with funding progress |
| `/app/drops/:id` | Drop Detail | Both — full detail with all trust layers |
| `/app/new` | New Drop | Artist — 4-step wizard with 20% validation |
| `/app/deal` | The Deal | Both — 3-document acceptance flow |
| `/app/payouts` | Payouts | Both — per-drop payout tables |

**Drop Detail sections (in order):**
1. Header: title, artist, genre, status badge
2. 5-stat strip: budget, funded, uplift, ad spend, revenue
3. Revenue spark chart + funding progress bar
4. **The Artiste** — profile with LinkedIn link, YouTube stats (verified), track record
5. **Backer Wall** — 3-column per backer (identity + LinkedIn, track record, this campaign progress)
6. **The Lockbox** — escrow state, deployment total
7. **Ad Receipts** — table with date/type/spend/impressions/views/CTR/Google ref
8. **Payout History** — monthly settlement table
9. Pledge modal (backers) / Edit (artist)

**New Drop wizard (4 steps):**
1. Track Info: title, genre, YouTube URL, description
2. The Money: total budget, co-pay (≥20% enforced), minimum ticket size, revenue share %, cap, tenor
3. Preview: summary of all terms
4. Go Live: confirmation, link Google Ads account

---

## 6. Backend Specification

### 6.1 Tech Stack
- **Runtime:** Node.js (or Python/FastAPI — implementer's choice)
- **Database:** PostgreSQL
- **Auth:** JWT + bcrypt, OAuth 2.0 for YouTube and LinkedIn
- **API style:** REST (or GraphQL if preferred)
- **File storage:** S3-compatible for ad receipts/docs
- **Job queue:** For scheduled tasks (revenue polling, settlement calculations)
- **Deployment:** Docker, deployable to Railway/Fly.io/AWS

### 6.2 Database Schema

```sql
-- Users
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name     TEXT NOT NULL,
  role          TEXT NOT NULL CHECK (role IN ('artist', 'backer')),
  linkedin_url  TEXT NOT NULL,
  linkedin_headline TEXT,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- YouTube channel (artists only)
CREATE TABLE youtube_channels (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES users(id) UNIQUE,
  channel_id      TEXT UNIQUE NOT NULL,           -- YouTube channel ID
  access_token    TEXT NOT NULL,                   -- encrypted
  refresh_token   TEXT NOT NULL,                   -- encrypted
  token_expires   TIMESTAMPTZ,
  subscribers     INTEGER,
  total_views     BIGINT,
  monthly_views   INTEGER,
  channel_age     TEXT,
  ypp_active      BOOLEAN DEFAULT false,
  verified        BOOLEAN DEFAULT false,
  last_synced     TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- Google Ads account (artists only)
CREATE TABLE google_ads_accounts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES users(id),
  customer_id     TEXT NOT NULL,                   -- Google Ads customer ID
  access_token    TEXT NOT NULL,                   -- encrypted
  refresh_token   TEXT NOT NULL,                   -- encrypted
  verified        BOOLEAN DEFAULT false,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- Drops (campaigns)
CREATE TABLE drops (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  drop_number     TEXT UNIQUE NOT NULL,            -- e.g. ZD-001
  artist_id       UUID REFERENCES users(id) NOT NULL,
  title           TEXT NOT NULL,
  genre           TEXT,
  tagline         TEXT,
  video_url       TEXT NOT NULL,
  video_id        TEXT NOT NULL,                   -- YouTube video ID
  currency        TEXT NOT NULL DEFAULT 'USD' CHECK (currency IN ('USD', 'INR')),
  status          TEXT NOT NULL DEFAULT 'draft'
                  CHECK (status IN ('draft', 'funding', 'active', 'completed', 'defaulted')),
  total_budget    INTEGER NOT NULL,                -- in smallest currency unit (cents/paisa)
  artist_copay    INTEGER NOT NULL,                -- must be >= 20% of total_budget
  backer_goal     INTEGER NOT NULL,                -- total_budget - artist_copay
  min_ticket      INTEGER,                         -- minimum pledge per backer, set by artist
  rev_share_pct   NUMERIC(5,2) NOT NULL,           -- e.g. 25.00
  cap_multiple    NUMERIC(4,2) NOT NULL,           -- e.g. 1.50
  tenor_months    INTEGER NOT NULL,
  baseline_daily  INTEGER,                         -- computed at activation, smallest currency unit
  activated_at    TIMESTAMPTZ,
  expires_at      TIMESTAMPTZ,                     -- activated_at + tenor_months
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now(),

  CONSTRAINT copay_minimum CHECK (artist_copay >= total_budget * 0.20)
);

-- Only one funding/active drop per artist at a time
CREATE UNIQUE INDEX one_active_drop_per_artist ON drops (artist_id) WHERE status IN ('funding', 'active');

-- Pledges (backer commitments)
CREATE TABLE pledges (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  drop_id         UUID REFERENCES drops(id) NOT NULL,
  backer_id       UUID REFERENCES users(id) NOT NULL,
  amount          INTEGER NOT NULL,                -- smallest currency unit
  status          TEXT NOT NULL DEFAULT 'committed'
                  CHECK (status IN ('committed', 'active', 'completed', 'withdrawn')),
  created_at      TIMESTAMPTZ DEFAULT now(),
  UNIQUE (drop_id, backer_id)
);

-- Daily revenue observations (from YouTube Analytics API)
CREATE TABLE revenue_observations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  drop_id         UUID REFERENCES drops(id) NOT NULL,
  observation_date DATE NOT NULL,
  gross_revenue   INTEGER NOT NULL,                -- smallest currency unit, entire channel revenue (not per-video)
  estimated_uplift INTEGER,                        -- gross channel revenue - baseline
  source          TEXT DEFAULT 'youtube_api',
  raw_response    JSONB,                           -- store API response
  created_at      TIMESTAMPTZ DEFAULT now(),
  UNIQUE (drop_id, observation_date)
);

-- Baseline snapshots (30 days pre-activation)
CREATE TABLE baseline_snapshots (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  drop_id         UUID REFERENCES drops(id) UNIQUE,
  period_start    DATE NOT NULL,
  period_end      DATE NOT NULL,
  daily_values    JSONB NOT NULL,                  -- array of 30 daily revenue values
  computed_avg    INTEGER NOT NULL,                -- average daily revenue, smallest currency unit
  computed_at     TIMESTAMPTZ DEFAULT now()
);

-- Ad deployments (from Lockbox to Google Ads)
CREATE TABLE ad_deployments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  drop_id         UUID REFERENCES drops(id) NOT NULL,
  deployed_at     DATE NOT NULL,
  ad_type         TEXT NOT NULL CHECK (ad_type IN ('pre_roll', 'discovery', 'shorts', 'bumper')),
  spend           INTEGER NOT NULL,                -- smallest currency unit
  impressions     INTEGER,
  views           INTEGER,
  ctr             NUMERIC(5,2),
  google_invoice_ref TEXT,                         -- Google Ads invoice number
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- Monthly settlements
CREATE TABLE settlements (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  drop_id         UUID REFERENCES drops(id) NOT NULL,
  period_month    TEXT NOT NULL,                   -- e.g. '2026-01'
  total_revenue   INTEGER NOT NULL,               -- smallest currency unit
  baseline_total  INTEGER NOT NULL,               -- baseline × days in month
  uplift          INTEGER NOT NULL,               -- revenue - baseline
  backer_share    INTEGER NOT NULL,               -- uplift × rev_share_pct
  status          TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'paid', 'overdue', 'disputed')),
  due_date        DATE NOT NULL,                  -- 15th of following month
  paid_at         TIMESTAMPTZ,
  payment_ref     TEXT,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- Per-backer settlement allocation
CREATE TABLE settlement_allocations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  settlement_id   UUID REFERENCES settlements(id) NOT NULL,
  pledge_id       UUID REFERENCES pledges(id) NOT NULL,
  amount          INTEGER NOT NULL,               -- smallest currency unit (pro-rata by pledge size)
  cumulative      INTEGER NOT NULL,               -- running total for this pledge
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- Track records (materialized, updated after each settlement)
CREATE TABLE track_records (
  user_id         UUID REFERENCES users(id) PRIMARY KEY,
  role            TEXT NOT NULL,
  drops_completed INTEGER DEFAULT 0,
  total_raised    INTEGER DEFAULT 0,              -- artists: total backer funding received
  total_backed    INTEGER DEFAULT 0,              -- backers: total committed
  payback_rate    NUMERIC(5,2) DEFAULT 0,         -- artists: % of obligations met
  avg_uplift      NUMERIC(5,2) DEFAULT 0,         -- artists: average uplift %
  avg_return      NUMERIC(4,2) DEFAULT 0,         -- backers: average return multiple
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Legal agreements acceptance
CREATE TABLE agreement_acceptances (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES users(id) NOT NULL,
  drop_id         UUID REFERENCES drops(id),      -- NULL for House Rules (platform-level)
  agreement_type  TEXT NOT NULL
                  CHECK (agreement_type IN ('house_rules', 'the_pact', 'the_numbers')),
  accepted_at     TIMESTAMPTZ DEFAULT now(),
  ip_address      TEXT,
  UNIQUE (user_id, drop_id, agreement_type)
);

-- Default events
CREATE TABLE default_events (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  drop_id         UUID REFERENCES drops(id) NOT NULL,
  trigger_type    TEXT NOT NULL
                  CHECK (trigger_type IN ('missed_payment', 'oauth_revoked', 'content_deleted', 'misrepresentation')),
  detected_at     TIMESTAMPTZ DEFAULT now(),
  resolved_at     TIMESTAMPTZ,
  notes           TEXT
);
```

### 6.3 API Endpoints

```
AUTH
POST   /api/auth/signup              — create account (validates LinkedIn URL, role)
POST   /api/auth/login               — email + password → JWT
POST   /api/auth/refresh             — refresh JWT
GET    /api/auth/youtube/connect     — redirect to YouTube OAuth consent screen
GET    /api/auth/youtube/callback    — OAuth callback, store tokens, pull channel stats
GET    /api/auth/google-ads/connect  — redirect to Google Ads OAuth
GET    /api/auth/google-ads/callback — store Google Ads tokens

USERS
GET    /api/users/me                 — current user profile + track record
GET    /api/users/:id                — public profile (name, LinkedIn, track record, drops)
PATCH  /api/users/me                 — update profile fields

DROPS
GET    /api/drops                    — list all drops (filterable by status, genre)
GET    /api/drops/:id                — full drop detail (includes artist profile, backers, stats)
POST   /api/drops                    — create drop (artist only, validates 20% co-pay, min ticket size, rejects if artist already has a funding/active drop)
PATCH  /api/drops/:id                — update draft drop
POST   /api/drops/:id/activate       — lock baseline, transition to 'active'
GET    /api/drops/:id/revenue        — daily revenue chart data
GET    /api/drops/:id/ad-receipts    — ad deployment receipts
GET    /api/drops/:id/backers        — backer wall with LinkedIn, track records
GET    /api/drops/:id/settlements    — monthly settlement history

PLEDGES
POST   /api/drops/:id/pledge         — commit funds (backer only, validates min ticket)
DELETE /api/drops/:id/pledge         — withdraw pledge (only while status = 'funding')

SETTLEMENTS
GET    /api/settlements              — all settlements for current user's drops
POST   /api/settlements/:id/pay      — mark settlement as paid (artist uploads proof)
POST   /api/settlements/:id/dispute  — dispute a settlement (triggers review)

YOUTUBE (internal, scheduled)
POST   /api/internal/youtube/sync-revenue  — cron: pull daily revenue for all active drops
POST   /api/internal/youtube/sync-stats    — cron: refresh channel stats for all artists
POST   /api/internal/baseline/compute      — compute baseline for drops pending activation

GOOGLE ADS (internal)
POST   /api/internal/ads/deploy      — deploy funds from lockbox to Google Ads
GET    /api/internal/ads/receipts    — pull deployment data from Google Ads API

PLATFORM
GET    /api/platform/stats           — public stats (total funded, drops, backers)
GET    /api/legal/house-rules        — current House Rules text
GET    /api/legal/the-pact           — The Pact template
GET    /api/legal/the-numbers/:dropId — The Numbers for a specific drop
```

### 6.4 External API Integrations

#### YouTube Analytics API
- **Auth:** OAuth 2.0 (scope: `youtube.readonly`, `yt-analytics.readonly`)
- **Channel stats:** `GET /youtube/v3/channels?part=statistics,snippet`
- **Revenue data:** `GET /youtubeAnalytics/v2/reports?metrics=estimatedRevenue&dimensions=day` (channel-wide, not per-video — captures cross-views)
- **Polling:** Daily cron job at 06:00 UTC for all active drops
- **Baseline computation:** 30-day channel-wide revenue lookback when drop transitions from 'funding' to 'active'
- **YPP verification:** Check `channel.status.isLinked` and monetization status

#### Google Ads API
- **Auth:** OAuth 2.0 (scope: Google Ads API access)
- **Campaign creation:** Create YouTube video campaigns programmatically
- **Deployment:** Transfer lockbox funds to Google Ads account for specific video
- **Receipts:** Pull campaign performance data (impressions, views, CTR, spend)
- **Invoice references:** Pull billing invoice numbers from Google Ads billing API

#### LinkedIn (validation only)
- **Signup:** Validate LinkedIn URL format (`linkedin.com/in/...`)
- **Optional enhancement:** LinkedIn OAuth to verify profile ownership
- **Display:** URL stored and rendered as clickable link, headline manually entered at signup

### 6.5 Scheduled Jobs (Cron)

| Job | Schedule | Description |
|---|---|---|
| `sync-youtube-revenue` | Daily 06:00 UTC | Pull revenue for all active drops from YouTube Analytics API |
| `sync-youtube-stats` | Weekly Monday | Refresh subscriber/view counts for all artist channels |
| `compute-settlements` | 1st of month | Calculate monthly uplift + backer share for all active drops |
| `check-overdue` | Daily 09:00 UTC | Flag settlements past due date (15th of following month) |
| `detect-defaults` | Daily | Check for OAuth revocation, content deletion, missed payments |
| `update-track-records` | After each settlement | Recompute track record stats for involved users |
| `token-refresh` | Every 30 min | Refresh expiring OAuth tokens (YouTube, Google Ads) |

### 6.6 Business Rules (Backend Enforced)

1. **Co-pay ≥ 20%:** `artist_copay >= total_budget * 0.20` — DB constraint + API validation
2. **Minimum ticket:** Each pledge must meet or exceed the drop's `min_ticket` amount. Enforced at API and UI level.
3. **Lockbox isolation:** Ad deployments can ONLY target the Google Ads account linked to the drop's artist. No arbitrary transfers.
4. **Channel-wide revenue:** Uplift is computed on the artist's entire YouTube channel revenue, not just the promoted video. This captures cross-views and discovery of older content driven by the campaign.
5. **Baseline immutability:** Once `baseline_snapshots` row is created at activation, it cannot be updated or deleted.
6. **Cap enforcement:** When cumulative settlement allocations for a pledge reach `pledge.amount × drop.cap_multiple`, stop further allocations.
7. **Tenor enforcement:** When `now() > drop.expires_at`, transition drop status to 'completed' regardless of cap status.
8. **First-in first-loss:** Artist co-pay deploys to ads first. If total ad spend < co-pay, backers are shielded.
9. **Funding threshold:** Drop transitions from 'funding' to 'active' only when `sum(pledges.amount) >= backer_goal`.
10. **One active drop per artist:** An artist may have at most one drop in `funding` or `active` status at any time. The API rejects `POST /api/drops` if the artist already has an open drop. Enforced via partial unique index: `CREATE UNIQUE INDEX one_active_drop_per_artist ON drops (artist_id) WHERE status IN ('funding', 'active');`
11. **Settlement currency:** All settlements, payouts, and escrow accounting for a drop are denominated in the drop's `currency` field (the native currency selected by the artist at creation). Display currency toggling is cosmetic only — it does not affect settlement amounts.
12. **Agreement gates:** User cannot pledge/create without accepting House Rules. Cannot participate in a drop without accepting The Pact + The Numbers for that drop.

### 6.7 Security

- Passwords: bcrypt with salt rounds ≥ 12
- OAuth tokens: encrypted at rest (AES-256)
- JWT: short-lived access tokens (15 min) + refresh tokens (7 days)
- Rate limiting: 100 req/min per user
- CORS: whitelist frontend domain only
- Input validation: Zod schemas on all endpoints
- SQL injection: parameterised queries only (no raw string interpolation)
- Revenue data: read-only YouTube OAuth scope, never write access

---

## 7. Legal Documents (Content)

Three documents form the agreement pack. Content developed in prior session and exported as `promotion_underwriting_agreements.docx`.

### 7.1 House Rules (Platform TOS)
Platform-level, accepted once. Key provisions:
- §1: Platform is facilitator only, no custody
- §2: Eligibility (YPP, LinkedIn)
- §3: Roles defined (Artist, Backer, Platform)
- §4: **Artist co-pay minimum is 20% of total budget — first-in, first-loss**
- §5: **Backer funds are structured as a performance-linked loan to the artist; revenue share constitutes interest; not an equity stake or royalty purchase**
- §6: Escrow/lockbox rules
- §7: Revenue observation methodology
- §8: Default triggers and consequences
- §9: Dispute resolution
- §10: Limitation of liability

### 7.2 The Pact (Campaign Funding Agreement)
Per-drop, accepted by all parties. Key provisions:
- Identifies artist, backers, video, budget
- **§Loan Covenant: Backer funds constitute a loan to the artist. Repayment is tied to the performance of the campaign and the artist's channel during the period the ad spend is live. Revenue share payments are interest on the loan. Principal is repaid first, then interest accrues until cap or tenor expiry.**
- Revenue share mechanics (channel-wide uplift)
- Settlement waterfall
- Default events and remedies
- Platform exclusion for default

### 7.3 The Numbers (Term Sheet)
Per-drop, locked at activation. Key provisions:
- §1: **Budget, co-pay (min 20%), minimum ticket, share %, cap, tenor locked at activation**
- §2: **Loan terms: backer commitment is a performance-linked loan; revenue share payments are interest; principal returned first per waterfall**
- §3: Baseline computed at launch — final
- §4: Monthly payout reports; due within 15 days
- §5: Escrow controller identified; proof of spend required
- §6: Security licence optional, dormant unless default

---

## 8. File Inventory (Current)

| File | Description |
|---|---|
| `ziggydust.jsx` | Dashboard app — React component, 356 lines, all trust layers + 20% enforcement |
| `ziggydust-site.html` | Public website — standalone HTML, 8 pages, auth modal, footer |
| `zd-site.jsx` | Public website — React version (same content as HTML) |
| `promotion_underwriting_agreements.docx` | Legal document pack (House Rules, The Pact, The Numbers) |
| `ZIGGYDUST_SPEC.md` | This file |

---

## 9. Implementation Priority for Claude Code

### Phase 1: Foundation
1. Project scaffolding (Next.js or similar)
2. PostgreSQL schema migration
3. Auth system (JWT + signup/login)
4. User model with LinkedIn URL
5. YouTube OAuth flow + channel stats pull
6. Basic drop CRUD

### Phase 2: Core Flow
7. Drop creation with 20% co-pay enforcement
8. Pledge system (commit/withdraw)
9. Drop activation (baseline computation)
10. Revenue observation (YouTube Analytics API polling)
11. Monthly settlement calculation
12. Settlement allocation (pro-rata to backers)

### Phase 3: Trust Layers
13. Backer Wall with LinkedIn links + track records
14. Ad Receipts table (Google Ads integration)
15. Track record computation and display
16. Artist profile with verified YouTube stats
17. Google Ads deployment pipeline

### Phase 4: Frontend
18. Port public website pages from HTML/JSX reference
19. Port dashboard from React reference
20. Connect frontend to real API endpoints
21. Real-time updates (WebSocket or polling for live drops)

### Phase 5: Polish
22. Email notifications (pledge received, settlement due, settlement paid)
23. Default detection and handling
24. Legal document acceptance tracking
25. Admin dashboard (platform role)
26. Mobile responsive

---

## 10. Environment Variables Required

```env
DATABASE_URL=postgresql://...
JWT_SECRET=...
JWT_REFRESH_SECRET=...
ENCRYPTION_KEY=...                    # for OAuth token encryption

YOUTUBE_CLIENT_ID=...
YOUTUBE_CLIENT_SECRET=...
YOUTUBE_REDIRECT_URI=...

GOOGLE_ADS_CLIENT_ID=...
GOOGLE_ADS_CLIENT_SECRET=...
GOOGLE_ADS_DEVELOPER_TOKEN=...
GOOGLE_ADS_REDIRECT_URI=...

LINKEDIN_CLIENT_ID=...                # optional, for profile verification
LINKEDIN_CLIENT_SECRET=...

FRONTEND_URL=https://ziggydust.in
```
