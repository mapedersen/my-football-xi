
import { TransferRumor, PlayerWanted, AIRecommendation, FanOpinion } from '@/features/transfer/types';
import { 
  mockTransferRumors, 
  mockWantedPlayers, 
  mockAIRecommendations, 
  mockFanOpinions,
  getTransferRumorsForTeam as getMockRumors,
  getWantedPlayersForTeam as getMockWanted,
  getAIRecommendationsForTeam as getMockRecommendations
} from '@/features/transfer/mocks/transferMock';

// These functions would normally call the API
// For now they use mock data, but can be easily converted to API calls

export const getTransferRumorsForTeam = async (teamId: string): Promise<TransferRumor[]> => {
  // This would be an API call like:
  // return await fetch(`/api/teams/${teamId}/transfer-rumors`).then(res => res.json());
  
  // For now, return mock data
  return Promise.resolve(getMockRumors(teamId));
};

export const getWantedPlayersForTeam = async (teamId: string): Promise<PlayerWanted[]> => {
  // This would be an API call
  return Promise.resolve(getMockWanted(teamId));
};

export const getAIRecommendationsForTeam = async (teamId: string): Promise<AIRecommendation[]> => {
  // This would be an API call
  return Promise.resolve(getMockRecommendations(teamId));
};

export const getFanOpinionForRumor = async (rumorId: string): Promise<FanOpinion | null> => {
  // This would be an API call
  return Promise.resolve(mockFanOpinions[rumorId] || null);
};

export const saveFanOpinion = async (opinion: FanOpinion): Promise<FanOpinion> => {
  // This would be an API call like:
  // return await fetch('/api/fan-opinions', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(opinion)
  // }).then(res => res.json());
  
  // For now, just mock it
  if (opinion.rumorId) {
    mockFanOpinions[opinion.rumorId] = opinion;
  }
  return Promise.resolve(opinion);
};

export const addWantedPlayer = async (teamId: string, player: PlayerWanted): Promise<PlayerWanted> => {
  // This would be an API call
  // For now, just mock it
  if (!mockWantedPlayers[teamId]) {
    mockWantedPlayers[teamId] = [];
  }
  mockWantedPlayers[teamId].push(player);
  return Promise.resolve(player);
};

export const removeWantedPlayer = async (teamId: string, playerId: string): Promise<void> => {
  // This would be an API call
  // For now, just mock it
  if (mockWantedPlayers[teamId]) {
    mockWantedPlayers[teamId] = mockWantedPlayers[teamId].filter(
      player => player.id !== playerId
    );
  }
  return Promise.resolve();
};

export const updateWantedPlayer = async (teamId: string, player: PlayerWanted): Promise<PlayerWanted> => {
  // This would be an API call
  // For now, just mock it
  if (mockWantedPlayers[teamId]) {
    const index = mockWantedPlayers[teamId].findIndex(p => p.id === player.id);
    if (index >= 0) {
      mockWantedPlayers[teamId][index] = player;
    }
  }
  return Promise.resolve(player);
};

export const getSearchablePlayers = async (query: string = ""): Promise<any[]> => {
  // This would be an API call
  // For now, return mock data
  const globalPlayers = [
    {
      id: "1001",
      name: "Leny Yoro",
      age: 18,
      position: "CB",
      team: "Lille",
      photo: "https://img.a.transfermarkt.technology/portrait/header/746440-1695719443.jpg",
      value: "€50m",
      valueAmount: 50,
      nationality: "France"
    },
    {
      id: "1002",
      name: "Victor Osimhen",
      age: 25,
      position: "ST",
      team: "Napoli",
      photo: "https://img.a.transfermarkt.technology/portrait/header/401923-1661780981.jpg",
      value: "€100m",
      valueAmount: 100,
      nationality: "Nigeria"
    },
    {
      id: "1003",
      name: "Florian Wirtz",
      age: 21,
      position: "CAM",
      team: "Bayer Leverkusen",
      photo: "https://img.a.transfermarkt.technology/portrait/header/521361-1696332660.jpg",
      value: "€130m",
      valueAmount: 130,
      nationality: "Germany"
    },
    {
      id: "1004",
      name: "Rodrygo",
      age: 23,
      position: "RW",
      team: "Real Madrid",
      photo: "https://img.a.transfermarkt.technology/portrait/header/412363-1665905006.jpg",
      value: "€110m",
      valueAmount: 110,
      nationality: "Brazil"
    },
    {
      id: "1005",
      name: "João Neves",
      age: 19,
      position: "CM",
      team: "Benfica",
      photo: "https://img.a.transfermarkt.technology/portrait/header/718668-1695393177.jpg",
      value: "€70m",
      valueAmount: 70,
      nationality: "Portugal"
    }
  ];
  
  return Promise.resolve(globalPlayers);
};
