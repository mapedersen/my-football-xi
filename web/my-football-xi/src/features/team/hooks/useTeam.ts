
import { useState, useEffect } from 'react';
import { Player, Formation } from '../types';
import { 
  fetchStartingXI, 
  fetchBenchPlayers, 
  fetchFormationPositions,
  updatePlayer,
  saveTeamLineup
} from '@/services/api/teamService';

export const useTeam = (teamId: string) => {
  const [startingXI, setStartingXI] = useState<Player[]>([]);
  const [bench, setBench] = useState<Player[]>([]);
  const [formation, setFormation] = useState<Formation>("4-3-3");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Load starting XI and bench players
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [startingData, benchData] = await Promise.all([
          fetchStartingXI(teamId),
          fetchBenchPlayers(teamId)
        ]);
        
        setStartingXI(startingData);
        setBench(benchData);
        setError(null);
      } catch (err) {
        console.error("Error loading team data:", err);
        setError("Failed to load team data");
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [teamId]);
  
  // Change formation
  const handleFormationChange = async (newFormation: Formation) => {
    setFormation(newFormation);
  };
  
  // Handle player update
  const handleUpdatePlayer = async (updatedPlayer: Player) => {
    try {
      const result = await updatePlayer(updatedPlayer);
      
      // Update in the appropriate list
      setStartingXI(current => current.map(player => 
        player.id === result.id ? result : player
      ));
      
      setBench(current => current.map(player => 
        player.id === result.id ? result : player
      ));
      
      return true;
    } catch (err) {
      console.error("Error updating player:", err);
      return false;
    }
  };
  
  // Save the entire lineup
  const saveLineup = async () => {
    try {
      await saveTeamLineup(teamId, startingXI, bench);
      return true;
    } catch (err) {
      console.error("Error saving lineup:", err);
      return false;
    }
  };
  
  return {
    startingXI,
    setStartingXI,
    bench,
    setBench,
    formation,
    setFormation,
    handleFormationChange,
    handleUpdatePlayer,
    saveLineup,
    loading,
    error
  };
};
