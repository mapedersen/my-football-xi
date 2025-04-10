
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/shared/hooks/use-toast";
import TeamHeader from "@/features/team/components/TeamHeader";
import SentimentHeatmap from "../components/SentimentHeatmap";
import FanConfidenceMeter from "../components/FanConfidenceMeter";
import TrendingTakes from "../components/TrendingTakes";
import HotTakeForm from "../components/HotTakeForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";

const FanPulsePage: React.FC = () => {
  const { teamId = 'man-united' } = useParams<{ teamId: string }>();
  const [activeTab, setActiveTab] = useState("sentiment");
  const { toast } = useToast();
  
  // Mock team info - in a real app this would come from an API or context
  const teamInfo = {
    name: "Manchester United",
    shortName: "United",
    primaryColor: "text-united-red",
    logoClass: "bg-united-red"
  };

  const handleSubmitTake = (take: any) => {
    // In a real app, this would send data to an API
    console.log("Submitted take:", take);
    toast({
      title: "Hot take submitted!",
      description: "Your opinion has been added to the Fan Pulse.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TeamHeader teamInfo={teamInfo} currentView="fan-pulse" />

      <main className="container mx-auto py-6 px-4">
        <div className="mb-6">
          <h1 className={`text-3xl font-bold ${teamInfo.primaryColor}`}>Fan Pulse</h1>
          <p className="text-gray-600 mt-1">
            The collective voice of United fans - track sentiment and trending opinions
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 mb-6">
            <TabsTrigger value="sentiment">Sentiment Heatmap</TabsTrigger>
            <TabsTrigger value="confidence">Fan Confidence</TabsTrigger>
            <TabsTrigger value="trending">Trending Takes</TabsTrigger>
            <TabsTrigger value="submit">Submit Your Take</TabsTrigger>
          </TabsList>

          <TabsContent value="sentiment" className="bg-white p-6 rounded-lg shadow-md">
            <SentimentHeatmap teamId={teamId} />
          </TabsContent>

          <TabsContent value="confidence" className="bg-white p-6 rounded-lg shadow-md">
            <FanConfidenceMeter teamId={teamId} />
          </TabsContent>

          <TabsContent value="trending" className="bg-white p-6 rounded-lg shadow-md">
            <TrendingTakes teamId={teamId} />
          </TabsContent>
          
          <TabsContent value="submit" className="bg-white p-6 rounded-lg shadow-md">
            <HotTakeForm teamId={teamId} onSubmit={handleSubmitTake} />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-black text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>This is a fan-created application. Not affiliated with {teamInfo.name}.</p>
          <p className="text-xs mt-2 text-gray-400">Fan sentiment data is for demonstration purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default FanPulsePage;
