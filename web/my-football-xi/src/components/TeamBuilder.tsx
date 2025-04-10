
import React, { useState, useEffect } from "react";
import { Player, Formation } from "../models/Player";
import { Button } from "@/components/ui/button";
import { 
  defaultStartingXI, 
  defaultBench, 
  getFormationPositions 
} from "../services/playerService";
import { Link } from "react-router-dom";
import FootballPitch from "./FootballPitch";
import BenchSection from "./BenchSection";
import PlayerDetailPanel from "./PlayerDetailPanel";
import FormationSelector from "./FormationSelector";
import OpinionSection from "./OpinionSection";
import { Activity, Share2 } from "lucide-react";
import { usePlayerDrag } from "@/hooks/use-player-drag";

interface TeamBuilderProps {
  teamId: string;
}

const TeamBuilder: React.FC<TeamBuilderProps> = ({ teamId }) => {
  const [activeView, setActiveView] = useState<"real" | "my">("real");
  const [formation, setFormation] = useState<Formation>("4-3-3");
  const [startingXI, setStartingXI] = useState<Player[]>(defaultStartingXI);
  const [bench, setBench] = useState<Player[]>(defaultBench);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [showPlayerDetail, setShowPlayerDetail] = useState<boolean>(false);
  const [myStartingXI, setMyStartingXI] = useState<Player[]>(defaultStartingXI);
  const [myBench, setMyBench] = useState<Player[]>(defaultBench);
  const [ownerOpinion, setOwnerOpinion] = useState({ rating: 5, comments: "" });
  const [managerOpinion, setManagerOpinion] = useState({ rating: 7, comments: "" });

  const positions = getFormationPositions(formation);

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player);
    setShowPlayerDetail(true);
  };

  const handleClosePlayerDetail = () => {
    setShowPlayerDetail(false);
  };

  const handleUpdatePlayer = (updatedPlayer: Player) => {
    const updatePlayerInList = (list: Player[]): Player[] => {
      return list.map(player => 
        player.id === updatedPlayer.id ? updatedPlayer : player
      );
    };
    
    if (activeView === "my") {
      setMyStartingXI(updatePlayerInList(myStartingXI));
      setMyBench(updatePlayerInList(myBench));
    } else {
      setStartingXI(updatePlayerInList(startingXI));
      setBench(updatePlayerInList(bench));
    }
  };

  const handleSaveOpinions = (newOwnerOpinion: any, newManagerOpinion: any) => {
    setOwnerOpinion(newOwnerOpinion);
    setManagerOpinion(newManagerOpinion);
  };

  const handleToggleView = () => {
    if (activeView === "real") {
      setActiveView("my");
    } else {
      setActiveView("real");
    }
  };

  const handleFormationChange = (newFormation: Formation) => {
    setFormation(newFormation);
  };

  const handleShareLineup = () => {
    alert("Sharing functionality would be implemented here!");
  };

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

  // Handle drag and drop for my team
  const {
    isDragging: isMyDragging,
    draggedPlayer: myDraggedPlayer,
    dropTarget: myDropTarget,
    handleDragStart: handleMyDragStart,
    handleDragOver: handleMyDragOver,
    handleDrop: handleMyDrop,
    handleDragEnd: handleMyDragEnd
  } = usePlayerDrag(myStartingXI, myBench, (newStartingXI, newBench) => {
    setMyStartingXI(newStartingXI);
    setMyBench(newBench);
  });

  useEffect(() => {
    console.log("Team ID changed to", teamId);
  }, [teamId, formation]);

  const currentStartingXI = activeView === "real" ? startingXI : myStartingXI;
  const currentBench = activeView === "real" ? bench : myBench;
  const currentDraggedPlayer = activeView === "real" ? realDraggedPlayer?.playerId : myDraggedPlayer?.playerId;
  const currentDropTarget = activeView === "real" ? realDropTarget : myDropTarget;

  const handleCurrentDragStart = activeView === "real" ? handleRealDragStart : handleMyDragStart;
  const handleCurrentDragOver = activeView === "real" ? handleRealDragOver : handleMyDragOver;
  const handleCurrentDrop = activeView === "real" ? handleRealDrop : handleMyDrop;
  const handleCurrentDragEnd = activeView === "real" ? handleRealDragEnd : handleMyDragEnd;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-united-red">My Team XI</h1>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <FormationSelector 
            currentFormation={formation} 
            onFormationChange={handleFormationChange} 
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
            <Link to={`/team/${teamId}/transfer-hub`}>
              <Button variant="default" size="default" className="bg-united-red hover:bg-red-700" title="Transfer Hub">
                <Activity className="h-4 w-4 mr-1" /> Transfer Hub
              </Button>
            </Link>
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
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-9">
          <FootballPitch
            players={currentStartingXI}
            formation={formation}
            positions={positions}
            activePlayer={selectedPlayer}
            onPlayerClick={handlePlayerClick}
            onDragStart={handleCurrentDragStart}
            onDragOver={handleCurrentDragOver}
            onDrop={handleCurrentDrop}
            onDragEnd={handleCurrentDragEnd}
            draggedPlayer={currentDraggedPlayer}
            dropTarget={currentDropTarget}
          />
          
          <BenchSection
            players={currentBench}
            activePlayer={selectedPlayer}
            onPlayerClick={handlePlayerClick}
            onDragStart={handleCurrentDragStart}
            onDragOver={handleCurrentDragOver}
            onDrop={handleCurrentDrop}
            onDragEnd={handleCurrentDragEnd}
            draggedPlayer={currentDraggedPlayer}
            dropTarget={currentDropTarget}
          />
        </div>
        
        <div className="lg:col-span-3">
          {showPlayerDetail && selectedPlayer && (
            <PlayerDetailPanel
              player={selectedPlayer}
              onClose={handleClosePlayerDetail}
              onUpdatePlayer={handleUpdatePlayer}
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
  );
};

export default TeamBuilder;
