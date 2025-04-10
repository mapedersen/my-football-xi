
import React, { useState } from 'react';
import { PlayerWanted } from '../types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, PlusCircle } from "lucide-react";

interface PlayerSearchProps {
  onPlayerAdded: (player: PlayerWanted) => Promise<boolean>;
}

const PlayerSearch: React.FC<PlayerSearchProps> = ({ onPlayerAdded }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    // Mock search - in a real app, this would be an API call
    setTimeout(() => {
      const mockResults = [
        {
          id: "mock1",
          playerName: "Matthijs de Ligt",
          age: 24,
          position: "CB",
          currentTeam: "Bayern Munich",
          photo: "https://img.a.transfermarkt.technology/portrait/big/326031-1661412629.jpg",
          marketValue: "€65M",
          marketValueAmount: 65,
          nationality: "Netherlands"
        },
        {
          id: "mock2",
          playerName: "Bruno Fernandes",
          age: 29,
          position: "CAM",
          currentTeam: "Manchester United",
          photo: "https://img.a.transfermarkt.technology/portrait/big/240306-1599986510.jpg",
          marketValue: "€80M",
          marketValueAmount: 80,
          nationality: "Portugal"
        }
      ].filter(player => 
        player.playerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 500);
  };

  const handleAddPlayer = async (player: any) => {
    const wantedPlayer: PlayerWanted = {
      id: player.id,
      playerName: player.playerName,
      age: player.age,
      position: player.position,
      currentTeam: player.currentTeam,
      photo: player.photo,
      marketValue: player.marketValue,
      marketValueAmount: player.marketValueAmount,
      nationality: player.nationality,
      addedAt: new Date().toISOString()
    };
    
    const success = await onPlayerAdded(wantedPlayer);
    if (success) {
      // Clear results after adding
      setSearchResults([]);
      setSearchTerm('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h3 className="font-semibold text-lg mb-3">Find Players</h3>
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search for a player..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button 
          onClick={handleSearch}
          disabled={isSearching}
        >
          <SearchIcon className="w-4 h-4 mr-1" />
          Search
        </Button>
      </div>
      
      {isSearching && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      )}
      
      {searchResults.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Search Results</h4>
          <div className="space-y-2">
            {searchResults.map(player => (
              <div key={player.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <div className="flex items-center gap-2">
                  {player.photo && (
                    <img 
                      src={player.photo} 
                      alt={player.playerName} 
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/40';
                      }}
                    />
                  )}
                  <div>
                    <div className="font-medium">{player.playerName}</div>
                    <div className="text-xs text-gray-500">{player.position} • {player.currentTeam}</div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => handleAddPlayer(player)}
                >
                  <PlusCircle className="w-4 h-4" />
                  Add
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerSearch;
