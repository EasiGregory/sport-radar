import { Play } from "../entity/play";
import { PlayerDetails } from "../type/playerDetailsType";
import { IPlay } from "../type/playType";

export const buildPlayEntity = (
  playerDetails: PlayerDetails,
  play: IPlay,
  gameId: number
) => {
  const playEntity = new Play();
  playEntity.gameId = gameId;
  playEntity.playerId = playerDetails.playerId;
  playEntity.playerName = playerDetails.playerName;
  playEntity.teamId = playerDetails.teamId;
  playEntity.teamName = playerDetails.teamName;
  playEntity.playerAge = playerDetails.playerAge;
  playEntity.playerNumber = playerDetails.playerNumber;
  playEntity.playerPosition = playerDetails.playerPosition;
  playEntity.assists = playerDetails.assists;
  playEntity.goals = playerDetails.goals;
  playEntity.hits = playerDetails.hits;
  playEntity.points = playerDetails.points;
  playEntity.penaltyMinutes = playerDetails.penaltyMinutes;
  playEntity.event = play.result.event || null;
  playEntity.eventId = play.about.eventId || null;
  playEntity.description = play.result.description || null;

  return playEntity;
};
