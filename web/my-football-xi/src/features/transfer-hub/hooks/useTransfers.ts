import { useState, useEffect } from "react";
import { TransferRumor, PlayerWanted, AIRecommendation, FanOpinion } from "../types";

// This would normally fetch from an API
const getMockRumors = (teamId: string): TransferRumor[] => [
  {
    id: "r1",
    playerName: "Matthijs de Ligt",
    playerId: "deligt1", // Added missing playerId
    age: 24,
    position: "CB",
    currentTeam: "Bayern Munich",
    targetTeam: "Manchester United",
    reportedFee: "€65M",
    reportedFeeValue: 65000000,
    dateReported: "2023-04-01T12:00:00Z",
    rummorSource: "Sky Sports",
    likelihood: 7,
    photo: "https://img.a.transfermarkt.technology/portrait/big/326031-1661412629.jpg",
    fitTags: [
      { id: "t1", label: "Defensive leader", color: "bg-blue-100 text-blue-800" },
      { id: "t2", label: "Ball playing", color: "bg-green-100 text-green-800" }
    ],
    status: "rumor" // Added missing status
  },
  {
    id: "r2",
    playerName: "Federico Chiesa",
    playerId: "chiesa1", // Added missing playerId
    age: 25,
    position: "RW",
    currentTeam: "Juventus",
    targetTeam: "Manchester United",
    reportedFee: "€50M",
    reportedFeeValue: 50000000,
    dateReported: "2023-03-28T15:30:00Z",
    rummorSource: "Fabrizio Romano",
    likelihood: 6,
    photo: "https://img.a.transfermarkt.technology/portrait/big/341092-1559566471.jpg",
    fitTags: [
      { id: "t3", label: "Pacey winger", color: "bg-green-100 text-green-800" },
      { id: "t4", label: "Injury history", color: "bg-red-100 text-red-800" }
    ],
    status: "rumor" // Added missing status
  }
];

// Mock data for wanted players
const getMockWantedPlayers = (teamId: string): PlayerWanted[] => [
  {
    id: "w1",
    playerName: "Jonathan David",
    age: 23,
    position: "ST",
    currentTeam: "Lille",
    photo: "https://img.a.transfermarkt.technology/portrait/big/605633-1603393656.jpg",
    marketValue: "€45M",
    marketValueAmount: 45000000,
    nationality: "Canada",
    addedAt: "2023-02-15T10:20:00Z",
    userNotes: "Great finisher, would suit our style"
  }
];

// Mock data for AI recommendations
const getMockRecommendations = (teamId: string): AIRecommendation[] => [
  {
    id: "a1",
    playerName: "Gonçalo Inácio",
    age: 21,
    position: "CB",
    currentTeam: "Sporting CP",
    currentTeamLogo: "https://tmssl.akamaized.net/images/wappen/head/16.png",
    photo: "https://img.a.transfermarkt.technology/portrait/big/361244-1639147779.jpg",
    marketValue: "€35M",
    marketValueAmount: 35000000,
    nationality: "Portugal",
    recommendationReason: "Left-footed CB with excellent passing range",
    compatibilityScore: 8.7
  },
  {
    id: "a2",
    playerName: "Khvicha Kvaratskhelia",
    age: 22,
    position: "LW",
    currentTeam: "Napoli",
    currentTeamLogo: "https://tmssl.akamaized.net/images/wappen/head/6195.png",
    photo: "https://img.a.transfermarkt.technology/portrait/big/537341-1661417774.jpg",
    marketValue: "€80M",
    marketValueAmount: 80000000,
    nationality: "Georgia",
    recommendationReason: "Electric dribbler, creates chances consistently",
    compatibilityScore: 9.2
  }
];

export const useTransfers = (teamId: string) => {
  const [rumors, setRumors] = useState<TransferRumor[]>([]);
  const [wantedPlayers, setWantedPlayers] = useState<PlayerWanted[]>([]);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // In a real app, these would be API calls
        setRumors(getMockRumors(teamId));
        setWantedPlayers(getMockWantedPlayers(teamId));
        setRecommendations(getMockRecommendations(teamId));
        setLoading(false);
      } catch (err) {
        console.error("Error loading transfer data:", err);
        setError("Failed to load transfer data. Please try again.");
        setLoading(false);
      }
    };
    
    loadData();
  }, [teamId]);
  
  // Handle adding opinions to rumors
  const handleSaveFanOpinion = (rumorId: string, opinion: Partial<FanOpinion>) => {
    // In a real app, this would make an API call
    console.log("Save opinion for rumor:", rumorId, opinion);
  };
  
  // Handle adding players to wanted list
  const handleAddWantedPlayer = (player: PlayerWanted) => {
    setWantedPlayers(prev => [...prev, player]);
  };
  
  // Handle removing players from wanted list
  const handleRemoveWantedPlayer = (playerId: string) => {
    setWantedPlayers(prev => prev.filter(p => p.id !== playerId));
  };
  
  // Handle updating wanted player details
  const handleUpdateWantedPlayer = (playerId: string, updates: Partial<PlayerWanted>) => {
    setWantedPlayers(prev => prev.map(p => 
      p.id === playerId ? { ...p, ...updates } : p
    ));
  };
  
  // Get opinion for a specific rumor
  const getOpinionForRumor = (rumorId: string) => {
    // In a real app, this would fetch from storage or API
    return null;
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
