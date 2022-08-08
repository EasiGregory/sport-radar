export interface IPlayerDetails {
  player: IPlayer;
  playerType: string;
}

export interface IPlayer {
  id: number;
  fullName: string;
  link: string;
}

export type PlayerDetails = {
  playerId: number;
  playerName: string;
  teamId: string;
  teamName: string;
  playerAge: string;
  playerNumber: string;
  playerPosition: string;
  assists: number;
  goals: string;
  hits: string;
  points: string;
  penaltyMinutes: string;
};
