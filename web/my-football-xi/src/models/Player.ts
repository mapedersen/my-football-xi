
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

// Formation types aligned with backend models
export type Formation = 
  | "4-3-3" 
  | "4-4-2" 
  | "3-5-2" 
  | "4-2-3-1" 
  | "5-3-2" 
  | "3-4-3" 
  | "4-5-1" 
  | "4-1-4-1"
  | "4-4-1-1"
  | "3-6-1";

export type PositionKey = 
  "GK" | 
  "LB" | "CB1" | "CB2" | "CB3" | "RB" | 
  "LM" | "CM1" | "CM2" | "CM3" | "CM4" | "RM" | 
  "LW" | "ST" | "RW" |
  "ST1" | "ST2" |
  "LWB" | "RWB" |
  "CAM" | "CDM" | "CDM1" | "CDM2" |
  "CF";

export interface FormationPosition {
  id: PositionKey;
  label: string;
  x: number;
  y: number;
}

export interface FormationLayout {
  name: Formation;
  positions: FormationPosition[];
}

export interface DragItem {
  type: 'player';
  playerId: string;
  sourcePosition?: number; // index in the formation or bench
  isFromBench: boolean;
}
