
import React, { useState } from "react";
import { UserCircle, DollarSign, Activity, Briefcase, PieChart, Star } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OpinionSection from "@/components/OpinionSection";

interface ClubManagementSectionProps {
  teamId: string;
}

interface ManagementPerson {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
  traits: string[];
  stake?: number;
  satisfaction?: number;
}

const ClubManagementSection: React.FC<ClubManagementSectionProps> = ({ teamId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "ratings">("overview");
  
  const management: Record<string, {
    owners: ManagementPerson[];
    directors: ManagementPerson[];
    manager: ManagementPerson;
    financialInfo: {
      transferBudget: string;
      w0ageStructure: string;
      debtLevel: string;
      financialFairPlay: string;
      spendingStrategy: string;
    }
  }> = {
    "man-united": {
      owners: [
        {
          id: "1",
          name: "INEOS & Sir Jim Ratcliffe",
          role: "Minority Owner",
          image: "https://i2-prod.manchestereveningnews.co.uk/incoming/article28026593.ece/ALTERNATES/s1200c/0_GettyImages-1804116856.jpg",
          description: "British billionaire who purchased a 27.7% stake in Manchester United in 2023, with control over football operations.",
          traits: ["Strategic", "Cost-conscious", "Long-term planner"],
          stake: 27.7,
          satisfaction: 7
        },
        {
          id: "2",
          name: "Glazer Family",
          role: "Majority Owners",
          image: "https://i2-prod.manchestereveningnews.co.uk/incoming/article26745653.ece/ALTERNATES/s1200c/0_GettyImages-1242229447.jpg",
          description: "American family who has owned United since 2005. Their tenure has been marked by controversy and fan protests over debt and underinvestment.",
          traits: ["Commercial focus", "Dividend-oriented", "Hands-off"],
          stake: 63.3,
          satisfaction: 2
        },
        {
          id: "3",
          name: "Other Shareholders",
          role: "Minority Stakeholders",
          image: "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
          description: "Various institutional and individual investors who own shares of the publicly-traded club.",
          traits: ["Diverse interests", "Limited influence", "Investment-focused"],
          stake: 9.0,
          satisfaction: 5
        }
      ],
      directors: [
        {
          id: "4",
          name: "Sir Dave Brailsford",
          role: "Director of Sport",
          image: "https://i2-prod.manchestereveningnews.co.uk/incoming/article28222149.ece/ALTERNATES/s1200c/0_GettyImages-1935039429.jpg",
          description: "Former British Cycling performance director, brought in to implement a data-driven approach to football operations.",
          traits: ["Analytical", "Detail-oriented", "Performance-focused"],
          satisfaction: 6
        },
        {
          id: "5",
          name: "Jean-Claude Blanc",
          role: "CEO",
          image: "https://talksport.com/wp-content/uploads/sites/5/2023/01/Jean-Claude-Blanc-778544.jpg",
          description: "Experienced executive who previously held positions at Juventus and PSG.",
          traits: ["Experienced", "Business-minded", "Global perspective"],
          satisfaction: 7
        },
        {
          id: "6",
          name: "Omar Berrada",
          role: "Chief Executive Officer",
          image: "https://i2-prod.manchestereveningnews.co.uk/incoming/article28373109.ece/ALTERNATES/s1200c/0_GettyImages-1991911980.jpg",
          description: "Hired from Manchester City to improve United's football operations and strategic planning.",
          traits: ["Strategic", "Revenue-focused", "Football background"],
          satisfaction: 8
        }
      ],
      manager: {
        id: "7",
        name: "Erik ten Hag",
        role: "First Team Manager",
        image: "https://e0.365dm.com/23/03/2048x1152/skysports-erik-ten-hag-manchester-united_6105454.jpg",
        description: "Dutch manager appointed in 2022, known for his tactical approach and developing young players.",
        traits: ["Tactical", "Youth developer", "Disciplined"],
        satisfaction: 6
      },
      financialInfo: {
        transferBudget: "£120M",
        w0ageStructure: "High - Among the highest in the league",
        debtLevel: "Medium - Servicing debt from Glazer ownership",
        financialFairPlay: "Compliant but limited room",
        spendingStrategy: "Becoming more targeted and value-focused under INEOS"
      }
    },
    "liverpool": {
      owners: [
        {
          id: "1",
          name: "Fenway Sports Group",
          role: "Owner",
          image: "https://www.thisisanfield.com/wp-content/uploads/PA-67255257.jpg",
          description: "American sports investment company who have owned Liverpool since 2010.",
          traits: ["Data-driven", "Sustainable growth", "Commercial excellence"],
          stake: 100,
          satisfaction: 7
        }
      ],
      directors: [
        {
          id: "2",
          name: "Michael Edwards",
          role: "CEO of Football",
          image: "https://i2-prod.liverpoolecho.co.uk/incoming/article27600641.ece/ALTERNATES/s1200c/0_GettyImages-1257673434.jpg",
          description: "Returned to the club in 2024 after previously serving as sporting director.",
          traits: ["Transfer market expertise", "Data-focused", "Strategic"]
        }
      ],
      manager: {
        id: "3",
        name: "Arne Slot",
        role: "First Team Manager",
        image: "https://d3j2s6hdd6a7rg.cloudfront.net/v2/uploads/media/default/0002/48/thumb_147988_default_news_size_5.jpeg",
        description: "Dutch manager appointed in 2024, following the successful Jürgen Klopp era.",
        traits: ["Attacking football", "Progressive", "Tactically flexible"]
      },
      financialInfo: {
        transferBudget: "£100M",
        w0ageStructure: "High - Performance-based incentives",
        debtLevel: "Low - Well-managed finances",
        financialFairPlay: "Excellent standing",
        spendingStrategy: "Focused on value and analytics-based recruitment"
      }
    },
    "man-city": {
      owners: [
        {
          id: "1",
          name: "Sheikh Mansour & City Football Group",
          role: "Owner",
          image: "https://e0.365dm.com/20/08/2048x1152/skysports-manchester-city-city-football-group_5055049.jpg",
          description: "Part of Abu Dhabi United Group, which has owned Manchester City since 2008.",
          traits: ["Ambitious", "Heavy investment", "Global vision"],
          stake: 100,
          satisfaction: 8
        }
      ],
      directors: [
        {
          id: "2",
          name: "Txiki Begiristain",
          role: "Director of Football",
          image: "https://i2-prod.manchestereveningnews.co.uk/incoming/article26135861.ece/ALTERNATES/s1200c/0_GettyImages-1454483232.jpg",
          description: "Former Barcelona director who has been instrumental in City's recruitment.",
          traits: ["Networked", "Long-term planning", "Supportive of manager"]
        }
      ],
      manager: {
        id: "3",
        name: "Pep Guardiola",
        role: "First Team Manager",
        image: "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt62186e38ed8e0d17/6536a3df8c014658c9de0b45/GettyImages-1722367034.jpg",
        description: "Highly successful manager who has led City to multiple Premier League titles and the Champions League.",
        traits: ["Tactical genius", "Demanding", "Innovative"]
      },
      financialInfo: {
        transferBudget: "£150M",
        w0ageStructure: "Very high - Among the highest in world football",
        debtLevel: "Low - Owner-funded",
        financialFairPlay: "Under scrutiny with ongoing legal challenges",
        spendingStrategy: "Significant investment but increasingly strategic"
      }
    }
  };

  const currentTeam = management[teamId] || management["man-united"];
  const [ownerRatings, setOwnerRatings] = useState<Record<string, number>>(
    Object.fromEntries(currentTeam.owners.map(owner => [owner.id, owner.satisfaction || 5]))
  );
  const [ownerOpinion, setOwnerOpinion] = useState({ rating: 5, comments: "" });
  const [managerOpinion, setManagerOpinion] = useState({ rating: 6, comments: "" });
  
  const handleOwnerRatingChange = (ownerId: string, rating: number[]) => {
    setOwnerRatings(prev => ({
      ...prev,
      [ownerId]: rating[0]
    }));
  };
  
  const getRatingColor = (rating: number) => {
    if (rating <= 3) return "bg-red-500";
    if (rating <= 5) return "bg-yellow-500";
    if (rating <= 7) return "bg-green-500";
    return "bg-green-600";
  };
  
  const getRatingText = (rating: number) => {
    if (rating <= 2) return "Very Poor";
    if (rating <= 4) return "Poor";
    if (rating <= 6) return "Average";
    if (rating <= 8) return "Good";
    return "Excellent";
  };

  const handleSaveOpinions = (owner: { rating: number; comments: string }, manager: { rating: number; comments: string }) => {
    setOwnerOpinion(owner);
    setManagerOpinion(manager);
    console.log("Opinions saved:", { owner, manager });
  };

  const totalStake = currentTeam.owners.reduce((sum, owner) => sum + (owner.stake || 0), 0);
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <div className="flex items-center gap-2">
            <UserCircle className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold">Club Management</h2>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "Hide Details" : "Show Details"}
          </Button>
        </CardTitle>
      </CardHeader>
      
      {isOpen && (
        <CardContent>
          <Tabs defaultValue="overview" className="w-full" onValueChange={(val) => setActiveTab(val as "overview" | "ratings")}>
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="ownership">Ownership</TabsTrigger>
              <TabsTrigger value="ratings">Opinions & Ratings</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Financial Overview */}
                <div className="space-y-4">
                  <h3 className="font-medium text-base flex items-center gap-2">
                    <DollarSign className="h-4 w-4" /> Financial Overview
                  </h3>
                  <div className="rounded-md border p-4 space-y-3">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Transfer Budget:</span>
                        <span>{currentTeam.financialInfo.transferBudget}</span>
                      </div>
                      <div className="mt-1">
                        <Progress value={75} className="h-2" />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Available</span>
                          <span>75% remaining</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Wage Structure:</span>
                        <span>{currentTeam.financialInfo.w0ageStructure}</span>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Debt Level:</span>
                        <span>{currentTeam.financialInfo.debtLevel}</span>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Financial Fair Play Status:</span>
                        <span>{currentTeam.financialInfo.financialFairPlay}</span>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">Spending Strategy:</span>
                      </div>
                      <p className="text-sm text-gray-600">{currentTeam.financialInfo.spendingStrategy}</p>
                    </div>
                  </div>
                </div>
                
                {/* Management Structure */}
                <div className="space-y-4">
                  <h3 className="font-medium text-base flex items-center gap-2">
                    <Briefcase className="h-4 w-4" /> Management Structure
                  </h3>
                  
                  <div className="rounded-md border p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <img 
                        src={currentTeam.manager.image} 
                        alt={currentTeam.manager.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium">{currentTeam.manager.name}</div>
                        <div className="text-sm text-gray-500">{currentTeam.manager.role}</div>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <p className="mb-2">{currentTeam.manager.description}</p>
                      <div className="mt-3">
                        <p className="text-xs font-medium mb-1">Management Style:</p>
                        <div className="flex flex-wrap gap-1">
                          {currentTeam.manager.traits.map((trait, index) => (
                            <span 
                              key={index}
                              className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs"
                            >
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-sm mt-3">Key Directors</h4>
                  <div className="space-y-2">
                    {currentTeam.directors.map(director => (
                      <div key={director.id} className="p-3 rounded-md border flex items-center gap-3">
                        <img 
                          src={director.image} 
                          alt={director.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium text-sm">{director.name}</div>
                          <div className="text-xs text-gray-500">{director.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Ownership Tab */}
            <TabsContent value="ownership" className="space-y-6">
              <div>
                <h3 className="font-medium text-base flex items-center gap-2 mb-4">
                  <PieChart className="h-4 w-4" /> Ownership Structure
                </h3>
                
                <div className="mb-6">
                  <div className="h-6 flex w-full rounded-full overflow-hidden">
                    {currentTeam.owners.map((owner) => (
                      <div 
                        key={owner.id} 
                        className={`h-full ${
                          owner.id === "1" ? "bg-blue-500" : 
                          owner.id === "2" ? "bg-red-500" : 
                          "bg-gray-500"
                        }`}
                        style={{ width: `${(owner.stake || 0) / totalStake * 100}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    {currentTeam.owners.map((owner) => (
                      <div key={owner.id} className="text-xs">
                        <span className={`inline-block w-3 h-3 rounded-full mr-1 ${
                          owner.id === "1" ? "bg-blue-500" : 
                          owner.id === "2" ? "bg-red-500" : 
                          "bg-gray-500"
                        }`} />
                        {owner.name.split('&')[0]}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-6">
                  {currentTeam.owners.map((owner) => (
                    <div key={owner.id} className="rounded-md border p-4">
                      <div className="flex items-start gap-4 mb-3">
                        <img 
                          src={owner.image} 
                          alt={owner.name}
                          className="w-16 h-16 rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-bold text-base">{owner.name}</h4>
                              <p className="text-sm text-gray-600">{owner.role}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold">{owner.stake}%</div>
                              <div className="text-xs text-gray-500">Ownership Stake</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-sm mb-4">
                        <p>{owner.description}</p>
                      </div>
                      
                      <div className="mt-2">
                        <p className="text-sm font-medium mb-1">Management Style:</p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {owner.traits.map((trait, index) => (
                            <span 
                              key={index}
                              className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs"
                            >
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="border-t pt-3 mt-2">
                        <div className="flex justify-between items-center mb-1">
                          <label htmlFor={`rating-${owner.id}`} className="text-sm font-medium">
                            Your Satisfaction with {owner.name.split('&')[0]}:
                          </label>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{ownerRatings[owner.id]}/10</span>
                            <div className="w-4 h-4 rounded-full" style={{backgroundColor: getRatingColor(ownerRatings[owner.id])}} />
                          </div>
                        </div>
                        <Slider
                          id={`rating-${owner.id}`}
                          value={[ownerRatings[owner.id]]}
                          min={1}
                          max={10}
                          step={1}
                          onValueChange={(value) => handleOwnerRatingChange(owner.id, value)}
                          className="my-2"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Very Poor</span>
                          <span>Excellent</span>
                        </div>
                        <div className="text-center text-sm mt-1">
                          {getRatingText(ownerRatings[owner.id])}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* Ratings Tab */}
            <TabsContent value="ratings">
              <OpinionSection
                ownerOpinion={ownerOpinion}
                managerOpinion={managerOpinion}
                onSaveOpinions={handleSaveOpinions}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      )}
    </Card>
  );
};

export default ClubManagementSection;
