import cron from "node-cron";
import processGames from "../job/games-job";
import {
  getScheduleByDate
} from "../service/schedule";

const initScheduler = async () => {
  // Every 10 seconds
  const task = cron.schedule("*/10 * * * * *", async () => {
    // const schedule = await getScheduleForTodaysDate();
    const schedule = await getScheduleByDate("2022-01-01");

    if (schedule.dates[0].games) {
      processGames(schedule.dates[0].games);
    }
  });
};

export default initScheduler;
