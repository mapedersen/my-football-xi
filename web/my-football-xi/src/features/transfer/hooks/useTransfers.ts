
import { useState, useEffect } from 'react';
import { TransferRumor, PlayerWanted, AIRecommendation, FanOpinion } from '../types';
import { 
  getTransferRumorsForTeam,
  getWantedPlayersForTeam,
  getAIRecommendationsForTeam,
  getFanOpinionForRumor,
  saveFanOpinion,
  addWantedPlayer,
  removeWantedPlayer,
  updateWantedPlayer
} from '@/services/api/transferService';

export const useTransfers = (teamId: string) => {
  const [rumors, setRumors] = useState<TransferRumor[]>([]);
  const [wantedPlayers, setWantedPlayers] = useState<PlayerWanted[]>([]);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Load transfer data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [rumorsData, wantedData, recommendationsData] = await Promise.all([
          getTransferRumorsForTeam(teamId),
          getWantedPlayersForTeam(teamId),
          getAIRecommendationsForTeam(teamId)
        ]);
        
        setRumors(rumorsData);
        setWantedPlayers(wantedData);
        setRecommendations(recommendationsData);
        setError(null);
      } catch (err) {
        console.error("Error loading transfer data:", err);
        setError("Failed to load transfer data");
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [teamId]);
  
  // Save fan opinion
  const handleSaveFanOpinion = async (opinion: FanOpinion): Promise<boolean> => {
    try {
      await saveFanOpinion(opinion);
      return true;
    } catch (err) {
      console.error("Error saving fan opinion:", err);
      return false;
    }
  };
  
  // Add player to wanted list
  const handleAddWantedPlayer = async (player: PlayerWanted): Promise<boolean> => {
    try {
      await addWantedPlayer(teamId, player);
      setWantedPlayers(prev => [...prev, player]);
      return true;
    } catch (err) {
      console.error("Error adding wanted player:", err);
      return false;
    }
  };
  
  // Remove player from wanted list
  const handleRemoveWantedPlayer = async (playerId: string): Promise<boolean> => {
    try {
      await removeWantedPlayer(teamId, playerId);
      setWantedPlayers(prev => prev.filter(p => p.id !== playerId));
      return true;
    } catch (err) {
      console.error("Error removing wanted player:", err);
      return false;
    }
  };
  
  // Update wanted player
  const handleUpdateWantedPlayer = async (player: PlayerWanted): Promise<boolean> => {
    try {
      await updateWantedPlayer(teamId, player);
      setWantedPlayers(prev => prev.map(p => p.id === player.id ? player : p));
      return true;
    } catch (err) {
      console.error("Error updating wanted player:", err);
      return false;
    }
  };
  
  // Get fan opinion for a specific rumor
  const getOpinionForRumor = async (rumorId: string): Promise<FanOpinion | null> => {
    try {
      return await getFanOpinionForRumor(rumorId);
    } catch (err) {
      console.error("Error getting fan opinion:", err);
      return null;
    }
  };
  
  return {
    rumors,
    wantedPlayers,
    recommendations,
    loading,
    error,
    handleSaveFanOpinion,
    handleAddWantedPlayer,
    handleRemoveWantedPlayer,
    handleUpdateWantedPlayer,
    getOpinionForRumor
  };
};
