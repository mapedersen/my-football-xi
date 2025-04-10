
import { TransferRumor, PlayerWanted, AIRecommendation, FanOpinion } from '../types/Transfer';

// Mock transfer rumors
export const mockTransferRumors: Record<string, TransferRumor[]> = {
  'man-united': [
    {
      id: "r1",
      playerName: "Matthijs de Ligt",
      playerId: "p101",
      age: 24,
      position: "CB",
      currentTeam: "Bayern Munich",
      currentTeamLogo: "https://img.a.transfermarkt.technology/portrait/header/27410-1599986552.png",
      targetTeam: "Manchester United",
      photo: "https://img.a.transfermarkt.technology/portrait/header/326031-1660041989.jpg",
      reportedFee: "€50M",
      reportedFeeValue: 50,
      rummorSource: "Sky Sports",
      dateReported: "2025-03-20T14:53:00Z",
      fitTags: [
        { id: "t1", label: "Strong", color: "bg-green-100 text-green-800" },
        { id: "t2", label: "Leader", color: "bg-blue-100 text-blue-800" }
      ],
      status: "rumor"
    },
    {
      id: "r2",
      playerName: "Jonathan David",
      playerId: "p102",
      age: 25,
      position: "ST",
      currentTeam: "Lille",
      currentTeamLogo: "https://img.a.transfermarkt.technology/portrait/header/1093-1598866280.png",
      targetTeam: "Manchester United",
      photo: "https://img.a.transfermarkt.technology/portrait/header/607208-1587459798.jpg",
      reportedFee: "€60M",
      reportedFeeValue: 60,
      rummorSource: "The Athletic",
      dateReported: "2025-03-15T09:30:00Z",
      fitTags: [
        { id: "t3", label: "Clinical", color: "bg-green-100 text-green-800" },
        { id: "t4", label: "Pacey", color: "bg-blue-100 text-blue-800" }
      ],
      status: "rumor"
    }
  ],
  'liverpool': [
    {
      id: "r3",
      playerName: "Federico Chiesa",
      playerId: "p103",
      age: 27,
      position: "RW",
      currentTeam: "Juventus",
      currentTeamLogo: "https://img.a.transfermarkt.technology/portrait/header/506-1599986579.png",
      targetTeam: "Liverpool",
      photo: "https://img.a.transfermarkt.technology/portrait/header/344399-1599986711.jpg",
      reportedFee: "€45M",
      reportedFeeValue: 45,
      rummorSource: "Fabrizio Romano",
      dateReported: "2025-03-18T16:15:00Z",
      fitTags: [
        { id: "t5", label: "Creative", color: "bg-purple-100 text-purple-800" },
        { id: "t6", label: "Versatile", color: "bg-indigo-100 text-indigo-800" }
      ],
      status: "rumor"
    }
  ]
};

// Mock wanted players
export const mockWantedPlayers: Record<string, PlayerWanted[]> = {
  'man-united': [
    {
      id: "w1",
      playerName: "Khvicha Kvaratskhelia",
      age: 24,
      position: "LW",
      currentTeam: "Napoli",
      currentTeamLogo: "https://img.a.transfermarkt.technology/portrait/header/6195-1599986556.png",
      photo: "https://img.a.transfermarkt.technology/portrait/header/537467-1671610580.jpg",
      marketValue: "€80M",
      marketValueAmount: 80,
      nationality: "Georgia",
      addedAt: "2025-03-01T10:20:00Z",
      userNotes: "Excellent dribbler, would be perfect on our left wing."
    }
  ],
  'liverpool': [
    {
      id: "w2",
      playerName: "Florian Wirtz",
      age: 22,
      position: "CAM",
      currentTeam: "Bayer Leverkusen",
      currentTeamLogo: "https://img.a.transfermarkt.technology/portrait/header/15-1623093035.png",
      photo: "https://img.a.transfermarkt.technology/portrait/header/521361-1696332660.jpg",
      marketValue: "€130M",
      marketValueAmount: 130,
      nationality: "Germany",
      addedAt: "2025-02-28T14:15:00Z"
    }
  ]
};

