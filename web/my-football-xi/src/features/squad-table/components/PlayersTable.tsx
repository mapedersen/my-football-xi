
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Player } from "@/features/team/types";
import { Activity, RefreshCw, X, Clock } from "lucide-react";

interface PlayersTableProps {
  players: Player[];
  sortConfig: {
    key: keyof Player | "stats.goals" | "stats.appearances" | "salary_numeric";
    direction: "asc" | "desc";
  };
  handleSort: (key: keyof Player | "stats.goals" | "stats.appearances" | "salary_numeric") => void;
  handleStatusChange: (playerId: string, status: string) => void;
  handlePlayerDetail: (player: Player) => void;
  handlePlayerNameClick: (player: Player) => void;
  handleContractAction?: (playerId: string, action: "renew" | "expire") => void;
}

const PlayersTable: React.FC<PlayersTableProps> = ({
  players,
  sortConfig,
  handleSort,
  handleStatusChange,
  handlePlayerDetail,
  handlePlayerNameClick,
  handleContractAction = () => {}
}) => {
  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? " ↑" : " ↓";
  };

  const getFanPulseColor = (value?: number) => {
    if (!value) return "bg-gray-300";
    if (value < 40) return "bg-red-500";
    if (value < 60) return "bg-orange-400";
    if (value < 80) return "bg-blue-500";
    return "bg-green-500";
  };
  
  const getFanSentiment = (value?: number) => {
    if (!value) return "Unknown";
    if (value < 40) return "Negative";
    if (value < 60) return "Mixed";
    if (value < 80) return "Positive";
    return "Adored";
  };

  // Calculate if contract is expiring soon
  const getContractStatus = (expiryDate: string) => {
    if (!expiryDate) return null;
    
    const expiry = new Date(expiryDate);
    const now = new Date();
    const yearDiff = expiry.getFullYear() - now.getFullYear();
    
    if (yearDiff < 1) {
      return { status: "expiring", colorClass: "text-red-600", label: "Expiring" };
    } else if (yearDiff < 2) {
      return { status: "renewal", colorClass: "text-amber-600", label: "Renewal Due" };
    } else {
      return { status: "good", colorClass: "text-green-600", label: "Secure" };
    }
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
          <TableHead>Fan Pulse</TableHead>
          <TableHead>Contract</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Rating</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map((player) => (
          <TableRow key={player.id} className="group hover:bg-gray-50">
            <TableCell className="font-medium">{player.number}</TableCell>
            <TableCell
              onClick={() => handlePlayerNameClick(player)}
              className="cursor-pointer"
            >
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
                <span className="hover:underline">{player.name}</span>
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
            <TableCell>{player.stats.appearances}</TableCell>
            <TableCell>{player.stats.goals}</TableCell>
            <TableCell>
              <HoverCard>
                <HoverCardTrigger>
                  <div className="flex items-center gap-2 cursor-help">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getFanPulseColor(player.fanPulse)}`}
                        style={{ width: `${player.fanPulse || 50}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{player.fanPulse || 50}%</span>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium flex items-center">
                        <Activity className="h-4 w-4 mr-1 text-blue-500" />
                        Fan Sentiment
                      </h4>
                      <span className="text-sm font-medium">{getFanSentiment(player.fanPulse)}</span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p>Based on social media analysis, forum discussions, and fan polls.</p>
                      <div className="pt-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Negative</span>
                          <span>Positive</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getFanPulseColor(player.fanPulse)}`}
                            style={{ width: `${player.fanPulse || 50}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </TableCell>
            <TableCell>
              {player.contract ? (
                <div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{player.contract}</span>
                  </div>
                  {getContractStatus(player.contract) && (
                    <div className="mt-1">
                      {player.status?.recommendation !== 'sell' && 
                       getContractStatus(player.contract)?.status !== 'good' && (
                        <div className="flex items-center gap-1 mt-1">
                          {getContractStatus(player.contract)?.status === 'renewal' ? (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 px-2 text-xs"
                              onClick={() => handleContractAction(player.id, 'renew')}
                            >
                              <RefreshCw className="h-3 w-3 mr-1" />
                              Renew
                            </Button>
                          ) : getContractStatus(player.contract)?.status === 'expiring' ? (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 px-2 text-xs text-amber-600 border-amber-300 hover:bg-amber-50"
                              onClick={() => handleContractAction(player.id, 'expire')}
                            >
                              <X className="h-3 w-3 mr-1" />
                              Let Expire
                            </Button>
                          ) : null}
                        </div>
                      )}
                      <div className={`text-xs mt-1 ${getContractStatus(player.contract)?.colorClass}`}>
                        {getContractStatus(player.contract)?.label}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <span className="text-gray-500">-</span>
              )}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={player.status?.injured}
                  >
                    {player.status?.recommendation || "Select"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleStatusChange(player.id, "keep")}>
                    <span className="text-green-700 font-medium">Keep</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange(player.id, "sell")}>
                    <span className="text-red-700 font-medium">Sell</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange(player.id, "loan")}>
                    <span className="text-blue-700 font-medium">Loan Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <span className="font-medium">{player.rating || "-"}</span>
                <span className="text-gray-500">/10</span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PlayersTable;
