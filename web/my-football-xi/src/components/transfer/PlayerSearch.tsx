
import React, { useState } from 'react';
import { 
  Command, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem 
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlayerWanted } from '@/models/Transfer';
import { addWantedPlayer } from '@/services/transferService';
import { toast } from "sonner";
import { Plus, Search } from "lucide-react";

// Mock global player database
const globalPlayers = [
  {
    id: "1001",
    name: "Leny Yoro",
    age: 18,
    position: "CB",
    team: "Lille",
    photo: "https://img.a.transfermarkt.technology/portrait/header/746440-1695719443.jpg",
    value: "€50m",
    valueAmount: 50,
    nationality: "France"
  },
  {
    id: "1002",
    name: "Victor Osimhen",
    age: 25,
    position: "ST",
    team: "Napoli",
    photo: "https://img.a.transfermarkt.technology/portrait/header/401923-1661780981.jpg",
    value: "€100m",
    valueAmount: 100,
    nationality: "Nigeria"
  },
  {
    id: "1003",
    name: "Florian Wirtz",
    age: 21,
    position: "CAM",
    team: "Bayer Leverkusen",
    photo: "https://img.a.transfermarkt.technology/portrait/header/521361-1696332660.jpg",
    value: "€130m",
    valueAmount: 130,
    nationality: "Germany"
  },
  {
    id: "1004",
    name: "Rodrygo",
    age: 23,
    position: "RW",
    team: "Real Madrid",
    photo: "https://img.a.transfermarkt.technology/portrait/header/412363-1665905006.jpg",
    value: "€110m",
    valueAmount: 110,
    nationality: "Brazil"
  },
  {
    id: "1005",
    name: "João Neves",
    age: 19,
    position: "CM",
    team: "Benfica",
    photo: "https://img.a.transfermarkt.technology/portrait/header/718668-1695393177.jpg",
    value: "€70m",
    valueAmount: 70,
    nationality: "Portugal"
  }
];

interface PlayerSearchProps {
  onPlayerAdded: () => void;
}

const PlayerSearch: React.FC<PlayerSearchProps> = ({ onPlayerAdded }) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredPlayers = globalPlayers.filter(player => 
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.nationality.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddPlayer = (player: any) => {
    const newWantedPlayer: PlayerWanted = {
      id: player.id,
      playerName: player.name,
      age: player.age,
      position: player.position,
      currentTeam: player.team,
      photo: player.photo,
      marketValue: player.value,
      marketValueAmount: player.valueAmount,
      nationality: player.nationality,
      addedAt: new Date().toISOString()
    };
    
    addWantedPlayer(newWantedPlayer);
    onPlayerAdded();
    setOpen(false);
    toast.success(`${player.name} added to your wanted list`);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-united-red hover:bg-red-700">
          <Plus className="w-4 h-4 mr-2" /> Add Player to Wanted List
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Search for players</DialogTitle>
        </DialogHeader>
        <Command className="rounded-lg border shadow-md">
          <CommandInput 
            placeholder="Search by name, position, team or nationality..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>No players found.</CommandEmpty>
            <CommandGroup heading="Players">
              {filteredPlayers.map((player) => (
                <CommandItem
                  key={player.id}
                  onSelect={() => handleAddPlayer(player)}
                  className="flex items-center gap-2 py-2 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <img 
                      src={player.photo} 
                      alt={player.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{player.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {player.age} • {player.position} • {player.team} • {player.value}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerSearch;
