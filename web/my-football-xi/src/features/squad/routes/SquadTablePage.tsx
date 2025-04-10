
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { BarChart3, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Player } from "@/models/Player";
import { useSquadQuery, useTeamInfoQuery } from "../hooks/useSquadQueries";
import { processPlayers, sortPlayers, filterPlayersByStatus } from "../utils/squadUtils";
import PlayersTable from "../components/PlayersTable";
import PlayerFilterTabs from "../components/PlayerFilterTabs";
import TransferBudgetSection from "../components/TransferBudgetSection";
import PlayerDetailModal from "../components/PlayerDetailModal";
import TeamHeader from "@/features/team/components/TeamHeader";
import PerformanceInsights from "./PerformanceInsights";

type SortKey = keyof Player | "stats.goals" | "stats.appearances" | "salary_numeric";

const SquadTablePage: React.FC = () => {
  const { teamId = 'man-united' } = useParams<{ teamId: string }>();
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: "asc" | "desc";
  }>({
    key: "number",
    direction: "asc",
  });
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeTab, setActiveTab] = useState<"squad" | "insights">("squad");
  
  // Use React Query hooks
  const { data: squadData, isLoading: squadLoading, error: squadError } = useSquadQuery(teamId);
  const { data: teamInfoData, isLoading: teamInfoLoading } = useTeamInfoQuery(teamId);
  
  const handleSort = (key: SortKey) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handlePlayerDetail = (player: Player) => {
    setSelectedPlayer(player);
    setDetailModalOpen(true);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  if (squadLoading || teamInfoLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-united-red mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading squad data...</p>
        </div>
      </div>
    );
  }

  if (squadError || !squadData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>Failed to load squad data. Please try again.</p>
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const teamInfo = teamInfoData?.data || {
    name: "Manchester United",
    shortName: "United",
    primaryColor: "text-united-red",
    logoClass: "bg-united-red"
  };

  const processedPlayers = processPlayers(squadData.players);
  const sortedPlayers = sortPlayers(processedPlayers, sortConfig);
  const filteredPlayers = filterPlayersByStatus(sortedPlayers, activeFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      <TeamHeader teamInfo={teamInfo} currentView="squad" />

      <main className="container mx-auto py-6 px-4">
        <TransferBudgetSection teamId={teamId} />
        
        <div className="mb-6 flex items-center gap-4">
          <h1 className={`text-3xl font-bold ${teamInfo.primaryColor}`}>Squad Analysis</h1>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "squad" | "insights")} className="w-full mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="squad" className="px-8">
              <Users className="h-4 w-4 mr-2" /> Squad
            </TabsTrigger>
            <TabsTrigger value="insights" className="px-8">
              <BarChart3 className="h-4 w-4 mr-2" /> Performance Insights
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="squad">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <PlayerFilterTabs 
                squad={sortedPlayers} 
                activeFilter={activeFilter} 
                onFilterChange={handleFilterChange} 
              />
              
              <div className="overflow-x-auto">
                <PlayersTable 
                  players={filteredPlayers}
                  teamId={teamId}
                  sortConfig={sortConfig}
                  handleSort={handleSort}
                  handlePlayerDetail={handlePlayerDetail}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="insights">
            <PerformanceInsights squad={squadData.players} />
          </TabsContent>
        </Tabs>
      </main>
      
      <PlayerDetailModal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        player={selectedPlayer}
        teamId={teamId}
      />
      
      <footer className="bg-black text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>This is a fan-created application. Not affiliated with {teamInfo.name}.</p>
          <p className="text-xs mt-2 text-gray-400">Player data is for demonstration purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default SquadTablePage;
