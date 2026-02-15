export interface Backer {
  name: string;
  amount: number;
  returned: number;
  linkedin: string;
  headline: string;
  campaigns: number;
  totalBacked: number;
  avgReturn: number;
}

export interface SettlementRow {
  id?: string;
  month: string;
  revenue: number;
  baseline: number;
  uplift: number;
  share: number;
  status: "pending" | "paid" | "overdue" | "disputed";
}

export interface AdReceipt {
  date: string;
  type: string;
  spend: number;
  impressions: number;
  views: number;
  ctr: string;
  ref: string;
}

export interface YouTubeStats {
  subscribers: number;
  totalViews: number;
  channelAge: string;
  monthlyViews: number;
  verified: boolean;
}

export interface ArtistTrack {
  campaigns: number;
  totalRaised: number;
  paybackRate: number;
  avgUplift: number;
}

export interface Drop {
  id: string;
  name: string;
  artist: string;
  contentTitle: string;
  videoId: string;
  status: "draft" | "funding" | "active" | "completed" | "defaulted";
  totalBudget: number;
  artistCoPay: number;
  backerGoal: number;
  backerFunded: number;
  minTicket: number;
  revSharePct: number;
  cap: number;
  tenorMonths: number;
  baselineDaily: number;
  currentDaily: number;
  totalRevenue: number;
  totalSettled: number;
  daysActive: number;
  adSpent: number;
  rd: number[];
  backers: Backer[];
  settlements: SettlementRow[];
  genre: string;
  tagline: string;
  artistLinkedin: string;
  artistHeadline: string;
  yt: YouTubeStats;
  artistTrack: ArtistTrack;
  adReceipts: AdReceipt[];
}

