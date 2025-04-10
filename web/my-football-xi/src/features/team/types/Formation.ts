
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
