
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from "@/shared/components/ui/card";
import { ChevronLeft, Users, Search } from "lucide-react";
import { Input } from "@/shared/components/ui/input";

interface Team {
  id: string;
  name: string;
  logo: string;
  stadium?: string;
}

const TeamSelectionPage: React.FC = () => {
  const { leagueId } = useParams<{ leagueId: string }>();
  const [teams, setTeams] = useState<Team[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real application, this would be fetched from an API
    // For this demo, we'll use mock data based on the leagueId
    setIsLoading(true);
    
    let mockTeams: Team[] = [];
    
    switch(leagueId) {
      case 'premier-league':
        mockTeams = [
          { id: "man-united", name: "Manchester United", logo: "https://media.api-sports.io/football/teams/33.png", stadium: "Old Trafford" },
          { id: "liverpool", name: "Liverpool", logo: "https://media.api-sports.io/football/teams/40.png", stadium: "Anfield" },
          { id: "man-city", name: "Manchester City", logo: "https://media.api-sports.io/football/teams/50.png", stadium: "Etihad Stadium" },
          { id: "arsenal", name: "Arsenal", logo: "https://media.api-sports.io/football/teams/42.png", stadium: "Emirates Stadium" },
          { id: "chelsea", name: "Chelsea", logo: "https://media.api-sports.io/football/teams/49.png", stadium: "Stamford Bridge" },
          { id: "tottenham", name: "Tottenham Hotspur", logo: "https://media.api-sports.io/football/teams/47.png", stadium: "Tottenham Hotspur Stadium" },
          { id: "aston-villa", name: "Aston Villa", logo: "https://media.api-sports.io/football/teams/66.png", stadium: "Villa Park" },
          { id: "newcastle", name: "Newcastle United", logo: "https://media.api-sports.io/football/teams/34.png", stadium: "St James' Park" },
        ];
        break;
      case 'la-liga':
        mockTeams = [
          { id: "real-madrid", name: "Real Madrid", logo: "https://media.api-sports.io/football/teams/541.png", stadium: "Santiago Bernabéu" },
          { id: "barcelona", name: "FC Barcelona", logo: "https://media.api-sports.io/football/teams/529.png", stadium: "Camp Nou" },
          { id: "atletico-madrid", name: "Atlético Madrid", logo: "https://media.api-sports.io/football/teams/530.png", stadium: "Metropolitano" },
          { id: "sevilla", name: "Sevilla FC", logo: "https://media.api-sports.io/football/teams/536.png", stadium: "Ramón Sánchez Pizjuán" },
        ];
        break;
      // Add other leagues with their teams
      default:
        mockTeams = [];
    }
    
    setTimeout(() => {
      setTeams(mockTeams);
      setIsLoading(false);
    }, 500); // Simulate loading
    
  }, [leagueId]);

  // Get the league name based on ID
  const getLeagueName = () => {
    switch(leagueId) {
      case 'premier-league': return 'Premier League';
      case 'la-liga': return 'La Liga';
      case 'bundesliga': return 'Bundesliga';
      case 'serie-a': return 'Serie A';
      case 'ligue-1': return 'Ligue 1';
      default: return 'League';
    }
  };

  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-united-red text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">My Football XI</h1>
          <p className="text-center mt-2">Build your dream football lineup</p>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-2">
            <div className="flex items-center gap-2">
              <Link to="/" className="text-gray-600 hover:text-united-red">
                <div className="flex items-center gap-1">
                  <ChevronLeft className="h-4 w-4" />
                  <span>Back to Leagues</span>
                </div>
              </Link>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Users className="h-6 w-6 text-united-red" />
                {getLeagueName()} Teams
              </h2>
            </div>
            
            <div className="w-full md:w-auto mt-4 md:mt-0">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search teams..."
                  className="pl-8 w-full md:w-60"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-united-red mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading teams...</p>
            </div>
          ) : (
            filteredTeams.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTeams.map((team) => (
                  <Link to={`/team/${team.id}`} key={team.id}>
                    <Card className="hover:shadow-md transition-shadow duration-200 h-full cursor-pointer border-2 hover:border-united-red">
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <img 
                          src={team.logo} 
                          alt={team.name} 
                          className="w-24 h-24 object-contain my-2"
                        />
                        <h3 className="font-bold mt-2">{team.name}</h3>
                        {team.stadium && (
                          <p className="text-sm text-gray-500 mt-1">{team.stadium}</p>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">No teams found matching your search.</p>
              </div>
            )
          )}
        </div>
      </main>
      
      <footer className="bg-black text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>This is a fan-created application. Not affiliated with any football league or club.</p>
          <p className="text-xs mt-2 text-gray-400">Data is for demonstration purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default TeamSelectionPage;
