
export interface FanTake {
  id: string;
  author: string;
  content: string;
  category: "transfer" | "lineup" | "tactics" | "general";
  votes: number;
  endorsements: number;
  timestamp: string;
  teamId: string;
}

export interface SentimentData {
  mostOverpaid: SentimentItem;
  mostUnderrated: SentimentItem;
  mostWanted: SentimentItem;
  mostFrustrating: SentimentItem;
}

export interface SentimentItem {
  id?: string;
  name: string;
  value: string;
  votePercentage: number;
  image: string;
}

export interface ConfidenceData {
  overall: number;
  trending: string;
  isPositive: boolean;
  categories: ConfidenceCategory[];
  historicalData: HistoricalDataPoint[];
}

export interface ConfidenceCategory {
  name: string;
  value: number;
  trend: number;
  isPositive: boolean;
}

export interface HistoricalDataPoint {
  month: string;
  value: number;
}
