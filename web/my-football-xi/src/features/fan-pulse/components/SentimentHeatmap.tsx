
import React from "react";
import { 
  TrendingUp, 
  DollarSign, 
  Award, 
  Star, 
  ThumbsDown 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";

interface SentimentHeatmapProps {
  teamId: string;
}

const SentimentHeatmap: React.FC<SentimentHeatmapProps> = ({ teamId }) => {
  // Mock data - in a real app this would come from an API
  const sentimentData = {
    mostOverpaid: {
      name: "Harry Maguire",
      value: "£190,000/week",
      votePercentage: 37,
      image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p95658.png"
    },
    mostUnderrated: {
      name: "Kobbie Mainoo",
      value: "Academy product",
      votePercentage: 45,
      image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p493250.png"
    },
    mostWanted: {
      name: "Florian Wirtz",
      value: "£130M valuation",
      votePercentage: 54,
      image: "https://img.a.transfermarkt.technology/portrait/header/521361-1696332660.jpg"
    },
    mostFrustrating: {
      name: "Ten Hag's substitutions",
      value: "Late subs",
      votePercentage: 41,
      image: "https://www.manutd.com/assetfile/29032023110302_1680084182.jpg?w=1000"
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Fan Sentiment Heatmap</h2>
        <p className="text-gray-600 mb-6">
          See what United fans are feeling about players, transfers, and management
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Most Overpaid Player Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-red-600">
              <DollarSign className="h-5 w-5" /> Most Overpaid Player
            </CardTitle>
            <CardDescription>
              {sentimentData.mostOverpaid.votePercentage}% of fans agree
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full overflow-hidden">
                <img 
                  src={sentimentData.mostOverpaid.image} 
                  alt={sentimentData.mostOverpaid.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{sentimentData.mostOverpaid.name}</h3>
                <p className="text-gray-600">{sentimentData.mostOverpaid.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Most Underrated Player Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-green-600">
              <Star className="h-5 w-5" /> Most Underrated Player
            </CardTitle>
            <CardDescription>
              {sentimentData.mostUnderrated.votePercentage}% of fans agree
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full overflow-hidden">
                <img 
                  src={sentimentData.mostUnderrated.image} 
                  alt={sentimentData.mostUnderrated.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{sentimentData.mostUnderrated.name}</h3>
                <p className="text-gray-600">{sentimentData.mostUnderrated.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Most Wanted Transfer Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-blue-600">
              <TrendingUp className="h-5 w-5" /> Most Wanted Transfer
            </CardTitle>
            <CardDescription>
              {sentimentData.mostWanted.votePercentage}% of fans want this signing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full overflow-hidden">
                <img 
                  src={sentimentData.mostWanted.image} 
                  alt={sentimentData.mostWanted.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{sentimentData.mostWanted.name}</h3>
                <p className="text-gray-600">{sentimentData.mostWanted.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Most Frustrating Decision Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-yellow-600">
              <ThumbsDown className="h-5 w-5" /> Most Frustrating Decision
            </CardTitle>
            <CardDescription>
              {sentimentData.mostFrustrating.votePercentage}% of fans agree
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded overflow-hidden">
                <img 
                  src={sentimentData.mostFrustrating.image} 
                  alt={sentimentData.mostFrustrating.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{sentimentData.mostFrustrating.name}</h3>
                <p className="text-gray-600">{sentimentData.mostFrustrating.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SentimentHeatmap;
