
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserCog, HomeIcon, ArrowUpDown, Activity, BarChart3 } from "lucide-react";
import TransferRumorCard from '@/components/transfer/TransferRumorCard';
import AIRecommendationCard from '@/components/transfer/AIRecommendationCard';
import WantedPlayerCard from '@/components/transfer/WantedPlayerCard';
import PlayerSearch from '@/components/transfer/PlayerSearch';
import { 
  getTransferRumorsForTeam, 
  getWantedPlayersForTeam, 
  getAIRecommendationsForTeam 
} from '@/services/transferService';
import { TransferRumor, PlayerWanted, AIRecommendation } from '@/models/Transfer';

type SortOption = 'recency' | 'value' | 'age';

const TransferHub = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const [activeTab, setActiveTab] = useState("rumors");
  const [rumors, setRumors] = useState<TransferRumor[]>([]);
  const [wantedPlayers, setWantedPlayers] = useState<PlayerWanted[]>([]);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('recency');
  
  const getTeamInfo = () => {
    switch(teamId) {
      case 'man-united':
        return {
          name: "Manchester United",
          shortName: "United",
          primaryColor: "text-united-red",
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
  
  useEffect(() => {
    if (teamId) {
      setRumors(getTransferRumorsForTeam(teamId));
      setWantedPlayers(getWantedPlayersForTeam(teamId));
      setRecommendations(getAIRecommendationsForTeam(teamId));
    }
  }, [teamId]);
  
  const handleWantedPlayersRefresh = () => {
    setWantedPlayers(getWantedPlayersForTeam(teamId || 'man-united'));
  };
  
  const sortedRumors = [...rumors].sort((a, b) => {
    switch (sortOption) {
      case 'recency':
        return new Date(b.dateReported).getTime() - new Date(a.dateReported).getTime();
      case 'value':
        return a.reportedFeeValue - b.reportedFeeValue;
      case 'age':
        return a.age - b.age;
      default:
        return 0;
    }
  });
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className={`${teamInfo.logoClass} text-white py-4`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{teamInfo.name} Transfer Hub</h1>
            <div className="text-sm">Analyze rumors and suggest reinforcements</div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-6 px-4">
        <div className="mb-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div className="flex gap-2 flex-wrap">
            <Link to={`/team/${teamId}`}>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <HomeIcon className="w-4 h-4" /> Lineup
              </Button>
            </Link>
            <Button variant="outline" size="sm" className="flex items-center gap-1 bg-gray-100" disabled>
              <Activity className="w-4 h-4" /> Transfers
            </Button>
            <Link to={`/team/${teamId}/insights`}>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <BarChart3 className="w-4 h-4" /> Insights
              </Button>
            </Link>
          </div>
          
          {activeTab === "rumors" && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <Select 
                value={sortOption} 
                onValueChange={(value) => setSortOption(value as SortOption)}
              >
                <SelectTrigger className="w-32 h-8">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recency">Latest</SelectItem>
                  <SelectItem value="value">Value</SelectItem>
                  <SelectItem value="age">Age</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="rumors" className="text-center">
                  Transfer Rumors
                </TabsTrigger>
                <TabsTrigger value="wanted" className="text-center">
                  My Wanted List
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="rumors" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sortedRumors.map(rumor => (
                    <div key={rumor.id}>
                      <TransferRumorCard rumor={rumor} />
                      <div className="text-center mt-2">
                        <Link to={`/rumors/${rumor.id}`}>
                          <Button variant="ghost" size="sm" className="text-united-red text-sm">
                            View Full Analysis & Share
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="wanted" className="space-y-4">
                <PlayerSearch onPlayerAdded={handleWantedPlayersRefresh} />
                
                {wantedPlayers.length === 0 ? (
                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <p className="text-gray-500 mb-4">You haven't added any players to your wanted list yet.</p>
                    <p className="text-sm text-gray-400">Use the button above to search and add players you'd like to see join {teamInfo.name}.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {wantedPlayers.map(player => (
                      <WantedPlayerCard 
                        key={player.id} 
                        player={player} 
                        onUpdate={handleWantedPlayersRefresh} 
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">AI Recommendations</h2>
                <UserCog className="w-5 h-5 text-united-red" />
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Based on squad analysis and team needs, our AI suggests these potential signings:
              </p>
              
              <div className="space-y-4">
                {recommendations.map(recommendation => (
                  <AIRecommendationCard key={recommendation.id} recommendation={recommendation} />
                ))}
              </div>
            </div>
            
            <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-700 mb-2">Fan Consensus</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Most wanted position:</span>
                  <span className="font-medium">Central Midfielder</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Most popular rumor:</span>
                  <span className="font-medium">De Ligt (73% positive)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Budget perspective:</span>
                  <span className="font-medium">€180M available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-black text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>This is a fan-created application. Not affiliated with {teamInfo.name}.</p>
          <p className="text-xs mt-2 text-gray-400">Transfer data is for demonstration purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default TransferHub;
