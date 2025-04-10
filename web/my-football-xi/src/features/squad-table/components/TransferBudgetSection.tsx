
import React from 'react';
import { DollarSign, Users, TrendingUp, Award } from 'lucide-react';

interface TransferBudgetSectionProps {
  teamId: string;
}

const TransferBudgetSection: React.FC<TransferBudgetSectionProps> = ({ teamId }) => {
  const getBudgetInfo = () => {
    // In a real app, this would come from calculations based on player sales and status
    return {
      totalBudget: '£120M',
      wageSpace: '£650K/week',
      pendingSales: '£45M',
      pendingPurchases: '£0',
      netSpend: '-£45M'
    };
  };
  
  const budgetInfo = getBudgetInfo();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold mb-4">Transfer Budget</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <DollarSign className="w-4 h-4" />
            <span>Total Budget</span>
          </div>
          <div className="text-lg font-bold">{budgetInfo.totalBudget}</div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Users className="w-4 h-4" />
            <span>Wage Space</span>
          </div>
          <div className="text-lg font-bold">{budgetInfo.wageSpace}</div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>Pending Sales</span>
          </div>
          <div className="text-lg font-bold text-green-600">{budgetInfo.pendingSales}</div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <DollarSign className="w-4 h-4" />
            <span>Pending Purchases</span>
          </div>
          <div className="text-lg font-bold text-red-600">{budgetInfo.pendingPurchases}</div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Award className="w-4 h-4" />
            <span>Net Spend</span>
          </div>
          <div className="text-lg font-bold text-green-600">{budgetInfo.netSpend}</div>
        </div>
      </div>
    </div>
  );
};

export default TransferBudgetSection;
