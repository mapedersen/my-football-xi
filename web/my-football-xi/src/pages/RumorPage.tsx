
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Star, Share2, ThumbsUp, ThumbsDown, ArrowLeft } from "lucide-react";
import { 
  getTransferRumorById, 
  saveFanOpinion, 
  getFanOpinionForRumor 
} from '@/services/transferService';
import { TransferRumor, FanOpinion } from '@/models/Transfer';

const RumorPage = () => {
  const { rumorId } = useParams<{ rumorId: string }>();
  const [rumor, setRumor] = useState<TransferRumor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [communityStats, setCommunityStats] = useState({
    valueAverage: 3,
    fitAverage: 3,
    yesPercentage: 0,
    commentCount: 0,
    totalVotes: 0
  });
  
  const initialOpinion: FanOpinion = {
    rumorId: rumorId,
    valueRating: 3,
    fitRating: 3,
    shouldSign: undefined,
    comment: "",
    timestamp: new Date().toISOString()
  };
  
  const [opinion, setOpinion] = useState<FanOpinion>(initialOpinion);
  const [hasVoted, setHasVoted] = useState(false);
  
  useEffect(() => {
    if (rumorId) {
      // Fetch rumor data
      const rumorData = getTransferRumorById(rumorId);
      setRumor(rumorData);
      
      // Get existing opinion if available
      const existingOpinion = getFanOpinionForRumor(rumorId);
      if (existingOpinion) {
        setOpinion(existingOpinion);
        setHasVoted(true);
      }
      
      // TODO: Fetch community stats from API
      // For now, simulate some data
      setCommunityStats({
        valueAverage: 2.7,
        fitAverage: 3.8,
        yesPercentage: 73,
        commentCount: 156,
        totalVotes: 358
      });
      
      setIsLoading(false);
    }
  }, [rumorId]);
  
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
  
  const handleVote = (shouldSign: boolean) => {
    setOpinion({
      ...opinion,
      shouldSign
    });
  };
  
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOpinion({
      ...opinion,
      comment: e.target.value
    });
  };
  
  const handleSubmit = () => {
    const updatedOpinion = {
      ...opinion,
      timestamp: new Date().toISOString()
    };
    saveFanOpinion(updatedOpinion);
    setHasVoted(true);
    toast.success("Your opinion has been recorded");
  };
  
  const handleShare = () => {
    // In a real app, this would generate a shareable link with metadata
    if (navigator.share && rumor) {
      navigator.share({
        title: `${rumor.playerName} to ${rumor.targetTeam}?`,
        text: `What do you think about ${rumor.playerName} joining ${rumor.targetTeam} for ${rumor.reportedFee}? Vote now!`,
        url: window.location.href,
      }).then(() => {
        toast.success("Shared successfully");
      }).catch(() => {
        toast.error("Error sharing");
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
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
  
  if (isLoading || !rumor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-united-red border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading rumor data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-united-red text-white py-4">
        <div className="container mx-auto px-4">
          <Link to={`/team/${rumor.targetTeam.toLowerCase().replace(' ', '-')}/transfer-hub`} className="flex items-center gap-1 text-sm mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to Transfer Hub
          </Link>
          <h1 className="text-xl md:text-2xl font-bold">Transfer Rumor</h1>
        </div>
      </header>
      
      <main className="container mx-auto py-6 px-4 max-w-lg">
        <Card className="overflow-hidden mb-6">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                <img 
                  src={rumor.photo} 
                  alt={rumor.playerName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-bold text-xl">{rumor.playerName}</h2>
                <div className="text-sm text-muted-foreground">
                  {rumor.age} • {rumor.position} • {rumor.currentTeam}
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-semibold text-united-red">{rumor.reportedFee}</div>
              <div className="flex items-center text-sm text-muted-foreground">
                <div>Source: {rumor.rummorSource}</div>
                <div className="mx-2">•</div>
                <div>{new Date(rumor.dateReported).toLocaleDateString()}</div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {rumor.fitTags.map(tag => (
                <span 
                  key={tag.id} 
                  className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${tag.color}`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-6">
              <h3 className="font-medium mb-3">Fan Consensus</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-united-red">{communityStats.yesPercentage}%</div>
                  <div className="text-sm text-gray-500">Want to sign</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{communityStats.totalVotes}</div>
                  <div className="text-sm text-gray-500">Total votes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{getValueLabel(Math.round(communityStats.valueAverage))}</div>
                  <div className="text-sm text-gray-500">Value perception</div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < Math.round(communityStats.fitAverage) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">Tactical fit</div>
                </div>
              </div>
            </div>
            
            {!hasVoted ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Should we sign {rumor.playerName}?</h3>
                  <div className="flex gap-2">
                    <Button 
                      variant={opinion.shouldSign === true ? "default" : "outline"}
                      className={opinion.shouldSign === true ? "w-full bg-green-600 hover:bg-green-700" : "w-full"}
                      onClick={() => handleVote(true)}
                    >
                      <ThumbsUp size={16} /> Yes
                    </Button>
                    <Button 
                      variant={opinion.shouldSign === false ? "default" : "outline"}
                      className={opinion.shouldSign === false ? "w-full bg-red-600 hover:bg-red-700" : "w-full"}
                      onClick={() => handleVote(false)}
                    >
                      <ThumbsDown size={16} /> No
                    </Button>
                  </div>
                </div>
                
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
                    rows={3}
                  />
                </div>
                
                <Button 
                  onClick={handleSubmit}
                  className="w-full bg-united-red hover:bg-red-700"
                  disabled={opinion.shouldSign === undefined}
                >
                  Submit Opinion
                </Button>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-center">
                <p className="text-green-600 font-medium mb-2">Thanks for sharing your opinion!</p>
                <p className="text-sm text-gray-600">Your vote has been recorded and added to the fan consensus.</p>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="p-4 pt-0 flex justify-center">
            <Button
              variant="outline"
              onClick={handleShare}
              className="flex items-center gap-2"
            >
              <Share2 size={16} />
              Share this rumor
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default RumorPage;
