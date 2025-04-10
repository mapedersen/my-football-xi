import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { 
  UserCircle, 
  DollarSign, 
  ChevronDown, 
  ChevronUp, 
  Briefcase, 
  Star, 
  PieChart 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { fetchTeamById } from "@/services/api/teamService";
import TeamHeader from "../components/TeamHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import ManagementAssessmentSection from "../components/ManagementAssessmentSection";

interface ManagementPerson {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
  traits: string[];
  satisfaction?: number;
  stake?: number;
}

interface ClubManagement {
  owners: ManagementPerson[];
  directors: ManagementPerson[];
  manager: ManagementPerson;
  financialInfo: {
    transferBudget: string;
    wageStructure: string;
    debtLevel: string;
    financialFairPlay: string;
    spendingStrategy: string;
  };
}

const teamManagementData: Record<string, ClubManagement> = {
  "man-united": {
    owners: [
      {
        id: "1",
        name: "Sir Jim Ratcliffe",
        role: "Majority Owner",
        image: "https://imageio.forbes.com/specials-images/imageserve/59d50b56a7ea436b47b37f35/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
        description: "British businessman who purchased a 27.7% stake in Manchester United in February 2024.",
        traits: ["Strategic", "Value-focused", "Experienced in sports"],
        stake: 27.7,
        satisfaction: 7
      },
      {
        id: "2",
        name: "Glazer Family",
        role: "Minority Owners",
        image: "https://i2-prod.manchestereveningnews.co.uk/sport/football/football-news/article27072097.ece/ALTERNATES/s1200c/0_GettyImages-1252656421.jpg",
        description: "American family who have owned Manchester United since 2005.",
        traits: ["Commercial focus", "Global brand expansion", "Controversial"],
        stake: 72.3,
        satisfaction: 2
      }
    ],
    directors: [
      {
        id: "3",
        name: "Sir Dave Brailsford",
        role: "Sporting Director",
        image: "https://e0.365dm.com/23/12/2048x1152/skysports-dave-brailsford-ineos_6336130.jpg",
        description: "Former British Cycling and Team Sky principal, brought in by INEOS to oversee sporting operations.",
        traits: ["Data-driven", "Performance focused", "Marginal gains philosophy"]
      },
      {
        id: "4",
        name: "Omar Berrada",
        role: "Chief Executive",
        image: "https://static.independent.co.uk/2024/01/20/23/XJS116-Soccer-Man-Utd-CEO-0120-11.jpg",
        description: "Former Manchester City executive who joined United in 2024.",
        traits: ["Business acumen", "Football experience", "Strategic planning"]
      }
    ],
    manager: {
      id: "5",
      name: "Erik ten Hag",
      role: "Manager",
      image: "https://d3j2s6hdd6a7rg.cloudfront.net/v2/uploads/media/default/0002/47/thumb_146149_default_news_size_5.jpeg",
      description: "Dutch manager who joined in 2022 from Ajax.",
      traits: ["Technical", "Disciplined", "Developing youth"]
    },
    financialInfo: {
      transferBudget: "£150 million",
      wageStructure: "£5.8 million weekly (highest in Premier League)",
      debtLevel: "£501.8 million (as of 2023)",
      financialFairPlay: "Compliant but close to limits",
      spendingStrategy: "High investment with focus on commercial returns"
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
        image: "https://i2-prod.liverpool.com/incoming/article25919729.ece/ALTERNATES/s1200c/0_Michael-Edwards.jpg",
        description: "Returned to Liverpool in 2024 after previously serving as sporting director.",
        traits: ["Analytics focus", "Transfer market expertise", "Long-term vision"]
      }
    ],
    manager: {
      id: "3",
      name: "Arne Slot",
      role: "Manager",
      image: "https://ichef.bbci.co.uk/news/976/cpsprodpb/16A01/production/_129911664_gettyimages-1252728960.jpg",
      description: "Dutch manager who joined Liverpool in 2024, succeeding Jurgen Klopp.",
      traits: ["Possession-based", "High pressing", "Tactical flexibility"]
    },
    financialInfo: {
      transferBudget: "£100 million",
      wageStructure: "£3.9 million weekly",
      debtLevel: "Low, well-managed",
      financialFairPlay: "Comfortably compliant",
      spendingStrategy: "Sustainable investment, value-focused"
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
        image: "https://resources.premierleague.com/premierleague/photo/2019/09/05/8a13d658-f59d-4503-b2d4-a99bbcf17b1e/Txiki-Begiristain.jpg",
        description: "Former Barcelona director who has been with City since 2012.",
        traits: ["Technical expertise", "Transfer network", "Aligned with Guardiola"]
      }
    ],
    manager: {
      id: "3",
      name: "Pep Guardiola",
      role: "Manager",
      image: "https://resources.premierleague.com/premierleague/photo/2020/09/17/3052bf5c-e34d-49f0-a34d-383a8f4395f7/Guardiola.jpg",
      description: "Joined City in 2016 and has led them to multiple Premier League titles.",
      traits: ["Tactical genius", "Possession football", "Perfectionist"]
    },
    financialInfo: {
      transferBudget: "£170 million",
      wageStructure: "£5.2 million weekly",
      debtLevel: "Minimal external debt",
      financialFairPlay: "Subject to ongoing investigations",
      spendingStrategy: "Heavy investment in talent at all levels"
    }
  }
};

