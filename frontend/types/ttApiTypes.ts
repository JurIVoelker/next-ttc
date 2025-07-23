export type TTApiMatchesReturnType = {
  matches: Match[];
  meta: {
    expiresAt: string;
  };
};

export type Match = {
  id: string;
  datetime: string;
  location: {
    id: string;
    name: string;
    address: {
      street: string;
      zip: string;
      city: string;
    };
    link: string;
  };
  league: {
    name: string;
    nickname: string;
    teamType: string;
  };
  teams: {
    home: {
      name: string;
      index: string;
      club: string;
    };
    away: {
      name: string;
      index: string;
      club: string;
    };
  };
  result: {
    homeScore: number;
    awayScore: number;
    winner: "home" | "away" | "draw";
  } | null;
  isHomeGame: boolean;
};
