import axios from "axios";

export const getPlaysByGamePk = async (gamePk) => {
  console.log(`Getting stats for: ${gamePk}`);

  try {
    const stats = await axios.get(
      `https://statsapi.web.nhl.com/api/v1/game/${gamePk}/feed/live`
    );
    return stats.data.liveData;
  } catch (error) {
    console.log("There was an error getting schedule");
    throw error;
  }
};
