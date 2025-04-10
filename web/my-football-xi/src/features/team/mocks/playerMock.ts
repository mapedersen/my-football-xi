
import { Player, FormationLayout, Formation, FormationPosition } from '../types/index';

// Mock players data
export const mockPlayers: Player[] = [
  {
    id: "1",
    name: "André Onana",
    position: "GK",
    number: 24,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p231432.png",
    salary: "£120,000/week",
    stats: {
      appearances: 28,
      goals: 0,
      assists: 2,
      cleanSheets: 8
    },
    status: {
      injured: false
    }
  },
  {
    id: "2",
    name: "Diogo Dalot",
    position: "RB",
    number: 20,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p216051.png",
    salary: "£100,000/week",
    stats: {
      appearances: 30,
      goals: 1,
      assists: 3
    }
  },
  {
    id: "3",
    name: "Lisandro Martínez",
    position: "CB",
    number: 6,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p221820.png",
    salary: "£150,000/week",
    stats: {
      appearances: 18,
      goals: 0,
      assists: 1
    },
    status: {
      injured: true
    }
  },
  {
    id: "4",
    name: "Harry Maguire",
    position: "CB",
    number: 5,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p95658.png",
    salary: "£190,000/week",
    stats: {
      appearances: 22,
      goals: 2,
      assists: 0
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
      appearances: 15,
      goals: 0,
      assists: 2
    },
    status: {
      injured: true
    }
  },
  {
    id: "6",
    name: "Casemiro",
    position: "CDM",
    number: 18,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p61256.png",
    salary: "£350,000/week",
    stats: {
      appearances: 25,
      goals: 3,
      assists: 1
    },
    valueForMoney: -1,
    tags: [
      { id: "tag1", label: "Declining", color: "bg-amber-100 text-amber-800" }
    ]
  },
  {
    id: "7",
    name: "Kobbie Mainoo",
    position: "CM",
    number: 37,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p465527.png",
    salary: "£30,000/week",
    stats: {
      appearances: 20,
      goals: 3,
      assists: 1
    },
    valueForMoney: 2,
    tags: [
      { id: "tag2", label: "Rising Star", color: "bg-green-100 text-green-800" }
    ]
  },
  {
    id: "8",
    name: "Bruno Fernandes",
    position: "CAM",
    number: 8,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p141746.png",
    salary: "£240,000/week",
    stats: {
      appearances: 32,
      goals: 8,
      assists: 10
    },
    status: {
      captain: true
    },
    valueForMoney: 1
  },
  {
    id: "9",
    name: "Marcus Rashford",
    position: "LW",
    number: 10,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p176297.png",
    salary: "£300,000/week",
    stats: {
      appearances: 30,
      goals: 7,
      assists: 3
    },
    valueForMoney: -1
  },
  {
    id: "10",
    name: "Rasmus Højlund",
    position: "ST",
    number: 11,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p450070.png",
    salary: "£85,000/week",
    stats: {
      appearances: 28,
      goals: 13,
      assists: 2
    },
    valueForMoney: 1,
    tags: [
      { id: "tag3", label: "Developing", color: "bg-blue-100 text-blue-800" }
    ]
  },
  {
    id: "11",
    name: "Alejandro Garnacho",
    position: "RW",
    number: 17,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p447711.png",
    salary: "£50,000/week",
    stats: {
      appearances: 29,
      goals: 8,
      assists: 5
    },
    valueForMoney: 2,
    tags: [
      { id: "tag4", label: "Rising Star", color: "bg-green-100 text-green-800" }
    ]
  },
  // Bench players
  {
    id: "12",
    name: "Tyrell Malacia",
    position: "LB",
    number: 12,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p222690.png",
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
    id: "13",
    name: "Mason Mount",
    position: "CAM",
    number: 7,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p184341.png",
    salary: "£250,000/week",
    stats: {
      appearances: 12,
      goals: 1,
      assists: 2
    },
    status: {
      injured: true
    },
    valueForMoney: -2
  },
  {
    id: "14",
    name: "Antony",
    position: "RW",
    number: 21,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p467169.png",
    salary: "£200,000/week",
    stats: {
      appearances: 22,
      goals: 1,
      assists: 2
    },
    valueForMoney: -2,
    tags: [
      { id: "tag5", label: "Underperforming", color: "bg-red-100 text-red-800" }
    ]
  },
  {
    id: "15",
    name: "Jonny Evans",
    position: "CB",
    number: 35,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p18093.png",
    salary: "£65,000/week",
    stats: {
      appearances: 20,
      goals: 0,
      assists: 1
    },
    valueForMoney: 0
  },
  {
    id: "16",
    name: "Scott McTominay",
    position: "CM",
    number: 39,
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p195851.png",
    salary: "£100,000/week",
    stats: {
      appearances: 28,
      goals: 7,
      assists: 0
    },
    valueForMoney: 1
  }
];

