
import React from 'react';
import { Player } from '@/models/Player';
import { formatCurrency, getSalaryNumeric } from '../utils/squadUtils';

interface PerformanceInsightsProps {
  squad: Player[];
}

/**
 * Component for displaying squad performance insights
 */
const PerformanceInsights: React.FC<PerformanceInsightsProps> = ({ squad }) => {
  const averageAge = Math.round(squad.reduce((sum, player) => sum + (player.age || 0), 0) / (squad.length || 1));
  const averageSalary = Math.round(squad.reduce((sum, player) => sum + getSalaryNumeric(player.salary), 0) / (squad.length || 1));
  const totalGoals = squad.reduce((sum, player) => sum + player.stats.goals, 0);
  const totalAppearances = squad.reduce((sum, player) => sum + player.stats.appearances, 0);
  
  const positionGroups = {
    Goalkeepers: squad.filter(p => p.position === 'GK').length,
    Defenders: squad.filter(p => ['CB', 'LB', 'RB', 'LWB', 'RWB'].includes(p.position)).length,
    Midfielders: squad.filter(p => ['CM', 'CDM', 'CAM', 'LM', 'RM'].includes(p.position)).length,
    Forwards: squad.filter(p => ['ST', 'CF', 'LW', 'RW'].includes(p.position)).length
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>
            Squad Overview
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Squad Size:</span>
              <span className="font-medium">{squad.length} players</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Average Age:</span>
              <span className="font-medium">{averageAge} years</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Average Salary:</span>
              <span className="font-medium">{formatCurrency(averageSalary)}/week</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Total Wage Bill:</span>
              <span className="font-medium">{formatCurrency(averageSalary * squad.length)}/week</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Total Goals:</span>
              <span className="font-medium">{totalGoals}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Total Appearances:</span>
              <span className="font-medium">{totalAppearances}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Injured Players:</span>
              <span className="font-medium text-red-600">{squad.filter(p => p.status?.injured).length}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Position Analysis</h3>
          <div className="space-y-4">
            {Object.entries(positionGroups).map(([position, count]) => (
              <div key={position} className="flex justify-between items-center">
                <span className="text-gray-500">{position}:</span>
                <span className="font-medium">{count}</span>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t">
              <h4 className="font-medium mb-2">Position Needs:</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Central Midfield:</span>
                  <span className="text-red-500">High Priority</span>
                </div>
                <div className="flex justify-between">
                  <span>Right Wing:</span>
                  <span className="text-yellow-500">Medium Priority</span>
                </div>
                <div className="flex justify-between">
                  <span>Center Back:</span>
                  <span className="text-green-500">Low Priority</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Goal Scoring</span>
                <span className="font-medium">{Math.round(totalGoals / squad.length * 10)}/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.min(100, totalGoals / squad.length * 25)}%` }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Clean Sheets</span>
                <span className="font-medium">6/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Pass Completion</span>
                <span className="font-medium">8/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Aerial Duels</span>
                <span className="font-medium">7/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Fitness Level</span>
                <span className="font-medium">{Math.round((squad.length - squad.filter(p => p.status?.injured).length) / squad.length * 10)}/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(squad.length - squad.filter(p => p.status?.injured).length) / squad.length * 100}%` }}></div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t text-sm text-gray-500">
              <p>Based on last 10 matches performance data</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Value for Money</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Top Performers vs. Salary</p>
              <div className="space-y-3">
                {squad
                  .sort((a, b) => b.stats.goals / getSalaryNumeric(b.salary) - a.stats.goals / getSalaryNumeric(a.salary))
                  .slice(0, 5)
                  .map((player) => (
                    <div key={player.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img 
                          src={player.image} 
                          alt={player.name} 
                          className="w-8 h-8 rounded-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.svg';
                          }}
                        />
                        <span>{player.name}</span>
                      </div>
                      <span className="text-green-600 font-medium">{formatCurrency(getSalaryNumeric(player.salary))}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Fan Favorite Players</h3>
          <div className="space-y-4">
            <div className="space-y-3">
              {squad
                .sort((a, b) => (b.fanPulse || 75) - (a.fanPulse || 75))
                .slice(0, 5)
                .map((player, index) => (
                  <div key={player.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <img 
                        src={player.image} 
                        alt={player.name} 
                        className="w-8 h-8 rounded-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                      <span>{player.name}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${player.fanPulse || 75}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{player.fanPulse || 75}%</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceInsights;
