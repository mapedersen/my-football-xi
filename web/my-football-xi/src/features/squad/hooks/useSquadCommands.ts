
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/shared/hooks/use-toast';
import { 
  updatePlayerContractCommand,
  updatePlayerRatingCommand,
  updatePlayerStatusCommand 
} from '../api/squadCommands';
import { 
  UpdatePlayerContractCommand,
  UpdatePlayerRatingCommand,
  UpdatePlayerStatusCommand 
} from '../models';

/**
 * Hook to update a player's status
 */
export const useUpdatePlayerStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: (command: UpdatePlayerStatusCommand) => 
      updatePlayerStatusCommand(command),
    onSuccess: (response, variables) => {
      if (response.isSuccess && response.data) {
        // Invalidate relevant queries
        queryClient.invalidateQueries({ queryKey: ['squad', variables.teamId] });
        queryClient.invalidateQueries({ queryKey: ['filteredPlayers', variables.teamId] });
        queryClient.invalidateQueries({ queryKey: ['player', variables.teamId, variables.playerId] });
        
        // Show success toast
        toast({
          title: "Player status updated",
          description: response.message || `Status changed to ${variables.status}`,
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Failed to update player status",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  });
};

/**
 * Hook to update a player's rating
 */
export const useUpdatePlayerRating = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: (command: UpdatePlayerRatingCommand) => 
      updatePlayerRatingCommand(command),
    onSuccess: (response, variables) => {
      if (response.isSuccess && response.data) {
        // Invalidate relevant queries
        queryClient.invalidateQueries({ queryKey: ['squad', variables.teamId] });
        queryClient.invalidateQueries({ queryKey: ['filteredPlayers', variables.teamId] });
        queryClient.invalidateQueries({ queryKey: ['player', variables.teamId, variables.playerId] });
        
        // Show success toast
        toast({
          title: "Player rating updated",
          description: "Your assessment has been saved."
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Failed to update player rating",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  });
};

/**
 * Hook to update a player's contract
 */
export const useUpdatePlayerContract = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: (command: UpdatePlayerContractCommand) => 
      updatePlayerContractCommand(command),
    onSuccess: (response, variables) => {
      if (response.isSuccess && response.data) {
        // Invalidate relevant queries
        queryClient.invalidateQueries({ queryKey: ['squad', variables.teamId] });
        queryClient.invalidateQueries({ queryKey: ['filteredPlayers', variables.teamId] });
        queryClient.invalidateQueries({ queryKey: ['player', variables.teamId, variables.playerId] });
        
        // Show success toast
        const action = variables.action === 'renew' ? 'renewed' : 'set to expire';
        toast({
          title: `Contract ${action}`,
          description: response.message || `Player's contract has been ${action}.`
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Failed to update contract",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  });
};