// Export a function to get all players (this was missing)
export const getAllPlayers = (): Player[] => {
  return mockPlayers;
};

// Default lineups
export const defaultStartingXI: Player[] = mockPlayers.slice(0, 11);
export const defaultBench: Player[] = mockPlayers.slice(11);

// Formation positions
export const formationPositions: Record<Formation, FormationPosition[]> = {
  "4-3-3": [
    { id: "GK", label: "GK", x: 50, y: 90 },
    { id: "LB", label: "LB", x: 20, y: 70 },
    { id: "CB1", label: "CB", x: 35, y: 70 },
    { id: "CB2", label: "CB", x: 65, y: 70 },
    { id: "RB", label: "RB", x: 80, y: 70 },
    { id: "CM1", label: "CM", x: 30, y: 50 },
    { id: "CM2", label: "CM", x: 50, y: 40 },
    { id: "CM3", label: "CM", x: 70, y: 50 },
    { id: "LW", label: "LW", x: 25, y: 25 },
    { id: "ST", label: "ST", x: 50, y: 20 },
    { id: "RW", label: "RW", x: 75, y: 25 }
  ],
  "4-4-2": [
    { id: "GK", label: "GK", x: 50, y: 90 },
    { id: "LB", label: "LB", x: 20, y: 70 },
    { id: "CB1", label: "CB", x: 35, y: 70 },
    { id: "CB2", label: "CB", x: 65, y: 70 },
    { id: "RB", label: "RB", x: 80, y: 70 },
    { id: "LM", label: "LM", x: 20, y: 50 },
    { id: "CM1", label: "CM", x: 40, y: 50 },
    { id: "CM2", label: "CM", x: 60, y: 50 },
    { id: "RM", label: "RM", x: 80, y: 50 },
    { id: "ST1", label: "ST", x: 40, y: 25 },
    { id: "ST2", label: "ST", x: 60, y: 25 }
  ],
  "3-5-2": [
    { id: "GK", label: "GK", x: 50, y: 90 },
    { id: "CB1", label: "CB", x: 30, y: 70 },
    { id: "CB2", label: "CB", x: 50, y: 70 },
    { id: "CB3", label: "CB", x: 70, y: 70 },
    { id: "LWB", label: "LWB", x: 15, y: 55 },
    { id: "CM1", label: "CM", x: 30, y: 45 },
    { id: "CM2", label: "CM", x: 50, y: 50 },
    { id: "CM3", label: "CM", x: 70, y: 45 },
    { id: "RWB", label: "RWB", x: 85, y: 55 },
    { id: "ST1", label: "ST", x: 40, y: 25 },
    { id: "ST2", label: "ST", x: 60, y: 25 }
  ],
  "4-2-3-1": [
    { id: "GK", label: "GK", x: 50, y: 90 },
    { id: "LB", label: "LB", x: 20, y: 70 },
    { id: "CB1", label: "CB", x: 35, y: 70 },
    { id: "CB2", label: "CB", x: 65, y: 70 },
    { id: "RB", label: "RB", x: 80, y: 70 },
    { id: "CDM1", label: "CDM", x: 40, y: 55 },
    { id: "CDM2", label: "CDM", x: 60, y: 55 },
    { id: "LW", label: "LW", x: 25, y: 35 },
    { id: "CAM", label: "CAM", x: 50, y: 35 },
    { id: "RW", label: "RW", x: 75, y: 35 },
    { id: "ST", label: "ST", x: 50, y: 20 }
  ],
  "5-3-2": [
    { id: "GK", label: "GK", x: 50, y: 90 },
    { id: "LWB", label: "LWB", x: 15, y: 70 },
    { id: "CB1", label: "CB", x: 30, y: 75 },
    { id: "CB2", label: "CB", x: 50, y: 75 },
    { id: "CB3", label: "CB", x: 70, y: 75 },
    { id: "RWB", label: "RWB", x: 85, y: 70 },
    { id: "CM1", label: "CM", x: 30, y: 50 },
    { id: "CM2", label: "CM", x: 50, y: 45 },
    { id: "CM3", label: "CM", x: 70, y: 50 },
    { id: "ST1", label: "ST", x: 40, y: 25 },
    { id: "ST2", label: "ST", x: 60, y: 25 }
  ],
  "3-4-3": [
    { id: "GK", label: "GK", x: 50, y: 90 },
    { id: "CB1", label: "CB", x: 30, y: 75 },
    { id: "CB2", label: "CB", x: 50, y: 75 },
    { id: "CB3", label: "CB", x: 70, y: 75 },
    { id: "LM", label: "LM", x: 20, y: 55 },
    { id: "CM1", label: "CM", x: 40, y: 55 },
    { id: "CM2", label: "CM", x: 60, y: 55 },
    { id: "RM", label: "RM", x: 80, y: 55 },
    { id: "LW", label: "LW", x: 25, y: 30 },
    { id: "CF", label: "CF", x: 50, y: 30 },
    { id: "RW", label: "RW", x: 75, y: 30 }
  ],
  "4-5-1": [
    { id: "GK", label: "GK", x: 50, y: 90 },
    { id: "LB", label: "LB", x: 20, y: 70 },
    { id: "CB1", label: "CB", x: 35, y: 70 },
    { id: "CB2", label: "CB", x: 65, y: 70 },
    { id: "RB", label: "RB", x: 80, y: 70 },
    { id: "LM", label: "LM", x: 20, y: 50 },
    { id: "CM1", label: "CM", x: 35, y: 50 },
    { id: "CM2", label: "CM", x: 50, y: 45 },
    { id: "CM3", label: "CM", x: 65, y: 50 },
    { id: "RM", label: "RM", x: 80, y: 50 },
    { id: "ST", label: "ST", x: 50, y: 25 }
  ],
  "4-1-4-1": [
    { id: "GK", label: "GK", x: 50, y: 90 },
    { id: "LB", label: "LB", x: 20, y: 70 },
    { id: "CB1", label: "CB", x: 35, y: 70 },
    { id: "CB2", label: "CB", x: 65, y: 70 },
    { id: "RB", label: "RB", x: 80, y: 70 },
    { id: "CDM", label: "CDM", x: 50, y: 60 },
    { id: "LM", label: "LM", x: 20, y: 45 },
    { id: "CM1", label: "CM", x: 40, y: 45 },
    { id: "CM2", label: "CM", x: 60, y: 45 },
    { id: "RM", label: "RM", x: 80, y: 45 },
    { id: "ST", label: "ST", x: 50, y: 25 }
  ],
  "4-4-1-1": [
    { id: "GK", label: "GK", x: 50, y: 90 },
    { id: "LB", label: "LB", x: 20, y: 70 },
    { id: "CB1", label: "CB", x: 35, y: 70 },
    { id: "CB2", label: "CB", x: 65, y: 70 },
    { id: "RB", label: "RB", x: 80, y: 70 },
    { id: "LM", label: "LM", x: 20, y: 50 },
    { id: "CM1", label: "CM", x: 40, y: 50 },
    { id: "CM2", label: "CM", x: 60, y: 50 },
    { id: "RM", label: "RM", x: 80, y: 50 },
    { id: "CAM", label: "CAM", x: 50, y: 35 },
    { id: "ST", label: "ST", x: 50, y: 20 }
  ],
  "3-6-1": [
    { id: "GK", label: "GK", x: 50, y: 90 },
    { id: "CB1", label: "CB", x: 30, y: 75 },
    { id: "CB2", label: "CB", x: 50, y: 75 },
    { id: "CB3", label: "CB", x: 70, y: 75 },
    { id: "LWB", label: "LWB", x: 15, y: 60 },
    { id: "CM1", label: "CM", x: 30, y: 55 },
    { id: "CM2", label: "CM", x: 50, y: 60 },
    { id: "CM3", label: "CM", x: 70, y: 55 },
    { id: "RWB", label: "RWB", x: 85, y: 60 },
    { id: "CM4", label: "CAM", x: 50, y: 40 },
    { id: "ST", label: "ST", x: 50, y: 25 }
  ]
};

// Formation layout objects for all formations
export const formationLayouts: Record<Formation, FormationLayout> = {
  "4-3-3": { name: "4-3-3", positions: formationPositions["4-3-3"] },
  "4-4-2": { name: "4-4-2", positions: formationPositions["4-4-2"] },
  "3-5-2": { name: "3-5-2", positions: formationPositions["3-5-2"] },
  "4-2-3-1": { name: "4-2-3-1", positions: formationPositions["4-2-3-1"] },
  "5-3-2": { name: "5-3-2", positions: formationPositions["5-3-2"] },
  "3-4-3": { name: "3-4-3", positions: formationPositions["3-4-3"] },
  "4-5-1": { name: "4-5-1", positions: formationPositions["4-5-1"] },
  "4-1-4-1": { name: "4-1-4-1", positions: formationPositions["4-1-4-1"] },
  "4-4-1-1": { name: "4-4-1-1", positions: formationPositions["4-4-1-1"] },
  "3-6-1": { name: "3-6-1", positions: formationPositions["3-6-1"] }
};

// Helper function to get positions for a specific formation
export const getFormationPositions = (formation: Formation): FormationPosition[] => {
  return formationPositions[formation] || formationPositions["4-3-3"];
};
