
import { Player } from "@/features/team/types";

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
    case 'promote':
      return players.filter(p => p.status?.recommendation === 'promote');
    case 'bench':
      return players.filter(p => p.status?.recommendation === 'bench');
    case 'injured':
      return players.filter(p => p.status?.injured);
    default:
      return players;
  }
};
