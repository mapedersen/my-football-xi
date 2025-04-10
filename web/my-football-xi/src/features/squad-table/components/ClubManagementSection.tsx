
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, DollarSign, Users, TrendingUp, Award } from 'lucide-react';

interface Owner {
  id: string;
  name: string;
  stake: number;
  country: string;
  joined: string;
  image?: string;
}

interface ClubManagementSectionProps {
  teamId: string;
}

const ClubManagementSection: React.FC<ClubManagementSectionProps> = ({
  teamId
}) => {
  const [ratings, setRatings] = useState({
    ineosRating: 7,
    glazersRating: 2,
    overallManagementRating: 5,
    transferPolicy: 4,
    youthDevelopment: 8,
    financialStewardship: 3
  });
  
  const [comments, setComments] = useState('');
  
  // This would come from an API in a real app
  const owners: Owner[] = [
    {
      id: '1',
      name: 'INEOS (Sir Jim Ratcliffe)',
      stake: 27.7,
      country: 'United Kingdom',
      joined: 'February 2024',
      image: '/ineos-logo.png'
    },
    {
      id: '2',
      name: 'Glazer Family',
      stake: 63.3,
      country: 'United States',
      joined: 'May 2005',
      image: '/glazers-logo.png'
    },
    {
      id: '3',
      name: 'Other Shareholders',
      stake: 9.0,
      country: 'Various',
      joined: 'Various',
    }
  ];
  
  const handleSliderChange = (key: keyof typeof ratings, value: number[]) => {
    setRatings({
      ...ratings,
      [key]: value[0]
    });
  };
  
  const calculateAverageRating = () => {
    const values = Object.values(ratings);
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  };
  
  const getBudgetInfo = () => {
    // In a real app, this would come from calculations based on player sales
    return {
      totalBudget: '£120M',
      wageSpace: '£650K/week',
      pendingSales: '£45M',
      pendingPurchases: '£0',
      netSpend: '-£45M'
    };
  };
  
  const budgetInfo = getBudgetInfo();
  
  const getRatingColor = (rating: number) => {
    if (rating <= 3) return 'text-red-600';
    if (rating <= 5) return 'text-yellow-600';
    if (rating <= 7) return 'text-green-600';
    return 'text-green-700';
  };
  
  return (
    <div className="space-y-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center justify-between">
            <span>Club Management</span>
            <Badge variant="secondary" className="ml-2">Critical View</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Ownership Structure</h3>
              <div className="space-y-3">
                {owners.map(owner => (
                  <div key={owner.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                      {owner.image ? (
                        <img 
                          src={owner.image} 
                          alt={owner.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-logo.png';
                          }}
                        />
                      ) : (
                        <Users className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{owner.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{owner.country}</span>
                        <span>•</span>
                        <span>Since {owner.joined}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{owner.stake}%</div>
                      <div className="text-xs text-gray-500">ownership</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-2">
              <h3 className="text-lg font-semibold mb-2">Leadership Assessment</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-1 block">INEOS Group (Ratcliffe)</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      value={[ratings.ineosRating]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(value) => handleSliderChange('ineosRating', value)}
                    />
                    <span className={`font-bold ${getRatingColor(ratings.ineosRating)}`}>
                      {ratings.ineosRating}/10
                    </span>
                  </div>
                </div>
                
                <div>
                  <Label className="mb-1 block">Glazer Family</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      value={[ratings.glazersRating]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(value) => handleSliderChange('glazersRating', value)}
                    />
                    <span className={`font-bold ${getRatingColor(ratings.glazersRating)}`}>
                      {ratings.glazersRating}/10
                    </span>
                  </div>
                </div>
                
                <div>
                  <Label className="mb-1 block">Overall Management</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      value={[ratings.overallManagementRating]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(value) => handleSliderChange('overallManagementRating', value)}
                    />
                    <span className={`font-bold ${getRatingColor(ratings.overallManagementRating)}`}>
                      {ratings.overallManagementRating}/10
                    </span>
                  </div>
                </div>
                
                <div>
                  <Label className="mb-1 block">Transfer Policy</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      value={[ratings.transferPolicy]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(value) => handleSliderChange('transferPolicy', value)}
                    />
                    <span className={`font-bold ${getRatingColor(ratings.transferPolicy)}`}>
                      {ratings.transferPolicy}/10
                    </span>
                  </div>
                </div>
                
                <div>
                  <Label className="mb-1 block">Youth Development</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      value={[ratings.youthDevelopment]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(value) => handleSliderChange('youthDevelopment', value)}
                    />
                    <span className={`font-bold ${getRatingColor(ratings.youthDevelopment)}`}>
                      {ratings.youthDevelopment}/10
                    </span>
                  </div>
                </div>
                
                <div>
                  <Label className="mb-1 block">Financial Stewardship</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      value={[ratings.financialStewardship]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(value) => handleSliderChange('financialStewardship', value)}
                    />
                    <span className={`font-bold ${getRatingColor(ratings.financialStewardship)}`}>
                      {ratings.financialStewardship}/10
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <Label htmlFor="management-comments">Your Comments on Management</Label>
                <Textarea
                  id="management-comments"
                  placeholder="Share your thoughts on club management..."
                  className="mt-1"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>
            </div>
            
            <div className="pt-2">
              <h3 className="text-lg font-semibold mb-2">Transfer Budget</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <DollarSign className="w-4 h-4" />
                    <span>Total Budget</span>
                  </div>
                  <div className="text-lg font-bold">{budgetInfo.totalBudget}</div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <Users className="w-4 h-4" />
                    <span>Wage Space</span>
                  </div>
                  <div className="text-lg font-bold">{budgetInfo.wageSpace}</div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>Pending Sales</span>
                  </div>
                  <div className="text-lg font-bold text-green-600">{budgetInfo.pendingSales}</div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <Award className="w-4 h-4" />
                    <span>Net Spend</span>
                  </div>
                  <div className="text-lg font-bold text-green-600">{budgetInfo.netSpend}</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button className="bg-united-red hover:bg-red-700">
                Save Management Assessment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClubManagementSection;
