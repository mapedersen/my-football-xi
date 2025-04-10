
import { Player } from '@/models/Player';
import { 
  ApiResponse,
  UpdatePlayerContractCommand,
  UpdatePlayerRatingCommand,
  UpdatePlayerStatusCommand
} from '../models';

/**
 * Updates a player's status (keep, sell, loan)
 */
export const updatePlayerStatusCommand = async (
  command: UpdatePlayerStatusCommand
): Promise<ApiResponse<Player>> => {
  console.log('Updating player status:', command);
  
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(async () => {
      const { getAllPlayers } = await import('@/features/team/mocks/playerMock');
      const players = getAllPlayers();
      const player = players.find(p => p.id === command.playerId);
      
      if (!player) {
        resolve({
          isSuccess: false,
          statusCode: 404,
          message: "Player not found",
          errors: ["Player not found"]
        });
        return;
      }
      
      // Update the player
      const updatedPlayer: Player = {
        ...player,
        status: {
          ...player.status,
          recommendation: command.status
        }
      };
      
      resolve({
        data: updatedPlayer,
        isSuccess: true,
        statusCode: 200,
        message: `Player status updated to ${command.status}`
      });
    }, 300);
  });
};

/**
 * Updates a player's rating and value assessment
 */
export const updatePlayerRatingCommand = async (
  command: UpdatePlayerRatingCommand
): Promise<ApiResponse<Player>> => {
  console.log('Updating player rating:', command);
  
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(async () => {
      const { getAllPlayers } = await import('@/features/team/mocks/playerMock');
      const players = getAllPlayers();
      const player = players.find(p => p.id === command.playerId);
      
      if (!player) {
        resolve({
          isSuccess: false,
          statusCode: 404,
          message: "Player not found",
          errors: ["Player not found"]
        });
        return;
      }
      
      // Update the player
      const updatedPlayer: Player = {
        ...player,
        rating: command.rating,
        valueForMoney: command.valueForMoney,
        comments: command.comments || player.comments
      };
      
      resolve({
        data: updatedPlayer,
        isSuccess: true,
        statusCode: 200,
        message: "Player rating updated successfully"
      });
    }, 300);
  });
};

/**
 * Updates a player's contract (renew or let expire)
 */
export const updatePlayerContractCommand = async (
  command: UpdatePlayerContractCommand
): Promise<ApiResponse<Player>> => {
  console.log('Updating player contract:', command);
  
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(async () => {
      const { getAllPlayers } = await import('@/features/team/mocks/playerMock');
      const players = getAllPlayers();
      const player = players.find(p => p.id === command.playerId);
      
      if (!player) {
        resolve({
          isSuccess: false,
          statusCode: 404,
          message: "Player not found",
          errors: ["Player not found"]
        });
        return;
      }
      
      let updatedPlayer: Player;
      
      if (command.action === 'renew') {
        const currentContract = player.contract || "2025";
        const currentYear = parseInt(currentContract, 10);
        
        updatedPlayer = {
          ...player,
          contract: `${currentYear + 3}`
        };
        
        resolve({
          data: updatedPlayer,
          isSuccess: true,
          statusCode: 200,
          message: `Player contract renewed until ${currentYear + 3}`
        });
      } else {
        // Let expire just marks it for expiry, doesn't change the date
        updatedPlayer = {
          ...player
        };
        
        resolve({
          data: updatedPlayer,
          isSuccess: true,
          statusCode: 200,
          message: "Player contract set to expire"
        });
      }
    }, 300);
  });
};
