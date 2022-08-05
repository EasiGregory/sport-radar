export interface IGame {
  gamePk: number;
  link: string;
  gameType: string;
  season: string;
  gameDate: string;
  status: IStatus;
  teams: ITeams;
  venue: IVenue;
  content: IContent;
}

export interface IStatus {
  abstractGameState: string;
  codedGameState: string;
  detailedState: string;
  statusCode: string;
  startTimeTBD: boolean;
}

export interface ITeams {
  away: IAway;
  home: IHome;
}

export interface IAway {
  leagueRecord: ILeagueRecords;
  score: number;
  team: ITeam;
}

export interface IHome {
  leagueRecord: ILeagueRecords;
  score: number;
  team: ITeam;
}

export interface ILeagueRecords {
  wins: number;
  losses: number;
  ot: number;
  type: string;
}

export interface ITeam {
  id: number;
  name: string;
  link: string;
}

export interface IVenue {
  id: number;
  name: string;
  link: string;
}

export interface IContent {
  link: string;
}
