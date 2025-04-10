
import { Player, Formation, FormationLayout, FormationPosition, PositionKey } from "../models/Player";

// Mock player data
export const players: Player[] = [
  {
    id: "1",
    name: "André Onana",
    position: "GK",
    number: 24,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p110398.png",
    salary: "£120,000/week",
    stats: {
      appearances: 32,
      goals: 0,
      assists: 0,
      cleanSheets: 9
    }
  },
  {
    id: "2",
    name: "Harry Maguire",
    position: "CB",
    number: 5,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p95658.png",
    salary: "£190,000/week",
    stats: {
      appearances: 18,
      goals: 1,
      assists: 0
    }
  },
  {
    id: "3",
    name: "Lisandro Martínez",
    position: "CB",
    number: 6,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p221820.png",
    salary: "£120,000/week",
    stats: {
      appearances: 11,
      goals: 0,
      assists: 0
    },
    status: {
      injured: true
    }
  },
  {
    id: "4",
    name: "Diogo Dalot",
    position: "RB",
    number: 20,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p216051.png",
    salary: "£85,000/week",
    stats: {
      appearances: 30,
      goals: 2,
      assists: 3
    }
  },
  {
    id: "5",
    name: "Luke Shaw",
    position: "LB",
    number: 23,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p106760.png",
    salary: "£150,000/week",
    stats: {
      appearances: 12,
      goals: 0,
      assists: 0
    },
    status: {
      injured: true
    }
  },
  {
    id: "6",
    name: "Bruno Fernandes",
    position: "CAM",
    number: 8,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p141746.png",
    salary: "£240,000/week",
    stats: {
      appearances: 31,
      goals: 8,
      assists: 7
    },
    status: {
      captain: true
    }
  },
  {
    id: "7",
    name: "Casemiro",
    position: "CDM",
    number: 18,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p61256.png",
    salary: "£350,000/week",
    stats: {
      appearances: 25,
      goals: 1,
      assists: 1
    }
  },
  {
    id: "8",
    name: "Kobbie Mainoo",
    position: "CM",
    number: 37,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p538916.png",
    salary: "£30,000/week",
    stats: {
      appearances: 21,
      goals: 3,
      assists: 0
    }
  },
  {
    id: "9",
    name: "Marcus Rashford",
    position: "LW",
    number: 10,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p176297.png",
    salary: "£300,000/week",
    stats: {
      appearances: 28,
      goals: 7,
      assists: 2
    }
  },
  {
    id: "10",
    name: "Rasmus Højlund",
    position: "ST",
    number: 11,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p493513.png",
    salary: "£85,000/week",
    stats: {
      appearances: 29,
      goals: 8,
      assists: 2
    }
  },
  {
    id: "11",
    name: "Alejandro Garnacho",
    position: "RW",
    number: 17,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p493538.png",
    salary: "£50,000/week",
    stats: {
      appearances: 33,
      goals: 7,
      assists: 4
    }
  },
  {
    id: "12",
    name: "Mason Mount",
    position: "CM",
    number: 7,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p184341.png",
    salary: "£250,000/week",
    stats: {
      appearances: 12,
      goals: 0,
      assists: 0
    },
    status: {
      injured: true
    }
  },
  {
    id: "13",
    name: "Aaron Wan-Bissaka",
    position: "RB",
    number: 29,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p214590.png",
    salary: "£90,000/week",
    stats: {
      appearances: 22,
      goals: 0,
      assists: 2
    }
  },
  {
    id: "14",
    name: "Tyrell Malacia",
    position: "LB",
    number: 12,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p222692.png",
    salary: "£75,000/week",
    stats: {
      appearances: 0,
      goals: 0,
      assists: 0
    },
    status: {
      injured: true
    }
  },
  {
    id: "15",
    name: "Christian Eriksen",
    position: "CM",
    number: 14,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p80607.png",
    salary: "£150,000/week",
    stats: {
      appearances: 25,
      goals: 1,
      assists: 2
    }
  },
  {
    id: "16",
    name: "Antony",
    position: "RW",
    number: 21,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p467169.png",
    salary: "£200,000/week",
    stats: {
      appearances: 24,
      goals: 0,
      assists: 1
    }
  },
  {
    id: "17",
    name: "Jonny Evans",
    position: "CB",
    number: 35,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p37914.png",
    salary: "£40,000/week",
    stats: {
      appearances: 20,
      goals: 0,
      assists: 0
    }
  },
  {
    id: "18",
    name: "Scott McTominay",
    position: "CM",
    number: 39,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p195851.png",
    salary: "£60,000/week",
    stats: {
      appearances: 26,
      goals: 7,
      assists: 0
    }
  }
];

