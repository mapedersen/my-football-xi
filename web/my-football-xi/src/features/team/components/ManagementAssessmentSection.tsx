
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Slider } from "@/shared/components/ui/slider";
import { Progress } from "@/shared/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { SlidersHorizontal, Star, GaugeCircle, TrendingUp, CircleUser } from "lucide-react";
import { useToast } from "@/shared/hooks/use-toast";

interface ManagementAssessmentProps {
  teamId: string;
}

const ManagementAssessmentSection: React.FC<ManagementAssessmentProps> = ({ teamId }) => {
  const [ratings, setRatings] = useState({
    ownershipAmbition: 5,
    financialStability: 5,
    transferStrategy: 5,
    youthDevelopment: 5,
    leadershipStyle: 5,
    fanEngagement: 5,
    overallDirection: 5
  });
  
  const [averageRating, setAverageRating] = useState(5);
  const [fanConsensus, setFanConsensus] = useState(4.2);
  const { toast } = useToast();
  
  // Update average rating when individual ratings change
  useEffect(() => {
    const values = Object.values(ratings);
    const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
    setAverageRating(parseFloat(avg.toFixed(1)));
  }, [ratings]);
  
  const handleSliderChange = (key: keyof typeof ratings, value: number[]) => {
    setRatings({
      ...ratings,
      [key]: value[0]
    });
  };
  
  const handleSaveAssessment = () => {
    // In a real app, this would save to a database
    toast({
      title: "Assessment Saved",
      description: `Your management assessment has been recorded. Average rating: ${averageRating}/10`,
    });
    
    // Simulate fan consensus update - in a real app this would come from a database
    const newConsensus = (fanConsensus * 0.7) + (averageRating * 0.3);
    setFanConsensus(parseFloat(newConsensus.toFixed(1)));
  };
  
  const getRatingColor = (rating: number) => {
    if (rating <= 3) return "text-red-600";
    if (rating <= 5) return "text-yellow-600";
    if (rating <= 7) return "text-green-600";
    return "text-green-700";
  };
  
  const getProgressColor = (rating: number) => {
    if (rating <= 3) return "bg-red-600";
    if (rating <= 5) return "bg-yellow-600";
    if (rating <= 7) return "bg-green-600";
    return "bg-green-700";
  };
  
  const getFanConsensusText = (rating: number) => {
    if (rating <= 2.5) return "Very Dissatisfied";
    if (rating <= 4.5) return "Mixed Opinions";
    if (rating <= 7) return "Generally Positive";
    return "Highly Satisfied";
  };
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-gray-600" />
            <span>Management Assessment</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-normal">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span>Fan Average: <span className={getRatingColor(fanConsensus)}>{fanConsensus}/10</span></span>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <div className="text-sm font-medium">Fan Consensus: {getFanConsensusText(fanConsensus)}</div>
            <div className="text-sm font-medium">{fanConsensus}/10</div>
          </div>
          <Progress value={fanConsensus * 10} className="h-2">
            <div className={`h-full ${getProgressColor(fanConsensus)}`} style={{ width: `${fanConsensus * 10}%` }} />
          </Progress>
        </div>
        
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <Label className="text-sm font-medium">Ownership Ambition</Label>
                  <span className={`text-sm font-medium ${getRatingColor(ratings.ownershipAmbition)}`}>
                    {ratings.ownershipAmbition}/10
                  </span>
                </div>
                <Slider
                  value={[ratings.ownershipAmbition]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => handleSliderChange('ownershipAmbition', value)}
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <Label className="text-sm font-medium">Financial Stability</Label>
                  <span className={`text-sm font-medium ${getRatingColor(ratings.financialStability)}`}>
                    {ratings.financialStability}/10
                  </span>
                </div>
                <Slider
                  value={[ratings.financialStability]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => handleSliderChange('financialStability', value)}
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <Label className="text-sm font-medium">Transfer Strategy</Label>
                  <span className={`text-sm font-medium ${getRatingColor(ratings.transferStrategy)}`}>
                    {ratings.transferStrategy}/10
                  </span>
                </div>
                <Slider
                  value={[ratings.transferStrategy]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => handleSliderChange('transferStrategy', value)}
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <Label className="text-sm font-medium">Leadership Style</Label>
                  <span className={`text-sm font-medium ${getRatingColor(ratings.leadershipStyle)}`}>
                    {ratings.leadershipStyle}/10
                  </span>
                </div>
                <Slider
                  value={[ratings.leadershipStyle]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => handleSliderChange('leadershipStyle', value)}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <Label className="text-sm font-medium">Youth Development</Label>
                  <span className={`text-sm font-medium ${getRatingColor(ratings.youthDevelopment)}`}>
                    {ratings.youthDevelopment}/10
                  </span>
                </div>
                <Slider
                  value={[ratings.youthDevelopment]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => handleSliderChange('youthDevelopment', value)}
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <Label className="text-sm font-medium">Fan Engagement</Label>
                  <span className={`text-sm font-medium ${getRatingColor(ratings.fanEngagement)}`}>
                    {ratings.fanEngagement}/10
                  </span>
                </div>
                <Slider
                  value={[ratings.fanEngagement]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => handleSliderChange('fanEngagement', value)}
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <Label className="text-sm font-medium">Overall Direction</Label>
                  <span className={`text-sm font-medium ${getRatingColor(ratings.overallDirection)}`}>
                    {ratings.overallDirection}/10
                  </span>
                </div>
                <Slider
                  value={[ratings.overallDirection]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => handleSliderChange('overallDirection', value)}
                />
              </div>
              
              <div className="pt-4">
                <div className="flex justify-between mb-1">
                  <div className="text-sm font-medium flex items-center gap-1">
                    <GaugeCircle className="h-4 w-4" />
                    <span>Your Overall Rating</span>
                  </div>
                  <span className={`text-lg font-bold ${getRatingColor(averageRating)}`}>
                    {averageRating}/10
                  </span>
                </div>
                <div className="bg-gray-100 rounded-full h-8 flex items-center justify-center">
                  <div className={`text-sm font-medium ${getRatingColor(averageRating)}`}>
                    {averageRating <= 3 ? "Poor" : 
                     averageRating <= 5 ? "Average" : 
                     averageRating <= 7 ? "Good" : "Excellent"} Management
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button 
              onClick={handleSaveAssessment}
              className="flex items-center gap-2"
            >
              <CircleUser className="h-4 w-4" />
              Save My Assessment
            </Button>
          </div>
          
          <div className="text-sm text-gray-500 italic text-center mt-2">
            Your assessment will be anonymously added to the fan consensus ratings
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ManagementAssessmentSection;
