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
      plays.plays.allPlays.forEach(async (play) => {
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
      play.players.forEach(async (player: IPlayerDetails) => {
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
      });
    }
  } catch (error) {
    Promise.reject(error);
  }
});

// Since there are no games going live for my testing for this assessment I am using
// final as a status on Jan, 1st 2022 to track games/plays
const processGames = (games: IGame[]) => {
  games.forEach(async (game: IGame) => {
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
  const { stat } = stats[0].splits[0];
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
    assists: stat.assists ? stat.assists : null,
    goals: stat.goals ? stat.goals : null,
    hits: stat.hits ? stat.hits : null,
    points: stat.points ? stat.points : null,
    penaltyMinutes: stat.penaltyMinutes ? stat.penaltyMinutes : null,
  };
  return playerDetails;
};

export default processGames;
