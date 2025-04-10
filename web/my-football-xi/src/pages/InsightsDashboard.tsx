
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  HomeIcon, TableIcon, Activity, 
  BarChart3, Users, TrendingUp, TrendingDown, 
  ShieldCheck, ShieldX, Calendar
} from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  LineChart, 
  Line, 
  CartesianGrid,
  Cell,
  Legend
} from 'recharts';

// Mock data for fan insights
const salaryPerformanceData = [
  { name: 'Rashford', salary: 300, performance: 6.2 },
  { name: 'Bruno', salary: 240, performance: 7.8 },
  { name: 'Casemiro', salary: 350, performance: 6.5 },
  { name: 'Mount', salary: 250, performance: 5.8 },
  { name: 'Martinez', salary: 180, performance: 7.5 },
  { name: 'Hojlund', salary: 160, performance: 6.9 },
  { name: 'Onana', salary: 210, performance: 6.7 },
];

const positionKeepSellData = [
  { position: 'GK', keep: 75, sell: 25 },
  { position: 'DEF', keep: 68, sell: 32 },
  { position: 'MID', keep: 42, sell: 58 },
  { position: 'FWD', keep: 58, sell: 42 },
];

const mostTrustedPlayers = [
  { name: 'Bruno Fernandes', value: 92, trend: 'up' },
  { name: 'Kobbie Mainoo', value: 89, trend: 'up' },
  { name: 'Lisandro Martinez', value: 86, trend: 'down' },
  { name: 'Alejandro Garnacho', value: 85, trend: 'up' },
  { name: 'Rasmus Hojlund', value: 82, trend: 'neutral' },
];

const mostDoubtedPlayers = [
  { name: 'Casemiro', value: 45, trend: 'down' },
  { name: 'Marcus Rashford', value: 48, trend: 'down' },
  { name: 'Antony', value: 32, trend: 'down' },
  { name: 'Mason Mount', value: 51, trend: 'up' },
  { name: 'Harry Maguire', value: 58, trend: 'up' },
];

const identifiedWeakSpots = [
  { area: 'Defensive Midfielder', percentage: 78 },
  { area: 'Right Winger', percentage: 71 },
  { area: 'Center Forward', percentage: 65 },
  { area: 'Right Back', percentage: 58 },
];

const sentimentTimeline = [
  { date: '2023-08', event: 'Season Start', sentiment: 72 },
  { date: '2023-09', event: 'UCL Loss', sentiment: 61 },
  { date: '2023-10', event: 'Derby Win', sentiment: 78 },
  { date: '2023-11', event: 'Injury Crisis', sentiment: 54 },
  { date: '2023-12', event: 'Winter Form', sentiment: 48 },
  { date: '2024-01', event: 'Transfer Window', sentiment: 57 },
  { date: '2024-02', event: 'Cup Run', sentiment: 68 },
  { date: '2024-03', event: 'UCL Exit', sentiment: 52 },
  { date: '2024-04', event: 'Late Push', sentiment: 63 },
  { date: '2024-05', event: 'Season End', sentiment: 59 },
];

