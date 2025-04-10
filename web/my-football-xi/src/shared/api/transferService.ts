
import { TransferRumor, FanOpinion, PlayerWanted, AIRecommendation } from "@/features/transfer-hub/types";

export const getSearchablePlayers = async () => {
  // In a real app, this would be an API call
  return new Promise<any[]>((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "s1", name: "Matthijs de Ligt", position: "CB", team: "Bayern Munich", age: 23 },
        { id: "s2", name: "Federico Chiesa", position: "RW", team: "Juventus", age: 25 },
        { id: "s3", name: "Jonathan David", position: "ST", team: "Lille", age: 23 }
      ]);
    }, 300);
  });
};

// Dummy function to get a rumor by ID
export const getTransferRumorById = (rumorId: string): TransferRumor => {
  return {
    id: rumorId,
    playerName: "Matthijs de Ligt",
    playerId: "deligt1", // Added missing playerId
    age: 24,
    position: "CB",
    currentTeam: "Bayern Munich",
    targetTeam: "Manchester United",
    reportedFee: "€65M",
    reportedFeeValue: 65000000,
    dateReported: "2023-04-01T12:00:00Z",
    rummorSource: "Sky Sports",
    likelihood: 7,
    photo: "https://img.a.transfermarkt.technology/portrait/big/326031-1661412629.jpg",
    fitTags: [
      { id: "t1", label: "Defensive leader", color: "bg-blue-100 text-blue-800" },
      { id: "t2", label: "Ball playing", color: "bg-green-100 text-green-800" }
    ],
    status: "rumor" // Added missing status
  };
};

// Dummy function to save fan opinion
export const saveFanOpinion = (opinion: FanOpinion): void => {
  // In a real app, this would make an API call
  console.log("Saving opinion", opinion);
  localStorage.setItem(`opinion-${opinion.rumorId}`, JSON.stringify(opinion));
};

// Dummy function to get fan opinion for a rumor
export const getFanOpinionForRumor = (rumorId: string): FanOpinion | null => {
  // In a real app, this would make an API call
  const storedOpinion = localStorage.getItem(`opinion-${rumorId}`);
  return storedOpinion ? JSON.parse(storedOpinion) : null;
};
