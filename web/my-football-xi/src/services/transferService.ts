import { TransferRumor, FitTag, PlayerWanted, AIRecommendation, FanOpinion, KeyStat } from "../models/Transfer";

// Mock fit tags
export const fitTags: FitTag[] = [
  { id: "creative", label: "Creative", color: "bg-blue-100 text-blue-800" },
  { id: "depth", label: "Depth Signing", color: "bg-gray-100 text-gray-800" },
  { id: "first-team", label: "First Team", color: "bg-green-100 text-green-800" },
  { id: "young", label: "Young Talent", color: "bg-purple-100 text-purple-800" },
  { id: "experienced", label: "Experienced", color: "bg-amber-100 text-amber-800" },
  { id: "goal-scorer", label: "Goal Scorer", color: "bg-red-100 text-red-800" },
  { id: "playmaker", label: "Playmaker", color: "bg-indigo-100 text-indigo-800" },
  { id: "defensive", label: "Defensive", color: "bg-slate-100 text-slate-800" },
  { id: "target-man", label: "Target Man", color: "bg-orange-100 text-orange-800" },
];

// Mock transfer rumors
export const transferRumors: TransferRumor[] = [
  {
    id: "1",
    playerName: "Joshua Zirkzee",
    playerId: "zirkzee1",
    age: 23,
    position: "ST",
    currentTeam: "Bologna",
    currentTeamLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5b/Bologna_F.C._1909_logo.svg/150px-Bologna_F.C._1909_logo.svg.png",
    targetTeam: "Manchester United",
    photo: "https://img.uefa.com/imgml/TP/players/3/2023/324x324/250129220.jpg",
    reportedFee: "€40m",
    reportedFeeValue: 40,
    rummorSource: "Fabrizio Romano",
    dateReported: "2023-06-15",
    fitTags: [
      { id: "first-team", label: "First Team", color: "bg-green-100 text-green-800" },
      { id: "young", label: "Young Talent", color: "bg-purple-100 text-purple-800" },
      { id: "target-man", label: "Target Man", color: "bg-orange-100 text-orange-800" }
    ],
    status: "rumor"
  },
  {
    id: "2",
    playerName: "Matthijs de Ligt",
    playerId: "deligt1",
    age: 24,
    position: "CB",
    currentTeam: "Bayern Munich",
    currentTeamLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/150px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png",
    targetTeam: "Manchester United",
    photo: "https://img.uefa.com/imgml/TP/players/3/2022/324x324/250077968.jpg",
    reportedFee: "€65m",
    reportedFeeValue: 65,
    rummorSource: "The Athletic",
    dateReported: "2023-06-10",
    fitTags: [
      { id: "first-team", label: "First Team", color: "bg-green-100 text-green-800" },
      { id: "experienced", label: "Experienced", color: "bg-amber-100 text-amber-800" }
    ],
    status: "rumor"
  },
  {
    id: "3",
    playerName: "Jarrad Branthwaite",
    playerId: "branthwaite1",
    age: 21,
    position: "CB",
    currentTeam: "Everton",
    currentTeamLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Everton_FC_logo.svg/150px-Everton_FC_logo.svg.png",
    targetTeam: "Manchester United",
    photo: "https://resources.premierleague.com/premierleague/photos/players/250x250/p440323.png",
    reportedFee: "€75m",
    reportedFeeValue: 75,
    rummorSource: "The Guardian",
    dateReported: "2023-05-20",
    fitTags: [
      { id: "young", label: "Young Talent", color: "bg-purple-100 text-purple-800" },
      { id: "defensive", label: "Defensive", color: "bg-slate-100 text-slate-800" }
    ],
    status: "rumor"
  },
  {
    id: "4",
    playerName: "Jeremie Frimpong",
    playerId: "frimpong1",
    age: 23,
    position: "RB",
    currentTeam: "Bayer Leverkusen",
    currentTeamLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/59/Bayer_04_Leverkusen_logo.svg/150px-Bayer_04_Leverkusen_logo.svg.png",
    targetTeam: "Manchester United",
    photo: "https://img.bundesliga.com/tachyon/sites/2/2022/02/frimpong_jeremie_leverkusen_0-1.jpg",
    reportedFee: "€50m",
    reportedFeeValue: 50,
    rummorSource: "Sky Sports",
    dateReported: "2023-06-02",
    fitTags: [
      { id: "first-team", label: "First Team", color: "bg-green-100 text-green-800" },
      { id: "young", label: "Young Talent", color: "bg-purple-100 text-purple-800" },
      { id: "creative", label: "Creative", color: "bg-blue-100 text-blue-800" }
    ],
    status: "rumor"
  }
];

