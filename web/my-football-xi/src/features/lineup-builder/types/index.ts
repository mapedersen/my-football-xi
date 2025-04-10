
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

export interface PositionCoordinate {
  id: string;
  x: number;
  y: number;
  role: string;
}

export interface Player {
  id: string;
  name: string;
  number: number;
  position: string;
  image: string;
  salary: string;
  nationality: string;
  status?: {
    injured?: boolean;
    captain?: boolean;
    recommendation?: string;
  };
  stats: {
    appearances: number;
    goals: number;
    assists: number;
    clean_sheets?: number;
    yellow_cards: number;
    red_cards: number;
  };
  valueForMoney?: number;
  rating?: number;
}
