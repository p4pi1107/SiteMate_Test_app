declare module 'nba' {
  interface Player {
    playerId: number;
  }
  
  interface PlayerStats {
    commonPlayerInfo: Array<{teamName: string}>;
    playerHeadlineStats: Array<{
      pts: number;
      ast: number;
      reb: number;
    }>;
  }

  export function findPlayer(name: string): Player;
  export const stats: {
    playerInfo: (params: {PlayerID: number}) => Promise<PlayerStats>;
  };
} 