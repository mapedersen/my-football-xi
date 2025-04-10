import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { BarChart3, Users } from "lucide-react";
import { fetchTeamById } from "@/shared/api/teamService";
import { Player } from "@/features/team/types";
import PlayerDetailModal from "@/features/squad-table/components/PlayerDetailModal";
import { useToast } from "@/shared/hooks/use-toast";
import TeamHeader from "@/features/team/components/TeamHeader";
import PlayersTable from "../components/PlayersTable";
import { processPlayers, sortPlayers, filterPlayersByStatus } from "../utils/squadUtils";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import PlayerFilterTabs from "../components/PlayerFilterTabs";
import TransferBudgetSection from "../components/TransferBudgetSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type SortKey = keyof Player | "stats.goals" | "stats.appearances" | "salary_numeric";

const PerformanceInsights = ({ squad }: { squad: Player[] }) => {
  const averageAge = Math.round(squad.reduce((sum, player) => sum + (player.age || 0), 0) / (squad.length || 1));
  const averageSalary = Math.round(squad.reduce((sum, player) => sum + getSalaryNumeric(player.salary), 0) / (squad.length || 1));
  const totalGoals = squad.reduce((sum, player) => sum + player.stats.goals, 0);
  const totalAppearances = squad.reduce((sum, player) => sum + player.stats.appearances, 0);
  
  function getSalaryNumeric(salaryString: string): number {
    const numericValue = parseInt(salaryString.replace(/[^0-9]/g, ""));
    return isNaN(numericValue) ? 0 : numericValue;
  }
  
  const formatCurrency = (amount: number): string => {
    if (amount >= 1000000) {
      return `£${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `£${(amount / 1000).toFixed(0)}K`;
    }
    return `£${amount}`;
  };

  const positionGroups = {
    Goalkeepers: squad.filter(p => p.position === 'GK').length,
    Defenders: squad.filter(p => ['CB', 'LB', 'RB', 'LWB', 'RWB'].includes(p.position)).length,
    Midfielders: squad.filter(p => ['CM', 'CDM', 'CAM', 'LM', 'RM'].includes(p.position)).length,
    Forwards: squad.filter(p => ['ST', 'CF', 'LW', 'RW'].includes(p.position)).length
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" />
            Squad Overview
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Squad Size:</span>
              <span className="font-medium">{squad.length} players</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Average Age:</span>
              <span className="font-medium">{averageAge} years</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Average Salary:</span>
              <span className="font-medium">{formatCurrency(averageSalary)}/week</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Total Wage Bill:</span>
              <span className="font-medium">{formatCurrency(averageSalary * squad.length)}/week</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Total Goals:</span>
              <span className="font-medium">{totalGoals}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Total Appearances:</span>
              <span className="font-medium">{totalAppearances}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Injured Players:</span>
              <span className="font-medium text-red-600">{squad.filter(p => p.status?.injured).length}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Position Analysis</h3>
          <div className="space-y-4">
            {Object.entries(positionGroups).map(([position, count]) => (
              <div key={position} className="flex justify-between items-center">
                <span className="text-gray-500">{position}:</span>
                <span className="font-medium">{count}</span>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t">
              <h4 className="font-medium mb-2">Position Needs:</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Central Midfield:</span>
                  <span className="text-red-500">High Priority</span>
                </div>
                <div className="flex justify-between">
                  <span>Right Wing:</span>
                  <span className="text-yellow-500">Medium Priority</span>
                </div>
                <div className="flex justify-between">
                  <span>Center Back:</span>
                  <span className="text-green-500">Low Priority</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Goal Scoring</span>
                <span className="font-medium">{Math.round(totalGoals / squad.length * 10)}/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.min(100, totalGoals / squad.length * 25)}%` }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Clean Sheets</span>
                <span className="font-medium">6/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Pass Completion</span>
                <span className="font-medium">8/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Aerial Duels</span>
                <span className="font-medium">7/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Fitness Level</span>
                <span className="font-medium">{Math.round((squad.length - squad.filter(p => p.status?.injured).length) / squad.length * 10)}/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(squad.length - squad.filter(p => p.status?.injured).length) / squad.length * 100}%` }}></div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t text-sm text-gray-500">
              <p>Based on last 10 matches performance data</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Value for Money</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Top Performers vs. Salary</p>
              <div className="space-y-3">
                {squad
                  .sort((a, b) => b.stats.goals / getSalaryNumeric(b.salary) - a.stats.goals / getSalaryNumeric(a.salary))
                  .slice(0, 5)
                  .map((player) => (
                    <div key={player.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img 
                          src={player.image} 
                          alt={player.name} 
                          className="w-8 h-8 rounded-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.svg';
                          }}
                        />
                        <span>{player.name}</span>
                      </div>
                      <span className="text-green-600 font-medium">{formatCurrency(getSalaryNumeric(player.salary))}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Fan Favorite Players</h3>
          <div className="space-y-4">
            <div className="space-y-3">
              {squad
                .sort((a, b) => (b.fanPulse || 75) - (a.fanPulse || 75))
                .slice(0, 5)
                .map((player, index) => (
                  <div key={player.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <img 
                        src={player.image} 
                        alt={player.name} 
                        className="w-8 h-8 rounded-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                      <span>{player.name}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${player.fanPulse || 75}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{player.fanPulse || 75}%</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SquadTablePage: React.FC = () => {
  const { teamId = 'man-united' } = useParams<{ teamId: string }>();
  const [squad, setSquad] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [teamInfo, setTeamInfo] = useState({
    name: "Manchester United",
    shortName: "United",
    primaryColor: "text-united-red",
    logoClass: "bg-united-red"
  });
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
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const team = await fetchTeamById(teamId);
        setTeamInfo({
          name: team.name,
          shortName: team.shortName,
          primaryColor: team.primaryColor,
          logoClass: team.logoClass
        });
        setTimeout(() => {
          import("@/features/team/mocks/playerMock").then(({ getAllPlayers }) => {
            const players = getAllPlayers();
            const playersWithFanPulse = players.map(player => ({
              ...player,
              fanPulse: player.fanPulse || Math.floor(Math.random() * 30) + 60
            }));
            setSquad(playersWithFanPulse);
            setLoading(false);
          });
        }, 500);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load squad data. Please try again.");
        setLoading(false);
      }
    };
    loadData();
  }, [teamId]);

  const handleSort = (key: SortKey) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleStatusChange = (playerId: string, status: string) => {
    setSquad(
      squad.map((player) =>
        player.id === playerId
          ? {
              ...player,
              status: {
                ...player.status,
                recommendation: status,
              },
            }
          : player
      )
    );
    toast({
      title: "Player status updated",
      description: `Player status changed to ${status}`,
    });
  };

  const handlePlayerDetail = (player: Player) => {
    setSelectedPlayer(player);
    setDetailModalOpen(true);
  };

  const handlePlayerNameClick = (player: Player) => {
    setSelectedPlayer(player);
    setDetailModalOpen(true);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={() => window.location.reload()} />;
  }

  const processedPlayers = processPlayers(squad);
  
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

        <Tabs defaultValue="squad" className="w-full mb-8">
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
                  sortConfig={sortConfig}
                  handleSort={handleSort}
                  handleStatusChange={handleStatusChange}
                  handlePlayerDetail={handlePlayerDetail}
                  handlePlayerNameClick={handlePlayerNameClick}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="insights">
            <PerformanceInsights squad={squad} />
          </TabsContent>
        </Tabs>
      </main>
      
      <PlayerDetailModal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        player={selectedPlayer}
        onUpdatePlayer={(updatedPlayer) => {
          setSquad(squad.map(p => p.id === updatedPlayer.id ? updatedPlayer : p));
          setSelectedPlayer(updatedPlayer);
        }}
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
