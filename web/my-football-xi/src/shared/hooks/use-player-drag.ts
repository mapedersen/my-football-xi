
import { useState } from 'react';

export type DragInfo = {
  playerId: string;
  sourceType: 'pitch' | 'bench';
  sourceIndex?: number;
};

export type DropTarget = {
  targetType: 'pitch' | 'bench';
  targetIndex?: number;
};

export const usePlayerDrag = (
  startingXI: any[],
  bench: any[],
  onPlayersMoved: (newStartingXI: any[], newBench: any[]) => void
) => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedPlayer, setDraggedPlayer] = useState<DragInfo | null>(null);
  const [dropTarget, setDropTarget] = useState<DropTarget | null>(null);

  const handleDragStart = (playerId: string, sourceType: 'pitch' | 'bench', sourceIndex?: number) => {
    setIsDragging(true);
    setDraggedPlayer({ playerId, sourceType, sourceIndex });
  };

  const handleDragOver = (targetType: 'pitch' | 'bench', targetIndex?: number) => {
    setDropTarget({ targetType, targetIndex });
  };

  const handleDrop = () => {
    if (!draggedPlayer || !dropTarget) return;

    const { playerId, sourceType, sourceIndex } = draggedPlayer;
    const { targetType, targetIndex } = dropTarget;

    // Don't do anything if dropping onto the same spot
    if (sourceType === targetType && sourceIndex === targetIndex) {
      return;
    }

    // Find the player being dragged
    const playerSource = sourceType === 'pitch' ? startingXI : bench;
    const playerIndex = sourceIndex !== undefined ? sourceIndex : 
                        playerSource.findIndex(p => p.id === playerId);
    
    if (playerIndex === -1) return;

    const player = playerSource[playerIndex];
    
    // Create new arrays
    const newStartingXI = [...startingXI];
    const newBench = [...bench];

    // Remove player from source
    if (sourceType === 'pitch') {
      newStartingXI.splice(playerIndex, 1);
    } else {
      newBench.splice(playerIndex, 1);
    }

    // Add player to target
    if (targetType === 'pitch') {
      if (targetIndex !== undefined) {
        newStartingXI.splice(targetIndex, 0, player);
      } else {
        newStartingXI.push(player);
      }
    } else {
      if (targetIndex !== undefined) {
        newBench.splice(targetIndex, 0, player);
      } else {
        newBench.push(player);
      }
    }

    // Update state
    onPlayersMoved(newStartingXI, newBench);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedPlayer(null);
    setDropTarget(null);
  };

  return {
    isDragging,
    draggedPlayer,
    dropTarget,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd
  };
};
