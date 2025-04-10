
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { players } from "../services/playerService";
import { Player } from "../models/Player";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Clock, RefreshCw, X } from "lucide-react";

const SquadTable = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const [squad, setSquad] = useState<Player[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Player | "stats.goals" | "stats.appearances" | "salary_numeric";
    direction: "asc" | "desc";
  }>({
    key: "number",
    direction: "asc",
  });

  // Load player data and add random contract dates
  useEffect(() => {
    // Add random contract dates between 1-5 years in the future
    const playersWithContracts = players.map(player => {
      const currentYear = new Date().getFullYear();
      const randomYears = Math.floor(Math.random() * 5) + 1; // Random number between 1-5
      return {
        ...player,
        contract: (currentYear + randomYears).toString()
      };
    });
    setSquad(playersWithContracts);
  }, []);

  // Get team info based on ID - in a real app this would come from an API or context
  const getTeamInfo = () => {
    switch(teamId) {
      case 'man-united':
        return {
          name: "Manchester United",
          shortName: "United",
          primaryColor: "text-united-red", // using existing color
          logoClass: "bg-united-red"
        };
      case 'liverpool':
        return {
          name: "Liverpool",
          shortName: "Liverpool",
          primaryColor: "text-red-600",
          logoClass: "bg-red-600"
        };
      case 'man-city':
        return {
          name: "Manchester City",
          shortName: "City",
          primaryColor: "text-sky-500",
          logoClass: "bg-sky-500"
        };
      // Add other teams as needed
      default:
        return {
          name: "Manchester United",
          shortName: "United",
          primaryColor: "text-united-red",
          logoClass: "bg-united-red"
        };
    }
  };
  
  const teamInfo = getTeamInfo();

  // Helper function to extract numeric value from salary string
  const getSalaryNumeric = (salaryString: string): number => {
    const numericValue = parseInt(salaryString.replace(/[^0-9]/g, ""));
    return isNaN(numericValue) ? 0 : numericValue;
  };

  // Process players with computed fields
  const processedPlayers = squad.map((player) => ({
    ...player,
    salary_numeric: getSalaryNumeric(player.salary),
  }));

  // Sort the players based on the current sort configuration
  const sortedPlayers = [...processedPlayers].sort((a, b) => {
    let aValue, bValue;

    // Handle nested keys
    if (sortConfig.key === "stats.goals") {
      aValue = a.stats.goals;
      bValue = b.stats.goals;
    } else if (sortConfig.key === "stats.appearances") {
      aValue = a.stats.appearances;
      bValue = b.stats.appearances;
    } else if (sortConfig.key === "salary_numeric") {
      aValue = getSalaryNumeric(a.salary);
      bValue = getSalaryNumeric(b.salary);
    } else {
      aValue = a[sortConfig.key as keyof Player];
      bValue = b[sortConfig.key as keyof Player];
    }

    if (aValue === bValue) {
      return 0;
    }

    // Handle string comparison
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    // Handle number comparison
    return sortConfig.direction === "asc"
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
  });

  const handleSort = (key: keyof Player | "stats.goals" | "stats.appearances" | "salary_numeric") => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleStatusChange = (playerId: string, status: string) => {
    setSquad(
      squad.map((player) =>
        player.id === playerId
          ? {
              ...player,
              status: {
                ...player.status,
                recommendation: status,
              },
            }
          : player
      )
    );
  };

  const handleContractAction = (playerId: string, action: "renew" | "expire") => {
    setSquad(prevSquad => prevSquad.map(player => {
      if (player.id === playerId) {
        const updatedPlayer = { ...player };
        
        if (action === "renew") {
          const currentContract = player.contract || "2025";
          const currentYear = parseInt(currentContract, 10);
          updatedPlayer.contract = `${currentYear + 3}`;
        }
        
        return updatedPlayer;
      }
      return player;
    }));
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

  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? " ↑" : " ↓";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className={`${teamInfo.logoClass} text-white py-4`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">My {teamInfo.shortName} XI</h1>
            <div className="text-sm">Full Squad Analysis</div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4">
        <div className="mb-6 flex items-center gap-4">
          <Link to={`/team/${teamId || 'man-united'}`}>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back to Pitch View
            </Button>
          </Link>
          <h1 className={`text-3xl font-bold ${teamInfo.primaryColor}`}>Squad Analysis</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="overflow-x-auto">
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
                  <TableHead>
                    Contract
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Your Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedPlayers.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell className="font-medium">{player.number}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img 
                          src={player.image} 
                          alt={player.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span>{player.name}</span>
                        {player.status?.injured && (
                          <span className="bg-red-100 text-red-800 text-xs px-1 rounded">
                            Injured
                          </span>
                        )}
                        {player.status?.captain && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-1 rounded">
                            Captain
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{player.position}</TableCell>
                    <TableCell>{player.salary}</TableCell>
                    <TableCell>{player.stats.appearances}</TableCell>
                    <TableCell>{player.stats.goals}</TableCell>
                    <TableCell>
                      {player.contract && (
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
                      )}
                    </TableCell>
                    <TableCell>
                      <RadioGroup 
                        value={player.status?.recommendation || "keep"} 
                        onValueChange={(value) => handleStatusChange(player.id, value)}
                        className="flex gap-2"
                      >
                        <div className="flex items-center gap-1">
                          <RadioGroupItem value="keep" id={`keep-${player.id}`} />
                          <Label htmlFor={`keep-${player.id}`} className="text-xs text-green-700">
                            Keep
                          </Label>
                        </div>
                        <div className="flex items-center gap-1">
                          <RadioGroupItem value="sell" id={`sell-${player.id}`} />
                          <Label htmlFor={`sell-${player.id}`} className="text-xs text-red-700">
                            Sell
                          </Label>
                        </div>
                        <div className="flex items-center gap-1">
                          <RadioGroupItem value="loan" id={`loan-${player.id}`} />
                          <Label htmlFor={`loan-${player.id}`} className="text-xs text-blue-700">
                            Loan
                          </Label>
                        </div>
                      </RadioGroup>
                    </TableCell>
                    <TableCell>{player.rating || "-"}/10</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
      
      <footer className="bg-black text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>This is a fan-created application. Not affiliated with {teamInfo.name}.</p>
          <p className="text-xs mt-2 text-gray-400">Player data is for demonstration purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default SquadTable;