// Mock wanted players
export const wantedPlayers: PlayerWanted[] = [
  {
    id: "1",
    playerName: "Bruno Guimarães",
    age: 26,
    position: "CM",
    currentTeam: "Newcastle United",
    currentTeamLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Newcastle_United_Logo.svg/150px-Newcastle_United_Logo.svg.png",
    photo: "https://resources.premierleague.com/premierleague/photos/players/250x250/p243016.png",
    marketValue: "€85m",
    marketValueAmount: 85,
    nationality: "Brazil",
    addedAt: "2023-06-20",
    userNotes: "Would make a great Casemiro replacement."
  }
];

// Mock AI recommendations
export const aiRecommendations: AIRecommendation[] = [
  {
    id: "1",
    playerName: "Riccardo Calafiori",
    playerId: "calafiori1",
    age: 22,
    position: "CB",
    currentTeam: "Bologna",
    currentTeamLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5b/Bologna_F.C._1909_logo.svg/150px-Bologna_F.C._1909_logo.svg.png",
    photo: "https://img.a.transfermarkt.technology/portrait/header/335794-1675162565.jpg",
    nationality: "Italy",
    marketValue: "€25m",
    marketValueAmount: 25,
    recommendationReason: "Left-footed ball-playing defender",
    keyStats: [
      { label: "Pass Completion", value: "91.2%", percentile: 92 },
      { label: "Progressive Passes", value: "5.8 per 90", percentile: 85 },
      { label: "Aerial Duels Won", value: "65%", percentile: 72 }
    ],
    detailedReasoning: "Manchester United lacks a left-footed center-back who can progress the ball effectively. Calafiori ranks in the top 10% of Serie A defenders for progressive passes and would complement Lisandro Martínez as an alternative left-sided option. At 22, he has significant development potential and a reasonable market value."
  },
  {
    id: "2",
    playerName: "Khvicha Kvaratskhelia",
    playerId: "kvaratskhelia1",
    age: 23,
    position: "LW",
    currentTeam: "Napoli",
    currentTeamLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/SSC_Napoli_%28symbol%29.svg/150px-SSC_Napoli_%28symbol%29.svg.png",
    photo: "https://img.a.transfermarkt.technology/portrait/header/537256-1668165709.jpg",
    nationality: "Georgia",
    marketValue: "€80m",
    marketValueAmount: 80,
    recommendationReason: "Elite dribbler and creator from wide areas",
    keyStats: [
      { label: "Successful Dribbles", value: "3.2 per 90", percentile: 94 },
      { label: "xA (Expected Assists)", value: "0.32 per 90", percentile: 89 },
      { label: "Shot-Creating Actions", value: "6.1 per 90", percentile: 91 }
    ],
    detailedReasoning: "Manchester United's left wing has struggled for consistency with Rashford's form dipping. Kvaratskhelia would bring elite ball progression through dribbling and chance creation. His shot-creating actions rank among the highest in Europe, and he would offer a different profile from current wide options."
  },
  {
    id: "3",
    playerName: "Youssouf Fofana",
    playerId: "fofana1",
    age: 25,
    position: "CDM",
    currentTeam: "Monaco",
    currentTeamLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/AS_Monaco_FC.svg/150px-AS_Monaco_FC.svg.png",
    photo: "https://img.a.transfermarkt.technology/portrait/header/475661-1602849307.jpg",
    nationality: "France",
    marketValue: "€35m",
    marketValueAmount: 35,
    recommendationReason: "Physical, progressive midfielder for Casemiro succession",
    keyStats: [
      { label: "Tackles + Interceptions", value: "5.2 per 90", percentile: 82 },
      { label: "Progressive Carries", value: "3.1 per 90", percentile: 75 },
      { label: "Pass Completion", value: "88.5%", percentile: 80 }
    ],
    detailedReasoning: "With Casemiro aging and showing signs of decline, Fofana represents an ideal succession option. He combines defensive solidity with progressive play, offering greater mobility than the current options. At 25, he's entering his prime and would be available at a reasonable price point given his contract situation."
  }
];

