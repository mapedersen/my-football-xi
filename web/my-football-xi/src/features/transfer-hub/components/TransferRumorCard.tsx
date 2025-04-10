
import React, { useState } from 'react';
import { TransferRumor } from '../types';
import { Card, CardContent, CardHeader, CardFooter } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Slider } from "@/shared/components/ui/slider";
import { Textarea } from "@/shared/components/ui/textarea";
import { CheckCircle, XCircle, TrendingUp, MessageSquare, DollarSign, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface TransferRumorCardProps {
  rumor: TransferRumor;
  onSaveOpinion?: (rumorId: string, opinion: any) => void;
  onViewFullAnalysis?: (rumorId: string) => void;
}

const TransferRumorCard: React.FC<TransferRumorCardProps> = ({ 
  rumor, 
  onSaveOpinion,
  onViewFullAnalysis
}) => {
  const [expanded, setExpanded] = useState(false);
  const [opinionValue, setOpinionValue] = useState(3);
  const [comment, setComment] = useState('');
  
  const getReportedDate = () => {
    const date = new Date(rumor.dateReported);
    return new Intl.DateTimeFormat('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    }).format(date);
  };
  
  const handleSaveOpinion = () => {
    if (onSaveOpinion) {
      onSaveOpinion(rumor.id, {
        valueRating: opinionValue,
        comment,
        timestamp: new Date().toISOString()
      });
      toast.success("Opinion saved!");
      setExpanded(false);
    }
  };
  
  const handleViewAnalysis = () => {
    if (onViewFullAnalysis) {
      onViewFullAnalysis(rumor.id);
    }
  };
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="p-4 pb-2 flex flex-row items-center space-y-0 gap-3 bg-gradient-to-r from-gray-50 to-white">
        <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border-2 border-gray-200">
          <img 
            src={rumor.photo} 
            alt={rumor.playerName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold text-lg">{rumor.playerName}</h3>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">{rumor.position}</span>
            <span className="mx-1.5">•</span>
            <span>{rumor.age} years</span>
            <span className="mx-1.5">•</span>
            <span className="truncate">{rumor.currentTeam}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-lg font-bold text-green-600">{rumor.reportedFee}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{getReportedDate()}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1.5 mb-3">
          {rumor.fitTags.map(tag => (
            <Badge 
              key={tag.id}
              className={`${tag.color}`}
            >
              {tag.label}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm bg-gray-50 rounded p-2 mb-3">
          <div className="flex items-center">
            <MessageSquare className="w-4 h-4 mr-1 text-blue-500" />
            <span>Source:</span>
          </div>
          <span className="font-medium">{rumor.rummorSource}</span>
        </div>
        
        {expanded ? (
          <div className="space-y-4 mt-3 animate-in fade-in duration-300">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Value assessment</span>
                <span className="text-sm font-medium">
                  {opinionValue === 1 ? "Overpriced" : 
                   opinionValue === 2 ? "Slightly high" : 
                   opinionValue === 3 ? "Fair price" : 
                   opinionValue === 4 ? "Good value" : "Bargain"}
                </span>
              </div>
              <Slider 
                value={[opinionValue]} 
                min={1} 
                max={5} 
                step={1} 
                onValueChange={(vals) => setOpinionValue(vals[0])}
              />
            </div>
            
            <div>
              <span className="text-sm block mb-1">Your comment (optional)</span>
              <Textarea 
                placeholder="What do you think about this transfer?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="resize-none"
                rows={2}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleSaveOpinion}
                className="w-full bg-united-red hover:bg-red-700"
              >
                Save Opinion
              </Button>
              <Button 
                variant="outline"
                onClick={() => setExpanded(false)}
                className="flex-shrink-0"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 mt-3">
            <Button 
              variant="outline" 
              onClick={() => setExpanded(true)}
              className="w-full text-sm"
            >
              Rate This Transfer
            </Button>
            <Button 
              variant="outline" 
              onClick={handleViewAnalysis}
              className="w-full text-sm"
            >
              Full Analysis
            </Button>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-3 flex justify-between border-t bg-gray-50">
        <div className="flex items-center text-sm text-gray-600">
          <TrendingUp className="w-4 h-4 mr-1 text-blue-500" />
          <span>Transfer likelihood:</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${
                rumor.likelihood >= 7 ? 'bg-green-500' : 
                rumor.likelihood >= 4 ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${(rumor.likelihood / 10) * 100}%` }}
            />
          </div>
          <span className="text-sm font-medium">{rumor.likelihood}/10</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TransferRumorCard;
