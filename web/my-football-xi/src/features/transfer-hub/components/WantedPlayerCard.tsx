
import React from 'react';
import { PlayerWanted } from '../types';

interface WantedPlayerCardProps {
  player: PlayerWanted;
  onUpdate?: (playerId: string, updates: Partial<PlayerWanted>) => void;
  onRemove?: (playerId: string) => void;
}

const WantedPlayerCard: React.FC<WantedPlayerCardProps> = ({ 
  player,
  onUpdate,
  onRemove
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h3 className="font-bold text-lg">{player.playerName}</h3>
        <p className="text-sm text-gray-600">{player.position}, {player.age} • {player.currentTeam}</p>
      </div>
    </div>
  );
};

export default WantedPlayerCard;