// Mock fan opinions
export const fanOpinions: FanOpinion[] = [
  {
    id: "opinion1", // Added ID for backend compatibility
    rumorId: "1", // Joshua Zirkzee
    valueRating: 3, // Fair price
    fitRating: 4, // Good fit
    comment: "Would be a good addition to our forward line",
    timestamp: "2023-06-18T15:30:00Z"
  }
];

// API mock functions - these would connect to a .NET backend in production
export const getTransferRumorsForTeam = (teamId: string): TransferRumor[] => {
  // In a real app, this would filter by team ID
  return transferRumors;
};

// Get a specific transfer rumor by ID
export const getTransferRumorById = (rumorId: string): TransferRumor | null => {
  const rumor = transferRumors.find(r => r.id === rumorId);
  return rumor || null;
};

// Get wanted players for a team
export const getWantedPlayersForTeam = (teamId: string): PlayerWanted[] => {
  // In a real app, this would filter by team ID
  return wantedPlayers;
};

// Get AI recommendations for a team
export const getAIRecommendationsForTeam = (teamId: string): AIRecommendation[] => {
  // In a real app, this would generate recommendations based on team needs
  return aiRecommendations;
};

// Get fan opinion for a rumor
export const getFanOpinionForRumor = (rumorId: string): FanOpinion | undefined => {
  return fanOpinions.find(opinion => opinion.rumorId === rumorId);
};

// Save fan opinion - in a real app, this would be a POST to a .NET API endpoint
export const saveFanOpinion = (opinion: FanOpinion): void => {
  // Add an ID if this is a new opinion
  if (!opinion.id) {
    opinion.id = `opinion${Date.now()}`;
  }
  
  const existingIndex = fanOpinions.findIndex(
    o => o.id === opinion.id || (o.rumorId === opinion.rumorId) || (o.playerId === opinion.playerId)
  );
  
  if (existingIndex >= 0) {
    fanOpinions[existingIndex] = opinion;
  } else {
    fanOpinions.push(opinion);
  }
};

// Add wanted player - in a real app, this would be a POST to a .NET API endpoint
export const addWantedPlayer = (player: PlayerWanted): void => {
  // In a real app, this would save to a database
  wantedPlayers.push(player);
};

// Remove wanted player - in a real app, this would be a DELETE to a .NET API endpoint
export const removeWantedPlayer = (playerId: string): void => {
  // In a real app, this would remove from a database
  const index = wantedPlayers.findIndex(player => player.id === playerId);
  if (index >= 0) {
    wantedPlayers.splice(index, 1);
  }
};

// API utility functions for .NET backend integration

/**
 * Converts snake_case or kebab-case to camelCase for .NET to JS conversion
 */
export const toCamelCase = (str: string): string => {
  return str.replace(/[-_]([a-z])/g, (g) => g[1].toUpperCase());
}

/**
 * Processes API response from .NET backend to match frontend types
 */
export const processApiResponse = <T>(response: any): T => {
  // If response is an array, process each item
  if (Array.isArray(response)) {
    return response.map(item => processObjectKeys(item)) as unknown as T;
  }
  
  // If response is an object, process its keys
  return processObjectKeys(response) as T;
}

/**
 * Process object keys from .NET naming convention to JavaScript
 */
const processObjectKeys = (obj: any): any => {
  if (!obj || typeof obj !== 'object') return obj;
  
  const result: any = {};
  
  Object.keys(obj).forEach(key => {
    const camelKey = toCamelCase(key);
    const value = obj[key];
    
    // Recursively process nested objects
    if (value && typeof value === 'object') {
      if (Array.isArray(value)) {
        result[camelKey] = value.map(item => 
          typeof item === 'object' ? processObjectKeys(item) : item
        );
      } else {
        result[camelKey] = processObjectKeys(value);
      }
    } else {
      result[camelKey] = value;
    }
  });
  
  return result;
}
