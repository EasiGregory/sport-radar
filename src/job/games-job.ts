import Queue from "bull";
import { AppDataSource } from "../data-source";
import { Play } from "../entity/play";
import { getPlaysByGamePk } from "../service/game";
import { getPlayerDetails, getPlayerStatsBySeason } from "../service/player";
import { IGame } from "../type/gameType";
import { IPlayerDetails, PlayerDetails } from "../type/playerDetailsType";
import { isGameFinal, isGameLive } from "../util/games-helper";
import { buildPlayEntity } from "../util/play-helper";

const playRepository = AppDataSource.getRepository(Play);
const gameQueue = new Queue("Game");
const playQueue = new Queue("Play");

gameQueue.process(async (job) => {
  try {
    const game = job.data;

    const plays = await getPlaysByGamePk(game.gamePk);

    if (plays.plays.allPlays) {
      plays.plays.allPlays.forEach((play) => {
        playQueue.add({ ...play, gameId: game.gamePk });
      });
    }
  } catch (error) {
    Promise.reject(error);
  }
});

playQueue.process(async (job) => {
  try {
    const play = job.data;

    if (play.players) {
      for (const player of play.players) {
        const eventId = play.about.eventId;
        const playExists = await playRepository.findOneBy({
          playerName: player.player.fullName,
          eventId: eventId,
        });

        if (playExists) return;

        if (!playExists) {
          const playerDetails = await processPlayer(player);
          const playEntity = buildPlayEntity(playerDetails, play, play.gameId);

          await AppDataSource.manager.save(playEntity);
        }
      }
    }
  } catch (error) {
    Promise.reject(error);
  }
});

// Since there are no games going live for my testing for this assessment I am using
// final as a status on Jan, 1st 2022 to track games/plays
const processGames = (games: IGame[]) => {
  games.forEach((game: IGame) => {
    if (isGameFinal(game)) {
      gameQueue.add(game);
    }

    // Uncomment this block to toggle Live status checking
    // Comment the block above this one out
    // if (isGameLive(game)) {
    //   gameQueue.add(game);
    // }
  });
};

const processPlayer = async (player: IPlayerDetails) => {
  const stats = await getPlayerStatsBySeason(player.player.id);
  const details = await getPlayerDetails(player.player.id);
  // TODO: Id love to come up with a better way to do this but my brain isnt working atm
  const { stat } = stats[0].splits[0] || {
    stat: { assists: 0, goals: 0, hits: 0, points: 0, penaltyMinutes: 0 },
  };
  const {
    id = null,
    fullName = null,
    primaryNumber = null,
    currentAge = null,
  } = details.people[0];
  const position = details.people[0].primaryPosition.name || null;
  const playerDetails: PlayerDetails = {
    playerId: id,
    playerName: fullName,
    teamId: details.people[0].currentTeam
      ? details.people[0].currentTeam.id
      : null,
    teamName: details.people[0].currentTeam
      ? details.people[0].currentTeam.name
      : null,
    playerAge: currentAge,
    playerNumber: primaryNumber,
    playerPosition: position,
    assists: stat.assists,
    goals: stat.goals,
    hits: stat.hits,
    points: stat.points,
    penaltyMinutes: stat.penaltyMinutes,
  };
  return playerDetails;
};

export default processGames;