export const MOCK_DROPS: Drop[] = [
  {
    id: "ZD-001",
    name: "Midnight Raga",
    artist: "Priya Sharma",
    contentTitle: "Midnight Raga (Official Video)",
    videoId: "dQw4w9WgXcQ",
    status: "active",
    totalBudget: 150000,
    artistCoPay: 30000,
    backerGoal: 120000,
    backerFunded: 95000,
    minTicket: 10000,
    revSharePct: 30,
    cap: 1.8,
    tenorMonths: 6,
    baselineDaily: 850,
    currentDaily: 2340,
    totalRevenue: 42500,
    totalSettled: 12750,
    daysActive: 34,
    adSpent: 78000,
    rd: [850, 890, 920, 870, 1100, 1450, 1800, 2100, 2340, 2200, 2500, 2800, 2340, 2600, 2750],
    backers: [
      { name: "Arjun Mehta", amount: 50000, returned: 6800, linkedin: "https://linkedin.com/in/arjunmehta", headline: "Angel Investor · Music Tech", campaigns: 3, totalBacked: 175000, avgReturn: 1.4 },
      { name: "Neha Kapoor", amount: 25000, returned: 3400, linkedin: "https://linkedin.com/in/nehakapoor", headline: "Producer at Sony Music India", campaigns: 1, totalBacked: 25000, avgReturn: 0 },
      { name: "Rahul Prasad", amount: 20000, returned: 2550, linkedin: "https://linkedin.com/in/rahulprasad", headline: "Musician · Tabla Player", campaigns: 2, totalBacked: 55000, avgReturn: 1.2 },
    ],
    settlements: [
      { month: "Jan 2026", revenue: 28500, baseline: 25500, uplift: 3000, share: 900, status: "paid" },
      { month: "Feb 2026", revenue: 42500, baseline: 25500, uplift: 17000, share: 5100, status: "pending" },
    ],
    genre: "Indie / Classical Fusion",
    tagline: "where tradition meets the tremolo",
    artistLinkedin: "https://linkedin.com/in/priyasharmamusic",
    artistHeadline: "Independent Artist · Classical-Electronic Fusion",
    yt: { subscribers: 12400, totalViews: 890000, channelAge: "3 years", monthlyViews: 145000, verified: true },
    artistTrack: { campaigns: 1, totalRaised: 95000, paybackRate: 100, avgUplift: 175 },
    adReceipts: [
      { date: "Jan 5", type: "Pre-Roll", spend: 18000, impressions: 245000, views: 82000, ctr: "3.4%", ref: "INV-88291" },
      { date: "Jan 12", type: "Discovery", spend: 22000, impressions: 310000, views: 104000, ctr: "3.1%", ref: "INV-88445" },
      { date: "Jan 20", type: "Pre-Roll", spend: 20000, impressions: 278000, views: 91000, ctr: "3.3%", ref: "INV-88612" },
      { date: "Feb 2", type: "Shorts", spend: 18000, impressions: 520000, views: 156000, ctr: "2.8%", ref: "INV-88890" },
    ],
  },
  {
    id: "ZD-002",
    name: "Concrete Dreams",
    artist: "MC Vikram",
    contentTitle: "Concrete Dreams (Official Music Video)",
    videoId: "abc123",
    status: "funding",
    totalBudget: 200000,
    artistCoPay: 50000,
    backerGoal: 150000,
    backerFunded: 67000,
    minTicket: 20000,
    revSharePct: 25,
    cap: 2.0,
    tenorMonths: 8,
    baselineDaily: 1200,
    currentDaily: 1200,
    totalRevenue: 0,
    totalSettled: 0,
    daysActive: 0,
    adSpent: 0,
    rd: [1200, 1180, 1220, 1190, 1210, 1200, 1230, 1200],
    backers: [
      { name: "Suresh Tiwari", amount: 40000, returned: 0, linkedin: "https://linkedin.com/in/sureshtiwari", headline: "Founder, BeatVault Studios", campaigns: 5, totalBacked: 320000, avgReturn: 1.6 },
      { name: "Anita Verma", amount: 27000, returned: 0, linkedin: "https://linkedin.com/in/anitaverma", headline: "Music Journalist · Rolling Stone", campaigns: 2, totalBacked: 52000, avgReturn: 1.3 },
    ],
    settlements: [],
    genre: "Hip-Hop",
    tagline: "bars from the building site",
    artistLinkedin: "https://linkedin.com/in/mcvikram",
    artistHeadline: "MC · Songwriter · Delhi Underground",
    yt: { subscribers: 34200, totalViews: 2800000, channelAge: "5 years", monthlyViews: 380000, verified: true },
    artistTrack: { campaigns: 0, totalRaised: 0, paybackRate: 0, avgUplift: 0 },
    adReceipts: [],
  },
  {
    id: "ZD-003",
    name: "Tidal",
    artist: "Aasha",
    contentTitle: "Tidal (Lyric Video)",
    videoId: "xyz789",
    status: "funding",
    totalBudget: 80000,
    artistCoPay: 20000,
    backerGoal: 60000,
    backerFunded: 18000,
    minTicket: 5000,
    revSharePct: 35,
    cap: 1.5,
    tenorMonths: 4,
    baselineDaily: 420,
    currentDaily: 420,
    totalRevenue: 0,
    totalSettled: 0,
    daysActive: 0,
    adSpent: 0,
    rd: [420, 430, 410, 425, 440, 420],
    backers: [
      { name: "Dev Raghavan", amount: 18000, returned: 0, linkedin: "https://linkedin.com/in/devraghavan", headline: "Sound Engineer · Independent", campaigns: 1, totalBacked: 18000, avgReturn: 0 },
    ],
    settlements: [],
    genre: "Electronic / Ambient",
    tagline: "sound between the silences",
    artistLinkedin: "https://linkedin.com/in/aashamusic",
    artistHeadline: "Electronic Producer · Ambient Sound Designer",
    yt: { subscribers: 2800, totalViews: 120000, channelAge: "1 year", monthlyViews: 18000, verified: true },
    artistTrack: { campaigns: 0, totalRaised: 0, paybackRate: 0, avgUplift: 0 },
    adReceipts: [],
  },
];
