
import React, { useState } from "react";
import { MessageSquare, ThumbsUp, Flame, Share2, Filter } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

interface TrendingTakesProps {
  teamId: string;
}

interface TakeType {
  id: string;
  author: string;
  content: string;
  category: "transfer" | "lineup" | "tactics" | "general";
  votes: number;
  endorsements: number;
  timestamp: string;
  endorsed: boolean;
  voted: boolean;
}

const TrendingTakes: React.FC<TrendingTakesProps> = ({ teamId }) => {
  // Mock data - in a real app this would come from an API
  const [takes, setTakes] = useState<TakeType[]>([
    {
      id: "1",
      author: "RedDevilFan21",
      content: "We should switch to a 4-3-3 formation with Bruno playing deeper and allowing Mainoo more freedom to get forward.",
      category: "tactics",
      votes: 487,
      endorsements: 118,
      timestamp: "2h ago",
      endorsed: false,
      voted: false
    },
    {
      id: "2",
      author: "UnitedTillIDie",
      content: "Leny Yoro should be our top priority signing this summer. We need a solid young CB to partner Lisandro Martinez.",
      category: "transfer",
      votes: 912,
      endorsements: 322,
      timestamp: "5h ago",
      endorsed: false,
      voted: false
    },
    {
      id: "3",
      author: "MUFC_Legend",
      content: "Garnacho should be starting every game on the left wing. His direct play and pace are exactly what we need.",
      category: "lineup",
      votes: 631,
      endorsements: 179,
      timestamp: "1d ago",
      endorsed: false,
      voted: false
    },
    {
      id: "4",
      author: "OldTraffordFaithful",
      content: "Ten Hag needs to be more proactive with his substitutions. We often make changes too late in games.",
      category: "tactics",
      votes: 743,
      endorsements: 215,
      timestamp: "1d ago",
      endorsed: false,
      voted: false
    },
    {
      id: "5",
      author: "StretchRapido",
      content: "We should sell Casemiro this summer while he still has value and reinvest in a younger DM.",
      category: "transfer",
      votes: 521,
      endorsements: 93,
      timestamp: "2d ago",
      endorsed: false,
      voted: false
    },
  ]);
  
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const handleVote = (id: string) => {
    setTakes(takes.map(take => 
      take.id === id 
        ? { ...take, votes: take.voted ? take.votes - 1 : take.votes + 1, voted: !take.voted } 
        : take
    ));
  };
  
  const handleEndorse = (id: string) => {
    setTakes(takes.map(take => 
      take.id === id 
        ? { ...take, endorsements: take.endorsed ? take.endorsements - 1 : take.endorsements + 1, endorsed: !take.endorsed } 
        : take
    ));
  };
  
  const handleShare = (id: string) => {
    // In a real app, this would open a share dialog
    console.log(`Sharing take with id: ${id}`);
    alert("Share functionality would be implemented here!");
  };
  
  const getCategoryColor = (category: string) => {
    switch(category) {
      case "transfer": return "bg-blue-100 text-blue-800";
      case "lineup": return "bg-green-100 text-green-800";
      case "tactics": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const filteredTakes = activeFilter 
    ? takes.filter(take => take.category === activeFilter)
    : takes;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Trending Fan Takes</h2>
        <p className="text-gray-600 mb-6">
          Hot opinions and ideas from the United fanbase
        </p>
      </div>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button 
          variant={activeFilter === null ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveFilter(null)}
          className="flex items-center gap-1"
        >
          <Filter className="h-4 w-4" />
          All
        </Button>
        <Button 
          variant={activeFilter === "transfer" ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveFilter("transfer")}
        >
          Transfers
        </Button>
        <Button 
          variant={activeFilter === "lineup" ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveFilter("lineup")}
        >
          Lineup
        </Button>
        <Button 
          variant={activeFilter === "tactics" ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveFilter("tactics")}
        >
          Tactics
        </Button>
        <Button 
          variant={activeFilter === "general" ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveFilter("general")}
        >
          General
        </Button>
      </div>
      
      {/* Takes List */}
      <div className="space-y-4">
        {filteredTakes.map((take) => (
          <Card key={take.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">@{take.author}</span>
                    <span className="text-sm text-gray-500">{take.timestamp}</span>
                  </div>
                  <div className="mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(take.category)}`}>
                      {take.category.charAt(0).toUpperCase() + take.category.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Flame className="h-3 w-3" />
                    {take.votes}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-800">{take.content}</p>
            </CardContent>
            <CardFooter className="border-t bg-gray-50 py-2">
              <div className="flex justify-between w-full">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleVote(take.id)}
                  className={take.voted ? "text-red-600" : ""}
                >
                  <Flame className="h-4 w-4 mr-1" />
                  {take.voted ? "Voted" : "Vote"}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleEndorse(take.id)}
                  className={take.endorsed ? "text-green-600" : ""}
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  {take.endorsements}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleShare(take.id)}
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrendingTakes;
