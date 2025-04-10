
import React from "react";
import { Player, FormationPosition, Formation } from "../types";
import PlayerCard from "./PlayerCard";
import { cn } from "@/lib/utils";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface Position {
  x: number;
  y: number;
}

interface PlayerPosition {
  player: Player;
  position: Position;
}

interface FootballPitchProps {
  activePlayers: PlayerPosition[];
  onPlayerClick: (player: Player) => void;
  isDragging?: boolean;
  onDragStart?: (playerId: string, index: number) => void;
  onDragOver?: (index: number) => void;
  onDrop?: () => void;
  onDragEnd?: () => void;
  draggedPlayer?: string | null;
  dropTarget?: number | null;
  onFormationChange?: (newFormation: Formation) => void;
  currentFormation?: Formation;
  onShareLineup?: () => void;
  isFixedLineup?: boolean;
}

const FootballPitch: React.FC<FootballPitchProps> = ({
  activePlayers,
  onPlayerClick,
  isDragging,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  draggedPlayer,
  dropTarget,
  onFormationChange,
  currentFormation = "4-3-3",
  onShareLineup,
  isFixedLineup = false,
}) => {
  // Default values to prevent undefined errors
  const playersToRender = activePlayers || [];
  
  // List of available formations
  const formations: Formation[] = [
    "4-3-3", 
    "4-4-2", 
    "3-5-2", 
    "4-2-3-1", 
    "5-3-2", 
    "3-4-3", 
    "4-5-1", 
    "4-1-4-1",
    "4-4-1-1",
    "3-6-1"
  ];
  
  return (
    <div className="pitch w-full h-[600px] md:h-[700px] lg:h-[800px] relative bg-green-600 rounded-lg overflow-hidden mb-6">
      {/* Controls at the top */}
      <div className="absolute top-2 left-2 right-2 flex justify-between items-center">
        <div className="bg-white/80 rounded-md p-1 shadow">
          {onFormationChange && !isFixedLineup ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Formation:</span>
              <Select
                value={currentFormation}
                onValueChange={(value) => onFormationChange(value as Formation)}
                disabled={isFixedLineup}
              >
                <SelectTrigger className="w-28 h-8">
                  <SelectValue placeholder="Formation" />
                </SelectTrigger>
                <SelectContent>
                  {formations.map(formation => (
                    <SelectItem key={formation} value={formation}>{formation}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="px-2 py-1 text-sm font-medium text-gray-700">
              Formation: {currentFormation}
            </div>
          )}
        </div>
        
        {onShareLineup && (
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white/80"
            onClick={onShareLineup}
          >
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        )}
      </div>

      {/* Pitch markings */}
      <svg className="pitch-markings absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Outline */}
        <rect x="0" y="0" width="100" height="100" fill="none" stroke="white" strokeWidth="0.5" />
        
        {/* Center circle */}
        <circle cx="50" cy="50" r="10" fill="none" stroke="white" strokeWidth="0.3" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.3" />
        
        {/* Penalty areas */}
        <rect x="15" y="75" width="70" height="20" fill="none" stroke="white" strokeWidth="0.3" />
        <rect x="15" y="5" width="70" height="20" fill="none" stroke="white" strokeWidth="0.3" />
        
        {/* Goal areas */}
        <rect x="30" y="85" width="40" height="10" fill="none" stroke="white" strokeWidth="0.3" />
        <rect x="30" y="5" width="40" height="10" fill="none" stroke="white" strokeWidth="0.3" />
        
        {/* Penalty spots */}
        <circle cx="50" cy="80" r="0.5" fill="white" />
        <circle cx="50" cy="20" r="0.5" fill="white" />
      </svg>
      
      {/* Players */}
      {playersToRender.map((playerPos, index) => {
        const player = playerPos.player;
        const position = playerPos.position;
        
        if (!player || !position) return null;
        
        return (
          <div
            key={`player-position-${index}`}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
            }}
          >
            <PlayerCard
              player={player}
              isActive={false}
              isSmall={true}
              onClick={() => onPlayerClick(player)}
              index={index}
              onDragStart={!isFixedLineup ? onDragStart : undefined}
              onDragOver={!isFixedLineup ? onDragOver : undefined}
              onDrop={!isFixedLineup ? onDrop : undefined}
              onDragEnd={!isFixedLineup ? onDragEnd : undefined}
              isDragging={draggedPlayer === player.id}
              isDropTarget={dropTarget === index}
            />
          </div>
        );
      })}
      
      <div className="absolute left-1/2 bottom-2 transform -translate-x-1/2">
        <div className="bg-black/60 text-white px-3 py-1 rounded-full text-xs font-medium">
          {playersToRender.length > 0 ? `${playersToRender.length} Players | ${currentFormation}` : "No formation set"}
        </div>
      </div>
    </div>
  );
};

export default FootballPitch;
