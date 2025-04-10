
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { Activity, Share2, Table } from "lucide-react";
import { toast } from "sonner";
import { usePlayerDrag } from "@/shared/hooks/use-player-drag";
import { useTeam } from "@/features/lineup-builder/hooks/useTeam";
import { fetchTeamById } from "@/shared/api/teamService";
import { getFormationPositions } from "@/features/lineup-builder/mocks/playerMock";
import { Formation, Player } from "@/features/lineup-builder/types";
import TeamHeader from "@/features/team/components/TeamHeader";

// Components
import FootballPitch from "@/features/lineup-builder/components/FootballPitch";
import BenchSection from "@/features/lineup-builder/components/BenchSection";
import PlayerDetailPanel from "@/features/lineup-builder/components/PlayerDetailPanel";
import FormationSelector from "@/features/lineup-builder/components/FormationSelector";
import OpinionSection from "@/features/lineup-builder/components/OpinionSection";

const TeamBuilderPage: React.FC = () => {
  const { teamId = 'man-united' } = useParams<{ teamId: string }>();
  const [activeView, setActiveView] = useState<"real" | "my">("real");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [showPlayerDetail, setShowPlayerDetail] = useState<boolean>(false);
  const [ownerOpinion, setOwnerOpinion] = useState({ rating: 5, comments: "" });
  const [managerOpinion, setManagerOpinion] = useState({ rating: 7, comments: "" });
  const [teamInfo, setTeamInfo] = useState({
    name: "Manchester United",
    shortName: "United",
    primaryColor: "text-united-red",
    logoClass: "bg-united-red"
  });

  // Team data and state
  const {
    startingXI,
    setStartingXI,
    bench,
    setBench,
    formation,
    setFormation,
    handleFormationChange,
    handleUpdatePlayer,
    loading,
    error
  } = useTeam(teamId);

  // Handle drag and drop for real team
  const {
    isDragging: isRealDragging,
    draggedPlayer: realDraggedPlayer,
    dropTarget: realDropTarget,
    handleDragStart: handleRealDragStart,
    handleDragOver: handleRealDragOver,
    handleDrop: handleRealDrop,
    handleDragEnd: handleRealDragEnd
  } = usePlayerDrag(startingXI, bench, (newStartingXI, newBench) => {
    setStartingXI(newStartingXI);
    setBench(newBench);
  });

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
    console.log("Team ID changed to", teamId);
  }, [teamId]);

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player);
    setShowPlayerDetail(true);
  };

  const handleClosePlayerDetail = () => {
    setShowPlayerDetail(false);
  };

  const handleUpdatePlayerDetail = (updatedPlayer: Player) => {
    handleUpdatePlayer(updatedPlayer);
  };

  const handleSaveOpinions = (newOwnerOpinion: any, newManagerOpinion: any) => {
    setOwnerOpinion(newOwnerOpinion);
    setManagerOpinion(newManagerOpinion);
  };

  const handleFormationSelect = (newFormation: Formation) => {
    handleFormationChange(newFormation);
  };

  const handleShareLineup = () => {
    toast.success("Lineup shared successfully!");
  };

  // Get positions based on formation
  const positions = getFormationPositions(formation);

  if (loading) {
    return <div className="container mx-auto px-4 py-6 text-center">Loading team data...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TeamHeader teamInfo={teamInfo} currentView="pitch" />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className={`text-2xl font-bold ${teamInfo.primaryColor}`}>My Team XI</h2>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <FormationSelector 
              currentFormation={formation} 
              onFormationChange={handleFormationSelect} 
            />
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                className={activeView === "real" ? "bg-united-red text-white" : ""}
                onClick={() => setActiveView("real")}
              >
                Real XI
              </Button>
              <Button
                variant="outline"
                className={activeView === "my" ? "bg-united-red text-white" : ""}
                onClick={() => setActiveView("my")}
              >
                My XI
              </Button>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleShareLineup}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-9">
            <FootballPitch
              players={startingXI}
              formation={formation}
              positions={positions}
              activePlayer={selectedPlayer}
              onPlayerClick={handlePlayerClick}
              onDragStart={handleRealDragStart}
              onDragOver={handleRealDragOver}
              onDrop={handleRealDrop}
              onDragEnd={handleRealDragEnd}
              draggedPlayer={realDraggedPlayer?.playerId}
              dropTarget={realDropTarget}
            />
            
            <BenchSection
              players={bench}
              activePlayer={selectedPlayer}
              onPlayerClick={handlePlayerClick}
              onDragStart={handleRealDragStart}
              onDragOver={handleRealDragOver}
              onDrop={handleRealDrop}
              onDragEnd={handleRealDragEnd}
              draggedPlayer={realDraggedPlayer?.playerId}
              dropTarget={realDropTarget}
            />
          </div>
          
          <div className="lg:col-span-3">
            {showPlayerDetail && selectedPlayer && (
              <PlayerDetailPanel
                player={selectedPlayer}
                onClose={handleClosePlayerDetail}
                onUpdatePlayer={handleUpdatePlayerDetail}
              />
            )}
            {!showPlayerDetail && (
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow p-4">
                  <h2 className="text-xl font-bold mb-3">Instructions</h2>
                  <ul className="space-y-2 text-sm">
                    <li>• Click on a player to view and add your opinion</li>
                    <li>• Rate players on a scale of 1-10</li>
                    <li>• Set player status (keep, sell, loan, etc.)</li>
                    <li>• Toggle between Real XI and My XI views</li>
                    <li>• Change formation using the selector at the top</li>
                    <li>• Drag and drop players to rearrange your team</li>
                  </ul>
                  <div className="mt-4 p-3 bg-gray-100 rounded-md">
                    <h3 className="font-bold text-sm">Drag & Drop</h3>
                    <p className="text-xs mt-1">Drag players between positions or to/from the bench to create your perfect lineup</p>
                  </div>
                </div>
                
                <OpinionSection 
                  ownerOpinion={ownerOpinion}
                  managerOpinion={managerOpinion}
                  onSaveOpinions={handleSaveOpinions}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamBuilderPage;
