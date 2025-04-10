
import { Player } from '@/models/Player';
import { ApiResponse, PaginatedResponse, PlayerFilterOptions, SquadDto } from '../models';

// In a real app, these would call the API with React Query
// Aligned with CQRS pattern - these are Query handlers

/**
 * Fetches the full squad for a team
 */
export const getSquadQuery = async (teamId: string): Promise<SquadDto> => {
  // This would be a real API call in production
  // Example of usage with React Query:
  // const { data } = useQuery({
  //   queryKey: ['squad', teamId],
  //   queryFn: () => getSquadQuery(teamId)
  // });
  
  console.log(`Fetching squad for team: ${teamId}`);
  
  // For now, simulate API call with mock data
  return new Promise((resolve) => {
    setTimeout(async () => {
      const playerMock = await import('@/features/team/mocks/playerMock');
      const players = playerMock.getAllPlayers().map(player => ({
        ...player,
        // Add dummy contract expiration dates between 1-5 years in the future
        contract: player.contract || 
          (new Date().getFullYear() + Math.floor(Math.random() * 5) + 1).toString(),
        // Add random fan pulse if not present
        fanPulse: player.fanPulse || Math.floor(Math.random() * 30) + 60
      }));
      
      resolve({
        players,
        teamId,
        teamName: "Manchester United",
        transferBudget: 120000000,
        wageSpace: 650000
      });
    }, 500);
  });
};

/**
 * Fetches a paginated, filtered list of players for a team
 */
export const getFilteredPlayersQuery = async (
  teamId: string,
  filterOptions: PlayerFilterOptions,
  page = 1,
  pageSize = 20
): Promise<PaginatedResponse<Player>> => {
  console.log(`Fetching filtered players for team: ${teamId}`, filterOptions);
  
  // In a real app, this would be a proper API call
  return new Promise((resolve) => {
    setTimeout(async () => {
      const { getAllPlayers } = await import('@/features/team/mocks/playerMock');
      let players = getAllPlayers();
      
      // Apply filters
      if (filterOptions.status && filterOptions.status !== 'all') {
        if (filterOptions.status === 'injured') {
          players = players.filter(p => p.status?.injured);
        } else {
          players = players.filter(p => p.status?.recommendation === filterOptions.status);
        }
      }
      
      if (filterOptions.position) {
        players = players.filter(p => p.position === filterOptions.position);
      }
      
      if (filterOptions.searchTerm) {
        const term = filterOptions.searchTerm.toLowerCase();
        players = players.filter(p => 
          p.name.toLowerCase().includes(term) || 
          p.position.toLowerCase().includes(term)
        );
      }
      
      // Add dummy contract data
      players = players.map(player => ({
        ...player,
        contract: player.contract || 
          (new Date().getFullYear() + Math.floor(Math.random() * 5) + 1).toString(),
        fanPulse: player.fanPulse || Math.floor(Math.random() * 30) + 60
      }));
      
      // Apply pagination
      const totalCount = players.length;
      const startIndex = (page - 1) * pageSize;
      const paginatedPlayers = players.slice(startIndex, startIndex + pageSize);
      
      resolve({
        items: paginatedPlayers,
        totalCount,
        pageIndex: page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize)
      });
    }, 300);
  });
};

/**
 * Fetches a single player by ID
 */
export const getPlayerByIdQuery = async (
  teamId: string, 
  playerId: string
): Promise<ApiResponse<Player>> => {
  console.log(`Fetching player ${playerId} for team: ${teamId}`);
  
  return new Promise((resolve) => {
    setTimeout(async () => {
      const { getAllPlayers } = await import('@/features/team/mocks/playerMock');
      const players = getAllPlayers();
      const player = players.find(p => p.id === playerId);
      
      if (!player) {
        resolve({
          isSuccess: false,
          statusCode: 404,
          message: "Player not found",
          errors: ["Player not found"]
        });
        return;
      }
      
      // Add dummy contract data if missing
      const enhancedPlayer = {
        ...player,
        contract: player.contract || 
          (new Date().getFullYear() + Math.floor(Math.random() * 5) + 1).toString(),
        fanPulse: player.fanPulse || Math.floor(Math.random() * 30) + 60
      };
      
      resolve({
        data: enhancedPlayer,
        isSuccess: true,
        statusCode: 200
      });
    }, 200);
  });
};

/**
 * Fetches team information by ID
 */
export const getTeamInfoQuery = async (
  teamId: string
): Promise<ApiResponse<{
  id: string;
  name: string;
  shortName: string;
  primaryColor: string;
  logoClass: string;
}>> => {
  console.log(`Fetching team info for: ${teamId}`);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          id: teamId,
          name: "Manchester United",
          shortName: "United",
          primaryColor: "text-united-red",
          logoClass: "bg-united-red"
        },
        isSuccess: true,
        statusCode: 200
      });
    }, 200);
  });
};
