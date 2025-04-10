
import React, { useState } from "react";
import { Player } from "../types";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface PlayerDetailPanelProps {
  player: Player;
  onClose: () => void;
  onUpdatePlayer: (player: Player) => void;
}

const PlayerDetailPanel: React.FC<PlayerDetailPanelProps> = ({
  player,
  onClose,
  onUpdatePlayer,
}) => {
  const [valueForMoney, setValueForMoney] = useState<number>(player.valueForMoney || 0);
  const [rating, setRating] = useState<number>(player.rating || 5);
  const [status, setStatus] = useState<string>(player.status?.recommendation || "keep");
  const [comment, setComment] = useState<string>(player.comments || "");

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
  const playerSalaryNumeric = parseInt(player.salary.replace(/[^0-9]/g, ""));
  const squadAvgNumeric = 120000;
  const leagueAvgNumeric = 90000;
  
  const salaryVsSquad = ((playerSalaryNumeric / squadAvgNumeric) * 100) - 100;
  const salaryVsLeague = ((playerSalaryNumeric / leagueAvgNumeric) * 100) - 100;

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
    <div className="animate-slide-in bg-white rounded-lg shadow-lg p-5 max-w-md w-full">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">{player.name}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          &times;
        </button>
      </div>
      
      <div className="space-y-5">
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
          <h3 className="font-medium mb-2">Value For Money</h3>
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
        
        <div className="bg-gray-50 p-3 rounded-md">
          <h3 className="font-medium mb-2">Salary Comparison</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Player Salary:</span>
              <span className="font-medium">{player.salary}</span>
            </div>
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
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Player Status</h3>
          <RadioGroup 
            value={status} 
            onValueChange={setStatus}
            className="grid grid-cols-2 gap-2"
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
        
        <div>
          <h3 className="font-medium mb-2">Comments</h3>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add your thoughts on this player..."
            className="w-full"
          />
        </div>
        
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Opinion</Button>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetailPanel;
