
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Player } from '@/features/team/types';

interface PlayerFilterTabsProps {
  squad: Player[];
  activeFilter: string;
  onFilterChange: (value: string) => void;
}

const PlayerFilterTabs: React.FC<PlayerFilterTabsProps> = ({ 
  squad, 
  activeFilter, 
  onFilterChange 
}) => {
  const keepPlayers = squad.filter(p => p.status?.recommendation === 'keep' || !p.status?.recommendation);
  const sellPlayers = squad.filter(p => p.status?.recommendation === 'sell');
  const loanPlayers = squad.filter(p => p.status?.recommendation === 'loan');
  const injuredPlayers = squad.filter(p => p.status?.injured);

  return (
    <div className="p-4 border-b">
      <Tabs value={activeFilter} onValueChange={onFilterChange}>
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="all">
            All Players ({squad.length})
          </TabsTrigger>
          <TabsTrigger value="keep">
            Keep ({keepPlayers.length})
          </TabsTrigger>
          <TabsTrigger value="sell" className="text-red-600">
            Sell ({sellPlayers.length})
          </TabsTrigger>
          <TabsTrigger value="loan" className="text-blue-600">
            Loan ({loanPlayers.length})
          </TabsTrigger>
          <TabsTrigger value="injured" className="text-red-700">
            Injured ({injuredPlayers.length})
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default PlayerFilterTabs;
