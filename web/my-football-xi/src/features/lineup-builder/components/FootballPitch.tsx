
import React from 'react';
import { Player, Formation, PositionCoordinate } from '../types';
import PlayerCard from './PlayerCard';

interface FootballPitchProps {
  players: Player[];
  formation: Formation;
  positions: PositionCoordinate[];
  activePlayer: Player | null;
  onPlayerClick: (player: Player) => void;
  onDragStart: (playerId: string, sourceType: 'pitch' | 'bench', sourceIndex?: number) => void;
  onDragOver: (targetType: 'pitch' | 'bench', targetIndex?: number) => void;
  onDrop: () => void;
  onDragEnd: () => void;
  draggedPlayer?: string;
  dropTarget?: any;
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
  dropTarget
}) => {
  return (
    <div className="relative w-full aspect-[3/2] bg-green-600 rounded-lg overflow-hidden mb-6">
      <div className="absolute top-2 left-2 bg-white bg-opacity-80 px-2 py-1 rounded text-sm">
        Formation: {formation}
      </div>
      
      {positions.map((position, index) => {
        const player = players.find(p => p.id === position.id);
        if (!player) return null;
        
        return (
          <div
            key={position.id}
            style={{
              position: 'absolute',
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            className="transition-all duration-300"
          >
            <PlayerCard 
              player={player} 
              isActive={activePlayer?.id === player.id}
              onClick={() => onPlayerClick(player)}
              onDragStart={() => onDragStart(player.id, 'pitch', index)}
              onDragOver={() => onDragOver('pitch', index)}
              onDrop={onDrop}
              onDragEnd={onDragEnd}
              isDragging={draggedPlayer === player.id}
              isDropTarget={dropTarget?.targetIndex === index && dropTarget?.targetType === 'pitch'}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FootballPitch;
