import Queue from "bull";
import { AppDataSource } from "../data-source";
import { Game } from "../entity/game";
import { getPlaysByGamePk } from "../service/game";
import {
  isGameFinal,
  isGameLive,
  transformGameToEntity,
} from "../util/games-helper";

const gameRepository = AppDataSource.getRepository(Game);
const gamesQueue = new Queue("Game");
const playsQueue = new Queue("Plays");

gamesQueue.process(async (job) => {
  try {
    const game = job.data;

    const gameEntity = transformGameToEntity(game);
    await AppDataSource.manager.save(gameEntity);

    const plays = await getPlaysByGamePk(game.gamePk);
    console.log(plays.plays.allPlays.length);

    // TODO: For each of the plays in a game Id like to add the play to the
    // Plays queue.
    // TODO: In the Plays queue is where Ill call the player APIs to get
    // the desired info on the player per Play
    // TODO: Create Play entity and type
    // TODO: Save the play to the DB
  } catch (error) {
    Promise.reject(error);
  }
});

const processGames = async (games) => {
  games.forEach(async (game) => {
    const gameExist = await gameRepository.findOneBy({
      gamePk: game.gamePk,
    });

    // Need to account for whether all plays for the game has been captured
    // Do I need to store the game? Using this as a barrier to/not to check for games

    // if (isGameLive(game) && !gameExist) {
    //   gamesQueue.add(game);
    // }

    // Since there are no games going live for my testing for this assessment I am using
    // final as a status to track plays
    if (isGameFinal(game) && !gameExist) {
      gamesQueue.add(game);
    }
  });
};

export default processGames;
