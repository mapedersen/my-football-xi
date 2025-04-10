import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Info, DollarSign, BarChart3, Flag, Calendar, Heart } from "lucide-react";
import { fetchTeamById } from "@/services/api/teamService";
import { Player } from "../types";
import PlayerDetailModal from "../components/PlayerDetailModal";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeamHeader from "../components/TeamHeader";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

type SortKey = keyof Player | "stats.goals" | "stats.appearances" | "salary_numeric";

const SquadTable: React.FC = () => {
  const { teamId = 'man-united' } = useParams<{ teamId: string }>();
  const [squad, setSquad] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [teamInfo, setTeamInfo] = useState({
    name: "Manchester United",
    shortName: "United",
    primaryColor: "text-united-red",
    logoClass: "bg-united-red"
  });
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: "asc" | "desc";
  }>({
    key: "number",
    direction: "asc",
  });
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [playerRating, setPlayerRating] = useState<number>(5);
  const [valueForMoney, setValueForMoney] = useState<number>(0);
  const [playerStatus, setPlayerStatus] = useState<string>("keep");
  const [playerComment, setPlayerComment] = useState<string>("");
  const [budgetInfo, setBudgetInfo] = useState({
    transferBudget: 120000000, // £120M
    wageSpace: 650000, // £650K/week
    pendingSales: 0,
    pendingPurchases: 0
  });
  const [activeTab, setActiveTab] = useState<"players" | "insights">("players");
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const team = await fetchTeamById(teamId);
        setTeamInfo({
          name: team.name,
          shortName: team.shortName,
          primaryColor: team.primaryColor,
          logoClass: team.logoClass
        });
        setTimeout(() => {
          import("../mocks/playerMock").then(({ getAllPlayers }) => {
            setSquad(getAllPlayers());
            setLoading(false);
          });
        }, 500);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load squad data. Please try again.");
        setLoading(false);
      }
    };
    loadData();
  }, [teamId]);

  useEffect(() => {
    if (selectedPlayer) {
      setPlayerRating(selectedPlayer.rating || 5);
      setValueForMoney(selectedPlayer.valueForMoney || 0);
      setPlayerStatus(selectedPlayer.status?.recommendation || "keep");
      setPlayerComment(selectedPlayer.comments || "");
    }
  }, [selectedPlayer]);

  useEffect(() => {
    const calculateBudget = () => {
      let pendingSales = 0;
      squad.forEach(player => {
        if (player.status?.recommendation === 'sell') {
          const marketValue = getSalaryNumeric(player.salary) * 52 * 2;
          pendingSales += marketValue;
        }
      });
      setBudgetInfo(prev => ({
        ...prev,
        pendingSales
      }));
    };
    if (squad.length > 0) {
      calculateBudget();
    }
  }, [squad]);

  const getSalaryNumeric = (salaryString: string): number => {
    const numericValue = parseInt(salaryString.replace(/[^0-9]/g, ""));
    return isNaN(numericValue) ? 0 : numericValue;
  };

  const formatCurrency = (amount: number): string => {
    if (amount >= 1000000) {
      return `£${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `£${(amount / 1000).toFixed(0)}K`;
    }
    return `£${amount}`;
  };

  const processedPlayers = squad.map((player) => {
    const salaryNumeric = getSalaryNumeric(player.salary);
    const marketValue = player.marketValue !== undefined ? 
      player.marketValue : 
      salaryNumeric * 52 * 2;
    return {
      ...player,
      salary_numeric: salaryNumeric,
      marketValue: marketValue
    };
  });

  const sortedPlayers = [...processedPlayers].sort((a, b) => {
    let aValue, bValue;

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

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortConfig.direction === "asc"
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
  });

  const keepPlayers = sortedPlayers.filter(p => p.status?.recommendation === 'keep' || !p.status?.recommendation);
  const sellPlayers = sortedPlayers.filter(p => p.status?.recommendation === 'sell');
  const loanPlayers = sortedPlayers.filter(p => p.status?.recommendation === 'loan');
  const injuredPlayers = sortedPlayers.filter(p => p.status?.injured);

  const handleSort = (key: SortKey) => {
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
    toast({
      title: "Player status updated",
      description: `Player status changed to ${status}`,
    });
  };

  const handleContractAction = (playerId: string, action: "renew" | "expire") => {
    setSquad(prevSquad => prevSquad.map(player => {
      if (player.id === playerId) {
        const updatedPlayer = { ...player };
        
        if (action === "renew") {
          const currentContract = player.contract || "2025";
          const currentYear = parseInt(currentContract, 10);
          updatedPlayer.contract = `${currentYear + 3}`;
          
          toast({
            title: "Contract renewal initiated",
            description: `${player.name}'s contract extended until ${currentYear + 3}`,
          });
        } else if (action === "expire") {
          toast({
            title: "Contract set to expire",
            description: `${player.name}'s contract will be allowed to expire`,
          });
        }
        
        return updatedPlayer;
      }
      return player;
    }));
  };

  const handlePlayerDetail = (player: Player) => {
    setSelectedPlayer(player);
    setDetailDialogOpen(true);
  };

  const handleSavePlayerAssessment = () => {
    if (!selectedPlayer) return;
    
    const updatedPlayer = {
      ...selectedPlayer,
      rating: playerRating,
      valueForMoney: valueForMoney,
      status: {
        ...selectedPlayer.status,
        recommendation: playerStatus
      },
      comments: playerComment
    };
    
    setSquad(prevSquad => 
      prevSquad.map(player => 
        player.id === updatedPlayer.id ? updatedPlayer : player
      )
    );
    
    toast({
      title: "Player assessment saved",
      description: `Your assessment of ${selectedPlayer.name} has been saved.`
    });
    
    setDetailDialogOpen(false);
  };

  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? " ↑" : " ↓";
  };

  const getValueForMoneyColor = (value?: number) => {
    if (value === undefined) return "text-gray-500";
    if (value < -1) return "text-red-600";
    if (value < 0) return "text-orange-500";
    if (value === 0) return "text-gray-600";
    if (value > 1) return "text-green-600";
    return "text-green-500";
  };

  const getValueForMoneyLabel = (value?: number) => {
    if (value === undefined) return "Not rated";
    if (value < -1) return "Extremely Overpaid";
    if (value < 0) return "Overpaid";
    if (value === 0) return "Fair Value";
    if (value > 1) return "Great Value";
    return "Good Value";
  };

  const renderPlayersTable = (players: Player[]) => (
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
                    const target = e.target as HTMLImageElement;
                    console.error(`Failed to load image: ${target.src}`);
                    target.src = '/placeholder-player.jpg';
                  }}
                />
                <span>{player.name}</span>
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
                  <DropdownMenuItem onClick={() => handleStatusChange(player.id, "promote")}>
                    <span className="text-purple-700 font-medium">Promote</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange(player.id, "bench")}>
                    <span className="text-yellow-700 font-medium">Bench</span>
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

  const calculateAverages = () => {
    if (!squad.length) return { age: 0, goals: 0, appearances: 0, salary: 0 };
    
    const totalAges = squad.reduce((sum, player) => sum + (player.age || 0), 0);
    const totalGoals = squad.reduce((sum, player) => sum + player.stats.goals, 0);
    const totalAppearances = squad.reduce((sum, player) => sum + player.stats.appearances, 0);
    const totalSalaries = squad.reduce((sum, player) => sum + getSalaryNumeric(player.salary), 0);
    
    return {
      age: Math.round(totalAges / squad.length),
      goals: Math.round(totalGoals / squad.length),
      appearances: Math.round(totalAppearances / squad.length),
      salary: Math.round(totalSalaries / squad.length)
    };
  };

  const averages = calculateAverages();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-united-red mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading squad data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-gray-50">
      <TeamHeader teamInfo={teamInfo} currentView="squad" />

      <main className="container mx-auto py-6 px-4">
        <div className="mb-6">
          <h1 className={`text-3xl font-bold ${teamInfo.primaryColor}`}>Squad Overview</h1>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "players" | "insights")} className="mb-6">
          <TabsList>
            <TabsTrigger value="players" className="px-8">Players</TabsTrigger>
            <TabsTrigger value="insights" className="px-8">Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="players" className="mt-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Tabs defaultValue="all">
                <div className="p-4 border-b">
                  <TabsList className="grid grid-cols-5">
                    <TabsTrigger value="all">All Players ({squad.length})</TabsTrigger>
                    <TabsTrigger value="keep">Keep ({keepPlayers.length})</TabsTrigger>
                    <TabsTrigger value="sell" className="text-red-600">Sell ({sellPlayers.length})</TabsTrigger>
                    <TabsTrigger value="loan" className="text-blue-600">Loan ({loanPlayers.length})</TabsTrigger>
                    <TabsTrigger value="injured" className="text-red-700">Injured ({injuredPlayers.length})</TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="overflow-x-auto">
                  <TabsContent value="all">{renderPlayersTable(sortedPlayers)}</TabsContent>
                  <TabsContent value="keep">{renderPlayersTable(keepPlayers)}</TabsContent>
                  <TabsContent value="sell">{renderPlayersTable(sellPlayers)}</TabsContent>
                  <TabsContent value="loan">{renderPlayersTable(loanPlayers)}</TabsContent>
                  <TabsContent value="injured">{renderPlayersTable(injuredPlayers)}</TabsContent>
                </div>
              </Tabs>
            </div>
          </TabsContent>
          
          <TabsContent value="insights" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Squad Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Squad Size:</span>
                      <span className="font-medium">{squad.length} players</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Average Age:</span>
                      <span className="font-medium">{averages.age} years</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Average Salary:</span>
                      <span className="font-medium">£{formatCurrency(averages.salary)}/week</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Total Wage Bill:</span>
                      <span className="font-medium">£{formatCurrency(averages.salary * squad.length)}/week</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Injured Players:</span>
                      <span className="font-medium text-red-600">{injuredPlayers.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Position Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Goalkeepers:</span>
                      <span className="font-medium">{squad.filter(p => p.position === 'GK').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Defenders:</span>
                      <span className="font-medium">{squad.filter(p => ['CB', 'LB', 'RB', 'LWB', 'RWB'].includes(p.position)).length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Midfielders:</span>
                      <span className="font-medium">{squad.filter(p => ['CM', 'CDM', 'CAM', 'LM', 'RM'].includes(p.position)).length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Forwards:</span>
                      <span className="font-medium">{squad.filter(p => ['ST', 'CF', 'LW', 'RW'].includes(p.position)).length}</span>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-medium mb-2">Position Needs:</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Central Midfield:</span>
                          <span className="text-red-500">High Priority</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Right Wing:</span>
                          <span className="text-yellow-500">Medium Priority</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Center Back:</span>
                          <span className="text-green-500">Low Priority</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Financial Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Market Value:</span>
                      <span className="font-medium">{formatCurrency(squad.reduce((sum, player) => sum + (player.marketValue || 0), 0))}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Annual Wage Bill:</span>
                      <span className="font-medium">{formatCurrency(averages.salary * squad.length * 52)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Pending Sales:</span>
                      <span className="font-medium text-green-600">+{formatCurrency(budgetInfo.pendingSales)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Pending Purchases:</span>
                      <span className="font-medium text-red-600">-{formatCurrency(budgetInfo.pendingPurchases)}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2 pt-2 border-t">
                      <span className="text-gray-700 font-medium">Available Budget:</span>
                      <span className="font-bold text-united-red">{formatCurrency(budgetInfo.transferBudget + budgetInfo.pendingSales - budgetInfo.pendingPurchases)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-4xl">
          {selectedPlayer && (
            <div className="overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">Player Assessment</DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                <div>
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                      <img 
                        src={selectedPlayer.image} 
                        alt={selectedPlayer.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                    <h2 className="text-xl font-bold">{selectedPlayer.name}</h2>
                    <div className="flex items-center gap-2 text-gray-600 mt-1">
                      <span>#{selectedPlayer.number}</span>
                      <span>•</span>
                      <span>{selectedPlayer.position}</span>
                      {selectedPlayer.nationality && (
                        <>
                          <span>•</span>
                          <div className="flex items-center">
                            <Flag className="h-4 w-4 mr-1" />
                            <span>{selectedPlayer.nationality}</span>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="w-full mt-6 space-y-4">
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="text-sm text-gray-500">Salary</div>
                        <div className="font-bold">{selectedPlayer.salary}</div>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="text-sm text-gray-500">Market Value</div>
                        <div className="font-bold">{formatCurrency(selectedPlayer.marketValue || getSalaryNumeric(selectedPlayer.salary) * 52 * 2)}</div>
                      </div>
                      
                      {selectedPlayer.age && (
                        <div className="bg-gray-50 p-3 rounded-md">
                          <div className="text-sm text-gray-500">Age</div>
                          <div className="font-bold">{selectedPlayer.age} years</div>
                        </div>
                      )}
                      
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="text-sm text-gray-500">Contract Status</div>
                        <div className="font-bold">{selectedPlayer.contract || "Until 2026"}</div>
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
                        <div className="font-bold text-xl">{selectedPlayer.stats.appearances}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Goals</div>
                        <div className="font-bold text-xl">{selectedPlayer.stats.goals}</div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-md grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Assists</div>
                        <div className="font-bold text-xl">{selectedPlayer.stats.assists}</div>
                      </div>
                      {selectedPlayer.stats.cleanSheets !== undefined && (
                        <div>
                          <div className="text-sm text-gray-500">Clean Sheets</div>
                          <div className="font-bold text-xl">{selectedPlayer.stats.cleanSheets}</div>
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="text-sm text-gray-500 mb-2">Fitness Level</div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${selectedPlayer.status?.injured ? 'bg-red-500' : 'bg-green-500'}`}
                          style={{ width: `${selectedPlayer.fitness || 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {selectedPlayer.status?.injured && (
                        <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          Injured
                        </div>
                      )}
                      {selectedPlayer.status?.captain && (
                        <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                          Team Captain
                        </div>
                      )}
                      {selectedPlayer.status?.onLoan && (
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
                          disabled={selectedPlayer.status?.injured}
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
                          disabled={selectedPlayer.status?.injured}
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
                        disabled={selectedPlayer.status?.injured}
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
                      <Label htmlFor="player-comment" className="text-sm font-medium">Your Comments</Label>
                      <Textarea
                        id="player-comment"
                        value={playerComment}
                        onChange={(e) => setPlayerComment(e.target.value)}
                        placeholder="Add your thoughts on this player..."
                        className="mt-2"
                        disabled={selectedPlayer.status?.injured}
                      />
                    </div>
                    
                    {selectedPlayer.status?.injured && (
                      <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
                        <p className="font-bold">Player is currently injured</p>
                        <p>Unable to modify status or assessment until recovery</p>
                      </div>
                    )}
                    
                    <div className="flex justify-end gap-2 pt-4">
                      <Button variant="outline" onClick={() => setDetailDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleSavePlayerAssessment}
                        disabled={selectedPlayer.status?.injured}
                      >
                        Save Assessment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
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
