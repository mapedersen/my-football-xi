
import React from 'react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import { Player } from '@/models/Player';
import { useUpdatePlayerStatus } from '../hooks/useSquadCommands';

interface PlayerStatusButtonProps {
  player: Player;
  teamId: string;
}

/**
 * Component for changing a player's status (keep, sell, loan)
 */
const PlayerStatusButton: React.FC<PlayerStatusButtonProps> = ({ player, teamId }) => {
  const updateStatusMutation = useUpdatePlayerStatus();
  
  const handleStatusChange = (status: string) => {
    updateStatusMutation.mutate({
      playerId: player.id,
      teamId,
      status
    });
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          disabled={player.status?.injured}
        >
          {player.status?.recommendation || "Select"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleStatusChange("keep")}>
          <span className="text-green-700 font-medium">Keep</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("sell")}>
          <span className="text-red-700 font-medium">Sell</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("loan")}>
          <span className="text-blue-700 font-medium">Loan Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PlayerStatusButton;