// Mock AI recommendations
export const mockAIRecommendations: Record<string, AIRecommendation[]> = {
  'man-united': [
    {
      id: "ai1",
      playerName: "Manuel Ugarte",
      playerId: "p201",
      age: 24,
      position: "CDM",
      currentTeam: "PSG",
      currentTeamLogo: "https://img.a.transfermarkt.technology/portrait/header/583-1599986567.png",
      photo: "https://img.a.transfermarkt.technology/portrait/header/669697-1694762724.jpg",
      nationality: "Uruguay",
      marketValue: "€55M",
      marketValueAmount: 55,
      recommendationReason: "Elite ball-winner with excellent positional awareness",
      keyStats: [
        { label: "Tackles per 90", value: "3.8", percentile: 94 },
        { label: "Interceptions per 90", value: "2.1", percentile: 88 },
        { label: "Pass completion", value: "91%", percentile: 85 }
      ],
      detailedReasoning: "Manuel Ugarte would provide the defensive solidity in midfield that Manchester United currently lacks. His exceptional ball-winning abilities and smart positioning would help shield the defense, while his underrated passing range would improve build-up play. At 24, he aligns with the club's strategy of signing players entering their prime years."
    },
    {
      id: "ai2",
      playerName: "Gonçalo Inácio",
      playerId: "p202",
      age: 23,
      position: "CB",
      currentTeam: "Sporting CP",
      currentTeamLogo: "https://img.a.transfermarkt.technology/portrait/header/2512-1601296665.png",
      photo: "https://img.a.transfermarkt.technology/portrait/header/400161-1606405967.jpg",
      nationality: "Portugal",
      marketValue: "€40M",
      marketValueAmount: 40,
      recommendationReason: "Ball-playing center-back with elite progressive passing",
      keyStats: [
        { label: "Progressive passes", value: "7.2", percentile: 92 },
        { label: "Aerial duels won", value: "68%", percentile: 78 },
        { label: "Tackle success", value: "74%", percentile: 80 }
      ],
      detailedReasoning: "Gonçalo Inácio represents the modern defender profile that Manchester United should target. His exceptional passing range and composure in build-up would transform how the team plays out from the back. While physically strong, his real value is in his technical quality and tactical intelligence. His experience in a high-pressing Sporting team makes him well-suited to the Premier League's intensity."
    }
  ],
  'liverpool': [
    {
      id: "ai3",
      playerName: "Martin Zubimendi",
      playerId: "p203",
      age: 25,
      position: "CDM",
      currentTeam: "Real Sociedad",
      currentTeamLogo: "https://img.a.transfermarkt.technology/portrait/header/680-1599986577.png",
      photo: "https://img.a.transfermarkt.technology/portrait/header/466777-1582624652.jpg",
      nationality: "Spain",
      marketValue: "€60M",
      marketValueAmount: 60,
      recommendationReason: "Press-resistant deep-lying playmaker with excellent vision",
      keyStats: [
        { label: "Pass accuracy", value: "93%", percentile: 96 },
        { label: "Progressive passes", value: "8.3", percentile: 91 },
        { label: "Pressure success rate", value: "32%", percentile: 84 }
      ],
      detailedReasoning: "Martin Zubimendi would be the ideal successor to Fabinho in Liverpool's midfield. His exceptional positioning, press resistance, and ability to dictate tempo from deep would complement Liverpool's existing midfield profiles. While not flashy, he's remarkably consistent and would provide the platform for Liverpool's more creative players to thrive."
    }
  ]
};

// Mock fan opinions
export const mockFanOpinions: Record<string, FanOpinion> = {
  'r1': {
    rumorId: "r1",
    valueRating: 4,
    fitRating: 5,
    comment: "We desperately need a center-back of his quality. Would be a great signing!",
    timestamp: "2025-03-25T08:45:00Z"
  },
  'r2': {
    rumorId: "r2",
    valueRating: 3,
    fitRating: 4,
    comment: "Good striker but not sure if he's worth €60M.",
    timestamp: "2025-03-22T14:30:00Z"
  }
};

// Helper functions to mimic API calls
export const getTransferRumorsForTeam = (teamId: string): TransferRumor[] => {
  return mockTransferRumors[teamId] || [];
};

export const getWantedPlayersForTeam = (teamId: string): PlayerWanted[] => {
  return mockWantedPlayers[teamId] || [];
};

export const getAIRecommendationsForTeam = (teamId: string): AIRecommendation[] => {
  return mockAIRecommendations[teamId] || [];
};

export const getFanOpinionForRumor = (rumorId: string): FanOpinion | null => {
  return mockFanOpinions[rumorId] || null;
};

export const saveFanOpinion = (opinion: FanOpinion): void => {
  if (opinion.rumorId) {
    mockFanOpinions[opinion.rumorId] = opinion;
  }
};

export const addWantedPlayer = (player: PlayerWanted): void => {
  // In a real app, this would make an API call
  const teamId = 'man-united'; // Default for demo
  if (!mockWantedPlayers[teamId]) {
    mockWantedPlayers[teamId] = [];
  }
  mockWantedPlayers[teamId].push(player);
};

export const removeWantedPlayer = (playerId: string): void => {
  // In a real app, this would make an API call
  const teamId = 'man-united'; // Default for demo
  if (mockWantedPlayers[teamId]) {
    mockWantedPlayers[teamId] = mockWantedPlayers[teamId].filter(
      player => player.id !== playerId
    );
  }
};
