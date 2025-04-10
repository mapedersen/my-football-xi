
import { useState, useEffect } from 'react';
import { getStartingXI, getBench } from '../mocks/playerMock';
import { Player, Formation } from '../types';

export const useTeam = (teamId: string) => {
  const [startingXI, setStartingXI] = useState<Player[]>([]);
  const [bench, setBench] = useState<Player[]>([]);
  const [formation, setFormation] = useState<Formation>("4-3-3");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      // In a real app, this would be an API call
      setTimeout(() => {
        // Load data from mock
        setStartingXI(getStartingXI());
        setBench(getBench());
        setLoading(false);
      }, 300);
    } catch (err) {
      console.error("Error loading team data:", err);
      setError("Failed to load team data. Please try again.");
      setLoading(false);
    }
  }, [teamId]);

  const handleFormationChange = (newFormation: Formation) => {
    setFormation(newFormation);
  };

  const handleUpdatePlayer = (updatedPlayer: Player) => {
    // Check if player is in starting XI
    const startingXIIndex = startingXI.findIndex(p => p.id === updatedPlayer.id);
    if (startingXIIndex !== -1) {
      const newStartingXI = [...startingXI];
      newStartingXI[startingXIIndex] = updatedPlayer;
      setStartingXI(newStartingXI);
      return;
    }

    // Check if player is on bench
    const benchIndex = bench.findIndex(p => p.id === updatedPlayer.id);
    if (benchIndex !== -1) {
      const newBench = [...bench];
      newBench[benchIndex] = updatedPlayer;
      setBench(newBench);
    }
  };

  return {
    startingXI,
    setStartingXI,
    bench,
    setBench,
    formation,
    setFormation,
    handleFormationChange,
    handleUpdatePlayer,
    loading,
    error
  };
};
