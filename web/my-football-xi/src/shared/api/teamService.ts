
interface TeamInfo {
  id: string;
  name: string;
  shortName: string;
  primaryColor: string;
  logoClass: string;
}

export const fetchTeamById = async (teamId: string): Promise<TeamInfo> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const teamInfo: TeamInfo = {
        id: teamId,
        name: "Manchester United",
        shortName: "United",
        primaryColor: "text-united-red",
        logoClass: "bg-united-red"
      };
      resolve(teamInfo);
    }, 300);
  });
};
