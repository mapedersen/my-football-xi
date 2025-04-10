
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Trash2, Edit2, Save } from "lucide-react";
import { PlayerWanted } from '../types';

interface WantedPlayerCardProps {
  player: PlayerWanted;
  onUpdate?: (player: PlayerWanted) => void;
  onRemove?: (playerId: string) => void;
}

const WantedPlayerCard: React.FC<WantedPlayerCardProps> = ({ 
  player, 
  onUpdate,
  onRemove
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(player.userNotes || "");
  
  const handleRemove = () => {
    if (onRemove) {
      onRemove(player.id);
      toast.success(`${player.playerName} removed from wanted list`);
    }
  };
  
  const handleSaveNotes = () => {
    if (onUpdate) {
      const updatedPlayer = { ...player, userNotes: notes };
      onUpdate(updatedPlayer);
      setIsEditing(false);
      toast.success("Notes updated");
    }
  };
  
  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="p-4 pb-2 flex flex-row items-center space-y-0 gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
          <img 
            src={player.photo} 
            alt={player.playerName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold text-lg">{player.playerName}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>{player.age} • {player.position} • {player.currentTeam}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <div className="flex justify-between mb-2">
          <div className="text-lg font-semibold text-united-red">{player.marketValue}</div>
          <div className="text-sm text-muted-foreground">{player.nationality}</div>
        </div>
        
        {isEditing ? (
          <div className="space-y-2">
            <span className="text-sm block">Your notes</span>
            <Textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your notes about this player..."
              className="resize-none"
              rows={3}
            />
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={handleSaveNotes}
                className="bg-united-red hover:bg-red-700"
              >
                <Save className="w-4 h-4 mr-1" /> Save
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="min-h-[60px]">
            {player.userNotes ? (
              <p className="text-sm italic text-muted-foreground">{player.userNotes}</p>
            ) : (
              <p className="text-sm italic text-muted-foreground">No notes added yet.</p>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-2 flex justify-between border-t">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsEditing(true)}
          className="text-sm"
        >
          <Edit2 className="w-4 h-4 mr-1" /> Edit Notes
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleRemove}
          className="text-sm text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4 mr-1" /> Remove
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WantedPlayerCard;
