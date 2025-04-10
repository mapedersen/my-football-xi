
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { TransferRumor, FanOpinion } from '../types';

interface TransferRumorCardProps {
  rumor: TransferRumor;
  existingOpinion?: FanOpinion | null;
  onSaveOpinion?: (opinion: FanOpinion) => void;
  onViewFullAnalysis?: (rumorId: string) => void;
}

const TransferRumorCard: React.FC<TransferRumorCardProps> = ({ 
  rumor, 
  existingOpinion, 
  onSaveOpinion,
  onViewFullAnalysis
}) => {
  const initialOpinion: FanOpinion = existingOpinion || {
    rumorId: rumor.id,
    valueRating: 3,
    fitRating: 3,
    comment: "",
    timestamp: new Date().toISOString()
  };

  const [opinion, setOpinion] = useState<FanOpinion>(initialOpinion);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleValueChange = (value: number[]) => {
    setOpinion({
      ...opinion,
      valueRating: value[0]
    });
  };

  const handleFitChange = (value: number[]) => {
    setOpinion({
      ...opinion,
      fitRating: value[0]
    });
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOpinion({
      ...opinion,
      comment: e.target.value
    });
  };

  const handleSaveOpinion = () => {
    const updatedOpinion = {
      ...opinion,
      timestamp: new Date().toISOString()
    };
    
    if (onSaveOpinion) {
      onSaveOpinion(updatedOpinion);
    }
    
    toast.success("Your opinion has been saved");
  };

  const handleViewFullAnalysis = () => {
    if (onViewFullAnalysis) {
      onViewFullAnalysis(rumor.id);
    }
  };

  const getValueLabel = (value: number) => {
    switch (value) {
      case 1: return "Way overpriced";
      case 2: return "Slightly overpriced";
      case 3: return "Fair price";
      case 4: return "Good value";
      case 5: return "Bargain";
      default: return "Fair price";
    }
  };

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="p-4 pb-2 flex flex-row items-center space-y-0 gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
          <img 
            src={rumor.photo} 
            alt={rumor.playerName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold text-lg">{rumor.playerName}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>{rumor.age} • {rumor.position} • {rumor.currentTeam}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex justify-between mb-2">
          <div className="text-lg font-semibold text-united-red">{rumor.reportedFee}</div>
          <div className="text-sm text-muted-foreground">Source: {rumor.rummorSource}</div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {rumor.fitTags.map(tag => (
            <span 
              key={tag.id} 
              className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${tag.color}`}
            >
              {tag.label}
            </span>
          ))}
        </div>
        
        <div className={`transition-all duration-300 ${isExpanded ? 'max-h-80' : 'max-h-0 overflow-hidden'}`}>
          <div className="space-y-4 mt-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Value assessment</span>
                <span className="text-sm font-medium">{getValueLabel(opinion.valueRating)}</span>
              </div>
              <Slider 
                value={[opinion.valueRating]} 
                min={1} 
                max={5} 
                step={1} 
                onValueChange={handleValueChange}
                className="mt-2"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Tactical fit</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < opinion.fitRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                      onClick={() => handleFitChange([i + 1])}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <span className="text-sm block mb-1">Your comment (optional)</span>
              <Textarea 
                placeholder="What do you think about this transfer?"
                value={opinion.comment || ""}
                onChange={handleCommentChange}
                className="resize-none"
                rows={2}
              />
            </div>
            
            <Button 
              onClick={handleSaveOpinion}
              className="w-full bg-united-red hover:bg-red-700"
            >
              Save Opinion
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-2 flex justify-between border-t">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm"
        >
          {isExpanded ? "Hide" : "Rate this transfer"}
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-united-red text-sm"
          onClick={handleViewFullAnalysis}
        >
          Full Analysis
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TransferRumorCard;
