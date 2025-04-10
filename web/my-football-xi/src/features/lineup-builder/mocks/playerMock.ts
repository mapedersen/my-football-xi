
import { Player, Formation, PositionCoordinate } from '../types';

export const getStartingXI = (): Player[] => [
  {
    id: "p1",
    name: "André Onana",
    number: 24,
    position: "GK",
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p231432.png",
    salary: "£120,000/week",
    nationality: "Cameroon",
    status: {
      injured: false,
    },
    stats: {
      appearances: 34,
      goals: 0,
      assists: 0,
      clean_sheets: 8,
      yellow_cards: 2,
      red_cards: 0
    },
    valueForMoney: 0
  },
  {
    id: "p2",
    name: "Diogo Dalot",
    number: 20,
    position: "RB",
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p216051.png",
    salary: "£85,000/week",
    nationality: "Portugal",
    stats: {
      appearances: 36,
      goals: 1,
      assists: 4,
      yellow_cards: 6,
      red_cards: 0
    },
    valueForMoney: 1
  },
  {
    id: "p3",
    name: "Raphaël Varane",
    number: 19,
    position: "CB",
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p103763.png",
    salary: "£340,000/week",
    nationality: "France",
    status: {
      injured: false,
    },
    stats: {
      appearances: 22,
      goals: 0,
      assists: 0,
      clean_sheets: 6,
      yellow_cards: 2,
      red_cards: 0
    },
    valueForMoney: -1
  },
  {
    id: "p4",
    name: "Lisandro Martínez",
    number: 6,
    position: "CB",
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p221820.png",
    salary: "£120,000/week",
    nationality: "Argentina",
    status: {
      injured: true,
    },
    stats: {
      appearances: 23,
      goals: 0,
      assists: 0,
      clean_sheets: 9,
      yellow_cards: 5,
      red_cards: 0
    },
    valueForMoney: 2
  },
  {
    id: "p5",
    name: "Luke Shaw",
    number: 23,
    position: "LB",
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p106760.png",
    salary: "£150,000/week",
    nationality: "England",
    status: {
      injured: false,
    },
    stats: {
      appearances: 27,
      goals: 1,
      assists: 2,
      clean_sheets: 8,
      yellow_cards: 3,
      red_cards: 0
    },
    valueForMoney: 1
  },
  {
    id: "p6",
    name: "Casemiro",
    number: 18,
    position: "CDM",
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p61256.png",
    salary: "£350,000/week",
    nationality: "Brazil",
    status: {
      injured: false,
    },
    stats: {
      appearances: 26,
      goals: 4,
      assists: 2,
      yellow_cards: 8,
      red_cards: 1
    },
    valueForMoney: -2
  },
  {
    id: "p7",
    name: "Kobbie Mainoo",
    number: 37,
    position: "CM",
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p465527.png",
    salary: "£20,000/week",
    nationality: "England",
    status: {
      injured: false,
    },
    stats: {
      appearances: 20,
      goals: 3,
      assists: 1,
      yellow_cards: 2,
      red_cards: 0
    },
    valueForMoney: 5
  },
  {
    id: "p8",
    name: "Bruno Fernandes",
    number: 8,
    position: "CAM",
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p141746.png",
    salary: "£240,000/week",
    nationality: "Portugal",
    status: {
      injured: false,
      captain: true
    },
    stats: {
      appearances: 35,
      goals: 10,
      assists: 8,
      yellow_cards: 6,
      red_cards: 0
    },
    valueForMoney: 2
  },
  {
    id: "p9",
    name: "Marcus Rashford",
    number: 10,
    position: "LW",
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p176297.png",
    salary: "£300,000/week",
    nationality: "England",
    status: {
      injured: false,
    },
    stats: {
      appearances: 33,
      goals: 8,
      assists: 5,
      yellow_cards: 3,
      red_cards: 0
    },
    valueForMoney: -1
  },
  {
    id: "p10",
    name: "Alejandro Garnacho",
    number: 17,
    position: "RW",
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p447711.png",
    salary: "£50,000/week",
    nationality: "Argentina",
    status: {
      injured: false,
    },
    stats: {
      appearances: 30,
      goals: 7,
      assists: 4,
      yellow_cards: 4,
      red_cards: 0
    },
    valueForMoney: 4
  },
  {
    id: "p11",
    name: "Rasmus Højlund",
    number: 11,
    position: "ST",
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p450070.png",
    salary: "£85,000/week",
    nationality: "Denmark",
    status: {
      injured: false,
    },
    stats: {
      appearances: 30,
      goals: 14,
      assists: 2,
      yellow_cards: 1,
      red_cards: 0
    },
    valueForMoney: 3
  }
];

