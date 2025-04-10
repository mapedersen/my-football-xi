
import { useRef, useState } from 'react';
import { DragItem, Player, PositionKey } from '@/models/Player';

export function usePlayerDrag(
  startingXI: Player[],
  bench: Player[],
  onPlayersUpdate: (newStartingXI: Player[], newBench: Player[]) => void
) {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedPlayer, setDraggedPlayer] = useState<DragItem | null>(null);
  const [dropTarget, setDropTarget] = useState<number | null>(null);

  // Start dragging a player
  const handleDragStart = (playerId: string, index: number, isFromBench: boolean) => {
    setIsDragging(true);
    setDraggedPlayer({
      type: 'player',
      playerId,
      sourcePosition: index,
      isFromBench
    });
  };

  // Handle drag over a position
  const handleDragOver = (index: number, isBench: boolean) => {
    setDropTarget(index);
  };

  // Handle dropping a player
  const handleDrop = (targetIndex: number, isBenchTarget: boolean) => {
    if (!draggedPlayer) return;

    const { playerId, sourcePosition, isFromBench } = draggedPlayer;

    // Creating new copies of the arrays
    const newStartingXI = [...startingXI];
    const newBench = [...bench];

    // Find player in the appropriate array
    const sourceArray = isFromBench ? newBench : newStartingXI;
    const playerIndex = sourceArray.findIndex(p => p.id === playerId);
    
    if (playerIndex === -1) return;
    
    const player = {...sourceArray[playerIndex]};
    
    // Remove player from source array
    if (isFromBench) {
      newBench.splice(playerIndex, 1);
    } else {
      newStartingXI.splice(playerIndex, 1);
    }
    
    // Add player to target array
    if (isBenchTarget) {
      newBench.splice(targetIndex, 0, player);
    } else {
      // If we're dropping to formation, we swap positions
      if (newStartingXI[targetIndex]) {
        const swappedPlayer = {...newStartingXI[targetIndex]};
        newStartingXI[targetIndex] = player;
        
        // If dragging from bench, add swapped player to bench
        if (isFromBench) {
          newBench.push(swappedPlayer);
        } else {
          // If dragging within formation, place swapped player at original position
          newStartingXI.splice(playerIndex, 0, swappedPlayer);
        }
      } else {
        newStartingXI[targetIndex] = player;
      }
    }
    
    // Update state
    onPlayersUpdate(newStartingXI, newBench);
    
    // Reset drag state
    setIsDragging(false);
    setDraggedPlayer(null);
    setDropTarget(null);
  };
  
  // Handle end of drag
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
}
