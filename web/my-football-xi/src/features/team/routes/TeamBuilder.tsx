
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchTeamById } from "@/services/api/teamService";
import { useToast } from "@/shared/hooks/use-toast";
import FootballPitch from "@/features/team/components/FootballPitch";
import BenchSection from "@/features/team/components/BenchSection";
import PlayerDetailPanel from "@/features/team/components/PlayerDetailPanel";
import { usePlayerDrag } from "@/shared/hooks/use-player-drag";
import { Player, Formation } from "@/features/team/types";
import TeamHeader from "@/features/team/components/TeamHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Position {
  x: number;
  y: number;
}

interface PlayerPosition {
  player: Player;
  position: Position;
}

// Formation positions mapping
const getFormationPositions = (formation: Formation): Position[] => {
  switch(formation) {
    case "4-3-3":
      return [
        { x: 50, y: 85 },  // GK
        { x: 15, y: 65 },  // LB
        { x: 35, y: 65 },  // LCB
        { x: 65, y: 65 },  // RCB
        { x: 85, y: 65 },  // RB
        { x: 25, y: 45 },  // LM
        { x: 50, y: 45 },  // CM
        { x: 75, y: 45 },  // RM
        { x: 20, y: 20 },  // LW
        { x: 50, y: 20 },  // ST
        { x: 80, y: 20 },  // RW
      ];
    case "4-4-2":
      return [
        { x: 50, y: 85 },  // GK
        { x: 15, y: 65 },  // LB
        { x: 35, y: 65 },  // LCB
        { x: 65, y: 65 },  // RCB
        { x: 85, y: 65 },  // RB
        { x: 20, y: 45 },  // LM
        { x: 40, y: 45 },  // LCM
        { x: 60, y: 45 },  // RCM
        { x: 80, y: 45 },  // RM
        { x: 35, y: 20 },  // LST
        { x: 65, y: 20 },  // RST
      ];
    case "3-5-2":
      return [
        { x: 50, y: 85 },  // GK
        { x: 30, y: 65 },  // LCB
        { x: 50, y: 65 },  // CB
        { x: 70, y: 65 },  // RCB
        { x: 15, y: 45 },  // LWB
        { x: 35, y: 45 },  // LCM
        { x: 50, y: 45 },  // CDM
        { x: 65, y: 45 },  // RCM
        { x: 85, y: 45 },  // RWB
        { x: 35, y: 20 },  // LST
        { x: 65, y: 20 },  // RST
      ];
    // Add more formations as needed
    default:
      // Default to 4-3-3
      return [
        { x: 50, y: 85 },  // GK
        { x: 15, y: 65 },  // LB
        { x: 35, y: 65 },  // LCB
        { x: 65, y: 65 },  // RCB
        { x: 85, y: 65 },  // RB
        { x: 25, y: 45 },  // LM
        { x: 50, y: 45 },  // CM
        { x: 75, y: 45 },  // RM
        { x: 20, y: 20 },  // LW
        { x: 50, y: 20 },  // ST
        { x: 80, y: 20 },  // RW
      ];
  }
};

