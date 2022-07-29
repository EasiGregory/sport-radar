import cron from "node-cron";

const initScheduler = () => {
  // Every 10 seconds
  cron.schedule("*/10 * * * * *", async () => {
    console.log("Running task every 10 seconds");
    // TODO: call schedule api for games list
  });
};

export default initScheduler;
