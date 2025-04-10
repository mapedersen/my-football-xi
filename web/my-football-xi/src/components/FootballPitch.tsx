
import React from "react";
import { Formation, Player, FormationPosition } from "../models/Player";
import PlayerCard from "./PlayerCard";

interface FootballPitchProps {
  players: Player[];
  formation: Formation;
  positions: FormationPosition[];
  activePlayer: Player | null;
  onPlayerClick: (player: Player) => void;
  onDragStart?: (playerId: string, index: number, isFromBench: boolean) => void;
  onDragOver?: (index: number, isBench: boolean) => void;
  onDrop?: (index: number, isBench: boolean) => void;
  onDragEnd?: () => void;
  draggedPlayer?: string | null;
  dropTarget?: number | null;
}

const FootballPitch: React.FC<FootballPitchProps> = ({
  players,
  formation,
  positions,
  activePlayer,
  onPlayerClick,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  draggedPlayer,
  dropTarget,
}) => {
  return (
    <div className="pitch w-full h-[600px] md:h-[700px] lg:h-[800px] relative">
      {/* Pitch markings */}
      <svg className="pitch-markings" viewBox="0 0 100 100">
        {/* Outline */}
        <rect x="0" y="0" width="100" height="100" />
        
        {/* Center circle */}
        <circle cx="50" cy="50" r="10" />
        <line x1="0" y1="50" x2="100" y2="50" />
        
        {/* Penalty areas */}
        <rect x="15" y="75" width="70" height="20" />
        <rect x="15" y="5" width="70" height="20" />
        
        {/* Goal areas */}
        <rect x="30" y="85" width="40" height="10" />
        <rect x="30" y="5" width="40" height="10" />
        
        {/* Penalty spots */}
        <circle cx="50" cy="80" r="0.5" />
        <circle cx="50" cy="20" r="0.5" />
      </svg>
      
      {/* Players */}
      {positions.map((position, index) => {
        const playerForPosition = players[index] || null;
        
        return (
          <div
            key={position.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
            }}
          >
            {playerForPosition ? (
              <PlayerCard
                player={playerForPosition}
                isActive={activePlayer?.id === playerForPosition.id}
                isSmall={true}
                onClick={() => onPlayerClick(playerForPosition)}
                index={index}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
                onDragEnd={onDragEnd}
                isDragging={draggedPlayer === playerForPosition.id}
                isDropTarget={dropTarget === index}
              />
            ) : (
              <div 
                className={cn(
                  "empty-position w-[60px] h-[60px] flex items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-white/30 text-xs font-medium text-gray-500 transition-all",
                  dropTarget === index && "ring-2 ring-united-red border-united-red"
                )}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (onDragOver) onDragOver(index, false);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  if (onDrop) onDrop(index, false);
                }}
              >
                {position.label}
              </div>
            )}
          </div>
        );
      })}
      
      <div className="absolute left-1/2 bottom-2 transform -translate-x-1/2">
        <div className="bg-black/60 text-white px-3 py-1 rounded-full text-xs font-medium">
          {formation}
        </div>
      </div>
    </div>
  );
};

// Add cn utility if not imported
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

export default FootballPitch;
