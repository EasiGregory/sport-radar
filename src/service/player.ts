import axios from "axios";

export const getPlayerStatsBySeason = async (playerId: number) => {
  try {
    const player = await axios.get(
      `https://statsapi.web.nhl.com/api/v1/people/${playerId}/stats?stats=statsSingleSeason&season=20212022`
    );
    return player.data.stats;
  } catch (error) {
    console.log("There was an error getting player stats");
    throw error;
  }
};

export const getPlayerDetails = async (playerId: number) => {
  try {
    const playerDetails = await axios.get(
      `https://statsapi.web.nhl.com/api/v1/people/${playerId}`
    );
    return playerDetails.data;
  } catch (error) {
    console.log("There was an error getting player details");
    throw error;
  }
};
