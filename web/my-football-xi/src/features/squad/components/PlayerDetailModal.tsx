
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Flag, Heart } from "lucide-react";
import { Player } from '@/models/Player';
import { formatCurrency } from '../utils/squadUtils';
import { useUpdatePlayerRating } from '../hooks/useSquadCommands';

interface PlayerDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: Player | null;
  teamId: string;
}

/**
 * Modal component for detailed player view and assessment
 */
const PlayerDetailModal: React.FC<PlayerDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  player,
  teamId 
}) => {
  const [playerRating, setPlayerRating] = useState<number>(5);
  const [valueForMoney, setValueForMoney] = useState<number>(0);
  const [playerStatus, setPlayerStatus] = useState<string>("keep");
  const [playerComment, setPlayerComment] = useState<string>("");
  
  const updateRatingMutation = useUpdatePlayerRating();
  
  useEffect(() => {
    if (player) {
      setPlayerRating(player.rating || 5);
      setValueForMoney(player.valueForMoney || 0);
      setPlayerStatus(player.status?.recommendation || "keep");
      setPlayerComment(player.comments || "");
    }
  }, [player]);
  
  if (!player) return null;
  
  const handleSavePlayerAssessment = () => {
    updateRatingMutation.mutate({
      playerId: player.id,
      teamId,
      rating: playerRating,
      valueForMoney,
      comments: playerComment
    });
    onClose();
  };
  
  const valueForMoneyLabels = [
    "Extremely Overpaid",
    "Overpaid",
    "Fair Value",
    "Good Value",
    "Underpaid"
  ];
  
  const getAgreementPercentage = (value: number) => {
    const mockPercentages = [72, 58, 45, 62, 81];
    return mockPercentages[Math.abs(value + 2)];
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <div className="overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Player Assessment</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            <div>
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                  <img 
                    src={player.image} 
                    alt={player.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                </div>
                <h2 className="text-xl font-bold">{player.name}</h2>
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <span>#{player.number}</span>
                  <span>•</span>
                  <span>{player.position}</span>
                  {player.nationality && (
                    <>
                      <span>•</span>
                      <div className="flex items-center">
                        <Flag className="h-4 w-4 mr-1" />
                        <span>{player.nationality}</span>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="w-full mt-6 space-y-4">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="text-sm text-gray-500">Salary</div>
                    <div className="font-bold">{player.salary}</div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="text-sm text-gray-500">Market Value</div>
                    <div className="font-bold">{formatCurrency(player.marketValue || 0)}</div>
                  </div>
                  
                  {player.age && (
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="text-sm text-gray-500">Age</div>
                      <div className="font-bold">{player.age} years</div>
                    </div>
                  )}
                  
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="text-sm text-gray-500">Contract Status</div>
                    <div className="font-bold">{player.contract || "Unknown"}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Performance Stats</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-3 rounded-md grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Appearances</div>
                    <div className="font-bold text-xl">{player.stats.appearances}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Goals</div>
                    <div className="font-bold text-xl">{player.stats.goals}</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Assists</div>
                    <div className="font-bold text-xl">{player.stats.assists}</div>
                  </div>
                  {player.stats.cleanSheets !== undefined && (
                    <div>
                      <div className="text-sm text-gray-500">Clean Sheets</div>
                      <div className="font-bold text-xl">{player.stats.cleanSheets}</div>
                    </div>
                  )}
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-sm text-gray-500 mb-2">Fitness Level</div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${player.status?.injured ? 'bg-red-500' : 'bg-green-500'}`}
                      style={{ width: `${player.fitness || 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {player.status?.injured && (
                    <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      Injured
                    </div>
                  )}
                  {player.status?.captain && (
                    <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                      Team Captain
                    </div>
                  )}
                  {player.status?.onLoan && (
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                      On Loan
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Your Assessment</h3>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="player-rating" className="text-sm font-medium">Player Rating</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Slider
                      id="player-rating"
                      value={[playerRating]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(values) => setPlayerRating(values[0])}
                      disabled={player.status?.injured}
                      className="flex-1"
                    />
                    <span className="font-bold min-w-[40px] text-center">
                      {playerRating}/10
                    </span>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Value For Money</Label>
                  <div className="mt-2">
                    <Slider
                      value={[valueForMoney + 2]}
                      min={0}
                      max={4}
                      step={1}
                      onValueChange={(values) => setValueForMoney(values[0] - 2)}
                      disabled={player.status?.injured}
                    />
                    <div className="flex justify-between">
                      <span className="text-xs text-red-600">Overpaid</span>
                      <span className="text-xs text-green-600">Underpaid</span>
                    </div>
                    <div className="mt-2 text-center font-medium">
                      {valueForMoneyLabels[valueForMoney + 2]}
                    </div>
                    <div className="mt-1 text-center text-sm text-gray-500">
                      {getAgreementPercentage(valueForMoney)}% of fans agree
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Player Status</Label>
                  <RadioGroup 
                    value={playerStatus} 
                    onValueChange={setPlayerStatus}
                    className="grid grid-cols-2 gap-2 mt-2"
                    disabled={player.status?.injured}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="keep" id="keep" />
                      <Label htmlFor="keep" className="text-green-700">Keep</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sell" id="sell" />
                      <Label htmlFor="sell" className="text-red-700">Sell</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="loan" id="loan" />
                      <Label htmlFor="loan" className="text-blue-700">Loan</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label htmlFor="player-comment" className="text-sm font-medium">Your Comments</Label>
                  <Textarea
                    id="player-comment"
                    value={playerComment}
                    onChange={(e) => setPlayerComment(e.target.value)}
                    placeholder="Add your thoughts on this player..."
                    className="mt-2"
                    disabled={player.status?.injured}
                  />
                </div>
                
                {player.status?.injured && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
                    <p className="font-bold">Player is currently injured</p>
                    <p>Unable to modify status or assessment until recovery</p>
                  </div>
                )}
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSavePlayerAssessment}
                    disabled={player.status?.injured}
                  >
                    Save Assessment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerDetailModal;
