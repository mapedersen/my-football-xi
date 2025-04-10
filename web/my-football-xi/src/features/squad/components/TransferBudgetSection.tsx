
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/shared/components/ui/hover-card";
import { formatCurrency } from '../utils/squadUtils';
import { useSquadQuery } from '../hooks/useSquadQueries';

interface TransferBudgetSectionProps {
  teamId: string;
}

/**
 * Component for displaying transfer budget information
 */
const TransferBudgetSection: React.FC<TransferBudgetSectionProps> = ({ teamId }) => {
  const { data: squadData, isLoading } = useSquadQuery(teamId);
  
  if (isLoading || !squadData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-14 bg-gray-200 rounded"></div>
          <div className="h-14 bg-gray-200 rounded"></div>
          <div className="h-14 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  const pendingSales = squadData.players
    .filter(p => p.status?.recommendation === 'sell')
    .reduce((total, player) => total + (player.marketValue || 0), 0);
  
  const totalBudget = squadData.transferBudget + pendingSales;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-xl font-bold mb-4">Transfer Window Budget</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Card className="cursor-help">
              <CardHeader className="p-3">
                <CardTitle className="text-sm text-gray-500">Available Budget</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <p className="text-2xl font-bold">
                  {formatCurrency(squadData.transferBudget)}
                </p>
              </CardContent>
            </Card>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="space-y-2">
              <h4 className="font-medium">Budget Breakdown</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Initial Budget:</span>
                  <span>{formatCurrency(squadData.transferBudget)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Spent:</span>
                  <span className="text-red-500">-{formatCurrency(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Income:</span>
                  <span className="text-green-500">+{formatCurrency(0)}</span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        
        <Card>
          <CardHeader className="p-3">
            <CardTitle className="text-sm text-gray-500">Pending Sales</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <p className="text-2xl font-bold text-green-600">
              +{formatCurrency(pendingSales)}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-3">
            <CardTitle className="text-sm text-gray-500">Wage Budget</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <p className="text-2xl font-bold">
              {formatCurrency(squadData.wageSpace)}/week
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-4 text-right text-sm text-gray-500">
        <span>Total potential budget: </span>
        <span className="font-bold text-base">{formatCurrency(totalBudget)}</span>
      </div>
    </div>
  );
};

export default TransferBudgetSection;
