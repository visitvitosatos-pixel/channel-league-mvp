import { AdminOverview, ChannelBranding, LeaderboardEntry, ProfilePayload, RoundPayload } from "@/lib/types";

export const demoBranding: ChannelBranding = {
  slug: "vitos-club",
  title: "Vitos Betting Club",
  brandName: "Vitos League",
  accentColor: "#7C5CFF",
  logoUrl: null,
  subtitle: "Социальный слой для ставок: реакция толпы, профиль и рейтинг недели.",
};

export const demoRound: RoundPayload = {
  id: "round_demo_2026_03_10",
  dateKey: "2026-03-10",
  title: "Главный матч дня",
  lockAt: "2026-03-10T20:45:00.000Z",
  status: "OPEN",
  featuredMatch: {
    id: "match_demo_1",
    sport: "football",
    homeTeam: "Arsenal",
    awayTeam: "Inter",
    startsAt: "2026-03-10T20:45:00.000Z",
    resultSide: null,
    scoreLine: null,
  },
  crowdSplit: {
    HOME: 54,
    DRAW: 18,
    AWAY: 28,
  },
};

export const demoDailyLeaderboard: LeaderboardEntry[] = [
  { rank: 1, tgUserId: "1001", displayName: "RicoSharp", username: "ricosharp", totalPoints: 29, hitRate: 71, streak: 4, trustIndex: 82 },
  { rank: 2, tgUserId: "1002", displayName: "GoalHunter", username: "goalhunter", totalPoints: 26, hitRate: 66, streak: 3, trustIndex: 76 },
  { rank: 3, tgUserId: "1003", displayName: "BankrollFox", username: "bankrollfox", totalPoints: 22, hitRate: 61, streak: 2, trustIndex: 69 },
  { rank: 4, tgUserId: "1004", displayName: "IceBet", username: "icebet", totalPoints: 18, hitRate: 59, streak: 2, trustIndex: 63 },
  { rank: 5, tgUserId: "1005", displayName: "Pulsar", username: "visit.vitos.atos", totalPoints: 16, hitRate: 55, streak: 1, trustIndex: 60 },
];

export const demoWeeklyLeaderboard: LeaderboardEntry[] = [
  { rank: 1, tgUserId: "1002", displayName: "GoalHunter", username: "goalhunter", totalPoints: 132, hitRate: 68, streak: 5, trustIndex: 86 },
  { rank: 2, tgUserId: "1001", displayName: "RicoSharp", username: "ricosharp", totalPoints: 127, hitRate: 67, streak: 4, trustIndex: 84 },
  { rank: 3, tgUserId: "1005", displayName: "Pulsar", username: "visit.vitos.atos", totalPoints: 119, hitRate: 63, streak: 3, trustIndex: 77 },
  { rank: 4, tgUserId: "1007", displayName: "LineBreaker", username: "linebreaker", totalPoints: 112, hitRate: 60, streak: 2, trustIndex: 72 },
  { rank: 5, tgUserId: "1008", displayName: "ContraPick", username: "contrapick", totalPoints: 109, hitRate: 58, streak: 2, trustIndex: 80 },
];

export const demoProfile: ProfilePayload = {
  tgUserId: "1005",
  displayName: "Pulsar",
  username: "visit.vitos.atos",
  totalPredictions: 42,
  hits: 26,
  misses: 16,
  hitRate: 62,
  streak: 3,
  trustIndex: 77,
  division: "Gold",
  lastPicks: [
    { id: "lp1", label: "Arsenal — Inter", pick: "HOME", settled: false },
    { id: "lp2", label: "Milan — Sevilla", pick: "DRAW", settled: true, won: true },
    { id: "lp3", label: "PSG — Porto", pick: "AWAY", settled: true, won: false },
  ],
};

export const demoAdminOverview: AdminOverview = {
  channel: demoBranding,
  opensToday: 147,
  submittedToday: 63,
  eveningReturns: 31,
  activeCore: 18,
  hottestBet: "Arsenal — Inter / П1",
  topPlayers: demoWeeklyLeaderboard.slice(0, 3),
};
