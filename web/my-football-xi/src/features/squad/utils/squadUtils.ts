
import { Player } from '@/models/Player';

/**
 * Extracts numeric value from a salary string
 */
export const getSalaryNumeric = (salaryString: string): number => {
  const numericValue = parseInt(salaryString.replace(/[^0-9]/g, ""));
  return isNaN(numericValue) ? 0 : numericValue;
};

/**
 * Formats a number as a currency string
 */
export const formatCurrency = (amount: number): string => {
  if (amount >= 1000000) {
    return `£${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `£${(amount / 1000).toFixed(0)}K`;
  }
  return `£${amount}`;
};

/**
 * Processes players to add computed properties
 */
export const processPlayers = (players: Player[]): Player[] => {
  return players.map((player) => {
    const salaryNumeric = getSalaryNumeric(player.salary);
    return {
      ...player,
      salary_numeric: salaryNumeric,
      marketValue: player.marketValue !== undefined ? player.marketValue : salaryNumeric * 52 * 2
    };
  });
};

/**
 * Sorts players based on the provided configuration
 */
export const sortPlayers = (
  players: Player[], 
  sortConfig: { 
    key: keyof Player | "stats.goals" | "stats.appearances" | "salary_numeric"; 
    direction: "asc" | "desc"; 
  }
): Player[] => {
  return [...players].sort((a, b) => {
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
};

/**
 * Filters players by recommendation status
 */
export const filterPlayersByStatus = (players: Player[], status?: string) => {
  if (!status || status === 'all') return players;
  
  switch (status) {
    case 'keep':
      return players.filter(p => p.status?.recommendation === 'keep' || !p.status?.recommendation);
    case 'sell':
      return players.filter(p => p.status?.recommendation === 'sell');
    case 'loan':
      return players.filter(p => p.status?.recommendation === 'loan');
    case 'injured':
      return players.filter(p => p.status?.injured);
    default:
      return players;
  }
};

/**
 * Determines if a contract should be renewable
 * If contract expires within 2 years and player is not on sell list
 */
export const isContractRenewable = (player: Player): boolean => {
  if (!player.contract) return false;
  if (player.status?.recommendation === 'sell') return false;
  
  const currentYear = new Date().getFullYear();
  const contractYear = parseInt(player.contract, 10);
  
  return contractYear - currentYear <= 2;
};

/**
 * Determines if a contract should be set to expire
 * If contract expires within 1 year and player is not on sell list
 */
export const isContractExpirable = (player: Player): boolean => {
  if (!player.contract) return false;
  if (player.status?.recommendation === 'sell') return false;
  
  const currentYear = new Date().getFullYear();
  const contractYear = parseInt(player.contract, 10);
  
  return contractYear - currentYear <= 1;
};

/**
 * Calculate contract time remaining as a string
 */
export const getContractTimeRemaining = (player: Player): string => {
  if (!player.contract) return "Unknown";
  
  const currentYear = new Date().getFullYear();
  const contractYear = parseInt(player.contract, 10);
  const yearsRemaining = contractYear - currentYear;
  
  if (yearsRemaining <= 0) return "Expired";
  if (yearsRemaining === 1) return "1 year";
  return `${yearsRemaining} years`;
};

/**
 * Get value for money color based on rating
 */
export const getValueForMoneyColor = (value?: number) => {
  if (value === undefined) return "text-gray-500";
  if (value < -1) return "text-red-600";
  if (value < 0) return "text-orange-500";
  if (value === 0) return "text-gray-600";
  if (value > 1) return "text-green-600";
  return "text-green-500";
};

/**
 * Get value for money label based on rating
 */
export const getValueForMoneyLabel = (value?: number) => {
  if (value === undefined) return "Not rated";
  if (value < -1) return "Extremely Overpaid";
  if (value < 0) return "Overpaid";
  if (value === 0) return "Fair Value";
  if (value > 1) return "Great Value";
  return "Good Value";
};
