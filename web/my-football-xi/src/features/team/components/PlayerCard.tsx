
import React from "react";
import { Player } from "../types";
import { cn } from "@/lib/utils";

interface PlayerCardProps {
  player: Player;
  isActive?: boolean;
  isSmall?: boolean;
  onClick?: () => void;
  isDragging?: boolean;
  index?: number;
  onDragStart?: (playerId: string, index: number, isFromBench: boolean) => void;
  onDragOver?: (index: number, isBench: boolean) => void;
  onDrop?: (index: number, isBench: boolean) => void;
  onDragEnd?: () => void;
  isFromBench?: boolean;
  isDropTarget?: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  isActive = false,
  isSmall = false,
  onClick,
  isDragging = false,
  index = 0,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  isFromBench = false,
  isDropTarget = false,
}) => {
  const { name, number, position, image, salary, stats, status } = player;

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", player.id);
    if (onDragStart) {
      onDragStart(player.id, index, isFromBench);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (onDragOver) {
      onDragOver(index, isFromBench);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (onDrop) {
      onDrop(index, isFromBench);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Fallback to a placeholder image if the player image fails to load
    e.currentTarget.src = '/placeholder.svg';
  };

  return (
    <div
      className={cn(
        "player-card group cursor-grab",
        isActive && "player-card-active",
        isSmall ? "w-[100px]" : "w-[140px]",
        isDragging && "opacity-50",
        isDropTarget && "ring-2 ring-united-red ring-offset-2",
        "animate-fade-in transition-all",
      )}
      onClick={onClick}
      draggable={true}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnd={onDragEnd}
    >
      <div className="relative">
        <div className="absolute top-1 left-1 z-10 bg-united-red text-white rounded-md px-1.5 py-0.5 text-xs font-bold">
          {number}
        </div>
        <div className="absolute top-1 right-1 z-10 bg-black/70 text-white rounded-md px-1.5 py-0.5 text-xs font-medium">
          {position}
        </div>
        <div className="aspect-square overflow-hidden rounded-t-lg bg-gray-100">
          {image && (
            <img 
              src={image} 
              alt={name} 
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
              loading="lazy"
              onError={handleImageError}
            />
          )}
        </div>
      </div>
      
      <div className="p-2 bg-white rounded-b-lg border-t border-gray-200">
        <h3 className="font-bold text-xs truncate">{name}</h3>
        
        {!isSmall && (
          <>
            <div className="text-xs text-gray-500 mt-1">{salary}</div>
            <div className="flex justify-between items-center mt-1">
              <div className="text-xs">
                {stats.appearances} apps, {stats.goals} goals
              </div>
            </div>
          </>
        )}
        
        {status && (
          <div className="mt-1 flex flex-wrap gap-1">
            {status.captain && (
              <span className="status-badge status-badge-captain">C</span>
            )}
            {status.injured && (
              <span className="status-badge status-badge-injured">INJ</span>
            )}
            {status.onLoan && (
              <span className="status-badge status-badge-loan">LOAN</span>
            )}
          </div>
        )}
        
        {player.tags && player.tags.length > 0 && !isSmall && (
          <div className="mt-1 flex flex-wrap gap-1">
            {player.tags.map((tag) => (
              <span key={tag.id} className={cn("status-badge", tag.color)}>
                {tag.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
