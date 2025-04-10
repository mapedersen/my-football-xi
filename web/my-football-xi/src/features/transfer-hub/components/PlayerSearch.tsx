
import React, { useState } from 'react';
import { PlayerWanted } from '../types';

interface PlayerSearchProps {
  availablePlayers?: any[];
  onPlayerAdded?: (player: PlayerWanted) => void;
}

const PlayerSearch: React.FC<PlayerSearchProps> = ({ 
  availablePlayers = [],
  onPlayerAdded
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleAddPlayer = (playerData: any) => {
    if (onPlayerAdded) {
      const newPlayer: PlayerWanted = {
        id: playerData.id,
        playerName: playerData.name,
        age: playerData.age,
        position: playerData.position,
        currentTeam: playerData.team,
        photo: "https://via.placeholder.com/150",
        marketValue: "€30M",
        marketValueAmount: 30000000,
        nationality: "Unknown",
        addedAt: new Date().toISOString()
      };
      
      onPlayerAdded(newPlayer);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-medium mb-3">Search for Players</h3>
      <input
        type="text"
        placeholder="Search by player name..."
        className="w-full p-2 border rounded-md mb-3"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      <div className="mt-2">
        {availablePlayers.slice(0, 3).map(player => (
          <div key={player.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
            <span>{player.name} - {player.position}</span>
            <button 
              className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
              onClick={() => handleAddPlayer(player)}
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerSearch;
