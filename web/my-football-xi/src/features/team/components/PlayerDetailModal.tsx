
import React, { useState, useEffect } from "react";
import { Player } from "../types";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Activity, DollarSign, Star, MessageSquare, PenLine } from "lucide-react";

interface PlayerDetailModalProps {
  player: Player | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdatePlayer: (player: Player) => void;
}

const PlayerDetailModal: React.FC<PlayerDetailModalProps> = ({
  player,
  isOpen,
  onClose,
  onUpdatePlayer,
}) => {
  // Only initialize state if player exists, otherwise use default values
  const [valueForMoney, setValueForMoney] = useState<number>(0);
  const [rating, setRating] = useState<number>(5);
  const [status, setStatus] = useState<string>("keep");
  const [comment, setComment] = useState<string>("");

  // Update state when player changes
  useEffect(() => {
    if (player) {
      setValueForMoney(player.valueForMoney || 0);
      setRating(player.rating || 5);
      setStatus(player.status?.recommendation || "keep");
      setComment(player.comments || "");
    }
  }, [player]);

  // If no player or not open, don't render
  if (!isOpen || !player) return null;

  const valueForMoneyLabels = [
    "Extremely Overpaid",
    "Overpaid",
    "Fair Value",
    "Good Value",
    "Underpaid"
  ];

  // Mock data for salary comparisons
  const squadAvgSalary = "£120,000/week";
  const leagueAvgSalary = "£90,000/week";
  const playerSalaryNumeric = parseInt(player.salary.replace(/[^0-9]/g, "")) || 0;
  const squadAvgNumeric = 120000;
  const leagueAvgNumeric = 90000;
  
  const salaryVsSquad = playerSalaryNumeric > 0 ? ((playerSalaryNumeric / squadAvgNumeric) * 100) - 100 : 0;
  const salaryVsLeague = playerSalaryNumeric > 0 ? ((playerSalaryNumeric / leagueAvgNumeric) * 100) - 100 : 0;

  const handleSave = () => {
    onUpdatePlayer({
      ...player,
      valueForMoney,
      rating,
      status: {
        ...player.status,
        recommendation: status,
      },
      comments: comment
    });
    onClose();
  };

  // Helper function to calculate agreement percentage (mock data for now)
  const getAgreementPercentage = (value: number) => {
    // This would normally come from a backend API
    const mockPercentages = [72, 58, 45, 62, 81];
    return mockPercentages[Math.abs(value + 2)];
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <img 
              src={player.image} 
              alt={player.name} 
              className="w-10 h-10 rounded-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
            {player.name}
            <span className="text-sm font-normal text-gray-500">#{player.number} · {player.position}</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview" className="flex items-center gap-1">
              <Star className="h-4 w-4" /> Overview
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" /> Financial
            </TabsTrigger>
            <TabsTrigger value="rumors" className="flex items-center gap-1">
              <Activity className="h-4 w-4" /> Rumors
            </TabsTrigger>
            <TabsTrigger value="comments" className="flex items-center gap-1">
              <PenLine className="h-4 w-4" /> Your Notes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Your Rating</h3>
                <div className="flex items-center gap-2">
                  <Slider
                    value={[rating]}
                    min={1}
                    max={10}
                    step={1}
                    onValueChange={(values) => setRating(values[0])}
                  />
                  <span className="font-bold text-lg">{rating}/10</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Player Status</h3>
                <RadioGroup 
                  value={status} 
                  onValueChange={setStatus}
                  className="grid grid-cols-3 gap-2"
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
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="promote" id="promote" />
                    <Label htmlFor="promote" className="text-purple-700">Promote</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bench" id="bench" />
                    <Label htmlFor="bench" className="text-yellow-700">Bench</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium mb-2">Season Statistics</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded border">
                  <div className="text-xs text-gray-500">Appearances</div>
                  <div className="text-xl font-bold">{player.stats.appearances}</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="text-xs text-gray-500">Goals</div>
                  <div className="text-xl font-bold">{player.stats.goals}</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="text-xs text-gray-500">Assists</div>
                  <div className="text-xl font-bold">{player.stats.assists}</div>
                </div>
                {player.stats.cleanSheets !== undefined && (
                  <div className="bg-white p-3 rounded border">
                    <div className="text-xs text-gray-500">Clean Sheets</div>
                    <div className="text-xl font-bold">{player.stats.cleanSheets}</div>
                  </div>
                )}
              </div>
            </div>
            
            {(player.status?.injured || player.status?.captain || player.status?.onLoan) && (
              <div className="flex flex-wrap gap-2">
                {player.status?.captain && (
                  <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                    Team Captain
                  </div>
                )}
                {player.status?.injured && (
                  <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                    Currently Injured
                  </div>
                )}
                {player.status?.onLoan && (
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    On Loan
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Value For Money Assessment</h3>
              <div>
                <Slider
                  value={[valueForMoney + 2]} // Adjust from -2..2 to 0..4 for slider
                  min={0}
                  max={4}
                  step={1}
                  onValueChange={(values) => setValueForMoney(values[0] - 2)}
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
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium mb-2">Salary Comparison</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Player Salary:</span>
                  <span className="font-medium text-lg">{player.salary}</span>
                </div>
                <div className="h-px bg-gray-200 my-2"></div>
                <div className="flex justify-between">
                  <span>Squad Average:</span>
                  <span className={cn(
                    "font-medium",
                    salaryVsSquad > 0 ? "text-red-600" : "text-green-600"
                  )}>
                    {squadAvgSalary} ({salaryVsSquad > 0 ? "+" : ""}{salaryVsSquad.toFixed(0)}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>League Average:</span>
                  <span className={cn(
                    "font-medium",
                    salaryVsLeague > 0 ? "text-red-600" : "text-green-600"
                  )}>
                    {leagueAvgSalary} ({salaryVsLeague > 0 ? "+" : ""}{salaryVsLeague.toFixed(0)}%)
                  </span>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="font-medium mb-2">Contract Information</h4>
                <div className="bg-white p-3 rounded border">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500">Contract Until</div>
                      <div className="font-medium">June 2027</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Release Clause</div>
                      <div className="font-medium">£65M</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="rumors" className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-medium">Transfer Rumors</h3>
              
              {/* Rumors - mocked data for now */}
              <div className="bg-white p-4 rounded-md border">
                <div className="flex justify-between">
                  <span className="font-medium">Sky Sports</span>
                  <span className="text-sm text-gray-500">2025-03-15</span>
                </div>
                <p className="mt-2 text-sm">{player.name} linked with a summer move to Serie A giants Juventus for a fee around £35M.</p>
              </div>
              
              <div className="bg-white p-4 rounded-md border">
                <div className="flex justify-between">
                  <span className="font-medium">The Athletic</span>
                  <span className="text-sm text-gray-500">2025-03-28</span>
                </div>
                <p className="mt-2 text-sm">Sources close to the club suggest {player.name} is considered 'not for sale' despite interest from several clubs.</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="comments" className="space-y-4">
            <h3 className="font-medium mb-2">Your Notes</h3>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add your thoughts on this player..."
              className="w-full min-h-[150px]"
            />
            <div className="bg-yellow-50 p-3 rounded-md text-yellow-800 text-sm">
              <strong>Note:</strong> Your comments are stored locally and only visible to you.
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerDetailModal;
