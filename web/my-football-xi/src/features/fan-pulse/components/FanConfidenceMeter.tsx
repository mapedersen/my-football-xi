
import React from "react";
import { ArrowUp, ArrowDown, TrendingUp, Award, Users, Calendar } from "lucide-react";
import { Progress } from "@/shared/components/ui/progress";

interface FanConfidenceMeterProps {
  teamId: string;
}

const FanConfidenceMeter: React.FC<FanConfidenceMeterProps> = ({ teamId }) => {
  // Mock data - in a real app this would come from an API
  const confidenceData = {
    overall: 65,
    trending: "+7%",
    isPositive: true,
    categories: [
      { name: "Team Performance", value: 58, trend: -5, isPositive: false },
      { name: "Transfer Activity", value: 72, trend: 12, isPositive: true },
      { name: "Youth Development", value: 89, trend: 4, isPositive: true },
      { name: "Manager Trust", value: 61, trend: -2, isPositive: false },
      { name: "Board Confidence", value: 45, trend: 8, isPositive: true },
    ],
    historicalData: [
      { month: "Nov", value: 52 },
      { month: "Dec", value: 58 },
      { month: "Jan", value: 53 },
      { month: "Feb", value: 60 },
      { month: "Mar", value: 65 },
    ],
  };

  // Helper function for confidence level text and color
  const getConfidenceLevel = (value: number) => {
    if (value >= 80) return { text: "Excellent", color: "text-green-600" };
    if (value >= 60) return { text: "Good", color: "text-blue-600" };
    if (value >= 40) return { text: "Average", color: "text-yellow-600" };
    if (value >= 20) return { text: "Poor", color: "text-orange-600" };
    return { text: "Critical", color: "text-red-600" };
  };

  const overallConfidence = getConfidenceLevel(confidenceData.overall);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Fan Confidence Meter</h2>
        <p className="text-gray-600 mb-6">
          Track how confident fans are feeling about different aspects of the club
        </p>
      </div>

      {/* Overall Confidence */}
      <div className="bg-gray-50 p-6 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold">Overall Fan Confidence</h3>
          <div className="flex items-center gap-2">
            <span className={`font-bold text-lg ${overallConfidence.color}`}>
              {confidenceData.overall}%
            </span>
            <span className={confidenceData.isPositive ? "text-green-600" : "text-red-600"}>
              {confidenceData.isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              {confidenceData.trending}
            </span>
          </div>
        </div>
        
        <Progress value={confidenceData.overall} className="h-3 mb-2" />
        
        <div className="flex justify-between text-sm text-gray-500">
          <span>Critical</span>
          <span>Poor</span>
          <span>Average</span>
          <span>Good</span>
          <span>Excellent</span>
        </div>
        
        <div className="mt-4 flex items-center justify-center">
          <div className="bg-white px-6 py-3 rounded-full shadow-sm">
            <span className="font-semibold">Current Level: </span>
            <span className={`font-bold ${overallConfidence.color}`}>{overallConfidence.text}</span>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Award className="w-5 h-5" /> Confidence by Category
        </h3>
        
        <div className="space-y-4">
          {confidenceData.categories.map((category) => (
            <div key={category.name} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{category.name}</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{category.value}%</span>
                  <span className={category.isPositive ? "text-green-600" : "text-red-600"}>
                    {category.isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                    {Math.abs(category.trend)}%
                  </span>
                </div>
              </div>
              <Progress value={category.value} className="h-2" />
            </div>
          ))}
        </div>
      </div>

      {/* Historical Trend */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" /> Historical Confidence Trend
        </h3>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-end justify-between h-40 mb-2">
            {confidenceData.historicalData.map((item) => (
              <div key={item.month} className="flex flex-col items-center">
                <div 
                  className="bg-blue-600 w-12 rounded-t-md" 
                  style={{ height: `${item.value * 0.4}%` }}
                ></div>
                <span className="text-xs mt-1">{item.month}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Last 5 months</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>Based on 12,458 fan votes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FanConfidenceMeter;
