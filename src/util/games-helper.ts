import { Game } from "../entity/game";
import { IGame } from "../type/gameType";

export const transformGameToEntity = (game: IGame): Game => {
  const gameEntity = new Game();
  gameEntity.gamePk = game.gamePk;
  gameEntity.link = game.link;
  gameEntity.gameType = game.gameType;
  gameEntity.season = game.season;
  gameEntity.gameDate = game.gameDate;
  gameEntity.status = game.status;
  gameEntity.teams = game.teams;
  gameEntity.venue = game.venue;
  gameEntity.content = game.content;

  return gameEntity;
};

export const isGameLive = (game): boolean => {
  if (game.status.abstractGameState === "Live") return true;
  return false;
};
export const isGameFinal = (game): boolean => {
  if (game.status.abstractGameState === "Final") return true;
  return false;
};
