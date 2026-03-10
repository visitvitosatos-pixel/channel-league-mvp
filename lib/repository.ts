import { PrismaClient } from "@prisma/client";
import { demoAdminOverview, demoBranding, demoDailyLeaderboard, demoProfile, demoRound, demoWeeklyLeaderboard } from "@/lib/mock-data";
import { env } from "@/lib/env";
import { AdminOverview, ChannelBranding, LeaderboardEntry, PickSide, ProfilePayload, RoundPayload } from "@/lib/types";

let prismaSingleton: PrismaClient | null = null;
function getPrisma() {
  if (!prismaSingleton) {
    prismaSingleton = new PrismaClient();
  }
  return prismaSingleton;
}

export interface PredictionInput {
  channelSlug: string;
  tgUserId: string;
  displayName: string;
  username?: string | null;
  pick: PickSide;
  confidence: number;
  note?: string;
}

export interface Repository {
  getChannelBranding(slug: string): Promise<ChannelBranding>;
  getCurrentRound(slug: string): Promise<RoundPayload>;
  getLeaderboard(slug: string, scope: "daily" | "weekly"): Promise<LeaderboardEntry[]>;
  getProfile(slug: string, tgUserId?: string): Promise<ProfilePayload>;
  getAdminOverview(slug: string): Promise<AdminOverview>;
  submitPrediction(input: PredictionInput): Promise<{ ok: boolean; message: string }>;
}

class MockRepository implements Repository {
  async getChannelBranding() { return demoBranding; }
  async getCurrentRound() { return demoRound; }
  async getLeaderboard(_slug: string, scope: "daily" | "weekly") {
    return scope === "daily" ? demoDailyLeaderboard : demoWeeklyLeaderboard;
  }
  async getProfile() { return demoProfile; }
  async getAdminOverview() { return demoAdminOverview; }
  async submitPrediction() {
    return { ok: true, message: "Прогноз принят. В demo-режиме он не сохраняется в базу, но flow готов для показа админу." };
  }
}

class PrismaRepository implements Repository {
  async getChannelBranding(slug: string): Promise<ChannelBranding> {
    const prisma = getPrisma();
    const channel = await prisma.channel.findUnique({ where: { slug } });
    if (!channel) {
      return demoBranding;
    }
    return {
      slug: channel.slug,
      title: channel.title,
      brandName: channel.brandName,
      accentColor: channel.accentColor,
      logoUrl: channel.logoUrl,
      subtitle: "Структурированные пики, реакция толпы и профиль участника.",
    };
  }

  async getCurrentRound(slug: string): Promise<RoundPayload> {
    const prisma = getPrisma();
    const round = await prisma.round.findFirst({
      where: { channel: { slug } },
      include: { matches: true, predictions: true },
      orderBy: { dateKey: "desc" },
    });
    if (!round || !round.matches[0]) return demoRound;

    const total = Math.max(round.predictions.length, 1);
    const home = round.predictions.filter((x) => x.pick === "HOME").length;
    const draw = round.predictions.filter((x) => x.pick === "DRAW").length;
    const away = round.predictions.filter((x) => x.pick === "AWAY").length;

    return {
      id: round.id,
      dateKey: round.dateKey,
      title: round.title,
      lockAt: round.lockAt.toISOString(),
      status: round.status,
      featuredMatch: {
        id: round.matches[0].id,
        sport: round.matches[0].sport,
        homeTeam: round.matches[0].homeTeam,
        awayTeam: round.matches[0].awayTeam,
        startsAt: round.matches[0].startsAt.toISOString(),
        resultSide: round.matches[0].resultSide,
        scoreLine: round.matches[0].scoreLine,
      },
      crowdSplit: {
        HOME: Math.round((home / total) * 100),
        DRAW: Math.round((draw / total) * 100),
        AWAY: Math.round((away / total) * 100),
      },
    };
  }

