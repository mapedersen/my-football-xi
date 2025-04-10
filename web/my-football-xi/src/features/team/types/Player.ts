
export interface PlayerStatus {
  injured?: boolean;
  captain?: boolean;
  onLoan?: boolean;
  recommendation?: string; // "keep", "sell", "loan"
}

export interface PlayerStats {
  appearances: number;
  goals: number;
  assists: number;
  cleanSheets?: number; // for goalkeepers
}

export interface PlayerTag {
  id: string;
  label: string;
  color: string;
}

export interface Player {
  id: string;
  name: string;
  position: string;
  number: number;
  image: string;
  salary: string;
  stats: PlayerStats;
  status?: PlayerStatus;
  rating?: number; // fan rating 1-10
  valueForMoney?: number; // -2 to 2 (-2: Extremely Overpaid, 0: Fair, 2: Underpaid)
  tags?: PlayerTag[];
  comments?: string;
  nationality?: string;
  marketValue?: number;
  age?: number;
  contract?: string; // contract expiration date
  fitness?: number; // 0-100 fitness level
  matchesPlayed?: number; // number of matches played this season
  minutesPlayed?: number; // total minutes played
  fanPulse?: number; // 0-100 fan sentiment rating
}