export const getBench = (): Player[] => [
  {
    id: "p12",
    name: "Altay Bayındır",
    number: 1,
    position: "GK",
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p244120.png",
    salary: "£35,000/week",
    nationality: "Turkey",
    stats: {
      appearances: 0,
      goals: 0,
      assists: 0,
      clean_sheets: 0,
      yellow_cards: 0,
      red_cards: 0
    },
    valueForMoney: -1
  },
  {
    id: "p13",
    name: "Victor Lindelöf",
    number: 2,
    position: "CB",
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p184667.png",
    salary: "£120,000/week",
    nationality: "Sweden",
    stats: {
      appearances: 20,
      goals: 1,
      assists: 0,
      clean_sheets: 5,
      yellow_cards: 2,
      red_cards: 0
    },
    valueForMoney: 0
  },
  {
    id: "p14",
    name: "Harry Maguire",
    number: 5,
    position: "CB",
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p95658.png",
    salary: "£190,000/week",
    nationality: "England",
    status: {
      injured: false,
    },
    stats: {
      appearances: 24,
      goals: 2,
      assists: 1,
      clean_sheets: 7,
      yellow_cards: 3,
      red_cards: 0
    },
    valueForMoney: 0
  },
  {
    id: "p15",
    name: "Christian Eriksen",
    number: 14,
    position: "CM",
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p80607.png",
    salary: "£150,000/week",
    nationality: "Denmark",
    stats: {
      appearances: 23,
      goals: 1,
      assists: 2,
      yellow_cards: 1,
      red_cards: 0
    },
    valueForMoney: -1
  },
  {
    id: "p16",
    name: "Scott McTominay",
    number: 39,
    position: "CM",
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p195851.png",
    salary: "£60,000/week",
    nationality: "Scotland",
    stats: {
      appearances: 32,
      goals: 10,
      assists: 1,
      yellow_cards: 7,
      red_cards: 0
    },
    valueForMoney: 3
  },
  {
    id: "p17",
    name: "Anthony Martial",
    number: 9,
    position: "ST",
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p148225.png",
    salary: "£250,000/week",
    nationality: "France",
    status: {
      injured: true,
    },
    stats: {
      appearances: 13,
      goals: 1,
      assists: 1,
      yellow_cards: 0,
      red_cards: 0
    },
    valueForMoney: -3
  },
  {
    id: "p18",
    name: "Antony",
    number: 21,
    position: "RW",
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p467169.png",
    salary: "£200,000/week",
    nationality: "Brazil",
    stats: {
      appearances: 29,
      goals: 3,
      assists: 2,
      yellow_cards: 2,
      red_cards: 0
    },
     valueForMoney: -2
  }
];

export const getAllPlayers = (): Player[] => {
  return [...getStartingXI(), ...getBench()];
};

