
import React from 'react';
import { AIRecommendation } from '../types';
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Progress } from "@/shared/components/ui/progress";
import { PlusCircle, DollarSign, ChevronRight, Crown } from 'lucide-react';
import { toast } from 'sonner';

interface AIRecommendationCardProps {
  recommendation: AIRecommendation;
  onAddToWantedList?: (recommendation: AIRecommendation) => void;
}

const AIRecommendationCard: React.FC<AIRecommendationCardProps> = ({ 
  recommendation,
  onAddToWantedList
}) => {
  const handleAddToWantedList = () => {
    if (onAddToWantedList) {
      onAddToWantedList(recommendation);
      toast.success(`${recommendation.playerName} added to your wanted list`);
    }
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 border-l-4 border-l-blue-500 mb-3">
      <CardContent className="p-3">
        <div className="flex gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
            <img 
              src={recommendation.photo} 
              alt={recommendation.playerName}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 overflow-hidden">
            <div className="flex justify-between items-start">
              <h4 className="font-semibold text-base truncate">{recommendation.playerName}</h4>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">AI Pick</Badge>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <span className="font-medium">{recommendation.position}</span>
              <span className="mx-1.5">•</span>
              <span>{recommendation.age} years</span>
              <span className="mx-1.5">•</span>
              <span className="truncate">{recommendation.nationality}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm">
                <DollarSign className="w-3.5 h-3.5 text-green-600 mr-0.5" />
                <span className="font-medium text-green-600">{recommendation.marketValue}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <Crown className="w-3.5 h-3.5 text-amber-500 mr-0.5" />
                <span>Compatibility:</span>
                <div className="ml-1 w-20 h-1.5 bg-gray-200 rounded overflow-hidden">
                  <div 
                    className="h-full bg-amber-500"
                    style={{ width: `${recommendation.compatibilityScore * 10}%` }}
                  />
                </div>
                <span className="ml-1 font-medium">{recommendation.compatibilityScore}/10</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
              {recommendation.recommendationReason}
            </p>
            
            <div className="flex justify-between mt-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={handleAddToWantedList}
              >
                <PlusCircle className="w-3.5 h-3.5 mr-1" /> Add to Wanted
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-blue-600"
                onClick={() => toast.info("Full analysis coming soon")}
              >
                View Full Profile <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIRecommendationCard;
