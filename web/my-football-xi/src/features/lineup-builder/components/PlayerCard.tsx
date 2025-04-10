
import React from 'react';
import { Player } from '../types';

interface PlayerCardProps {
  player: Player;
  isActive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  onDragStart?: () => void;
  onDragOver?: () => void;
  onDrop?: () => void;
  onDragEnd?: () => void;
  isDragging?: boolean;
  isDropTarget?: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  isActive = false,
  size = 'md',
  onClick,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  isDragging = false,
  isDropTarget = false
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('playerId', player.id);
    if (onDragStart) onDragStart();
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (onDragOver) onDragOver();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (onDrop) onDrop();
  };
  
  const getSize = () => {
    switch(size) {
      case 'sm': return 'w-12 h-12';
      case 'lg': return 'w-20 h-20';
      default: return 'w-16 h-16';
    }
  };
  
  return (
    <div
      className={`
        ${getSize()} 
        rounded-full 
        ${isActive ? 'ring-2 ring-yellow-400' : ''} 
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        ${isDropTarget ? 'bg-yellow-100' : ''}
        transition-all
        cursor-pointer
        flex
        flex-col
        items-center
        justify-center
        bg-white
        shadow-md
      `}
      onClick={onClick}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnd={onDragEnd}
    >
      <div className="text-xs font-bold">{player.number}</div>
      <div className="text-xs truncate max-w-full px-1">{player.name.split(' ').pop()}</div>
    </div>
  );
};

export default PlayerCard;