const TeamBuilder: React.FC = () => {
  const { teamId = 'man-united' } = useParams<{ teamId: string }>();
  const [team, setTeam] = useState(null);
  const [squad, setSquad] = useState<Player[]>([]);
  const [activePlayers, setActivePlayers] = useState<PlayerPosition[]>([]);
  const [averagePlayers, setAveragePlayers] = useState<PlayerPosition[]>([]);
  const [benchPlayers, setBenchPlayers] = useState<Player[]>([]);
  const [injuredPlayers, setInjuredPlayers] = useState<Player[]>([]);
  const [activePlayer, setActivePlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFormation, setCurrentFormation] = useState<Formation>("4-3-3");
  const [averageFormation, setAverageFormation] = useState<Formation>("4-3-3");
  const [activeTab, setActiveTab] = useState<"average" | "my">("average");
  const { toast } = useToast();
  
  const {
    isDragging,
    draggedPlayer,
    dropTarget,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd
  } = usePlayerDrag(
    activePlayers.map(ap => ap.player),
    benchPlayers,
    (newStartingXI, newBench) => {
      setBenchPlayers(newBench);
      setActivePlayers(prevPositions => {
        return prevPositions.map((pos, idx) => {
          if (idx < newStartingXI.length) {
            return { ...pos, player: newStartingXI[idx] };
          }
          return pos;
        });
      });
    }
  );

  const teamInfo = {
    name: team?.name || "Team",
    shortName: team?.shortName || "Team",
    primaryColor: team?.primaryColor || "text-united-red",
    logoClass: team?.logoClass || "bg-united-red"
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const fetchedTeam = await fetchTeamById(teamId);
        setTeam(fetchedTeam);

        setTimeout(() => {
          import("@/features/team/mocks/playerMock").then(({ getAllPlayers }) => {
            const players = getAllPlayers();
            setSquad(players);
            
            const nonInjuredPlayers = players.filter(p => !p.status?.injured);
            const injured = players.filter(p => p.status?.injured);
            
            setInjuredPlayers(injured);
            setBenchPlayers(nonInjuredPlayers.slice(11, 18)); // First 7 non-injured players after starting XI
            
            // Set up average lineup (fixed)
            const averagePositions = getFormationPositions(averageFormation);
            setAveragePlayers(
              averagePositions.map((position, index) => ({
                player: nonInjuredPlayers[index],
                position: position,
              }))
            );
            
            // Set up my lineup (customizable)
            const myPositions = getFormationPositions(currentFormation);
            setActivePlayers(
              myPositions.map((position, index) => ({
                player: nonInjuredPlayers[index],
                position: position,
              }))
            );
            
            setLoading(false);
          });
        }, 500);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load team data. Please try again.");
        setLoading(false);
      }
    };
    loadData();
  }, [teamId, averageFormation, currentFormation]);

  // Update positions when formation changes
  useEffect(() => {
    if (squad.length > 0 && activePlayers.length > 0) {
      const newPositions = getFormationPositions(currentFormation);
      setActivePlayers(prevActivePlayers => {
        return prevActivePlayers.map((playerPos, index) => {
          if (index < newPositions.length) {
            return {
              ...playerPos,
              position: newPositions[index]
            };
          }
          return playerPos;
        });
      });
    }
  }, [currentFormation, squad.length]);

  const handlePlayerClick = (player: Player) => {
    setActivePlayer(player);
  };

  const handleFormationChange = (newFormation: Formation) => {
    setCurrentFormation(newFormation);
    
    toast({
      title: "Formation changed",
      description: `Your formation is now ${newFormation}`,
    });
  };

  const handleShareLineup = () => {
    toast({
      title: "Lineup shared",
      description: "Your lineup has been shared successfully",
    });
  };

  const handleDragStartAdapter = (playerId: string, index: number) => {
    handleDragStart(playerId, 'pitch', index);
  };

  const handleDragOverAdapter = (index: number) => {
    handleDragOver('pitch', index);
  };

  const handleBenchDragStart = (playerId: string, index: number, isFromBench: boolean) => {
    handleDragStart(playerId, 'bench', index);
  };

  const handleBenchDragOver = (index: number) => {
    handleDragOver('bench', index);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-united-red mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading team data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>{error}</p>
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

  const displayPlayers = activeTab === "average" ? averagePlayers : activePlayers;
  const displayFormation = activeTab === "average" ? averageFormation : currentFormation;

  return (
    <div className="min-h-screen bg-gray-50">
      <TeamHeader teamInfo={teamInfo} currentView="lineup" />

      <main className="container mx-auto py-6 px-4">
        <div className="mb-6">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "average" | "my")}>
            <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto">
              <TabsTrigger value="average">Average Lineup</TabsTrigger>
              <TabsTrigger value="my">My Lineup</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-9">
            <FootballPitch
              activePlayers={displayPlayers}
              onPlayerClick={handlePlayerClick}
              isDragging={isDragging}
              onDragStart={handleDragStartAdapter}
              onDragOver={handleDragOverAdapter}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
              draggedPlayer={typeof draggedPlayer === 'string' ? draggedPlayer : draggedPlayer?.playerId}
              dropTarget={typeof dropTarget === 'number' ? dropTarget : dropTarget?.targetIndex}
              onFormationChange={handleFormationChange}
              currentFormation={displayFormation}
              onShareLineup={handleShareLineup}
              isFixedLineup={activeTab === "average"}
            />
            
            <BenchSection
              players={benchPlayers}
              activePlayer={activePlayer}
              onPlayerClick={handlePlayerClick}
              onDragStart={handleBenchDragStart}
              onDragOver={handleBenchDragOver}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
              draggedPlayer={typeof draggedPlayer === 'string' ? draggedPlayer : draggedPlayer?.playerId}
              dropTarget={typeof dropTarget === 'number' ? dropTarget : dropTarget?.targetIndex}
              injuredPlayers={injuredPlayers}
            />
          </div>
          
          <div className="lg:col-span-3">
            {activePlayer ? (
              <PlayerDetailPanel
                player={activePlayer}
                onClose={() => setActivePlayer(null)}
                onUpdatePlayer={(updatedPlayer) => {
                  setSquad(prevSquad => {
                    return prevSquad.map(player => 
                      player.id === updatedPlayer.id ? updatedPlayer : player
                    );
                  });
                  
                  setActivePlayers(prevActivePlayers => {
                    return prevActivePlayers.map(pp => {
                      if (pp.player.id === updatedPlayer.id) {
                        return { ...pp, player: updatedPlayer };
                      }
                      return pp;
                    });
                  });
                  
                  setAveragePlayers(prevAveragePlayers => {
                    return prevAveragePlayers.map(pp => {
                      if (pp.player.id === updatedPlayer.id) {
                        return { ...pp, player: updatedPlayer };
                      }
                      return pp;
                    });
                  });
                  
                  setBenchPlayers(prevBench => {
                    return prevBench.map(player => 
                      player.id === updatedPlayer.id ? updatedPlayer : player
                    );
                  });
                  
                  setActivePlayer(updatedPlayer);
                }}
              />
            ) : (
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow p-4">
                  <h2 className="text-xl font-bold mb-3">Instructions</h2>
                  <ul className="space-y-2 text-sm">
                    <li>• Click on a player to view and add your opinion</li>
                    <li>• Rate players on a scale of 1-10</li>
                    <li>• Set player status (keep, sell, loan, etc.)</li>
                    <li>• Toggle between Average and My lineup views</li>
                    <li>• Change formation in My Lineup using the dropdown</li>
                    <li>• Drag and drop players to rearrange your team</li>
                    <li>• Share your lineup with others</li>
                  </ul>
                  <div className="mt-4 p-3 bg-gray-100 rounded-md">
                    <h3 className="font-bold text-sm">Lineup Types</h3>
                    <p className="text-xs mt-1">
                      <strong>Average:</strong> The team's most commonly used lineup (fixed)<br />
                      <strong>My Lineup:</strong> Create your own custom lineup and formation
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-4">
                  <h2 className="text-xl font-bold mb-3">Team Summary</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Starting XI:</span>
                      <span className="text-sm font-medium">{displayPlayers.length} players</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Bench:</span>
                      <span className="text-sm font-medium">{benchPlayers.length} players</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Injured:</span>
                      <span className="text-sm font-medium text-red-600">{injuredPlayers.length} players</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Formation:</span>
                      <span className="text-sm font-medium">{displayFormation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">View:</span>
                      <span className="text-sm font-medium">{activeTab === "average" ? "Average Lineup" : "My Lineup"}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
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

export default TeamBuilder;
