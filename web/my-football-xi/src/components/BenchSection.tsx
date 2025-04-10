
import React from "react";
import { Player } from "../models/Player";
import PlayerCard from "./PlayerCard";

interface BenchSectionProps {
  players: Player[];
  activePlayer: Player | null;
  onPlayerClick: (player: Player) => void;
  onDragStart?: (playerId: string, index: number, isFromBench: boolean) => void;
  onDragOver?: (index: number, isBench: boolean) => void;
  onDrop?: (index: number, isBench: boolean) => void;
  onDragEnd?: () => void;
  draggedPlayer?: string | null;
  dropTarget?: number | null;
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
}) => {
  const handlePlayerClick = (player: Player) => {
    // Don't allow selecting injured players
    if (player.status?.injured) {
      return;
    }
    onPlayerClick(player);
  };

  // Separate injured players for the injury list
  const availablePlayers = players.filter(player => !player.status?.injured);
  const injuredPlayers = players.filter(player => player.status?.injured);

  return (
    <div className="mt-4 space-y-4">
      <div 
        className="bg-gray-100 rounded-lg p-4"
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
          {availablePlayers.map((player, index) => (
            <div key={player.id} className="min-w-[100px]">
              <PlayerCard
                player={player}
                isActive={activePlayer?.id === player.id}
                isSmall={true}
                onClick={() => handlePlayerClick(player)}
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
            className="min-w-[100px] h-[120px] flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white/50 text-xs font-medium text-gray-500"
            onDragOver={(e) => {
              e.preventDefault();
              if (onDragOver) onDragOver(availablePlayers.length, true);
            }}
            onDrop={(e) => {
              e.preventDefault();
              if (onDrop) onDrop(availablePlayers.length, true);
            }}
          >
            Drop player here
          </div>
        </div>
      </div>
      
      {/* Injury List Section */}
      {injuredPlayers.length > 0 && (
        <div className="bg-red-50 rounded-lg p-4">
          <h2 className="text-lg font-bold mb-3 text-red-800">Injury List</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {injuredPlayers.map((player, index) => (
              <div key={player.id} className="min-w-[100px]">
                <div className="relative">
                  <PlayerCard
                    player={player}
                    isSmall={true}
                    onClick={() => {}} // No action on click for injured players
                    isFromBench={true}
                    index={index + availablePlayers.length}
                  />
                  <div className="absolute inset-0 bg-red-900/10 rounded-lg flex items-center justify-center">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold">
                      INJURED
                    </span>
                  </div>
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
