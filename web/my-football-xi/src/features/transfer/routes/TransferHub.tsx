
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTeamById } from '@/services/api/teamService';
import { useTransfers } from '@/features/transfer/hooks/useTransfers';
import TransferRumorCard from '@/features/transfer/components/TransferRumorCard';
import AIRecommendationCard from '@/features/transfer/components/AIRecommendationCard';
import PlayerSearch from '@/features/transfer/components/PlayerSearch';
import WantedPlayerCard from '@/features/transfer/components/WantedPlayerCard';
import TeamHeader from "@/features/team/components/TeamHeader";

interface TransferHubProps {
  // Define any props here
}

const TransferHub: React.FC<TransferHubProps> = () => {
  const { teamId = 'man-united' } = useParams<{ teamId: string }>();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Update to use the correct property names from useTransfers hook
  const { 
    rumors, 
    recommendations, 
    wantedPlayers, 
    loading: transfersLoading, 
    error: transfersError,
    handleAddWantedPlayer 
  } = useTransfers(teamId);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const teamData = await fetchTeamById(teamId);
        setTeam(teamData);
        setLoading(false);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load team data. Please try again.");
        setLoading(false);
      }
    };
    loadData();
  }, [teamId]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const teamInfo = {
    name: team?.name || "Team",
    shortName: team?.shortName || "Team",
    primaryColor: team?.primaryColor || "text-united-red",
    logoClass: team?.logoClass || "bg-united-red"
  };

  // Add loading and error state handling
  if (loading || transfersLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-united-red mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading transfer data...</p>
        </div>
      </div>
    );
  }

  if (error || transfersError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>{error || transfersError}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TeamHeader teamInfo={teamInfo} currentView="transfers" />

      <main className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Transfer Hub</h1>

        {/* Update PlayerSearch to use the correct props */}
        <PlayerSearch onPlayerAdded={handleAddWantedPlayer} />

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Transfer Rumors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Ensure rumors is an array before mapping */}
            {rumors && rumors.length > 0 ? (
              rumors.map((rumor) => (
                <TransferRumorCard key={rumor.id} rumor={rumor} />
              ))
            ) : (
              <div className="col-span-full text-center py-4 text-gray-500">
                No transfer rumors available at this time.
              </div>
            )}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">AI Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Ensure recommendations is an array before mapping */}
            {recommendations && recommendations.length > 0 ? (
              recommendations.map((recommendation) => (
                <AIRecommendationCard key={recommendation.id} recommendation={recommendation} />
              ))
            ) : (
              <div className="col-span-full text-center py-4 text-gray-500">
                No AI recommendations available at this time.
              </div>
            )}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Wanted Players</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Ensure wantedPlayers is an array before mapping */}
            {wantedPlayers && wantedPlayers.length > 0 ? (
              wantedPlayers.map((player) => (
                <WantedPlayerCard key={player.id} player={player} />
              ))
            ) : (
              <div className="col-span-full text-center py-4 text-gray-500">
                No wanted players added yet. Use the search to add players to your wanted list.
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-black text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>This is a fan-created application. Not affiliated with {team?.name || 'the club'}.</p>
          <p className="text-xs mt-2 text-gray-400">Player data is for demonstration purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default TransferHub;