export const getFormationPositions = (formation: Formation): PositionCoordinate[] => {
  switch (formation) {
    case "4-3-3":
      return [
        { id: "p1", x: 50, y: 90, role: "GK" },
        { id: "p2", x: 20, y: 70, role: "RB" },
        { id: "p3", x: 35, y: 70, role: "CB" },
        { id: "p4", x: 65, y: 70, role: "CB" },
        { id: "p5", x: 80, y: 70, role: "LB" },
        { id: "p6", x: 35, y: 50, role: "CM" },
        { id: "p7", x: 50, y: 50, role: "CM" },
        { id: "p8", x: 65, y: 50, role: "CM" },
        { id: "p9", x: 20, y: 30, role: "RW" },
        { id: "p10", x: 50, y: 30, role: "ST" },
        { id: "p11", x: 80, y: 30, role: "LW" }
      ];
    case "4-4-2":
      return [
        { id: "p1", x: 50, y: 90, role: "GK" },
        { id: "p2", x: 20, y: 70, role: "RB" },
        { id: "p3", x: 35, y: 70, role: "CB" },
        { id: "p4", x: 65, y: 70, role: "CB" },
        { id: "p5", x: 80, y: 70, role: "LB" },
        { id: "p6", x: 20, y: 50, role: "RM" },
        { id: "p7", x: 40, y: 50, role: "CM" },
        { id: "p8", x: 60, y: 50, role: "CM" },
        { id: "p9", x: 80, y: 50, role: "LM" },
        { id: "p10", x: 35, y: 30, role: "ST" },
        { id: "p11", x: 65, y: 30, role: "ST" }
      ];
    case "3-5-2":
      return [
        { id: "p1", x: 50, y: 90, role: "GK" },
        { id: "p2", x: 30, y: 70, role: "CB" },
        { id: "p3", x: 50, y: 70, role: "CB" },
        { id: "p4", x: 70, y: 70, role: "CB" },
        { id: "p5", x: 15, y: 50, role: "LWB" },
        { id: "p6", x: 35, y: 50, role: "CM" },
        { id: "p7", x: 50, y: 50, role: "CM" },
        { id: "p8", x: 65, y: 50, role: "CM" },
        { id: "p9", x: 85, y: 50, role: "RWB" },
        { id: "p10", x: 35, y: 30, role: "ST" },
        { id: "p11", x: 65, y: 30, role: "ST" }
      ];
    case "4-2-3-1":
      return [
        { id: "p1", x: 50, y: 90, role: "GK" },
        { id: "p2", x: 20, y: 70, role: "RB" },
        { id: "p3", x: 35, y: 70, role: "CB" },
        { id: "p4", x: 65, y: 70, role: "CB" },
        { id: "p5", x: 80, y: 70, role: "LB" },
        { id: "p6", x: 40, y: 50, role: "CDM" },
        { id: "p7", x: 60, y: 50, role: "CDM" },
        { id: "p8", x: 20, y: 30, role: "LW" },
        { id: "p9", x: 50, y: 30, role: "CAM" },
        { id: "p10", x: 80, y: 30, role: "RW" },
        { id: "p11", x: 50, y: 10, role: "ST" }
      ];
    case "5-3-2":
      return [
        { id: "p1", x: 50, y: 90, role: "GK" },
        { id: "p2", x: 10, y: 70, role: "LWB" },
        { id: "p3", x: 30, y: 70, role: "CB" },
        { id: "p4", x: 50, y: 70, role: "CB" },
        { id: "p5", x: 70, y: 70, role: "CB" },
        { id: "p6", x: 90, y: 70, role: "RWB" },
        { id: "p7", x: 35, y: 50, role: "CM" },
        { id: "p8", x: 50, y: 50, role: "CM" },
        { id: "p9", x: 65, y: 50, role: "CM" },
        { id: "p10", x: 35, y: 30, role: "ST" },
        { id: "p11", x: 65, y: 30, role: "ST" }
      ];
    case "3-4-3":
      return [
        { id: "p1", x: 50, y: 90, role: "GK" },
        { id: "p2", x: 30, y: 70, role: "CB" },
        { id: "p3", x: 50, y: 70, role: "CB" },
        { id: "p4", x: 70, y: 70, role: "CB" },
        { id: "p5", x: 30, y: 50, role: "CM" },
        { id: "p6", x: 70, y: 50, role: "CM" },
        { id: "p7", x: 10, y: 30, role: "LW" },
        { id: "p8", x: 50, y: 30, role: "ST" },
        { id: "p9", x: 90, y: 30, role: "RW" },
        { id: "p10", x: 50, y: 50, role: "CDM" },
        { id: "p11", x: 50, y: 10, role: "CAM" }
      ];
    case "4-5-1":
      return [
        { id: "p1", x: 50, y: 90, role: "GK" },
        { id: "p2", x: 20, y: 70, role: "RB" },
        { id: "p3", x: 35, y: 70, role: "CB" },
        { id: "p4", x: 65, y: 70, role: "CB" },
        { id: "p5", x: 80, y: 70, role: "LB" },
        { id: "p6", x: 20, y: 50, role: "LM" },
        { id: "p7", x: 40, y: 50, role: "CM" },
        { id: "p8", x: 50, y: 30, role: "ST" },
        { id: "p9", x: 60, y: 50, role: "CM" },
        { id: "p10", x: 80, y: 50, role: "RM" },
        { id: "p11", x: 50, y: 10, role: "CAM" }
      ];
    case "4-1-4-1":
      return [
        { id: "p1", x: 50, y: 90, role: "GK" },
        { id: "p2", x: 20, y: 70, role: "RB" },
        { id: "p3", x: 35, y: 70, role: "CB" },
        { id: "p4", x: 65, y: 70, role: "CB" },
        { id: "p5", x: 80, y: 70, role: "LB" },
        { id: "p6", x: 50, y: 50, role: "CDM" },
        { id: "p7", x: 20, y: 30, role: "LM" },
        { id: "p8", x: 40, y: 30, role: "CM" },
        { id: "p9", x: 60, y: 30, role: "CM" },
        { id: "p10", x: 80, y: 30, role: "RM" },
        { id: "p11", x: 50, y: 10, role: "ST" }
      ];
    case "4-4-1-1":
      return [
        { id: "p1", x: 50, y: 90, role: "GK" },
        { id: "p2", x: 20, y: 70, role: "RB" },
        { id: "p3", x: 35, y: 70, role: "CB" },
        { id: "p4", x: 65, y: 70, role: "CB" },
        { id: "p5", x: 80, y: 70, role: "LB" },
        { id: "p6", x: 20, y: 50, role: "LM" },
        { id: "p7", x: 40, y: 50, role: "CM" },
        { id: "p8", x: 60, y: 50, role: "CM" },
        { id: "p9", x: 80, y: 50, role: "RM" },
        { id: "p10", x: 50, y: 30, role: "SS" },
        { id: "p11", x: 50, y: 10, role: "ST" }
      ];
    case "3-6-1":
      return [
        { id: "p1", x: 50, y: 90, role: "GK" },
        { id: "p2", x: 30, y: 70, role: "CB" },
        { id: "p3", x: 50, y: 70, role: "CB" },
        { id: "p4", x: 70, y: 70, role: "CB" },
        { id: "p5", x: 10, y: 50, role: "LM" },
        { id: "p6", x: 30, y: 50, role: "CM" },
        { id: "p7", x: 40, y: 30, role: "CAM" },
        { id: "p8", x: 50, y: 50, role: "CM" },
        { id: "p9", x: 60, y: 30, role: "CAM" },
        { id: "p10", x: 70, y: 50, role: "CM" },
        { id: "p11", x: 90, y: 50, role: "RM" }
      ];
    default:
      return [];
  }
};
