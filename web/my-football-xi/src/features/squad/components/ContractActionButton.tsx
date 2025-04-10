
import React from 'react';
import { Button } from "@/shared/components/ui/button";
import { Player } from '@/models/Player';
import { isContractRenewable, isContractExpirable } from '../utils/squadUtils';
import { useUpdatePlayerContract } from '../hooks/useSquadCommands';

interface ContractActionButtonProps {
  player: Player;
  teamId: string;
}

/**
 * Component for rendering contract action buttons (renew/expire)
 * based on player contract status
 */
const ContractActionButton: React.FC<ContractActionButtonProps> = ({ player, teamId }) => {
  const updateContractMutation = useUpdatePlayerContract();
  
  const handleRenewContract = () => {
    updateContractMutation.mutate({
      playerId: player.id,
      teamId,
      action: 'renew'
    });
  };
  
  const handleExpireContract = () => {
    updateContractMutation.mutate({
      playerId: player.id,
      teamId,
      action: 'expire'
    });
  };
  
  // If player is marked for sale, no contract actions available
  if (player.status?.recommendation === 'sell') {
    return null;
  }
  
  return (
    <div className="flex gap-1">
      {isContractRenewable(player) && (
        <Button 
          variant="outline" 
          size="sm" 
          className="text-green-600 hover:text-green-800 hover:bg-green-50"
          onClick={handleRenewContract}
        >
          Renew
        </Button>
      )}
      {isContractExpirable(player) && (
        <Button 
          variant="outline" 
          size="sm" 
          className="text-amber-600 hover:text-amber-800 hover:bg-amber-50"
          onClick={handleExpireContract}
        >
          Let Expire
        </Button>
      )}
    </div>
  );
};

export default ContractActionButton;
