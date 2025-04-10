
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import TeamBuilder from '@/components/TeamBuilder';
import { Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  
  // Get team info based on ID - in a real app this would come from an API or context
  const getTeamInfo = () => {
    switch(teamId) {
      case 'man-united':
        return {
          name: "Manchester United",
          shortName: "United",
          primaryColor: "text-united-red", // using existing color
          logoClass: "bg-united-red"
        };
      case 'liverpool':
        return {
          name: "Liverpool",
          shortName: "Liverpool",
          primaryColor: "text-red-600",
          logoClass: "bg-red-600"
        };
      case 'man-city':
        return {
          name: "Manchester City",
          shortName: "City",
          primaryColor: "text-sky-500",
          logoClass: "bg-sky-500"
        };
      // Add other teams as needed
      default:
        return {
          name: "Manchester United",
          shortName: "United",
          primaryColor: "text-united-red",
          logoClass: "bg-united-red"
        };
    }
  };
  
  const teamInfo = getTeamInfo();
  
  // If no team is selected, redirect to league selection
  React.useEffect(() => {
    if (!teamId) {
      navigate('/', { replace: true });
    }
  }, [teamId, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className={`${teamInfo.logoClass} text-white py-4`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">My {teamInfo.shortName} XI</h1>
            <div className="text-sm">Build your dream {teamInfo.name} lineup</div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-6">
        <div className="mb-4 flex flex-wrap justify-between items-center">
          <Link to="/" className="text-gray-600 hover:text-united-red inline-flex items-center">
            <span className="mr-1">←</span> Back to Leagues
          </Link>
          
          <Link to={`/team/${teamId}/transfer-hub`}>
            <Button className="bg-united-red hover:bg-red-700 text-white">
              <Activity className="w-4 h-4 mr-2" /> Transfer Hub
            </Button>
          </Link>
        </div>
        
        <TeamBuilder teamId={teamId || 'man-united'} />
      </main>
      
      <footer className="bg-black text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>This is a fan-created application. Not affiliated with {teamInfo.name}.</p>
          <p className="text-xs mt-2 text-gray-400">Player data is for demonstration purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
