
import { Player } from '@/models/Player';

// DTO models that match backend response structures
export interface SquadDto {
  players: Player[];
  teamId: string;
  teamName: string;
  transferBudget: number;
  wageSpace: number;
}

export interface PlayerFilterOptions {
  status?: 'all' | 'keep' | 'sell' | 'loan' | 'injured';
  position?: string;
  searchTerm?: string;
}

// Response models aligned with .NET API responses
export interface ApiResponse<T> {
  data?: T;
  isSuccess: boolean;
  statusCode: number;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
}

// Command models for actions on the squad/player
export interface UpdatePlayerStatusCommand {
  playerId: string;
  teamId: string;
  status: string;
}

export interface UpdatePlayerRatingCommand {
  playerId: string;
  teamId: string;
  rating: number;
  valueForMoney: number;
  comments?: string;
}

export interface UpdatePlayerContractCommand {
  playerId: string;
  teamId: string;
  action: 'renew' | 'expire';
}
