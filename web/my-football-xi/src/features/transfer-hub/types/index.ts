
export interface TransferRumor {
  id: string;
  playerName: string;
  playerId: string;
  age: number;
  position: string;
  currentTeam: string;
  currentTeamLogo?: string;
  targetTeam: string;
  photo: string;
  reportedFee: string;
  reportedFeeValue: number; // In millions
  rummorSource: string;
  dateReported: string;
  likelihood: number; // 0-10 likelihood of the transfer happening
  fitTags: FitTag[];
  status: "rumor" | "confirmed" | "denied";
}

export interface FitTag {
  id: string;
  label: string;
  color: string;
}

export interface PlayerWanted {
  id: string;
  playerName: string;
  age: number;
  position: string;
  currentTeam: string;
  currentTeamLogo?: string;
  photo: string;
  marketValue: string;
  marketValueAmount: number; // In millions
  nationality: string;
  addedAt: string;
  userNotes?: string;
}

export interface AIRecommendation {
  id: string;
  playerName: string;
  playerId?: string;
  age: number;
  position: string;
  currentTeam: string;
  currentTeamLogo?: string;
  photo: string;
  nationality: string;
  marketValue: string;
  marketValueAmount: number; // In millions
  recommendationReason: string;
  compatibilityScore: number; // 0-10 compatibility score
  keyStats?: KeyStat[];
  detailedReasoning?: string;
}

export interface KeyStat {
  label: string;
  value: string;
  percentile?: number; // 0-100
}

export interface FanOpinion {
  id?: string;
  rumorId?: string;
  playerId?: string;
  valueRating: number; // 1-5 (1: Way overpriced, 3: Fair price, 5: Bargain)
  fitRating?: number; // 1-5 stars
  shouldSign?: boolean; // Yes/No vote
  comment?: string;
  timestamp: string;
}
