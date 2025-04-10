
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/shared/components/ui/card";
import { Trophy, ChevronRight } from "lucide-react";

interface League {
  id: string;
  name: string;
  countryCode: string;
  logo: string;
}

const LeagueSelectionPage: React.FC = () => {
  const topLeagues: League[] = [
    {
      id: "premier-league",
      name: "Premier League",
      countryCode: "GB",
      logo: "https://media.api-sports.io/football/leagues/39.png"
    },
    {
      id: "la-liga",
      name: "La Liga",
      countryCode: "ES",
      logo: "https://media.api-sports.io/football/leagues/140.png"
    },
    {
      id: "bundesliga",
      name: "Bundesliga",
      countryCode: "DE",
      logo: "https://media.api-sports.io/football/leagues/78.png"
    },
    {
      id: "serie-a",
      name: "Serie A",
      countryCode: "IT",
      logo: "https://media.api-sports.io/football/leagues/135.png"
    },
    {
      id: "ligue-1",
      name: "Ligue 1",
      countryCode: "FR",
      logo: "https://media.api-sports.io/football/leagues/61.png"
    }
  ];

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
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Trophy className="h-6 w-6 text-united-red" />
            Select a League
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topLeagues.map((league) => (
              <Link to={`/league/${league.id}`} key={league.id}>
                <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer border-2 hover:border-united-red">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img 
                        src={league.logo} 
                        alt={league.name} 
                        className="w-12 h-12 object-contain"
                      />
                      <div>
                        <h3 className="font-bold">{league.name}</h3>
                        <p className="text-sm text-gray-500">{league.countryCode}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
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

export default LeagueSelectionPage;
