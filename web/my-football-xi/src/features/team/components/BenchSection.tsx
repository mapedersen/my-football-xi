
import React from "react";
import { Player } from "../types";
import PlayerCard from "./PlayerCard";

interface BenchSectionProps {
  players: Player[];
  activePlayer: Player | null;
  onPlayerClick: (player: Player) => void;
  onDragStart?: (playerId: string, index: number, isFromBench: boolean) => void;
  onDragOver?: (index: number, isBench: boolean) => void;
  onDrop?: () => void;
  onDragEnd?: () => void;
  draggedPlayer?: string | null;
  dropTarget?: number | null;
  injuredPlayers?: Player[];
}

const BenchSection: React.FC<BenchSectionProps> = ({
  players,
  activePlayer,
  onPlayerClick,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  draggedPlayer,
  dropTarget,
  injuredPlayers = [],
}) => {
  return (
    <div 
      className="mt-4 bg-gray-100 rounded-lg p-4"
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      <h2 className="text-lg font-bold mb-3">Bench & Reserves</h2>
      <div 
        className="flex gap-3 overflow-x-auto pb-2"
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        {players.map((player, index) => (
          <div key={player.id} className="w-[120px]">
            <PlayerCard
              player={player}
              isActive={activePlayer?.id === player.id}
              isSmall={true}
              onClick={() => onPlayerClick(player)}
              index={index}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragEnd={onDragEnd}
              isFromBench={true}
              isDragging={draggedPlayer === player.id}
              isDropTarget={dropTarget === index}
            />
          </div>
        ))}
        
        {/* Empty slot for adding players */}
        <div 
          className="w-[120px] h-[160px] flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white/50 text-xs font-medium text-gray-500"
          onDragOver={(e) => {
            e.preventDefault();
            if (onDragOver) onDragOver(players.length, true);
          }}
          onDrop={(e) => {
            e.preventDefault();
            if (onDrop) onDrop();
          }}
        >
          Drop player here
        </div>
      </div>
      
      {/* Injured players section */}
      {injuredPlayers.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold text-red-600 mb-2">Injured Players</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {injuredPlayers.map((player, index) => (
              <div key={player.id} className="w-[120px] relative">
                <PlayerCard
                  player={player}
                  isActive={activePlayer?.id === player.id}
                  isSmall={true}
                  onClick={() => onPlayerClick(player)}
                  index={index}
                  isFromBench={true}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded">
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-semibold">
                    INJURED
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BenchSection;
