
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Button } from "@/shared/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { UserCog, HomeIcon, Activity, BarChart3, Users } from "lucide-react";
import { fetchTeamById } from '@/shared/api/teamService';
import { useTransfers } from '../hooks/useTransfers';
import { getSearchablePlayers } from '@/shared/api/transferService';
import TeamHeader from "@/features/team/components/TeamHeader";
import TransferRumorCard from '../components/TransferRumorCard';
import AIRecommendationCard from '../components/AIRecommendationCard';
import WantedPlayerCard from '../components/WantedPlayerCard';
import PlayerSearch from '../components/PlayerSearch';
import LiveTransferFeed from '../components/LiveTransferFeed';
import { TransferRumor, PlayerWanted } from '../types';

type SortOption = 'recency' | 'value' | 'age';

const TransferHubPage: React.FC = () => {
  const { teamId = 'man-united' } = useParams<{ teamId: string }>();
  const [activeTab, setActiveTab] = useState("rumors");
  const [sortOption, setSortOption] = useState<SortOption>('recency');
  const [teamInfo, setTeamInfo] = useState({
    name: "Manchester United",
    shortName: "United",
    primaryColor: "text-united-red",
    logoClass: "bg-united-red"
  });
  const [searchablePlayers, setSearchablePlayers] = useState<any[]>([]);
  
  const {
    rumors,
    wantedPlayers,
    recommendations,
    loading,
    error,
    handleSaveFanOpinion,
    handleAddWantedPlayer,
    handleRemoveWantedPlayer,
    handleUpdateWantedPlayer,
    getOpinionForRumor
  } = useTransfers(teamId);
  
  // Load team info
  useEffect(() => {
    const loadTeamInfo = async () => {
      try {
        const team = await fetchTeamById(teamId);
        setTeamInfo({
          name: team.name,
          shortName: team.shortName,
          primaryColor: team.primaryColor,
          logoClass: team.logoClass
        });
      } catch (err) {
        console.error("Error loading team info:", err);
      }
    };
    
    loadTeamInfo();
    
    // Load searchable players
    const loadSearchablePlayers = async () => {
      try {
        const players = await getSearchablePlayers();
        setSearchablePlayers(players);
      } catch (err) {
        console.error("Error loading searchable players:", err);
      }
    };
    
    loadSearchablePlayers();
  }, [teamId]);
  
  const handleViewFullAnalysis = (rumorId: string) => {
    // Navigate to full analysis page
    window.location.href = `/team/${teamId}/transfer-hub/rumor/${rumorId}`;
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
  
  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-united-red mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading transfer data...</p>
      </div>
    </div>;
  }
  
  if (error) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center text-red-500">
        <p>Error loading transfer data. Please try again later.</p>
      </div>
    </div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <TeamHeader teamInfo={teamInfo} currentView="transfers" />
      
      <main className="container mx-auto py-6 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Transfer Hub</h1>
          <p className="text-gray-600 mt-1">Track rumors, analyze fits, and build your dream squad</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <div className="mb-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
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
                      <TransferRumorCard
                        rumor={rumor}
                        onSaveOpinion={handleSaveFanOpinion}
                        onViewFullAnalysis={handleViewFullAnalysis}
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="wanted" className="space-y-4">
                <PlayerSearch 
                  availablePlayers={searchablePlayers}
                  onPlayerAdded={handleAddWantedPlayer} 
                />
                
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
                        onUpdate={handleUpdateWantedPlayer}
                        onRemove={handleRemoveWantedPlayer}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-4">
            <div className="space-y-6">
              <LiveTransferFeed />
              
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">AI Recommendations</h2>
                  <UserCog className="w-5 h-5 text-united-red" />
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Based on squad analysis and team needs, our AI suggests these potential signings:
                </p>
                
                <div className="space-y-4">
                  {recommendations.map(recommendation => (
                    <AIRecommendationCard 
                      key={recommendation.id} 
                      recommendation={recommendation}
                      onAddToWantedList={(rec) => {
                        const wantedPlayer: PlayerWanted = {
                          id: rec.id,
                          playerName: rec.playerName,
                          age: rec.age,
                          position: rec.position,
                          currentTeam: rec.currentTeam,
                          currentTeamLogo: rec.currentTeamLogo,
                          photo: rec.photo,
                          marketValue: rec.marketValue,
                          marketValueAmount: rec.marketValueAmount,
                          nationality: rec.nationality,
                          addedAt: new Date().toISOString(),
                          userNotes: `AI Recommendation: ${rec.recommendationReason}`
                        };
                        handleAddWantedPlayer(wantedPlayer);
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-700 mb-2">Transfer Window Status</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Summer window opens:</span>
                    <span className="font-medium">June 14, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Window closes:</span>
                    <span className="font-medium">August 31, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated budget:</span>
                    <span className="font-medium">€180M available</span>
                  </div>
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

export default TransferHubPage;
