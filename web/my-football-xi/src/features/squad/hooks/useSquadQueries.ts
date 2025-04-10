
import { useQuery } from '@tanstack/react-query';
import { 
  getFilteredPlayersQuery, 
  getPlayerByIdQuery, 
  getSquadQuery, 
  getTeamInfoQuery 
} from '../api/squadQueries';
import { PlayerFilterOptions } from '../models';

/**
 * Hook to fetch the full squad for a team
 */
export const useSquadQuery = (teamId: string) => {
  return useQuery({
    queryKey: ['squad', teamId],
    queryFn: () => getSquadQuery(teamId)
  });
};

/**
 * Hook to fetch filtered players for a team
 */
export const useFilteredPlayersQuery = (
  teamId: string,
  filterOptions: PlayerFilterOptions,
  page = 1,
  pageSize = 20
) => {
  return useQuery({
    queryKey: ['filteredPlayers', teamId, filterOptions, page, pageSize],
    queryFn: () => getFilteredPlayersQuery(teamId, filterOptions, page, pageSize)
  });
};

/**
 * Hook to fetch a single player by ID
 */
export const usePlayerByIdQuery = (teamId: string, playerId: string) => {
  return useQuery({
    queryKey: ['player', teamId, playerId],
    queryFn: () => getPlayerByIdQuery(teamId, playerId),
    enabled: !!playerId // Only fetch when we have a playerId
  });
};

/**
 * Hook to fetch team information
 */
export const useTeamInfoQuery = (teamId: string) => {
  return useQuery({
    queryKey: ['teamInfo', teamId],
    queryFn: () => getTeamInfoQuery(teamId)
  });
};
