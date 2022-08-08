export interface IPlay {
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
  result: IResult;
  about: IAbout;
}

export interface IResult {
  event: string;
  eventCode: string;
  eventTypeId: string;
  description: string;
}

export interface IAbout {
  eventId: number;
}