// Formation positions
export const formations: Record<Formation, FormationLayout> = {
  "4-3-3": {
    name: "4-3-3",
    positions: [
      { id: "GK", label: "GK", x: 50, y: 90 },
      { id: "LB", label: "LB", x: 20, y: 70 },
      { id: "CB1", label: "CB", x: 40, y: 70 },
      { id: "CB2", label: "CB", x: 60, y: 70 },
      { id: "RB", label: "RB", x: 80, y: 70 },
      { id: "CM1", label: "CM", x: 30, y: 50 },
      { id: "CM2", label: "CM", x: 50, y: 40 },
      { id: "CM3", label: "CM", x: 70, y: 50 },
      { id: "LW", label: "LW", x: 20, y: 20 },
      { id: "ST", label: "ST", x: 50, y: 15 },
      { id: "RW", label: "RW", x: 80, y: 20 }
    ]
  },
  "4-4-2": {
    name: "4-4-2",
    positions: [
      { id: "GK", label: "GK", x: 50, y: 90 },
      { id: "LB", label: "LB", x: 20, y: 70 },
      { id: "CB1", label: "CB", x: 40, y: 70 },
      { id: "CB2", label: "CB", x: 60, y: 70 },
      { id: "RB", label: "RB", x: 80, y: 70 },
      { id: "LM", label: "LM", x: 20, y: 45 },
      { id: "CM1", label: "CM", x: 40, y: 45 },
      { id: "CM2", label: "CM", x: 60, y: 45 },
      { id: "RM", label: "RM", x: 80, y: 45 },
      { id: "ST1", label: "ST", x: 40, y: 20 },
      { id: "ST2", label: "ST", x: 60, y: 20 }
    ]
  },
  "3-5-2": {
    name: "3-5-2",
    positions: [
      { id: "GK", label: "GK", x: 50, y: 90 },
      { id: "CB1", label: "CB", x: 30, y: 70 },
      { id: "CB2", label: "CB", x: 50, y: 70 },
      { id: "CB3", label: "CB", x: 70, y: 70 },
      { id: "LWB", label: "LWB", x: 15, y: 55 },
      { id: "CM1", label: "CM", x: 35, y: 45 },
      { id: "CM2", label: "CM", x: 50, y: 50 },
      { id: "CM3", label: "CM", x: 65, y: 45 },
      { id: "RWB", label: "RWB", x: 85, y: 55 },
      { id: "ST1", label: "ST", x: 40, y: 20 },
      { id: "ST2", label: "ST", x: 60, y: 20 }
    ]
  },
  "4-2-3-1": {
    name: "4-2-3-1",
    positions: [
      { id: "GK", label: "GK", x: 50, y: 90 },
      { id: "LB", label: "LB", x: 20, y: 70 },
      { id: "CB1", label: "CB", x: 40, y: 70 },
      { id: "CB2", label: "CB", x: 60, y: 70 },
      { id: "RB", label: "RB", x: 80, y: 70 },
      { id: "CDM1", label: "CDM", x: 40, y: 55 },
      { id: "CDM2", label: "CDM", x: 60, y: 55 },
      { id: "LM", label: "LM", x: 20, y: 35 },
      { id: "CAM", label: "CAM", x: 50, y: 35 },
      { id: "RM", label: "RM", x: 80, y: 35 },
      { id: "ST", label: "ST", x: 50, y: 15 }
    ]
  },
  "5-3-2": {
    name: "5-3-2",
    positions: [
      { id: "GK", label: "GK", x: 50, y: 90 },
      { id: "LWB", label: "LWB", x: 15, y: 65 },
      { id: "CB1", label: "CB", x: 30, y: 75 },
      { id: "CB2", label: "CB", x: 50, y: 80 },
      { id: "CB3", label: "CB", x: 70, y: 75 },
      { id: "RWB", label: "RWB", x: 85, y: 65 },
      { id: "CM1", label: "CM", x: 30, y: 45 },
      { id: "CM2", label: "CM", x: 50, y: 45 },
      { id: "CM3", label: "CM", x: 70, y: 45 },
      { id: "ST1", label: "ST", x: 40, y: 20 },
      { id: "ST2", label: "ST", x: 60, y: 20 }
    ]
  },
  "3-4-3": {
    name: "3-4-3",
    positions: [
      { id: "GK", label: "GK", x: 50, y: 90 },
      { id: "CB1", label: "CB", x: 30, y: 75 },
      { id: "CB2", label: "CB", x: 50, y: 75 },
      { id: "CB3", label: "CB", x: 70, y: 75 },
      { id: "LM", label: "LM", x: 20, y: 55 },
      { id: "CM1", label: "CM", x: 40, y: 55 },
      { id: "CM2", label: "CM", x: 60, y: 55 },
      { id: "RM", label: "RM", x: 80, y: 55 },
      { id: "LW", label: "LW", x: 25, y: 25 },
      { id: "ST", label: "ST", x: 50, y: 20 },
      { id: "RW", label: "RW", x: 75, y: 25 }
    ]
  },
  "4-5-1": {
    name: "4-5-1",
    positions: [
      { id: "GK", label: "GK", x: 50, y: 90 },
      { id: "LB", label: "LB", x: 20, y: 70 },
      { id: "CB1", label: "CB", x: 40, y: 70 },
      { id: "CB2", label: "CB", x: 60, y: 70 },
      { id: "RB", label: "RB", x: 80, y: 70 },
      { id: "LM", label: "LM", x: 15, y: 45 },
      { id: "CM1", label: "CM", x: 35, y: 45 },
      { id: "CM2", label: "CM", x: 50, y: 40 },
      { id: "CM3", label: "CM", x: 65, y: 45 },
      { id: "RM", label: "RM", x: 85, y: 45 },
      { id: "ST", label: "ST", x: 50, y: 15 }
    ]
  },
  "4-1-4-1": {
    name: "4-1-4-1",
    positions: [
      { id: "GK", label: "GK", x: 50, y: 90 },
      { id: "LB", label: "LB", x: 20, y: 70 },
      { id: "CB1", label: "CB", x: 40, y: 70 },
      { id: "CB2", label: "CB", x: 60, y: 70 },
      { id: "RB", label: "RB", x: 80, y: 70 },
      { id: "CDM", label: "CDM", x: 50, y: 55 },
      { id: "LM", label: "LM", x: 20, y: 40 },
      { id: "CM1", label: "CM", x: 40, y: 40 },
      { id: "CM2", label: "CM", x: 60, y: 40 },
      { id: "RM", label: "RM", x: 80, y: 40 },
      { id: "ST", label: "ST", x: 50, y: 15 }
    ]
  },
  "4-4-1-1": {
    name: "4-4-1-1",
    positions: [
      { id: "GK", label: "GK", x: 50, y: 90 },
      { id: "LB", label: "LB", x: 20, y: 70 },
      { id: "CB1", label: "CB", x: 40, y: 70 },
      { id: "CB2", label: "CB", x: 60, y: 70 },
      { id: "RB", label: "RB", x: 80, y: 70 },
      { id: "LM", label: "LM", x: 20, y: 50 },
      { id: "CM1", label: "CM", x: 40, y: 50 },
      { id: "CM2", label: "CM", x: 60, y: 50 },
      { id: "RM", label: "RM", x: 80, y: 50 },
      { id: "CF", label: "CF", x: 50, y: 30 },
      { id: "ST", label: "ST", x: 50, y: 15 }
    ]
  },
  "3-6-1": {
    name: "3-6-1",
    positions: [
      { id: "GK", label: "GK", x: 50, y: 90 },
      { id: "CB1", label: "CB", x: 30, y: 75 },
      { id: "CB2", label: "CB", x: 50, y: 75 },
      { id: "CB3", label: "CB", x: 70, y: 75 },
      { id: "LWB", label: "LWB", x: 15, y: 55 },
      { id: "CM1", label: "CM", x: 30, y: 45 },
      { id: "CM2", label: "CM", x: 43, y: 55 },
      { id: "CM3", label: "CM", x: 57, y: 55 },
      { id: "CM4", label: "CM", x: 70, y: 45 },
      { id: "RWB", label: "RWB", x: 85, y: 55 },
      { id: "ST", label: "ST", x: 50, y: 15 }
    ]
  }
};

// Default starting XI
export const defaultStartingXI: Player[] = players.slice(0, 11);

// Default bench
export const defaultBench: Player[] = players.slice(11);

// Get real XI - would usually come from an API
export const getRealXI = (): Player[] => {
  return defaultStartingXI;
};

// Get formation positions
export const getFormationPositions = (formation: Formation): FormationPosition[] => {
  return formations[formation].positions;
};

// Get available tags for players
export const getPlayerTags = (): { id: string; label: string; color: string }[] => {
  return [
    { id: "keep", label: "Keep", color: "bg-green-100 text-green-800" },
    { id: "sell", label: "Sell", color: "bg-red-100 text-red-800" },
    { id: "loan", label: "Loan", color: "bg-blue-100 text-blue-800" },
    { id: "promote", label: "Promote", color: "bg-purple-100 text-purple-800" },
    { id: "bench", label: "Bench", color: "bg-yellow-100 text-yellow-800" }
  ];
};
