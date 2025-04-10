
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/shared/components/ui/hover-card";
import { Info } from 'lucide-react';
import { Player } from '@/models/Player';
import { 
  formatCurrency, 
  getContractTimeRemaining, 
  getValueForMoneyColor, 
  getValueForMoneyLabel 
} from '../utils/squadUtils';
import PlayerStatusButton from './PlayerStatusButton';
import ContractActionButton from './ContractActionButton';

interface PlayersTableProps {
  players: Player[];
  teamId: string;
  sortConfig: { 
    key: keyof Player | "stats.goals" | "stats.appearances" | "salary_numeric"; 
    direction: "asc" | "desc";
  };
  handleSort: (key: keyof Player | "stats.goals" | "stats.appearances" | "salary_numeric") => void;
  handlePlayerDetail: (player: Player) => void;
}

/**
 * Component for rendering the players table
 */
const PlayersTable: React.FC<PlayersTableProps> = ({ 
  players, 
  teamId,
  sortConfig, 
  handleSort, 
  handlePlayerDetail 
}) => {
  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? " ↑" : " ↓";
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead 
            className="w-[50px] cursor-pointer"
            onClick={() => handleSort("number")}
          >
            # {getSortIcon("number")}
          </TableHead>
          <TableHead 
            className="cursor-pointer"
            onClick={() => handleSort("name")}
          >
            Player {getSortIcon("name")}
          </TableHead>
          <TableHead 
            className="cursor-pointer"
            onClick={() => handleSort("position")}
          >
            Pos {getSortIcon("position")}
          </TableHead>
          <TableHead 
            className="cursor-pointer"
            onClick={() => handleSort("salary_numeric")}
          >
            Salary {getSortIcon("salary_numeric")}
          </TableHead>
          <TableHead>
            Market Value
          </TableHead>
          <TableHead>
            Contract
          </TableHead>
          <TableHead 
            className="cursor-pointer"
            onClick={() => handleSort("stats.appearances")}
          >
            Apps {getSortIcon("stats.appearances")}
          </TableHead>
          <TableHead 
            className="cursor-pointer"
            onClick={() => handleSort("stats.goals")}
          >
            Goals {getSortIcon("stats.goals")}
          </TableHead>
          <TableHead>Value Assessment</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map((player) => (
          <TableRow key={player.id} className="group hover:bg-gray-50">
            <TableCell className="font-medium">{player.number}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <img 
                  src={player.image} 
                  alt={player.name}
                  className="w-8 h-8 rounded-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
                <span 
                  className="cursor-pointer hover:underline"
                  onClick={() => handlePlayerDetail(player)}
                >
                  {player.name}
                </span>
                <div className="flex gap-1">
                  {player.status?.injured && (
                    <span className="bg-red-100 text-red-800 text-xs px-1 rounded">
                      INJ
                    </span>
                  )}
                  {player.status?.captain && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-1 rounded">
                      C
                    </span>
                  )}
                </div>
              </div>
            </TableCell>
            <TableCell>{player.position}</TableCell>
            <TableCell>{player.salary}</TableCell>
            <TableCell>{formatCurrency(player.marketValue || 0)}</TableCell>
            <TableCell>
              <div className="flex items-center justify-between">
                <span>{player.contract} ({getContractTimeRemaining(player)})</span>
                <ContractActionButton player={player} teamId={teamId} />
              </div>
            </TableCell>
            <TableCell>{player.stats.appearances}</TableCell>
            <TableCell>{player.stats.goals}</TableCell>
            <TableCell>
              <HoverCard>
                <HoverCardTrigger>
                  <span className={`${getValueForMoneyColor(player.valueForMoney)} font-medium cursor-help`}>
                    {getValueForMoneyLabel(player.valueForMoney)}
                  </span>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">Salary Analysis</h4>
                    <div className="text-sm">
                      <p>Player is earning {player.salary}</p>
                      <p className="mt-1">
                        <span className="font-medium">Squad average:</span> £120,000/week
                      </p>
                      <p>
                        <span className="font-medium">League average for position:</span> £90,000/week
                      </p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </TableCell>
            <TableCell>
              <PlayerStatusButton player={player} teamId={teamId} />
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <span className="font-medium">{player.rating || "-"}</span>
                <span className="text-gray-500">/10</span>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handlePlayerDetail(player)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Info className="h-4 w-4" />
                <span className="sr-only">Details</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PlayersTable;
