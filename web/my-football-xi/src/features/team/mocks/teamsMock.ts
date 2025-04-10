
import { Team, League } from '../types/Team';

export const mockLeagues: League[] = [
  { 
    id: 'premier-league', 
    name: 'Premier League', 
    logo: 'https://media.api-sports.io/football/leagues/39.png', 
    country: 'England'
  },
  { 
    id: 'la-liga', 
    name: 'La Liga', 
    logo: 'https://media.api-sports.io/football/leagues/140.png', 
    country: 'Spain'
  },
  { 
    id: 'bundesliga', 
    name: 'Bundesliga', 
    logo: 'https://media.api-sports.io/football/leagues/78.png', 
    country: 'Germany'
  },
  { 
    id: 'serie-a', 
    name: 'Serie A', 
    logo: 'https://media.api-sports.io/football/leagues/135.png', 
    country: 'Italy'
  },
  { 
    id: 'ligue-1', 
    name: 'Ligue 1', 
    logo: 'https://media.api-sports.io/football/leagues/61.png', 
    country: 'France'
  }
];

export const mockTeamsByLeague: Record<string, Team[]> = {
  'premier-league': [
    { id: "man-united", name: "Manchester United", shortName: "United", logo: "https://media.api-sports.io/football/teams/33.png", stadium: "Old Trafford", primaryColor: "text-united-red", logoClass: "bg-united-red" },
    { id: "liverpool", name: "Liverpool", shortName: "Liverpool", logo: "https://media.api-sports.io/football/teams/40.png", stadium: "Anfield", primaryColor: "text-red-600", logoClass: "bg-red-600" },
    { id: "man-city", name: "Manchester City", shortName: "City", logo: "https://media.api-sports.io/football/teams/50.png", stadium: "Etihad Stadium", primaryColor: "text-sky-500", logoClass: "bg-sky-500" },
    { id: "arsenal", name: "Arsenal", shortName: "Arsenal", logo: "https://media.api-sports.io/football/teams/42.png", stadium: "Emirates Stadium", primaryColor: "text-red-500", logoClass: "bg-red-500" },
    { id: "chelsea", name: "Chelsea", shortName: "Chelsea", logo: "https://media.api-sports.io/football/teams/49.png", stadium: "Stamford Bridge", primaryColor: "text-blue-600", logoClass: "bg-blue-600" },
    { id: "tottenham", name: "Tottenham Hotspur", shortName: "Spurs", logo: "https://media.api-sports.io/football/teams/47.png", stadium: "Tottenham Hotspur Stadium", primaryColor: "text-slate-800", logoClass: "bg-slate-800" },
    { id: "aston-villa", name: "Aston Villa", shortName: "Villa", logo: "https://media.api-sports.io/football/teams/66.png", stadium: "Villa Park", primaryColor: "text-violet-800", logoClass: "bg-violet-800" },
    { id: "newcastle", name: "Newcastle United", shortName: "Newcastle", logo: "https://media.api-sports.io/football/teams/34.png", stadium: "St James' Park", primaryColor: "text-black", logoClass: "bg-black" },
  ],
  'la-liga': [
    { id: "real-madrid", name: "Real Madrid", shortName: "Madrid", logo: "https://media.api-sports.io/football/teams/541.png", stadium: "Santiago Bernabéu", primaryColor: "text-white", logoClass: "bg-white" },
    { id: "barcelona", name: "FC Barcelona", shortName: "Barca", logo: "https://media.api-sports.io/football/teams/529.png", stadium: "Camp Nou", primaryColor: "text-blue-600", logoClass: "bg-blue-600" },
    { id: "atletico-madrid", name: "Atlético Madrid", shortName: "Atletico", logo: "https://media.api-sports.io/football/teams/530.png", stadium: "Metropolitano", primaryColor: "text-red-600", logoClass: "bg-red-600" },
    { id: "sevilla", name: "Sevilla FC", shortName: "Sevilla", logo: "https://media.api-sports.io/football/teams/536.png", stadium: "Ramón Sánchez Pizjuán", primaryColor: "text-red-500", logoClass: "bg-red-500" },
  ],
  // Add other leagues as needed
};

export const getTeamById = (teamId: string): Team => {
  for (const leagueTeams of Object.values(mockTeamsByLeague)) {
    const team = leagueTeams.find(team => team.id === teamId);
    if (team) return team;
  }
  
  // Default team if not found
  return {
    id: "man-united",
    name: "Manchester United",
    shortName: "United",
    logo: "https://media.api-sports.io/football/teams/33.png",
    stadium: "Old Trafford",
    primaryColor: "text-united-red",
    logoClass: "bg-united-red"
  };
};
