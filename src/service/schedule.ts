import axios from "axios";

export const getScheduleByDate = async (date) => {
  console.log(`Getting games schedule for: ${date}`);

  try {
    const schedule = await axios.get(
      `https://statsapi.web.nhl.com/api/v1/schedule?date=${date}`
    );
    return schedule.data;
  } catch (error) {
    console.log("There was an error getting schedule");
    throw error;
  }
};

export const getScheduleForTodaysDate = async () => {
  const todaysDate = new Date().toISOString().split("T")[0];

  console.log(`Getting games schedule for: ${todaysDate}`);

  try {
    const schedule = await axios.get(
      `https://statsapi.web.nhl.com/api/v1/schedule?date=${todaysDate}`
    );
    return schedule.data;
  } catch (error) {
    console.log("There was an error getting schedule");
    throw error;
  }
};
