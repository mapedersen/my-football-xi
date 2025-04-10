
import React from 'react';
import { Player } from '../types';
import PlayerCard from './PlayerCard';

interface BenchSectionProps {
  players: Player[];
  activePlayer: Player | null;
  onPlayerClick: (player: Player) => void;
  onDragStart: (playerId: string, sourceType: 'pitch' | 'bench', sourceIndex?: number) => void;
  onDragOver: (targetType: 'pitch' | 'bench', targetIndex?: number) => void;
  onDrop: () => void;
  onDragEnd: () => void;
  draggedPlayer?: string;
  dropTarget?: any;
}

const BenchSection: React.FC<BenchSectionProps> = ({
  players,
  activePlayer,
  onPlayerClick,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDrop,
  draggedPlayer,
  dropTarget
}) => {
  return (
    <div 
      className="bg-gray-100 rounded-lg p-4 mb-6"
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver('bench');
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop();
      }}
    >
      <h2 className="text-lg font-bold mb-3">Bench</h2>
      <div className="flex flex-wrap gap-4">
        {players.map((player, index) => (
          <div key={player.id}>
            <PlayerCard 
              player={player} 
              isActive={activePlayer?.id === player.id}
              size="sm"
              onClick={() => onPlayerClick(player)}
              onDragStart={() => onDragStart(player.id, 'bench', index)}
              onDragOver={() => onDragOver('bench', index)}
              onDrop={onDrop}
              onDragEnd={onDragEnd}
              isDragging={draggedPlayer === player.id}
              isDropTarget={dropTarget?.targetIndex === index && dropTarget?.targetType === 'bench'}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenchSection;
