
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Bell, Twitter, RefreshCw, ExternalLink } from 'lucide-react';
import { Button } from "@/shared/components/ui/button";

interface TransferUpdate {
  id: string;
  content: string;
  source: string;
  timestamp: string;
  type: 'rumor' | 'official' | 'exclusive';
  link?: string;
}

// Mock data for real-time updates
const mockFeed: TransferUpdate[] = [
  {
    id: '1',
    content: 'EXCLUSIVE: Manchester United have concrete interest in Matthijs de Ligt. Bayern are open to sell the Dutch defender this summer.',
    source: 'Fabrizio Romano',
    timestamp: '2025-04-10T08:30:00Z',
    type: 'exclusive',
    link: 'https://twitter.com'
  },
  {
    id: '2',
    content: 'Understand Manchester United are preparing formal bid for Bologna striker Joshua Zirkzee. €40m release clause only valid for Italian clubs.',
    source: 'Fabrizio Romano',
    timestamp: '2025-04-09T19:45:00Z',
    type: 'exclusive'
  },
  {
    id: '3',
    content: 'OFFICIAL: Manchester United have completed the signing of assistant coach Ruud van Nistelrooy to join the staff.',
    source: 'ManUtd.com',
    timestamp: '2025-04-08T14:20:00Z',
    type: 'official',
    link: 'https://manutd.com'
  },
  {
    id: '4',
    content: 'Jarrad Branthwaite remains in Manchester United list but Everton want more than £75m to sell this summer.',
    source: 'Fabrizio Romano',
    timestamp: '2025-04-07T16:10:00Z',
    type: 'rumor'
  }
];

const LiveTransferFeed: React.FC = () => {
  const [updates, setUpdates] = useState<TransferUpdate[]>(mockFeed);
  const [loading, setLoading] = useState(false);
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return `${diffDays}d ago`;
    }
  };
  
  const getBadgeStyle = (type: string) => {
    switch(type) {
      case 'exclusive':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'official':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      default:
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    }
  };
  
  const refreshFeed = () => {
    setLoading(true);
    // Simulate fetch delay
    setTimeout(() => {
      setLoading(false);
      // In a real app, we would fetch fresh data here
    }, 1000);
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Bell className="w-5 h-5 text-united-red mr-2" />
            <CardTitle className="text-lg">Live Transfer Updates</CardTitle>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={refreshFeed}
            disabled={loading}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="sr-only">Refresh</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-1">
        <div className="space-y-3 max-h-[380px] overflow-auto pr-1">
          {updates.map(update => (
            <div key={update.id} className="border-b border-gray-100 pb-3 last:border-b-0">
              <div className="flex items-start gap-2">
                <div className="bg-gray-100 rounded-full w-7 h-7 flex-shrink-0 flex items-center justify-center mt-0.5">
                  <Twitter className="w-3.5 h-3.5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm">{update.source}</span>
                    <span className="text-xs text-gray-500">{formatTime(update.timestamp)}</span>
                  </div>
                  <p className="text-sm mb-1.5">{update.content}</p>
                  <div className="flex justify-between items-center">
                    <Badge className={getBadgeStyle(update.type)}>
                      {update.type === 'exclusive' ? 'EXCLUSIVE' : 
                       update.type === 'official' ? 'OFFICIAL' : 'RUMOR'}
                    </Badge>
                    
                    {update.link && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs text-blue-600 hover:text-blue-800"
                        onClick={() => window.open(update.link, '_blank')}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" /> View Source
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveTransferFeed;