const ManagementPage: React.FC = () => {
  const { teamId = 'man-united' } = useParams<{ teamId: string }>();
  const [teamInfo, setTeamInfo] = useState({
    name: "Manchester United",
    shortName: "United",
    primaryColor: "text-united-red",
    logoClass: "bg-united-red"
  });
  const [management, setManagement] = useState<ClubManagement | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "ownership" | "structure">("overview");
  const [ownerSatisfaction, setOwnerSatisfaction] = useState<Record<string, number>>({});

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
        
        const managementData = teamManagementData[teamId] || teamManagementData["man-united"];
        setManagement(managementData);
        
        const initialSatisfaction: Record<string, number> = {};
        managementData.owners.forEach(owner => {
          initialSatisfaction[owner.id] = owner.satisfaction || 5;
        });
        setOwnerSatisfaction(initialSatisfaction);
        
        setLoading(false);
      } catch (err) {
        console.error("Error loading team data:", err);
        setLoading(false);
      }
    };
    
    loadData();
  }, [teamId]);

  const updateOwnerSatisfaction = (ownerId: string, value: number) => {
    setOwnerSatisfaction(prev => ({
      ...prev,
      [ownerId]: value
    }));
  };

  if (loading || !management) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-united-red"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TeamHeader teamInfo={teamInfo} currentView="management" />

      <main className="container mx-auto py-6 px-4">
        <h1 className={`text-3xl font-bold ${teamInfo.primaryColor} mb-6`}>Club Management</h1>
        
        <ManagementAssessmentSection teamId={teamId} />
        
        <Tabs defaultValue="overview" className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" onClick={() => setActiveTab("overview")}>Overview</TabsTrigger>
            <TabsTrigger value="ownership" onClick={() => setActiveTab("ownership")}>Ownership</TabsTrigger>
            <TabsTrigger value="structure" onClick={() => setActiveTab("structure")}>Management Structure</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="mr-2 h-5 w-5" />
                    Club Leadership
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="font-medium">Ownership</h3>
                    {management.owners.map(owner => (
                      <div key={owner.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          <img 
                            src={owner.image} 
                            alt={owner.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder.svg';
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-medium">{owner.name}</div>
                          <div className="text-sm text-gray-500">{owner.role} • {owner.stake}% stake</div>
                        </div>
                      </div>
                    ))}
                    
                    <h3 className="font-medium mt-6">Management Team</h3>
                    {management.directors.map(director => (
                      <div key={director.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          <img 
                            src={director.image} 
                            alt={director.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder.svg';
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-medium">{director.name}</div>
                          <div className="text-sm text-gray-500">{director.role}</div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <img 
                          src={management.manager.image} 
                          alt={management.manager.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder.svg';
                          }}
                        />
                      </div>
                      <div>
                        <div className="font-medium">{management.manager.name}</div>
                        <div className="text-sm text-gray-500">{management.manager.role}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="mr-2 h-5 w-5" />
                    Financial Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-3 bg-gray-50 rounded-md">
                      <h3 className="text-sm text-gray-500">Transfer Budget</h3>
                      <div className="font-medium text-lg">{management.financialInfo.transferBudget}</div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md">
                      <h3 className="text-sm text-gray-500">Wage Structure</h3>
                      <div className="font-medium text-lg">{management.financialInfo.wageStructure}</div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md">
                      <h3 className="text-sm text-gray-500">Debt Level</h3>
                      <div className="font-medium text-lg">{management.financialInfo.debtLevel}</div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md">
                      <h3 className="text-sm text-gray-500">Financial Fair Play Status</h3>
                      <div className="font-medium text-lg">{management.financialInfo.financialFairPlay}</div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md">
                      <h3 className="text-sm text-gray-500">Spending Strategy</h3>
                      <div className="font-medium text-lg">{management.financialInfo.spendingStrategy}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="ownership" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="mr-2 h-5 w-5" />
                  Ownership Structure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="w-full h-10 rounded-full overflow-hidden bg-gray-200">
                    {management.owners.map((owner, index) => (
                      <div 
                        key={owner.id}
                        className={`h-full float-left ${index % 2 === 0 ? 'bg-blue-500' : 'bg-green-500'}`}
                        style={{ width: `${owner.stake}%` }}
                      ></div>
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-gray-500">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {management.owners.map(owner => (
                    <div key={owner.id} className="border p-4 rounded-lg">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden">
                          <img 
                            src={owner.image} 
                            alt={owner.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder.svg';
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{owner.name}</h3>
                          <div className="text-gray-500">{owner.role} • {owner.stake}% stake</div>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{owner.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Leadership Traits:</h4>
                        <div className="flex flex-wrap gap-2">
                          {owner.traits.map((trait, index) => (
                            <span 
                              key={index} 
                              className="bg-gray-100 px-2 py-1 rounded-full text-sm"
                            >
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center">
                          <Star className="h-4 w-4 mr-1" />
                          Your Satisfaction with Ownership
                        </h4>
                        <div className="flex items-center gap-4">
                          <Slider
                            value={[ownerSatisfaction[owner.id] || 5]}
                            min={1}
                            max={10}
                            step={1}
                            onValueChange={(values) => updateOwnerSatisfaction(owner.id, values[0])}
                            className="flex-1"
                          />
                          <span className="font-bold text-lg min-w-[40px] text-center">
                            {ownerSatisfaction[owner.id] || 5}/10
                          </span>
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          {ownerSatisfaction[owner.id] < 4 && "You're very unsatisfied with this owner"}
                          {ownerSatisfaction[owner.id] >= 4 && ownerSatisfaction[owner.id] < 7 && "You have mixed feelings about this owner"}
                          {ownerSatisfaction[owner.id] >= 7 && "You're very satisfied with this owner"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="structure" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Management Hierarchy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  {/* Hierarchy Visualization */}
                  <div className="w-full max-w-3xl">
                    {/* Owners Level */}
                    <div className="flex justify-center mb-8">
                      {management.owners.map((owner, index) => (
                        <div key={owner.id} className="relative">
                          <div className="flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-blue-500">
                              <img 
                                src={owner.image} 
                                alt={owner.name} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = '/placeholder.svg';
                                }}
                              />
                            </div>
                            <div className="text-center mt-2">
                              <div className="font-medium">{owner.name}</div>
                              <div className="text-xs text-gray-500">{owner.role}</div>
                            </div>
                          </div>
                          {index < management.owners.length - 1 && (
                            <div className="absolute h-px w-16 bg-gray-300 top-1/2 -right-16"></div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {/* Connecting Line */}
                    <div className="h-12 w-px bg-gray-300 mx-auto"></div>
                    
                    {/* Directors Level */}
                    <div className="flex justify-center gap-16 mb-8">
                      {management.directors.map((director) => (
                        <div key={director.id} className="flex flex-col items-center">
                          <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-green-500">
                            <img 
                              src={director.image} 
                              alt={director.name} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/placeholder.svg';
                              }}
                            />
                          </div>
                          <div className="text-center mt-2">
                            <div className="font-medium">{director.name}</div>
                            <div className="text-xs text-gray-500">{director.role}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Connecting Line */}
                    <div className="h-12 w-px bg-gray-300 mx-auto"></div>
                    
                    {/* Manager Level */}
                    <div className="flex justify-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-red-500">
                          <img 
                            src={management.manager.image} 
                            alt={management.manager.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder.svg';
                            }}
                          />
                        </div>
                        <div className="text-center mt-2">
                          <div className="font-medium">{management.manager.name}</div>
                          <div className="text-xs text-gray-500">{management.manager.role}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Level descriptions */}
                    <div className="grid grid-cols-3 gap-6 mt-12 text-sm">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-bold text-blue-700 mb-2">Ownership Level</h3>
                        <p>Responsible for overall club direction, major financial decisions, and long-term strategy.</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h3 className="font-bold text-green-700 mb-2">Executive Level</h3>
                        <p>Handles day-to-day business operations, transfers, and implements the club's strategy.</p>
                      </div>
                      <div className="p-4 bg-red-50 rounded-lg">
                        <h3 className="font-bold text-red-700 mb-2">Sporting Level</h3>
                        <p>Responsible for team performance, player development, and match tactics.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-black text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>This is a fan-created application. Not affiliated with {teamInfo.name}.</p>
          <p className="text-xs mt-2 text-gray-400">Club management data is for demonstration purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default ManagementPage;
