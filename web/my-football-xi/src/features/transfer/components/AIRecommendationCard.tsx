
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { AIRecommendation } from '../types';
import { Flag, Globe } from "lucide-react";

interface AIRecommendationCardProps {
  recommendation: AIRecommendation;
  onAddToWantedList?: (player: AIRecommendation) => void;
}

const AIRecommendationCard: React.FC<AIRecommendationCardProps> = ({ 
  recommendation,
  onAddToWantedList
}) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const handleAddToWantedList = () => {
    if (onAddToWantedList) {
      onAddToWantedList(recommendation);
      setShowDetails(false);
    }
  };
  
  return (
    <>
      <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-md">
        <CardHeader className="p-4 pb-2 flex flex-row items-center space-y-0 gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
            <img 
              src={recommendation.photo} 
              alt={recommendation.playerName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-lg">{recommendation.playerName}</h3>
            <div className="flex items-center text-sm text-muted-foreground gap-1">
              <span>{recommendation.age} • {recommendation.position} • {recommendation.currentTeam}</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 pt-2">
          <div className="flex justify-between items-center mb-3">
            <div className="text-md font-semibold">{recommendation.marketValue}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Globe className="w-4 h-4 mr-1" />
              <span>{recommendation.nationality}</span>
            </div>
          </div>
          
          <div className="mb-3 p-2 bg-amber-50 rounded-md text-sm">
            <p className="text-amber-800 font-medium">{recommendation.recommendationReason}</p>
          </div>
          
          <div className="space-y-2">
            {recommendation.keyStats.slice(0, 3).map((stat, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{stat.label}</span>
                <div className="flex items-center">
                  <span className="font-medium">{stat.value}</span>
                  {stat.percentile && (
                    <div 
                      className="ml-2 w-6 h-6 rounded-full bg-gradient-to-r from-gray-200 to-green-500 flex items-center justify-center text-[10px] text-white font-bold"
                      style={{ background: `conic-gradient(#16a34a ${stat.percentile}%, #e5e7eb ${stat.percentile}%)` }}
                    >
                      {stat.percentile}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="p-2 flex justify-center border-t">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowDetails(true)}
            className="text-sm w-full"
          >
            Why this player?
          </Button>
        </CardFooter>
      </Card>
      
      <Sheet open={showDetails} onOpenChange={setShowDetails}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader className="mb-4">
            <SheetTitle>Why {recommendation.playerName}?</SheetTitle>
            <SheetDescription>
              AI-powered recommendation reasoning
            </SheetDescription>
          </SheetHeader>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                <img 
                  src={recommendation.photo} 
                  alt={recommendation.playerName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">{recommendation.playerName}</h3>
                <p className="text-sm text-muted-foreground">{recommendation.position} • {recommendation.currentTeam}</p>
                <p className="text-sm text-muted-foreground">{recommendation.age} years • {recommendation.marketValue}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground">KEY STATS</h4>
              {recommendation.keyStats.map((stat, index) => (
                <div key={index} className="flex justify-between text-sm py-1 border-b border-gray-100">
                  <span>{stat.label}</span>
                  <div className="flex items-center">
                    <span className="font-medium">{stat.value}</span>
                    {stat.percentile && (
                      <div 
                        className="ml-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] text-white font-bold"
                        style={{ background: `conic-gradient(#16a34a ${stat.percentile}%, #e5e7eb ${stat.percentile}%)` }}
                      >
                        {stat.percentile}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground">DETAILED REASONING</h4>
              <p className="text-sm">{recommendation.detailedReasoning}</p>
            </div>
            
            <div className="flex flex-col gap-2 pt-4">
              <Button 
                className="w-full bg-united-red hover:bg-red-700"
                onClick={handleAddToWantedList}
              >
                Add to Wanted List
              </Button>
              <Button variant="outline" className="w-full">
                Show Similar Players
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AIRecommendationCard;