  async getLeaderboard(slug: string, scope: "daily" | "weekly"): Promise<LeaderboardEntry[]> {
    const prisma = getPrisma();
    const channel = await prisma.channel.findUnique({ where: { slug } });
    if (!channel) return scope === "daily" ? demoDailyLeaderboard : demoWeeklyLeaderboard;

    const scores = await prisma.score.findMany({
      where: { channelId: channel.id },
      include: { user: true, round: true },
      orderBy: { totalPoints: "desc" },
      take: 20,
    });

    if (!scores.length) return scope === "daily" ? demoDailyLeaderboard : demoWeeklyLeaderboard;

    return scores.map((score, index) => ({
      rank: index + 1,
      tgUserId: score.user.tgUserId,
      displayName: score.user.displayName,
      username: score.user.username,
      totalPoints: score.totalPoints,
      hitRate: Math.min(95, 50 + score.correctPickPoints * 10),
      streak: Math.min(9, score.streakBonus + 1),
      trustIndex: Math.min(99, 55 + score.totalPoints),
    }));
  }

  async getProfile(slug: string, tgUserId?: string): Promise<ProfilePayload> {
    const prisma = getPrisma();
    if (!tgUserId) return demoProfile;
    const user = await prisma.user.findUnique({
      where: { tgUserId },
      include: { predictions: { include: { match: true }, orderBy: { createdAt: "desc" }, take: 10 }, scores: true },
    });
    if (!user) return demoProfile;
    const hits = user.scores.reduce((acc, item) => acc + (item.correctPickPoints > 0 ? 1 : 0), 0);
    const total = Math.max(user.predictions.length, 1);
    return {
      tgUserId: user.tgUserId,
      displayName: user.displayName,
      username: user.username,
      totalPredictions: user.predictions.length,
      hits,
      misses: Math.max(0, user.predictions.length - hits),
      hitRate: Math.round((hits / total) * 100),
      streak: Math.min(9, user.scores[user.scores.length - 1]?.streakBonus || 1),
      trustIndex: 70,
      division: "Gold",
      lastPicks: user.predictions.map((prediction) => ({
        id: prediction.id,
        label: `${prediction.match.homeTeam} — ${prediction.match.awayTeam}`,
        pick: prediction.pick,
        settled: Boolean(prediction.match.resultSide),
        won: prediction.match.resultSide ? prediction.match.resultSide === prediction.pick : undefined,
      })),
    };
  }

  async getAdminOverview(slug: string): Promise<AdminOverview> {
    const channel = await this.getChannelBranding(slug);
    const daily = await this.getLeaderboard(slug, "daily");
    return {
      channel,
      opensToday: 0,
      submittedToday: daily.length,
      eveningReturns: 0,
      activeCore: Math.min(10, daily.length),
      hottestBet: demoAdminOverview.hottestBet,
      topPlayers: daily.slice(0, 3),
    };
  }

  async submitPrediction(input: PredictionInput) {
    const prisma = getPrisma();
    const channel = await prisma.channel.findUnique({ where: { slug: input.channelSlug } });
    if (!channel) {
      return { ok: false, message: "Канал не найден. Для demo используйте DEMO_MODE=true." };
    }

    const round = await prisma.round.findFirst({
      where: { channelId: channel.id, status: "OPEN" },
      include: { matches: true },
      orderBy: { dateKey: "desc" },
    });

    if (!round || !round.matches[0]) {
      return { ok: false, message: "Нет открытого раунда." };
    }

    const user = await prisma.user.upsert({
      where: { tgUserId: input.tgUserId },
      create: {
        tgUserId: input.tgUserId,
        displayName: input.displayName,
        username: input.username || undefined,
      },
      update: {
        displayName: input.displayName,
        username: input.username || undefined,
        lastSeenAt: new Date(),
      },
    });

    await prisma.prediction.upsert({
      where: { userId_roundId_matchId: { userId: user.id, roundId: round.id, matchId: round.matches[0].id } },
      create: {
        userId: user.id,
        channelId: channel.id,
        roundId: round.id,
        matchId: round.matches[0].id,
        pick: input.pick,
        confidence: input.confidence,
        note: input.note,
      },
      update: {
        pick: input.pick,
        confidence: input.confidence,
        note: input.note,
      },
    });

    await prisma.event.create({
      data: {
        channelId: channel.id,
        userId: user.id,
        type: "prediction_submitted",
        payload: {
          pick: input.pick,
          confidence: input.confidence,
        },
      },
    });

    return { ok: true, message: "Прогноз принят и сохранён." };
  }
}

export function getRepository(): Repository {
  if (env.demoMode || !process.env.DATABASE_URL) {
    return new MockRepository();
  }
  return new PrismaRepository();
}
