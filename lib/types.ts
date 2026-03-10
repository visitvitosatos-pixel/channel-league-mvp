export type PickSide = "HOME" | "DRAW" | "AWAY";

export interface ChannelBranding {
  slug: string;
  title: string;
  brandName: string;
  accentColor: string;
  logoUrl?: string | null;
  subtitle: string;
}

export interface MatchCard {
  id: string;
  sport: string;
  homeTeam: string;
  awayTeam: string;
  startsAt: string;
  resultSide?: PickSide | null;
  scoreLine?: string | null;
}

export interface CrowdSplit {
  HOME: number;
  DRAW: number;
  AWAY: number;
}

export interface RoundPayload {
  id: string;
  dateKey: string;
  title: string;
  lockAt: string;
  status: "DRAFT" | "OPEN" | "LOCKED" | "SCORED";
  featuredMatch: MatchCard;
  crowdSplit: CrowdSplit;
}

export interface LeaderboardEntry {
  rank: number;
  tgUserId: string;
  displayName: string;
  username?: string | null;
  totalPoints: number;
  hitRate: number;
  streak: number;
  trustIndex: number;
}

export interface ProfilePayload {
  tgUserId: string;
  displayName: string;
  username?: string | null;
  totalPredictions: number;
  hits: number;
  misses: number;
  hitRate: number;
  streak: number;
  trustIndex: number;
  division: string;
  lastPicks: Array<{
    id: string;
    label: string;
    pick: PickSide;
    settled: boolean;
    won?: boolean;
  }>;
}

export interface AdminOverview {
  channel: ChannelBranding;
  opensToday: number;
  submittedToday: number;
  eveningReturns: number;
  activeCore: number;
  hottestBet: string;
  topPlayers: LeaderboardEntry[];
}

export interface SessionPayload {
  ok: boolean;
  mode: "demo" | "live";
  user: {
    id: string;
    displayName: string;
    username?: string | null;
  };
}