const InsightsDashboard = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const [timeRange, setTimeRange] = useState('season'); // season, 3months, month
  
  const getTeamInfo = () => {
    switch(teamId) {
      case 'man-united':
        return {
          name: "Manchester United",
          shortName: "United",
          primaryColor: "text-united-red",
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
  
  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
  };

  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className={`${teamInfo.logoClass} text-white py-4`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{teamInfo.name} Fan Insights</h1>
            <div className="text-sm">Community analytics and sentiment trends</div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-6 px-4">
        <div className="mb-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div className="flex gap-2">
            <Link to={`/team/${teamId}`}>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <HomeIcon className="w-4 h-4" /> Lineup
              </Button>
            </Link>
            <Link to={`/team/${teamId}/squad-table`}>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <TableIcon className="w-4 h-4" /> Squad
              </Button>
            </Link>
            <Link to={`/team/${teamId}/transfer-hub`}>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Activity className="w-4 h-4" /> Transfers
              </Button>
            </Link>
            <Button variant="outline" size="sm" className="flex items-center gap-1 bg-gray-100" disabled>
              <BarChart3 className="w-4 h-4" /> Insights
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Time range:</span>
            <Select 
              value={timeRange} 
              onValueChange={handleTimeRangeChange}
            >
              <SelectTrigger className="w-32 h-8">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="season">Full Season</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-united-red" />
                  Salary vs. Performance Rating
                </h2>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={salaryPerformanceData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="salary" name="Weekly Salary (£k)" fill="#8884d8" />
                      <Bar yAxisId="right" dataKey="performance" name="Fan Rating (1-10)" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="keepSell" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="keepSell">Keep/Sell Rates</TabsTrigger>
                <TabsTrigger value="timeline">Sentiment Timeline</TabsTrigger>
                <TabsTrigger value="weakSpots">Identified Weak Spots</TabsTrigger>
              </TabsList>
              
              <TabsContent value="keepSell" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={positionKeepSellData}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" domain={[0, 100]} />
                          <YAxis dataKey="position" type="category" />
                          <Tooltip formatter={(value) => [`${value}%`]} />
                          <Legend />
                          <Bar dataKey="keep" name="Keep %" stackId="a" fill="#82ca9d" />
                          <Bar dataKey="sell" name="Sell %" stackId="a" fill="#ff7675" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="text-sm text-gray-500 text-center mt-4">
                      Fan keep/sell opinions by position group
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="timeline" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={sentimentTimeline}
                          margin={{ top: 5, right: 30, left: 20, bottom: 30 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis domain={[40, 100]} />
                          <Tooltip 
                            formatter={(value, name, props) => {
                              return [`${value}%`, 'Fan Sentiment'];
                            }}
                            labelFormatter={(label, payload) => {
                              if (payload && payload.length > 0) {
                                return `${label}: ${payload[0].payload.event}`;
                              }
                              return label;
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="sentiment" 
                            name="Fan Sentiment" 
                            stroke="#e53e3e" 
                            strokeWidth={2}
                            dot={{ r: 4 }} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-4">
                      <Calendar className="w-4 h-4" />
                      <span>Fan sentiment tracked over the season with key events</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="weakSpots" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={identifiedWeakSpots}
                          margin={{ top: 5, right: 30, left: 20, bottom: 30 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="area" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip formatter={(value) => [`${value}%`, 'Fan Agreement']} />
                          <Bar dataKey="percentage" name="Fan Agreement" fill="#e53e3e">
                            {identifiedWeakSpots.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.percentage > 70 ? '#e53e3e' : '#f56565'} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="text-sm text-gray-500 text-center mt-4">
                      Areas fans think need reinforcement the most
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-4 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                  Most Trusted Players
                </h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mostTrustedPlayers.map((player, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-sm">{index + 1}.</span>
                        <span>{player.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{player.value}%</span>
                        {getTrendIcon(player.trend)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <ShieldX className="w-5 h-5 text-red-500" />
                  Most Doubted Players
                </h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mostDoubtedPlayers.map((player, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-sm">{index + 1}.</span>
                        <span>{player.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{player.value}%</span>
                        {getTrendIcon(player.trend)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5 text-united-red" />
                  AI Fan Sentiment Summary
                </h2>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-sm">
                  <p className="mb-3">
                    Based on 23,562 fan interactions this season, this community believes:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex gap-2">
                      <div className="flex-shrink-0 w-1 bg-united-red rounded"></div>
                      <p>The team lacks creativity in the final third and needs a right winger under 24 with strong dribbling ability.</p>
                    </li>
                    <li className="flex gap-2">
                      <div className="flex-shrink-0 w-1 bg-united-red rounded"></div>
                      <p>A ball-winning defensive midfielder is the biggest priority for the summer window.</p>
                    </li>
                    <li className="flex gap-2">
                      <div className="flex-shrink-0 w-1 bg-united-red rounded"></div>
                      <p>The current squad has too many players past their prime on high wages.</p>
                    </li>
                    <li className="flex gap-2">
                      <div className="flex-shrink-0 w-1 bg-united-red rounded"></div>
                      <p>Academy products are significantly more trusted than recent signings.</p>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <footer className="bg-black text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>This is a fan-created application. Not affiliated with {teamInfo.name}.</p>
          <p className="text-xs mt-2 text-gray-400">Insights data is for demonstration purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default InsightsDashboard;
